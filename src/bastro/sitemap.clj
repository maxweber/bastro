(ns bastro.sitemap
  "A sitemap as a string, to be used as a string page."
  (:require [clojure.string :as str]))

(defn- escape [s]
  (-> (str s)
      (str/replace "&" "&amp;")
      (str/replace "<" "&lt;")
      (str/replace ">" "&gt;")
      (str/replace "\"" "&quot;")
      (str/replace "'" "&apos;")))

(defn- day
  "yyyy-mm-dd in UTC for an inst. Anything else is taken as already written."
  [x]
  (if (inst? x)
    (str (.toLocalDate (.atZone (java.time.Instant/ofEpochMilli (inst-ms x)) (java.time.ZoneId/of "UTC"))))
    (str x)))

(defn sitemap
  "entries: absolute URLs, or maps {:loc url :lastmod inst-or-string}, in the order to list them.
   Returns the XML. The site decides what goes in:
   {\"/sitemap.xml\" (fn [db] (sitemap (for [p (:posts db)] {:loc (str base (url p)) :lastmod (:date p)})))}"
  [entries]
  (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
       "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
       (str/join (for [entry entries
                       :let [{:keys [loc lastmod]} (if (map? entry) entry {:loc entry})]]
                   (str "<url><loc>" (escape loc) "</loc>"
                        (when lastmod (str "<lastmod>" (escape (day lastmod)) "</lastmod>"))
                        "</url>\n")))
       "</urlset>\n"))
