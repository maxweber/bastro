(ns bastro.sitemap
  "A sitemap as a string, to be used as a string page."
  (:require [clojure.data.xml :as xml]))

(def ^:private xmlns "http://www.sitemaps.org/schemas/sitemap/0.9")

(defn- tag
  "A tag in the sitemap namespace. data.xml emits an unqualified tag outside of it."
  [local]
  (xml/qname xmlns local))

(defn- day
  "yyyy-mm-dd in UTC for an inst. Anything else is taken as already written."
  [x]
  (if (inst? x)
    (str (.toLocalDate (.atZone (java.time.Instant/ofEpochMilli (inst-ms x)) (java.time.ZoneId/of "UTC"))))
    (str x)))

(defn- url [entry]
  (let [{:keys [loc lastmod]} (if (map? entry) entry {:loc entry})]
    (cond-> [(tag "url") [(tag "loc") (str loc)]]
      lastmod (conj [(tag "lastmod") (day lastmod)]))))

(defn sitemap
  "entries: absolute URLs, or maps {:loc url :lastmod inst-or-string}, in the order to list them.
   Returns the XML. The site decides what goes in:
   {\"/sitemap.xml\" (fn [db] (sitemap (for [p (:posts db)] {:loc (str base (url p)) :lastmod (:date p)})))}"
  [entries]
  (xml/emit-str (xml/sexp-as-element [(tag "urlset") {:xmlns xmlns} (map url entries)])))
