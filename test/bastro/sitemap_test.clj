(ns bastro.sitemap-test
  (:require [clojure.data.xml :as xml]
            [clojure.test :refer [deftest is]]
            [bastro.sitemap :as s]))

(def head "<?xml version=\"1.0\" encoding=\"UTF-8\"?>")

(deftest sitemap-lists-urls-in-order
  (is (= (str head
              "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
              "<url><loc>https://example.com/</loc></url>"
              "<url><loc>https://example.com/posts/a/</loc><lastmod>2026-09-20</lastmod></url>"
              "<url><loc>https://example.com/posts/b/</loc><lastmod>2026-09-21</lastmod></url>"
              "</urlset>")
         (s/sitemap ["https://example.com/"
                     {:loc "https://example.com/posts/a/" :lastmod #inst "2026-09-20T23:30:00Z"}
                     {:loc "https://example.com/posts/b/" :lastmod "2026-09-21"}]))))

(deftest sitemap-escapes-urls
  (let [url "https://example.com/?a=1&b=<2>"
        out (s/sitemap [url])]
    (is (re-find #"<loc>https://example.com/\?a=1&amp;b=&lt;2&gt;</loc>" out))
    (is (= [url] (-> (xml/parse-str out) :content first :content first :content)))))

(deftest sitemap-elements-are-in-the-sitemap-namespace
  (is (= (xml/qname "http://www.sitemaps.org/schemas/sitemap/0.9" "urlset")
         (:tag (xml/parse-str (s/sitemap ["https://example.com/"]))))))

(deftest sitemap-without-entries-is-still-valid
  (is (= [] (vec (:content (xml/parse-str (s/sitemap [])))))))
