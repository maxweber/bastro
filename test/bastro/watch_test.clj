(ns bastro.watch-test
  (:require [babashka.fs :as fs]
            [clojure.test :refer [deftest is]]
            [bastro.watch :as w]))

(deftest snapshot-and-diff
  (fs/with-temp-dir [dir {}]
    (let [a (str (fs/path dir "a.md")) b (str (fs/path dir "sub" "b.md"))]
      (fs/create-dirs (fs/parent b))
      (spit a "1") (spit b "1")
      (let [s1 (w/snapshot [(str dir)])]
        (is (= #{a b} (set (keys s1))))
        (is (= [] (w/diff s1 s1)))
        (fs/set-last-modified-time a (+ 5000 (.toMillis (fs/last-modified-time a))))
        (fs/delete b)
        (spit (str (fs/path dir "c.md")) "1")
        (is (= #{{:type :write :path a} {:type :remove :path b} {:type :create :path (str (fs/path dir "c.md"))}}
               (set (w/diff s1 (w/snapshot [(str dir)])))))))
    (is (= {} (w/snapshot [(str (fs/path dir "missing"))])) "a missing dir is simply empty")))

(deftest watch-calls-back-with-a-batch
  (fs/with-temp-dir [dir {}]
    (let [seen (promise)
          stop (w/watch! [(str dir)] #(deliver seen %) {:interval-ms 50})]
      (Thread/sleep 80)
      (spit (str (fs/path dir "x.md")) "hi")
      (is (= [{:type :create :path (str (fs/path dir "x.md"))}] (deref seen 2000 :timeout)))
      (stop))))
