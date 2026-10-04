(ns site
  "The whole site definition: a config map and a pages function. URLs are never stored,
   the page map is derived from the content every time."
  (:require [bastro.core :as b]
            [example.layout :as layout]
            [example.views :as v]))

(def config
  {:title  "Bastro example"
   :out    "dist"
   :public "public"
   :css    {"/css/site.css" "styles/site.css"}
   :collections
   {:posts {:dir    "content/posts"
            :schema [:map
                     [:title :string]
                     [:date inst?]
                     [:tags {:optional true} [:set :keyword]]
                     [:draft {:optional true} :boolean]]}}})

(defn published [db]
  (->> (:posts db) (remove :draft) (sort-by :date) reverse))

(defn tags [posts]
  (->> posts (mapcat :tags) distinct sort))

(defn post-url [post] (str "/posts/" (:bastro/slug post) "/"))
(defn tag-url [tag] (str "/tags/" (name tag) "/"))

(defn post-pages [db]
  (into {} (for [p (published db)]
             [(post-url p) (fn [db] (layout/page db {:title (:title p)} (v/post p)))])))

(defn tag-pages [db]
  (into {} (for [t (tags (published db))]
             [(tag-url t) (fn [db] (layout/page db {:title (str "Tag: " (name t))}
                                                (v/tag t (filter #(contains? (:tags %) t) (published db)))))])))

(defn pages [db]
  (b/merge-pages
   {"/"       (fn [db] (layout/page db {:title "Home"} (v/home (published db))))
    "/about/" (fn [db] (layout/page db {:title "About"} (v/about)))
    "/robots.txt" "User-agent: *\nAllow: /\n"}
   (post-pages db)
   (tag-pages db)))
