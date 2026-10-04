(ns bastro.build-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.assets :as assets]
            [bastro.build :as b]
            [bastro.hiccup :as h]
            [bastro.islands :as i]))

(deftest island-script-only-when-needed
  (let [plain [:html [:head] [:body [:p "x"]]]
        with-island (b/page-doc [:html [:head] [:body (i/island 'test-island.counter {})]] {})]
    (is (= plain (b/with-island-script plain "/js/islands.js")))
    (is (= [:script {:type "module" :src "/js/islands-abc.js"}]
           (last (h/find-child (b/with-island-script with-island "/js/islands-abc.js") "head"))))
    (is (= ['test-island.counter] (b/all-islands {"/" with-island "/a/" plain})))
    (is (= "<!DOCTYPE html>\n<html><head></head><body><p>x</p></body></html>"
           (get (b/render-site {"/" (fn [_] plain)} {}) "/")))))

(deftest string-pages-are-written-verbatim
  (let [doc [:html [:head] [:body [:p "x"]]]
        out (b/render-site {"/" doc
                            "/robots.txt" "User-agent: *\n"
                            "/sitemap.xml" (fn [db] (str "<urlset>" (:n db) "</urlset>"))}
                           {:n 1})]
    (is (= "User-agent: *\n" (get out "/robots.txt")))
    (is (= "<urlset>1</urlset>" (get out "/sitemap.xml")))
    (is (= "<!DOCTYPE html>\n<html><head></head><body><p>x</p></body></html>" (get out "/")))
    (is (= [] (b/all-islands {"/robots.txt" "User-agent: *\n"})))
    (is (empty? (b/all-images {"/robots.txt" "User-agent: *\n"})))))

(deftest asset-lookup-and-fingerprints
  (is (= "/css/site-abc.css" (assets/asset {:bastro/assets {"/css/site.css" {:path "/css/site-abc.css"}}} "/css/site.css")))
  (is (= "/css/site.css" (assets/asset {} "/css/site.css")))
  (is (= "/css/site-0a1b2c3d.css" (assets/fingerprint-path "/css/site.css" "0a1b2c3d")))
  (is (= "/CNAME-0a1b2c3d" (assets/fingerprint-path "/CNAME" "0a1b2c3d")))
  (is (= 8 (count (assets/digest (.getBytes "hello")))))
  (is (= (assets/digest (.getBytes "hello")) (assets/digest (.getBytes "hello")))))
