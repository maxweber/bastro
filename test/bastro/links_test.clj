(ns bastro.links-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.links :as l]))

(deftest local-path-only-for-root-relative-urls
  (is (= "/about/" (l/local-path "/about/")))
  (is (= "/about/" (l/local-path "/about/?ref=nav#team")))
  (is (= "/" (l/local-path "/#top")))
  (is (nil? (l/local-path "https://example.com/about/")))
  (is (nil? (l/local-path "//cdn.example.com/a.js")))
  (is (nil? (l/local-path "#team")))
  (is (nil? (l/local-path "mailto:me@example.com")))
  (is (nil? (l/local-path "about/")))
  (is (nil? (l/local-path nil))))

(deftest refs-come-from-href-and-src
  (is (= ["/css/site.css" "/" "/img/a.png" "/about/"]
         (l/refs [:html
                  [:head [:link {:rel "stylesheet" :href "/css/site.css"}]]
                  [:body
                   [:a {:href "/"} "Home"]
                   (list [:img {:src "/img/a.png" :alt ""}]
                         [:a {:href "https://example.com/"} "Elsewhere"]
                         [:a {:href "/about/#team"} "Team"]
                         [:a {:href "/"} "Home again"])]]))))

(deftest output-paths-include-the-index-file
  (is (= #{"/" "/index.html" "/about/" "/about/index.html" "/robots.txt"}
         (l/output-paths ["/" "/about/" "/robots.txt"]))))

(deftest broken-maps-each-path-to-the-pages-that-link-to-it
  (let [docs {"/" [:html [:body [:a {:href "/about/"} "About"] [:a {:href "/nope/"} "Nope"]]]
              "/about/" [:html [:body [:a {:href "/nope/"} "Nope"] [:img {:src "/img/missing.png"}]]]
              "/fine/" [:html [:body [:a {:href "/about/index.html"} "About"]]]
              "/robots.txt" "Sitemap: /not-a-link"}
        known? (l/output-paths (keys docs))]
    (is (= {"/img/missing.png" ["/about/"]
            "/nope/" ["/" "/about/"]}
           (l/broken docs known?)))
    (is (= {} (l/broken (dissoc docs "/" "/about/") known?)))))

(deftest broken-accepts-percent-escaped-paths
  (is (= {} (l/broken {"/" [:html [:body [:img {:src "/img/my%20photo.png"}]]]}
                      #{"/" "/img/my photo.png"}))))

(deftest describe-lists-pages-and-hints-at-a-missing-slash
  (is (= [{:path "/about" :errors ["did you mean /about/ ?" "linked from 1 page(s): /"]}
          {:path "/nope/" :errors ["linked from 5 page(s): /, /a/, /b/, …"]}]
         (l/describe (sorted-map "/about" ["/"] "/nope/" ["/" "/a/" "/b/" "/c/" "/d/"])
                     #{"/" "/about/"}))))
