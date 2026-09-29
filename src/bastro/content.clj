(ns bastro.content
  "Content loading: files become validated entries. Reading the files is the only side effect."
  (:require [babashka.fs :as fs]
            [clojure.edn :as edn]
            [clojure.string :as str]
            [malli.core :as m]
            [malli.error :as me]
            [bastro.markdown :as md]))

(defn split-front-matter
  "[meta body]: the leading EDN map and the rest of the text. No map gives {}."
  [s]
  (let [t (str/triml s)]
    (if (str/starts-with? t "{")
      (let [rdr (java.io.PushbackReader. (java.io.StringReader. t))
            meta (edn/read rdr)]
        [meta (str/triml (slurp rdr))])
      [{} s])))

(defn- bastro-key? [k] (= "bastro" (namespace k)))

(defn front-matter
  "The author's keys of an entry, without bastro's own namespaced ones."
  [entry]
  (into {} (remove (comp bastro-key? key)) entry))

(defn parse-entry
  "Pure: a file's text becomes an entry. Front matter keys sit at the top level,
   bastro's own keys are namespaced: :bastro/collection :bastro/path :bastro/slug :bastro/body :bastro/hiccup."
  [collection path text]
  (let [[meta body] (split-front-matter text)]
    (when-not (map? meta)
      (throw (ex-info "Front matter must be an EDN map" {:path (str path) :got meta})))
    (assoc meta
           :bastro/collection collection
           :bastro/path (str path)
           :bastro/slug (or (:slug meta) (fs/strip-ext (fs/file-name path)))
           :bastro/body body
           :bastro/hiccup (md/->hiccup body))))

(defn- check [schema entry]
  (let [s (m/schema schema)
        data (front-matter entry)]
    (when-not (m/validate s data)
      {:path (:bastro/path entry) :errors (me/humanize (m/explain s data))})))

(defn- try-entry [collection schema path]
  (try
    (let [entry (parse-entry collection path (slurp (str path)))]
      (if-let [err (and schema (check schema entry))]
        {:error err}
        {:entry entry}))
    (catch Exception ex
      {:error {:path (str path) :errors (ex-message ex)}})))

(defn load-collection
  "{:entries [...] :errors [...]}, entries in file-path order."
  [collection {:keys [dir schema]}]
  (let [results (->> (fs/glob dir "**.{md,markdown}") sort (map #(try-entry collection schema %)))]
    {:entries (into [] (keep :entry) results)
     :errors (into [] (keep :error) results)}))

(defn load-content
  "collections: {:posts {:dir \"content/posts\" :schema [...]}} becomes {:posts [entry ...]}.
   Throws ex-info listing every problem under :errors when any file is invalid."
  [collections]
  (let [loaded (into {} (for [[k spec] collections] [k (load-collection k spec)]))
        errors (into [] (mapcat (fn [[k {:keys [errors]}]] (map #(assoc % :collection k) errors))) loaded)]
    (if (seq errors)
      (throw (ex-info (str (count errors) " invalid content file(s)")
                      {:bastro/error :invalid-content :errors errors}))
      (into {} (map (fn [[k {:keys [entries]}]] [k entries])) loaded))))
