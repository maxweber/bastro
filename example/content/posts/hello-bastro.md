{:title "Hello, bastro"
 :date  #inst "2026-09-20"
 :tags  #{:bastro :babashka}}

This site is built by a babashka script. The content is a directory of markdown
files, each with an EDN map on top. The site is a **pure function** of that content.

- Content becomes a map
- The map becomes pages
- The pages become files

```clojure
(defn pages [db]
  {"/" (fn [db] (layout/page db {:title "Home"} (v/home (published db))))})
```
