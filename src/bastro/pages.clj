(ns bastro.pages
  "The page map: URL to page, where a page is hiccup or a function of the db returning hiccup."
  (:require [stasis.core :as stasis]))

(defn merge-pages
  "Merges page maps and fails loudly when two of them claim the same URL."
  [& page-maps]
  (stasis/merge-page-sources
   (into {} (map-indexed (fn [i m] [(keyword (str "pages-" (inc i))) m]) page-maps))))

(defn paginate
  "Splits items into pages of per-page items. base is the URL of the first page and ends in a
   slash; page n lives at <base>page/<n>/. Returns one map per page:
   {:url :items :page :pages :prev :next}, where :prev and :next are URLs or nil.
   No items still gives one page, so the URL of the list exists."
  [base items per-page]
  (let [chunks (or (seq (partition-all per-page items)) [[]])
        total (count chunks)
        url #(if (= 1 %) base (str base "page/" % "/"))]
    (vec (map-indexed (fn [i chunk]
                        (let [n (inc i)]
                          {:url (url n)
                           :items (vec chunk)
                           :page n
                           :pages total
                           :prev (when (> n 1) (url (dec n)))
                           :next (when (< n total) (url (inc n)))}))
                      chunks))))

(defn resolve-page [page db] (if (fn? page) (page db) page))

(defn routes [pages] (sort (keys pages)))
