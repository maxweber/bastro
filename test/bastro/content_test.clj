(ns bastro.content-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.content :as c]))

(deftest split-front-matter
  (is (= [{:title "x"} "# Body\n"] (c/split-front-matter "{:title \"x\"}\n\n# Body\n")))
  (is (= [{} "# Body\n"] (c/split-front-matter "# Body\n")))
  (is (= "Body with {braces} and :kw" (second (c/split-front-matter "{:a 1}\nBody with {braces} and :kw")))))

(def Post [:map [:title :string] [:date inst?] [:tags {:optional true} [:set :keyword]]])

(deftest load-content
  (let [db (c/load-content {:posts {:dir "test/fixtures/content/posts" :schema Post}})
        [a b] (:posts db)]
    (is (= 2 (count (:posts db))))
    (is (= "first" (:bastro/slug a)))
    (is (= "First post" (:title a)))
    (is (= #{:clojure} (:tags a)))
    (is (inst? (:date a)))
    (is (= :posts (:bastro/collection a)))
    (is (= "custom-slug" (:bastro/slug b)) "front matter :slug overrides the file name")
    (is (= [:div [:h1 {:id "first"} "First"] [:p "Hello " [:em "there"] "."]] (:bastro/hiccup a)))
    (is (= {:title "First post" :date (:date a) :tags #{:clojure}} (c/front-matter a)))))

(deftest invalid-content-reports-every-file
  (let [e (try (c/load-content {:posts {:dir "test/fixtures/bad/posts" :schema Post}}) nil
               (catch clojure.lang.ExceptionInfo e e))
        errs (:errors (ex-data e))
        by-file (fn [re] (first (filter #(re-find re (:path %)) errs)))]
    (is (some? e))
    (is (= :invalid-content (:bastro/error (ex-data e))))
    (is (= 2 (count errs)))
    (is (= {:title ["should be a string"]} (:errors (by-file #"wrong-type"))))
    (is (string? (:errors (by-file #"broken-edn"))))
    (is (= :posts (:collection (first errs))))))
