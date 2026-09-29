(ns bastro.tasks
  "Entry points for a site's bb.edn tasks. They print bastro errors readably and exit non-zero."
  (:require [bastro.build :as build]
            [bastro.errors :as errors]))

(defn- run [f]
  (try (f)
       (catch clojure.lang.ExceptionInfo e
         (errors/print! e)
         (System/exit 1))))

(defn build [site] (run #(build/build! site)))
(defn routes [site] (run #(build/print-routes! site)))
(defn dev [site] (run #((requiring-resolve 'bastro.dev/start!) site)))
