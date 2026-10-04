(ns build-jar
  "Packs bastro and its dependencies into target/bastro.jar. babashka reads a jar as one more
   classpath entry, so a site that lists the jar under :paths needs no :deps, and no JVM to
   resolve them."
  (:require [babashka.classpath :as cp]
            [babashka.fs :as fs]
            [babashka.process :refer [shell]]
            [clojure.string :as str]))

(def jar "target/bastro.jar")
(def empty-config "target/jar.edn")

(defn runtime-classpath
  "The classpath without bastro's own test and dev directories."
  [classpath]
  (let [own (set (map #(str (fs/absolutize %)) ["test" "dev"]))]
    (->> (str/split classpath (re-pattern fs/path-separator))
         (remove #(contains? own (str (fs/absolutize %))))
         distinct
         (str/join fs/path-separator))))

(fs/create-dirs "target")
(fs/delete-if-exists jar)
;; An empty config keeps bb.edn's own paths, test and dev among them, out of the jar.
(spit empty-config "{}")
(shell "bb" "--config" empty-config "--classpath" (runtime-classpath (cp/get-classpath)) "uberjar" jar)
(println (format "bastro: %s, %d KB" jar (quot (fs/size jar) 1024)))
