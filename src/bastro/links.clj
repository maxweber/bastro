(ns bastro.links
  "Internal links as data. Every root-relative href and src in the finished documents has to
   lead to something the build writes: a page, a file from public/, a built asset. Finding the
   paths and judging them is pure; the build says what is known."
  (:require [clojure.string :as str]
            [bastro.hiccup :as h]))

(defn local-path
  "The path of a root-relative URL without its query and fragment. nil for everything else:
   absolute and protocol-relative URLs, fragments, mailto:, relative paths."
  [url]
  (when (and (string? url) (str/starts-with? url "/") (not (str/starts-with? url "//")))
    (first (str/split url #"[?#]" 2))))

(defn- decoded
  "The path with its percent-escapes resolved, or the path itself when it is not a valid URI."
  [path]
  (try (.getPath (java.net.URI. path))
       (catch Exception _ path)))

(defn refs
  "The distinct root-relative paths a document points at through href and src."
  [doc]
  (->> (h/nodes doc)
       (mapcat (fn [el] (let [attrs (h/attrs el)] [(:href attrs) (:src attrs)])))
       (keep local-path)
       distinct))

(defn output-paths
  "What a route can be asked for as: its URL, and the index.html behind a URL ending in a slash."
  [urls]
  (into #{} (mapcat (fn [url] (if (str/ends-with? url "/") [url (str url "index.html")] [url]))) urls))

(defn broken
  "docs: {url document}. known?: a predicate on a path. Returns {path [url ...]}: every unknown
   path with the pages that point at it, both sorted. String pages are not read."
  [docs known?]
  (let [known? (fn [path] (or (known? path) (known? (decoded path))))]
    (->> (for [[url doc] docs
               :when (not (string? doc))
               path (refs doc)
               :when (not (known? path))]
           [path url])
         (reduce (fn [m [path url]] (update m path (fnil conj (sorted-set)) url)) (sorted-map))
         (into (sorted-map) (map (fn [[path urls]] [path (vec urls)]))))))

(defn describe
  "broken as [{:path :errors}], the shape bastro.errors prints: one entry per broken path, with
   a few of the pages that link to it and a hint when only the trailing slash is missing."
  [broken known?]
  (vec (for [[path urls] broken]
         {:path path
          :errors (cond->> [(str "linked from " (count urls) " page(s): "
                                 (str/join ", " (take 3 urls))
                                 (when (> (count urls) 3) ", …"))]
                    (known? (str path "/")) (cons (str "did you mean " path "/ ?"))
                    true vec)})))
