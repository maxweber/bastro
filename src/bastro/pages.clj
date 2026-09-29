(ns bastro.pages
  "The page map: URL to page, where a page is hiccup or a function of the db returning hiccup."
  (:require [stasis.core :as stasis]))

(defn merge-pages
  "Merges page maps and fails loudly when two of them claim the same URL."
  [& page-maps]
  (stasis/merge-page-sources
   (into {} (map-indexed (fn [i m] [(keyword (str "pages-" (inc i))) m]) page-maps))))

(defn resolve-page [page db] (if (fn? page) (page db) page))

(defn routes [pages] (sort (keys pages)))
