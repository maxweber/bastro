# bastro: notes for agents working in this repo

bastro is a static site generator for babashka with Replicant islands. Read `README.md` first for
the concepts; this file is about how the code is organized and how to change it safely.

## Principles that shape every namespace

- **Pure core, effects at the edges.** Content loading, the page map, island expansion, image
  planning and rendering are pure functions of values. Reading files, running tools and writing
  files happen in a few named functions (`load-content`, `build!`, `generate!`, `write!`).
  Keep it that way: a new feature is a pure transformation plus, if needed, one effect at an edge.
- **One atom.** The build has no mutable state. The dev server has exactly one atom, `bastro.dev/!state`.
  The browser loader has one store per page, `bastro.loader/db`. Do not add more.
- **Placeholders, then expansion.** Views stay pure by returning placeholder nodes such as
  `[:bastro/island {…}]` and `[:bastro/image {…}]`. The build expands them. Follow this pattern for
  anything that needs a tool at build time.
- **Hiccup is data until the last step.** Never regex over HTML. Walk the tree with `bastro.hiccup`.

## Where things are

| path | role |
|---|---|
| `src/bastro/content.clj` | files to validated entries; front matter split; Malli errors collected |
| `src/bastro/markdown.clj` | nextjournal/markdown: string to AST to hiccup |
| `src/bastro/pages.clj` | page map helpers; `merge-pages` via Stasis |
| `src/bastro/islands.clj` | server side of the island contract: placeholder, expansion, manifest |
| `src/bastro/images.clj` | image placeholders, header-based dimensions, sharp-cli variants |
| `src/bastro/assets.clj` | fingerprinting, CSS through esbuild, copying |
| `src/bastro/bundle.clj` | the site's island bundle: generated entry, cherry, esbuild |
| `src/bastro/render.clj` | Replicant string rendering, with the `&#39;` correction |
| `src/bastro/build.clj` | the pipeline: `build!` and the pure steps it composes |
| `src/bastro/dev.clj` | the dev server: atom, http-kit, WebSocket push, what each file change triggers |
| `src/bastro/watch.clj` | polling file watcher: snapshot and diff are pure, one loop is the effect |
| `src/bastro/wire.clj` | what goes over the dev channel |
| `src/bastro/core.clj` | the API a site requires |
| `client/bastro/*.cljs` | browser code: transit decoder, island loader, dev client |
| `resources/bastro/` | compiled client, committed; rebuilt by `bb client:build` |
| `example/` | a complete site and the integration test |
| `test/` | babashka tests, run by `test/runner.clj` |
| `client/test/run.mjs` | jsdom tests for the client, payloads produced by babashka |

## Conventions

- Front matter keys are the author's, at the top level of an entry. bastro's keys are namespaced
  `:bastro/…`. Never put an unnamespaced key on an entry.
- A page value is hiccup, a function of the db, or a string. A string page is output, not a
  document: every step that walks or renders hiccup has to pass it through untouched.
- Errors are `ex-info` with `:bastro/error` and, for content, `:errors` listing every file.
  `bastro.errors/format-error` renders them; the dev server and tasks rely on that shape.
- Island containers carry `data-island`, `data-props` (transit), `data-client`, and a
  `:replicant/key` derived from name, props and fallback. The dev client relies on that key to
  leave mounted islands alone during page diffs.
- The generated island entry requires the loader by file path (`"./loader.mjs"`), because cherry
  turns an unknown namespace into a bare npm import.
- Node tools are invoked through `npx`. sharp is invoked with `--yes` because it is optional.
- Exported client functions are referenced from JavaScript by cherry's munged names
  (`start!` is `start_BANG_`).

## How to verify a change

```
bb test           # pure code; fast; add a test next to the namespace you touched
bb client:build   # after any change under client/; commit the refreshed resources/
bb client:test    # loader and dev client in jsdom
bb example:build  # the integration test; inspect example/dist
bb check          # all of it
```

For dev-server changes, run `bb example:dev`, open http://localhost:8321/, edit a content file
and watch the page update without reloading. Start it on another port with
`bb -e "(require '[bastro.dev :as d]) (d/start! 'site {:port 8399})"` from `example/`.

## Things that look wrong but are deliberate

- `bastro.render/fix-quotes` exists because Replicant 2026.07.1 escapes `"` as `&#39;`.
- `public/` is never fingerprinted. Only assets bastro builds get hashed names.
- DataScript, Optimus and cognitect's test-runner do not load under babashka; do not add them.
- The fswatcher pod was removed on purpose: its second `watch` call hung intermittently, which
  stalled the whole dev server behind it. The polling watcher replaced it.
- The dev server starts http-kit before the watcher and prints a progress line per step and one
  line per request, so a stall is visible in the terminal instead of a page that loads forever.
- The dev channel is a WebSocket, not server-sent events, on purpose: an EventSource holds one of
  Chrome's six HTTP/1.1 connections per host, and six open tabs stalled every navigation.
