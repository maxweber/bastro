(ns bastro.render
  "Hiccup to HTML strings, through Replicant's string renderer so the dialect matches the browser."
  (:require [clojure.string :as str]
            [replicant.string :as rs]))

(defn- fix-quotes
  "Replicant 2026.07.1 escapes a double quote as &#39;, the entity for an apostrophe, in both
   text and attribute values. It never emits &#39; for anything else, so this undoes it exactly."
  [s]
  (str/replace s "&#39;" "&#34;"))

(defn render "A fragment string." [hiccup] (fix-quotes (rs/render hiccup)))

(defn html "A full document string." [doc] (str "<!DOCTYPE html>\n" (render doc)))
