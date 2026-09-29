(ns bastro.hiccup-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.hiccup :as h]))

(deftest head-and-body
  (let [doc [:html {:lang "en"} [:head [:title "t"]] [:body [:p "x"]]]]
    (is (= [:html {:lang "en"} [:head [:title "t"] [:script {:src "/x.js"}]] [:body [:p "x"]]]
           (h/update-head doc #(h/append % [:script {:src "/x.js"}]))))
    (is (= [:head [:title "t"]] (h/find-child doc "head")))
    (is (= ["html" "head" "title" "body" "p"] (map (comp h/tag-name first) (h/nodes doc))))
    (is (= "div" (h/tag-name :div#id.a.b)))
    (is (= [[:p "x"]] (h/children [:body [:p "x"]])))
    (is (= [] (h/children [:br])))))

(deftest nodes-skips-attribute-maps-and-enters-seqs
  (let [doc [:ul {:data-x [:not-an-element 1]} (for [i (range 2)] [:li i])]]
    (is (= [:ul :li :li] (map first (h/nodes doc))))))
