(ns bastro.islands-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.hiccup :as h]
            [bastro.islands :as i]
            [bastro.render :as r]
            [bastro.transit :as transit]))

(defn- container [hiccup]
  (first (filter #(some-> (h/attrs %) :data-island) (h/nodes hiccup))))

(deftest expand-and-manifest
  (let [doc [:html [:head [:title "t"]] [:body [:main (i/island 'test-island.counter {:start 3 :tags #{:a}} {:client :visible})]]]
        ex (i/expand doc)
        node (container ex)
        a (h/attrs node)]
    (is (= "test-island.counter" (:data-island a)))
    (is (= "visible" (:data-client a)))
    (is (= {:start 3 :tags #{:a}} (transit/read-str (:data-props a))) "props round-trip through transit")
    (is (= [:div.counter [:button {:on {:click [[:inc]]}} "+"] [:span 3]] (last node)) "fallback is (view (init props) props)")
    (is (string? (:replicant/key a)))
    (is (= ['test-island.counter] (i/manifest ex)))
    (is (= [] (i/manifest doc)) "placeholders are not islands until expanded")))

(deftest key-tracks-props-and-fallback
  (let [k #(-> (i/expand (i/island 'test-island.counter %)) h/attrs :replicant/key)]
    (is (= (k {:start 1}) (k {:start 1})))
    (is (not= (k {:start 1}) (k {:start 2})))))

(deftest client-only-and-media
  (is (nil? (last (i/expand (i/island 'test-island.counter {} {:client :only})))) "no server fallback for :only")
  (let [a (h/attrs (i/expand (i/island 'test-island.counter {} {:client [:media "(max-width: 600px)"]})))]
    (is (= "media" (:data-client a)))
    (is (= "(max-width: 600px)" (:data-media a)))))

(deftest unknown-island
  (is (thrown-with-msg? clojure.lang.ExceptionInfo #"no init function"
                        (i/expand (i/island 'nope.missing {})))))

(deftest renders-to-html
  (let [html (r/render (i/expand (i/island 'test-island.counter {:start 1})))]
    (is (re-find #"data-island=\"test-island.counter\"" html))
    (is (re-find #"data-props=\"" html))
    (is (re-find #"<span>1</span>" html))
    (is (not (re-find #"replicant" html)) "keys and :on data do not leak into HTML")))
