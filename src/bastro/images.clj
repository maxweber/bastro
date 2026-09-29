(ns bastro.images
  "Responsive images at build time. A placeholder in hiccup names a source image and the widths and
   formats wanted. The build plans the variants (pure, reads only the source), generates missing
   files once through sharp-cli (cached by content digest), then expands the placeholder into a
   picture element. Views stay pure."
  (:require [babashka.fs :as fs]
            [babashka.process :refer [shell]]
            [clojure.string :as str]
            [clojure.walk :as walk]
            [bastro.assets :as assets]))

(def defaults {:widths [480 960 1440] :formats [:webp] :sizes "100vw" :loading "lazy" :quality 80})

(defn image
  "A placeholder expanded at build time. src is a file in the site, e.g. \"images/hero.jpg\".
   opts: :alt (required), :widths, :formats (besides the original), :sizes, :class, :loading, :quality."
  [src opts]
  [:bastro/image (assoc opts :src src)])

(defn- placeholder? [x] (and (vector? x) (= :bastro/image (first x))))

(defn placeholders "Every distinct image spec in the hiccup." [hiccup]
  (->> (tree-seq (some-fn vector? seq?) seq hiccup) (filter placeholder?) (map second) distinct))

;; --- dimensions from file headers, no decoder needed ---------------------------------

(defn- u8 [^bytes b i] (bit-and (aget b i) 0xff))
(defn- u16be [b i] (bit-or (bit-shift-left (u8 b i) 8) (u8 b (inc i))))
(defn- u16le [b i] (bit-or (u8 b i) (bit-shift-left (u8 b (inc i)) 8)))
(defn- u24le [b i] (bit-or (u16le b i) (bit-shift-left (u8 b (+ i 2)) 16)))
(defn- u32be [b i] (bit-or (bit-shift-left (u16be b i) 16) (u16be b (+ i 2))))
(defn- ascii [^bytes b i n] (String. b (int i) (int n) "ISO-8859-1"))

(defn- jpeg-dimensions [b n]
  (loop [i 2]
    (when (and (< (+ i 9) n) (= 0xFF (u8 b i)))
      (let [m (u8 b (inc i))]
        (cond
          (= m 0xFF) (recur (inc i))
          (or (= m 0xD8) (= m 0x01) (<= 0xD0 m 0xD7)) (recur (+ i 2))
          (and (<= 0xC0 m 0xCF) (not (#{0xC4 0xC8 0xCC} m))) [(u16be b (+ i 7)) (u16be b (+ i 5))]
          :else (recur (+ i 2 (u16be b (+ i 2)))))))))

(defn dimensions-of-bytes
  "[width height] of PNG, JPEG, GIF or WebP bytes, or nil."
  [^bytes b]
  (let [n (alength b)]
    (cond
      (and (> n 24) (= "PNG" (ascii b 1 3))) [(u32be b 16) (u32be b 20)]
      (and (> n 10) (= "GIF" (ascii b 0 3))) [(u16le b 6) (u16le b 8)]
      (and (> n 30) (= "RIFF" (ascii b 0 4)) (= "WEBP" (ascii b 8 4)))
      (case (ascii b 12 4)
        "VP8 " [(bit-and (u16le b 26) 0x3fff) (bit-and (u16le b 28) 0x3fff)]
        "VP8L" (let [bits (bit-or (u24le b 21) (bit-shift-left (u8 b 24) 24))]
                 [(inc (bit-and bits 0x3fff)) (inc (bit-and (bit-shift-right bits 14) 0x3fff))])
        "VP8X" [(inc (u24le b 24)) (inc (u24le b 27))]
        nil)
      (and (> n 4) (= 0xFF (u8 b 0)) (= 0xD8 (u8 b 1))) (jpeg-dimensions b n)
      :else nil)))

(defn dimensions [file] (dimensions-of-bytes (fs/read-all-bytes file)))

;; --- planning (pure apart from reading the source), generating (effect), expanding (pure) ---

(def mime {:webp "image/webp" :avif "image/avif" :jpg "image/jpeg" :jpeg "image/jpeg" :png "image/png" :gif "image/gif"})

(defn plan
  "specs to {spec plan}. A plan has :dims, :variants [{:width :format :file :path}] and :fallback."
  [specs cache-dir]
  (into {}
        (for [spec specs
              :let [{:keys [src widths formats quality]} (merge defaults spec)
                    _ (when-not (fs/exists? src)
                        (throw (ex-info (str "Image not found: " src) {:bastro/error :image-not-found :src src})))
                    bs (fs/read-all-bytes src)
                    d (assets/digest bs)
                    [w0 h0 :as dims] (or (dimensions-of-bytes bs)
                                         (throw (ex-info (str "Cannot read the dimensions of " src) {:bastro/error :image-format :src src})))
                    orig (keyword (str/lower-case (fs/extension src)))
                    ws (let [ws (filter #(< % w0) widths)] (vec (concat ws [w0])))
                    stem (fs/strip-ext (fs/file-name src))
                    variant (fn [w f]
                              (let [name (str stem "-" w "-" d "." (name f))]
                                {:width w :format f :quality quality :src src
                                 :file (str (fs/path cache-dir name)) :path (str "/img/" name)}))]]
          [spec {:dims dims
                 :variants (vec (for [f (distinct (concat formats [orig])) w ws] (variant w f)))
                 :fallback orig}])))

(def ^:private sharp-format {:jpg "jpeg"})

(defn generate!
  "Runs sharp-cli for every variant file that does not exist yet."
  [plans]
  (doseq [{:keys [variants]} (vals plans)
          {:keys [src file width format quality]} variants
          :when (not (fs/exists? file))]
    (fs/create-dirs (fs/parent file))
    (shell "npx" "--yes" "sharp-cli" "-i" src "-o" file "-f" (get sharp-format format (name format)) "-q" (str quality) "resize" (str width))))

(defn- srcset [variants] (str/join ", " (map #(str (:path %) " " (:width %) "w") variants)))

(defn- picture [{:keys [alt sizes class loading formats] :as spec} {:keys [dims variants fallback]}]
  (let [{:keys [sizes loading]} (merge defaults spec)
        by-format (group-by :format variants)
        fallback-variants (get by-format fallback)]
    [:picture
     (for [f (remove #{fallback} (distinct (concat (or formats (:formats defaults)) [fallback])))
           :when (seq (get by-format f))]
       [:source {:type (mime f) :srcset (srcset (get by-format f)) :sizes sizes}])
     [:img (cond-> {:src (:path (last fallback-variants))
                    :srcset (srcset fallback-variants)
                    :sizes sizes
                    :width (first dims) :height (second dims)
                    :alt (or alt "")
                    :loading loading
                    :decoding "async"}
             class (assoc :class class))]]))

(defn expand "Replaces every placeholder with its picture element." [hiccup plans]
  (walk/postwalk #(if (placeholder? %) (picture (second %) (get plans (second %))) %) hiccup))

(defn write! "Copies every generated variant to out under /img/." [plans out]
  (doseq [{:keys [variants]} (vals plans) {:keys [file path]} variants]
    (let [dest (fs/path out (subs path 1))]
      (fs/create-dirs (fs/parent dest))
      (fs/copy file dest {:replace-existing true}))))
