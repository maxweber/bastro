(ns bastro.markdown
  "Markdown as data: a string becomes an AST, the AST becomes hiccup."
  (:require [nextjournal.markdown :as md]
            [nextjournal.markdown.transform :as t]))

(defn parse [s] (md/parse s))

(defn ast->hiccup
  "renderers: a map of node type to (fn [ctx node]) overriding the defaults, e.g. {:code my-highlighter}."
  ([ast] (ast->hiccup ast {}))
  ([ast renderers] (t/->hiccup (merge t/default-hiccup-renderers renderers) ast)))

(defn ->hiccup
  ([s] (->hiccup s {}))
  ([s renderers] (ast->hiccup (parse s) renderers)))
