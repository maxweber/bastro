(ns example.layout
  "A layout is a function from hiccup to hiccup."
  (:require [bastro.core :as b]))

(defn page [db {:keys [title]} & body]
  [:html {:lang "en"}
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
    [:title (str title " · " (get-in db [:bastro/config :title]))]
    [:link {:rel "stylesheet" :href (b/asset db "/css/site.css")}]]
   [:body
    [:header
     [:nav [:a {:href "/"} "Home"] " " [:a {:href "/about/"} "About"]]]
    (into [:main] body)
    [:footer "Built with bastro"]]])
