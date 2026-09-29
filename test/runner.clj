(ns runner
  "Finds every *_test.clj under test/, runs it, exits non-zero on failure."
  (:require [babashka.fs :as fs]
            [clojure.string :as str]
            [clojure.test :as t]))

(def namespaces
  (for [f (sort (fs/glob "test" "**_test.clj"))]
    (-> (str (fs/relativize "test" f))
        (str/replace #"\.clj$" "")
        (str/replace "/" ".")
        (str/replace "_" "-")
        symbol)))

(apply require namespaces)
(let [{:keys [fail error]} (apply t/run-tests namespaces)]
  (when (pos? (+ fail error)) (System/exit 1)))
