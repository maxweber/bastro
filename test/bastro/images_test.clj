(ns bastro.images-test
  (:require [babashka.fs :as fs]
            [clojure.test :refer [deftest is]]
            [bastro.hiccup :as h]
            [bastro.images :as im]))

(defn- bytes* [& xs] (byte-array (map unchecked-byte xs)))

(def png (bytes* 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A  0 0 0 13  0x49 0x48 0x44 0x52
                 0 0 0x04 0xB0  0 0 0x03 0x20  8 6 0 0 0  0 0 0 0))
(def gif (bytes* 0x47 0x49 0x46 0x38 0x39 0x61  0xB0 0x04  0x20 0x03  0 0 0))
(def jpeg (bytes* 0xFF 0xD8  0xFF 0xC0  0x00 0x11  0x08  0x03 0x20  0x04 0xB0  0x03  0 0 0))
(def webp (bytes* 0x52 0x49 0x46 0x46  0 0 0 0  0x57 0x45 0x42 0x50  0x56 0x50 0x38 0x58
                  0x0A 0 0 0  0  0 0 0  0xAF 0x04 0x00  0x1F 0x03 0x00  0 0))

(deftest dimensions-from-headers
  (is (= [1200 800] (im/dimensions-of-bytes png)))
  (is (= [1200 800] (im/dimensions-of-bytes gif)))
  (is (= [1200 800] (im/dimensions-of-bytes jpeg)))
  (is (= [1200 800] (im/dimensions-of-bytes webp)))
  (is (nil? (im/dimensions-of-bytes (bytes* 1 2 3 4 5)))))

(deftest plan-and-expand
  (fs/with-temp-dir [dir {}]
    (let [src (str (fs/path dir "hero.png"))
          _ (fs/write-bytes src png)
          spec {:src src :alt "x" :widths [480 960 2000]}
          plans (im/plan [spec] (str (fs/path dir "cache")))
          {:keys [dims variants]} (get plans spec)
          doc (im/expand [:div (im/image src {:alt "x" :widths [480 960 2000]})] plans)
          img (h/attrs (first (filter #(h/is? % "img") (h/nodes doc))))
          sources (filter #(h/is? % "source") (h/nodes doc))]
      (is (= [1200 800] dims))
      (is (= [[480 :webp] [960 :webp] [1200 :webp] [480 :png] [960 :png] [1200 :png]]
             (map (juxt :width :format) variants)) "never upscaled, original width and format kept last")
      (is (= 1 (count sources)))
      (is (= "image/webp" (:type (h/attrs (first sources)))))
      (is (re-find #"^/img/hero-1200-[0-9a-f]{8}\.png$" (:src img)))
      (is (re-find #"480w, .* 960w, .* 1200w$" (:srcset img)))
      (is (= [1200 800 "x" "lazy"] ((juxt :width :height :alt :loading) img)))
      (is (= [] (im/placeholders doc)) "nothing left to expand"))))
