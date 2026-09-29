(ns example.views
  "Pure views: data in, hiccup out."
  (:require [bastro.core :as b]))

(defn tag-link [tag] [:a.tag {:href (str "/tags/" (name tag) "/")} (name tag)])

(defn meta-line [post]
  [:p.meta (b/iso-date (:date post))
   (when (seq (:tags post))
     (list " · " (interpose " " (map tag-link (sort (:tags post))))))])

(defn card [post]
  [:article.card
   [:h2 [:a {:href (str "/posts/" (:bastro/slug post) "/")} (:title post)]]
   (meta-line post)])

(defn home [posts]
  (list (b/image "images/hero.jpg" {:alt "A blue to orange gradient" :widths [480 960] :sizes "(max-width: 44rem) 100vw, 42rem" :class "hero"})
        [:h1 "Posts"]
        (map card posts)))

(defn post [p]
  [:article
   [:h1 (:title p)]
   (meta-line p)
   (:bastro/hiccup p)])

(defn tag [t posts]
  (list [:h1 "Tagged " (name t)] (map card posts)))

(defn about []
  (list [:h1 "About"]
        [:p "A content site where every page is a value: a map of URLs to hiccup, derived from markdown files with EDN front matter."]
        [:h2 "An island"]
        [:p "Rendered on the server by babashka, hydrated by Replicant when it scrolls into view. Same code, compiled by cherry."]
        (b/island 'example.counter {:start 0} {:client :visible})))
