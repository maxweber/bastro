(ns bastro.core
  "What a site requires: page helpers, islands, images and asset lookups."
  (:require [bastro.assets :as assets]
            [bastro.images :as images]
            [bastro.islands :as islands]
            [bastro.pages :as pages]
            [bastro.sitemap :as sitemap]))

(def merge-pages pages/merge-pages)
(def paginate pages/paginate)
(def sitemap sitemap/sitemap)
(def island islands/island)
(def image images/image)
(def asset assets/asset)

(defn iso-date
  "yyyy-mm-dd for an inst, in UTC."
  [inst]
  (str (.toLocalDate (.atZone (.toInstant ^java.util.Date inst) (java.time.ZoneId/of "UTC")))))
