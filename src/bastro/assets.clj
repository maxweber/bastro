(ns bastro.assets
  "Built assets as data. The public directory is copied verbatim, as in Astro. Assets bastro
   builds itself (stylesheets, the island bundle, images) get content-hashed names, and pages
   look them up through the db so hiccup never carries a hash."
  (:require [babashka.fs :as fs]
            [babashka.process :refer [shell]]))

(defn asset
  "The URL to use for an asset path: its fingerprinted path when the db knows it, else the path."
  [db path]
  (get-in db [:bastro/assets path :path] path))

(defn digest
  "Eight hex characters of the SHA-1 of the bytes."
  [^bytes bs]
  (let [md (java.security.MessageDigest/getInstance "SHA-1")]
    (subs (apply str (map #(format "%02x" (bit-and % 0xff)) (.digest md bs))) 0 8)))

(defn fingerprint-path
  "/css/site.css with digest abc12345 becomes /css/site-abc12345.css."
  [path d]
  (let [ext (fs/extension path)]
    (if (seq ext)
      (str (subs path 0 (- (count path) (count ext) 1)) "-" d "." ext)
      (str path "-" d))))

(defn entry
  "An asset map entry for a built file that will be served at url."
  [url file]
  {url {:file (str file) :path (fingerprint-path url (digest (fs/read-all-bytes file)))}})

(defn copy-public! [public out]
  (when (fs/exists? public)
    (fs/copy-tree public out {:replace-existing true})))

(defn build-css!
  "css: {\"/css/site.css\" \"styles/site.css\"}, output url to source file. Each source is bundled
   and minified by esbuild into work-dir. Returns asset map entries."
  [css work-dir]
  (into {} (for [[url src] css]
             (let [built (fs/path work-dir (subs url 1))]
               (fs/create-dirs (fs/parent built))
               (shell "npx" "esbuild" src "--bundle" "--minify" "--log-level=warning" (str "--outfile=" built))
               (entry url built)))))

(defn write!
  "Copies every built asset to out under its fingerprinted path."
  [assets out]
  (doseq [[_ {:keys [file path]}] assets]
    (let [dest (fs/path out (subs path 1))]
      (fs/create-dirs (fs/parent dest))
      (fs/copy file dest {:replace-existing true}))))
