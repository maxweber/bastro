{:title "Why hiccup"
 :date  #inst "2026-09-21"
 :tags  #{:clojure :replicant}}

Astro needs a compiler for its component format because JavaScript has no literal
for markup. Clojure does: hiccup. A component is a function returning data, and the
same data renders to a string on the server and to DOM in the browser through
[Replicant](https://github.com/cjohansen/replicant).
