(ns bastro.render-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.render :as r]))

(deftest double-quotes-survive-in-text-and-attributes
  (is (= "<p data-x=\"&#34;q&#34;\">say &#34;hi&#34; it&apos;s</p>"
         (r/render [:p {:data-x "\"q\""} "say \"hi\" it's"])))
  (is (= "<p>a &amp; b &lt;c&gt;</p>" (r/render [:p "a & b <c>"]))))

(deftest document
  (is (= "<!DOCTYPE html>\n<html><body></body></html>" (r/html [:html [:body]]))))
