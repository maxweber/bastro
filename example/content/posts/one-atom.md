{:title "One atom"
 :date  #inst "2026-09-22"
 :tags  #{:clojure :babashka}}

The build never needs mutable state. The dev server needs exactly one place that
changes over time: an atom holding the content database. A file change swaps in a
new value, and the open pages are re-derived from it.
