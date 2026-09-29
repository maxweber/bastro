(ns bastro.core
  "What a site requires: page helpers, islands, images and asset lookups."
  (:require [bastro.assets :as assets]
            [bastro.images :as images]
            [bastro.islands :as islands]
            [bastro.pages :as pages]))

(def merge-pages pages/merge-pages)
(def island islands/island)
(def image images/image)
(def asset assets/asset)

(defn iso-date
  "yyyy-mm-dd for an inst, in UTC."
  [inst]
  (str (.toLocalDate (.atZone (.toInstant ^java.util.Date inst) (java.time.ZoneId/of "UTC")))))
