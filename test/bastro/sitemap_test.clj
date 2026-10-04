(ns bastro.sitemap-test
  (:require [clojure.test :refer [deftest is]]
            [bastro.sitemap :as s]))

(deftest sitemap-lists-urls-in-order
  (is (= (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
              "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
              "<url><loc>https://example.com/</loc></url>\n"
              "<url><loc>https://example.com/posts/a/</loc><lastmod>2026-09-20</lastmod></url>\n"
              "<url><loc>https://example.com/posts/b/</loc><lastmod>2026-09-21</lastmod></url>\n"
              "</urlset>\n")
         (s/sitemap ["https://example.com/"
                     {:loc "https://example.com/posts/a/" :lastmod #inst "2026-09-20T23:30:00Z"}
                     {:loc "https://example.com/posts/b/" :lastmod "2026-09-21"}]))))

(deftest sitemap-escapes-urls
  (is (re-find #"<loc>https://example.com/\?a=1&amp;b=&lt;2&gt;</loc>"
               (s/sitemap ["https://example.com/?a=1&b=<2>"]))))

(deftest sitemap-without-entries-is-still-valid
  (is (= (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
              "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
              "</urlset>\n")
         (s/sitemap []))))
