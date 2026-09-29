// jsdom tests for the island loader and the dev client. Every transit payload is produced by
// babashka itself, so these tests cover the real producer and the real consumer together.
import { JSDOM } from 'jsdom';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const bb = (code) => execFileSync('bb', ['-e', code], { cwd: root, encoding: 'utf8' }).trim();
const tick = () => new Promise((r) => setTimeout(r, 5));

class FakeIntersectionObserver {
  constructor(cb) { this.cb = cb; FakeIntersectionObserver.last = this; }
  observe(el) { this.el = el; }
  disconnect() {}
  trigger() { this.cb([{ isIntersecting: true, target: this.el }], this); }
}

let currentDom;
function install(html) {
  if (currentDom) { // a real page has one document; detach the previous one's islands
    currentDom.window.document.body.innerHTML = '';
  }
  const dom = new JSDOM(html, { pretendToBeVisual: true, url: 'http://localhost/' });
  currentDom = dom;
  const w = dom.window;
  for (const k of ['window', 'document', 'Node', 'HTMLElement', 'Element', 'Text', 'requestAnimationFrame',
    'cancelAnimationFrame', 'MutationObserver', 'Event', 'CustomEvent', 'location']) globalThis[k] = w[k];
  globalThis.IntersectionObserver = FakeIntersectionObserver;
  return dom;
}

// --- payloads from babashka -------------------------------------------------------------
const islandHtml = (opts) => bb(`(require '[bastro.islands :as i] '[bastro.render :as r])
  (print (r/render (i/expand (i/island 'test-island.counter ${opts}))))`);
const pageWire = (title, bodyForms) => bb(`(require '[bastro.islands :as i] '[bastro.wire :as w] '[bastro.transit :as t])
  (print (t/write-str (w/page->wire (i/expand [:html {:lang "en"} [:head [:title "${title}"]] [:body ${bodyForms}]]))))`);
const dataWire = bb(`(require '[bastro.transit :as t]) (print (t/write-str {:a [1 2] :l (list 1 2) :s #{:k} :n nil :str "x"}))`);

install('<!doctype html><html><head></head><body></body></html>');
const core = await import('cherry-cljs/cljs.core.js');
const transit = await import(path.join(root, 'target/client/bastro/transit.mjs'));
const loader = await import(path.join(root, 'target/client/bastro/loader.mjs'));
const counter = await import(path.join(root, 'target/client/test_island/counter.mjs'));
const dev = await import(path.join(root, 'target/client/bastro/dev.mjs'));

let passed = 0;
const test = (name, f) => Promise.resolve().then(f).then(() => { passed++; console.log('ok  ', name); },
  (e) => { console.log('FAIL', name, '\n    ', e.message); process.exitCode = 1; });

const islandCount = () => core.count(core.get(loader.state(), core.keyword('islands')));

await test('transit: arrays become vectors, lists stay lists, sets and keywords survive', () => {
  const v = transit.read_str(dataWire);
  assert.ok(core.vector_QMARK_(core.get(v, core.keyword('a'))));
  assert.ok(core.list_QMARK_(core.get(v, core.keyword('l'))));
  assert.ok(core.set_QMARK_(core.get(v, core.keyword('s'))));
  assert.equal(core.get(v, core.keyword('str')), 'x');
});

await test('loader: mounts a :load island from transit props and re-renders on dispatch', async () => {
  install(`<!doctype html><html><body><main>${islandHtml('{:start 3}')}</main></body></html>`);
  loader.start_BANG_({ 'test-island.counter': { init: counter.init, view: counter.view, step: counter.step } });
  await tick();
  const el = document.querySelector('[data-island]');
  assert.equal(islandCount(), 1);
  assert.match(el.innerHTML, /<span>3<\/span>/);
  el.querySelector('button').click();
  await tick();
  assert.match(el.innerHTML, /<span>4<\/span>/, 'click dispatched through step');
});

await test('loader: a :visible island waits for the observer', async () => {
  install(`<!doctype html><html><body>${islandHtml('{:start 10} {:client :visible}')}</body></html>`);
  loader.scan_BANG_();
  await tick();
  assert.equal(islandCount(), 0, 'not mounted before intersection');
  FakeIntersectionObserver.last.trigger();
  await tick();
  assert.equal(islandCount(), 1);
});

await test('loader: containers added later mount on bastro:rendered, unknown islands only warn', async () => {
  install('<!doctype html><html><body></body></html>');
  loader.start_BANG_({});
  document.body.innerHTML = islandHtml('{:start 1}') + '<div data-island="nope.missing" data-props="[]" data-client="load"></div>';
  document.dispatchEvent(new CustomEvent('bastro:rendered'));
  await tick();
  assert.equal(islandCount(), 1);
});

await test('dev client: applies a page, keeps a keyed island alive, replaces it when the key changes', async () => {
  install('<!doctype html><html><head><title>zero</title></head><body><p>ssr</p></body></html>');
  loader.start_BANG_({});
  dev.apply_page_BANG_(transit.read_str(pageWire('One', '[:h1 "v1"] (i/island \'test-island.counter {:start 3})')));
  await tick();
  assert.equal(document.title, 'One');
  assert.match(document.body.innerHTML, /<h1>v1<\/h1>/);
  assert.equal(document.documentElement.getAttribute('lang'), 'en');
  const el = document.querySelector('[data-island]');
  assert.equal(islandCount(), 1);
  el.querySelector('button').click();
  await tick();
  assert.match(el.innerHTML, /<span>4<\/span>/);

  dev.apply_page_BANG_(transit.read_str(pageWire('Two', '[:h1 "v2"] (i/island \'test-island.counter {:start 3})')));
  await tick();
  assert.equal(document.title, 'Two');
  assert.match(document.body.innerHTML, /<h1>v2<\/h1>/);
  assert.equal(document.querySelector('[data-island]'), el, 'same element: key unchanged');
  assert.match(el.innerHTML, /<span>4<\/span>/, 'island state survived the page diff');

  dev.apply_page_BANG_(transit.read_str(pageWire('Three', '[:h1 "v3"] (i/island \'test-island.counter {:start 5})')));
  await tick();
  const el2 = document.querySelector('[data-island]');
  assert.notEqual(el2, el, 'new element: props changed the key');
  assert.match(el2.innerHTML, /<span>5<\/span>/, 'remounted from new props');
  assert.equal(islandCount(), 1, 'the detached island was pruned');
});

await test('dev client: shows a build error', () => {
  install('<!doctype html><html><body></body></html>');
  dev.show_error_BANG_(transit.read_str(bb(`(require '[bastro.wire :as w] '[bastro.transit :as t])
    (print (t/write-str (w/error->wire (ex-info "2 invalid content file(s)" {:errors [{:path "content/x.md" :errors {:title ["should be a string"]}}]}))))`)));
  assert.match(document.body.innerHTML, /build error/);
  assert.match(document.body.innerHTML, /content\/x\.md/);
});

console.log(`\n${passed} client tests passed${process.exitCode ? ', with failures' : ''}`);
