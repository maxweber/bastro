(ns bastro.pages-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.pages :as p]))

(deftest merge-pages-detects-conflicts
  (is (= {"/" 1 "/a/" 2} (p/merge-pages {"/" 1} {"/a/" 2})))
  (is (thrown? Exception (p/merge-pages {"/" 1} {"/" 2}))))

(deftest paginate-splits-and-links-pages
  (is (= [{:url "/blog/" :items [1 2] :page 1 :pages 3 :prev nil :next "/blog/page/2/"}
          {:url "/blog/page/2/" :items [3 4] :page 2 :pages 3 :prev "/blog/" :next "/blog/page/3/"}
          {:url "/blog/page/3/" :items [5] :page 3 :pages 3 :prev "/blog/page/2/" :next nil}]
         (p/paginate "/blog/" [1 2 3 4 5] 2)))
  (is (= [{:url "/" :items [1 2] :page 1 :pages 1 :prev nil :next nil}]
         (p/paginate "/" [1 2] 20)))
  (is (= [{:url "/" :items [] :page 1 :pages 1 :prev nil :next nil}]
         (p/paginate "/" [] 20))))

(deftest resolve-and-routes
  (is (= [:p "x"] (p/resolve-page [:p "x"] {})))
  (is (= [:p 1] (p/resolve-page (fn [db] [:p (:n db)]) {:n 1})))
  (is (= ["/" "/a/" "/b/"] (p/routes {"/b/" 1 "/" 2 "/a/" 3}))))
