# bastro

An Astro-shaped static site generator for [babashka](https://github.com/babashka/babashka),
with [Replicant](https://github.com/cjohansen/replicant) for anything interactive.

It borrows Astro's ideas: content collections with schemas, zero JavaScript by default, islands
that hydrate on demand, a dev server with live reload. It does not borrow Astro's shape. There is
no component compiler, no config file format, no plugin API. A page is hiccup, the site is a pure
function from content to a map of URLs, and the dev server is that same function plus one atom.

## How a site is shaped

```
my-site/
  bb.edn                 deps and tasks: build, dev, routes
  src/site.clj           a config map and a pages function
  src/my_site/*.clj      layouts and views: functions returning hiccup
  islands/**/*.cljc      islands: pure init, view and step functions
  content/<collection>/  markdown with an EDN map on top
  styles/*.css           stylesheets, bundled and fingerprinted by esbuild
  images/                sources for the image helper
  public/                copied verbatim
  dist/                  the output
```

`bb.edn`:

```clojure
{:paths ["src" "islands"]
 :deps  {bastro/bastro {:git/url "https://github.com/maxweber/bastro" :git/sha "…"}}   ; or {:local/root "../bastro"}
 :tasks {build  {:requires ([bastro.tasks :as t]) :task (t/build 'site)}
         routes {:requires ([bastro.tasks :as t]) :task (t/routes 'site)}
         dev    {:requires ([bastro.tasks :as t]) :task (t/dev 'site)}}}
```

Sites that use islands, stylesheets or images also need the Node tools bastro shells out to,
in a `package.json` next to `bb.edn`: `cherry-cljs`, `esbuild`, `transit-js`, and `sharp-cli`
for images.

`src/site.clj`:

```clojure
(ns site
  (:require [bastro.core :as b]
            [my-site.layout :as layout]
            [my-site.views :as v]))

(def config
  {:title "My site"
   :css   {"/css/site.css" "styles/site.css"}
   :collections
   {:posts {:dir "content/posts"
            :schema [:map [:title :string] [:date inst?] [:tags {:optional true} [:set :keyword]]]}}})

(defn published [db] (->> (:posts db) (remove :draft) (sort-by :date) reverse))

(defn pages [db]
  (b/merge-pages
   {"/" (fn [db] (layout/page db {:title "Home"} (v/home (published db))))}
   (into {} (for [p (published db)]
              [(str "/posts/" (:bastro/slug p) "/")
               (fn [db] (layout/page db {:title (:title p)} (v/post p)))]))))
```

A content file, `content/posts/hello.md`:

```markdown
{:title "Hello"
 :date  #inst "2026-09-22"
 :tags  #{:clojure}}

The body is markdown. It becomes hiccup, not a string, so the rest of the
pipeline can still see it as data.
```

Then `bb routes` prints every URL, `bb build` writes `dist/`, and `bb dev` serves the site with
live reload on http://localhost:8321/.

## The pieces

**Content.** Each collection is a directory of markdown files with an EDN map on top, validated
by a [Malli](https://github.com/metosin/malli) schema. Every file becomes an entry: the front
matter keys at the top level, bastro's own keys namespaced (`:bastro/slug`, `:bastro/path`,
`:bastro/collection`, `:bastro/body`, `:bastro/hiccup`). Markdown is parsed by
[nextjournal/markdown](https://github.com/nextjournal/markdown) into an AST and then hiccup.
Invalid files are reported all at once, with humanized errors, in the terminal and in the browser.

**Pages.** `pages` is a pure function from the content database to a map of URL to page. A page
is hiccup or a function of the database returning hiccup. Dynamic routes are a `for` over a
collection. `b/merge-pages` fails loudly when two sources claim the same URL. Layouts are
functions from hiccup to hiccup. Nothing is stored: the map is re-derived from the content every
time. A page that is a string, or a function returning one, is written as it is, with no doctype
and no rendering. That covers `robots.txt`, a sitemap or a feed: `{"/robots.txt" "User-agent: *\n"}`.

Two helpers return plain data for common page maps. `(b/paginate "/blog/" posts 20)` splits a
list into pages at `/blog/`, `/blog/page/2/` and so on, each a map of `:url`, `:items`, `:page`,
`:pages`, `:prev` and `:next`; the site turns each into a page. `(b/sitemap entries)` returns
the XML for absolute URLs or `{:loc … :lastmod …}` maps, for use as a string page. The site
chooses which URLs to list.

**Rendering.** Documents go through Replicant's string renderer, so the hiccup dialect is
exactly what the browser side renders, aliases included.

**Links.** Before anything is written, the build collects every root-relative `href` and `src`
from the finished documents. Each one has to lead to a page, a file in `public/` or an asset
bastro built. Otherwise the build fails and names the path and the pages that link to it, so a
link to a post that was renamed or never existed does not reach the output. Links to other sites are not
followed. The dev server does not check.

**Islands.** An island is a `.cljc` namespace with three pure functions:

```clojure
(ns my-site.counter)
(defn init [props] {:count (:start props 0)})
(defn view [state props] [:div [:button {:on {:click [[:inc]]}} "+"] [:span (:count state)]])
(defn step [state [action]] (case action :inc (update state :count inc) state))
```

A view places it with `(b/island 'my-site.counter {:start 0} {:client :visible})`. babashka
renders the fallback on the server by calling the same functions. The page gets a script tag
only when it has islands. In the browser, one store per page holds every island's state, the
loader owns dispatch and rendering, and the directive decides when to hydrate: `:load` (default),
`:idle`, `:visible`, `[:media "(query)"]`, or `:only` for no server fallback. Props travel as
transit, so keywords, sets and dates arrive intact. Islands are compiled by
[cherry](https://github.com/squint-cljs/cherry) and bundled by esbuild into one file per site.

**Images.** `(b/image "images/hero.jpg" {:alt "…" :widths [480 960] :formats [:webp]})` is a
placeholder. The build reads the source dimensions from the file header, generates each missing
variant once through sharp-cli, cached by content digest, and expands the placeholder into a
`picture` element with `srcset`, `width` and `height`.

**Assets.** `public/` is copied verbatim. Stylesheets listed under `:css` are bundled and
minified by esbuild. Everything bastro builds, stylesheets, the island bundle and images, gets a
content-hashed name, and views ask for it with `(b/asset db "/css/site.css")`.

**Dev server.** One atom holds the content database, the built dev assets, the last error and
the open connections. A polling watcher snapshots the watched directories every quarter second,
and the diff of two snapshots is the batch of changes, so there is no native watcher and no
inotify limit. A file change swaps in a new database. Every open page then gets its new
hiccup over a WebSocket, and the dev client diffs it into the live document with
Replicant, head and body alike. Islands keep their state across those diffs as long as their
props and fallback are unchanged. A change to an island's code rebuilds the bundle and reloads.
Errors render in the browser with the same text the terminal shows, and an unknown URL lists
every route.

## Site config

| key | default | meaning |
|---|---|---|
| `:collections` | `{}` | `{:name {:dir "…" :schema […]}}` |
| `:css` | `{}` | output URL to source file, bundled by esbuild |
| `:public` | `"public"` | copied verbatim |
| `:islands` | `"islands"` | where island namespaces live |
| `:out` | `"dist"` | the output directory, emptied on each build |
| `:served-elsewhere?` | none | a predicate on a root-relative path that something other than this site serves, e.g. `#(str/starts-with? % "/api/")`; links to such paths are not checked |

Anything else in the config is yours; views read it through `(:bastro/config db)`.

## Working on bastro

```
bb test           babashka test suite
bb client:build   compile the client with cherry, bundle the dev client, refresh resources/
bb client:test    jsdom tests for the loader and dev client, driven by babashka-produced payloads
bb example:build  build the example site, the integration test
bb example:dev    serve it
bb check          all of the above
```

The client's compiled modules under `resources/bastro/` are committed, so a site never compiles
bastro's own client. Run `bb client:build` after changing anything under `client/`.

Requirements on the machine that builds: babashka, Node, and a JVM once, for resolving
Clojure dependencies.

## Decisions, and what they cost

Measured on 2026-09-22 with babashka 1.12, cherry 0.6.38 and Replicant 2026.07.1:

| choice | alternative | why |
|---|---|---|
| cherry for islands | shadow-cljs | keeps the JVM out of the dev loop; 72 KB gzipped per island page against 38 KB |
| replicant.string on the server | hiccup2 | one dialect on both ends, aliases included |
| EDN front matter | YAML, mapdown | the values are already the data the schema validates |
| plain maps for content | DataScript | DataScript does not load under babashka; maps print, test and grep |
| explicit page map | file-based routing | printable and testable without building, no filename DSL |
| WebSocket dev channel | server-sent events | an EventSource counts against Chrome's six HTTP connections per host, so six open tabs stalled every navigation; WebSockets have their own pool |
| polling file watcher | fswatcher pod | the pod hung intermittently on its second watch; polling is a pure diff of snapshots |
| esbuild for CSS | Tailwind first-class | already present for islands; Tailwind is a drop-in CSS step |

Known limits. Replicant does not hydrate: the first client render of an island replaces the
server markup, which is invisible when they match. Replicant 2026.07.1 escapes a double quote
as `&#39;`; bastro's renderer corrects that after rendering. The interpreter is slower than the
JVM, so sites with many thousands of pages should measure.

## Prior art

Stasis and Optimus by Magnar Sveen, Powerpack by Christian Johansen, Quickblog and the whole
babashka toolchain by Michiel Borkent, and Astro for the ideas.

## License

MIT, see `LICENSE`. The compiled client in `resources/bastro/` contains third-party code under
its own licenses, listed in `THIRD-PARTY-NOTICES.md`.
