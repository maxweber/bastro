(ns bastro.pages-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.pages :as p]))

(deftest merge-pages-detects-conflicts
  (is (= {"/" 1 "/a/" 2} (p/merge-pages {"/" 1} {"/a/" 2})))
  (is (thrown? Exception (p/merge-pages {"/" 1} {"/" 2}))))

(deftest resolve-and-routes
  (is (= [:p "x"] (p/resolve-page [:p "x"] {})))
  (is (= [:p 1] (p/resolve-page (fn [db] [:p (:n db)]) {:n 1})))
  (is (= ["/" "/a/" "/b/"] (p/routes {"/b/" 1 "/" 2 "/a/" 3}))))
