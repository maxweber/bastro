(ns bastro.build
  "The build. Everything between reading the content and writing the files is a pure function.
   The exceptions are the tool invocations at the edges: esbuild for stylesheets, cherry and
   esbuild for the island bundle, sharp for images."
  (:require [babashka.fs :as fs]
            [clojure.string :as str]
            [stasis.core :as stasis]
            [bastro.assets :as assets]
            [bastro.bundle :as bundle]
            [bastro.content :as content]
            [bastro.hiccup :as h]
            [bastro.images :as images]
            [bastro.islands :as islands]
            [bastro.links :as links]
            [bastro.pages :as pages]
            [bastro.render :as render]))

(defn load-site
  "Requires the site namespace and returns its config map and pages function."
  [site-sym]
  (require site-sym)
  (let [config (some-> (ns-resolve site-sym 'config) deref)
        pages-fn (ns-resolve site-sym 'pages)]
    (when-not (map? config)
      (throw (ex-info (str "Namespace " site-sym " must define a config map") {:bastro/error :no-config})))
    (when-not pages-fn
      (throw (ex-info (str "Namespace " site-sym " must define a pages function") {:bastro/error :no-pages})))
    {:config config :pages-fn pages-fn}))

(defn make-db
  "The content database: one key per collection, plus :bastro/config and :bastro/assets."
  [config assets]
  (assoc (content/load-content (:collections config))
         :bastro/config config
         :bastro/assets assets))

;; --- pure steps ------------------------------------------------------------------------

(defn page-doc
  "A page value becomes document hiccup with its islands expanded. A page that resolves to a
   string is not a document: it is kept as it is and written verbatim."
  [page db]
  (let [doc (pages/resolve-page page db)]
    (if (string? doc) doc (islands/expand doc))))

(defn with-island-script
  "Adds the island bundle script to a document that has islands."
  [doc src]
  (if (seq (islands/manifest doc))
    (h/update-head doc #(h/append % [:script {:type "module" :src src}]))
    doc))

(defn site-docs [pages db]
  (into {} (map (fn [[url page]] [url (page-doc page db)])) pages))

(defn all-islands [docs]
  (->> (vals docs) (mapcat islands/manifest) distinct sort vec))

(defn all-images [docs]
  (distinct (mapcat images/placeholders (vals docs))))

(defn finish-docs
  "Images expanded from their plans, island script added where needed. String pages pass through."
  [docs plans islands-src]
  (update-vals docs #(if (string? %) % (-> % (images/expand plans) (with-island-script islands-src)))))

(defn render-docs
  "Documents become HTML strings. String pages are already their own output."
  [docs]
  (update-vals docs #(if (string? %) % (render/html %))))

(defn render-site
  "Page map to {url html} with no built assets: what the tests and the routes task need."
  [pages db]
  (render-docs (finish-docs (site-docs pages db) {} "/js/islands.js")))

;; --- the build --------------------------------------------------------------------------

(defn- public-paths
  "The URL of every file under public."
  [public]
  (if (fs/exists? public)
    (into #{}
          (comp (filter fs/regular-file?)
                (map #(str "/" (str/join "/" (map str (fs/relativize public %))))))
          (fs/glob public "**" {:hidden true}))
    #{}))

(defn check-links!
  "Throws when a finished document points at a root-relative path the output will not hold.
   config may name paths that something else serves under :served-elsewhere?."
  [docs {:keys [public served-elsewhere?] :or {public "public" served-elsewhere? (constantly false)}} assets plans]
  (let [known? (some-fn (links/output-paths (keys docs))
                        (links/output-paths (public-paths public))
                        (into #{} (map :path) (vals assets))
                        (into #{} (comp (mapcat :variants) (map :path)) (vals plans))
                        served-elsewhere?)
        broken (links/broken docs known?)]
    (when (seq broken)
      (throw (ex-info (str (count broken) " broken internal link(s)")
                      {:bastro/error :broken-links :errors (links/describe broken known?)})))))

(defn- guard-out-dir! [out]
  (let [abs (fs/normalize (fs/absolutize out)) cwd (fs/normalize (fs/absolutize "."))]
    (when-not (and (fs/starts-with? abs cwd) (not= (str abs) (str cwd)))
      (throw (ex-info (str "Refusing to empty " abs ": the output dir must be inside the site")
                      {:bastro/error :unsafe-out})))))

(defn build!
  "Builds the site namespace into its output dir. Returns the rendered page map."
  [site-sym]
  (let [{:keys [config pages-fn]} (load-site site-sym)
        {:keys [out public islands css] :or {out "dist" public "public" islands "islands" css {}}} config
        work "target/build"
        image-cache "target/images"]
    (guard-out-dir! out)
    (fs/delete-tree work)
    (let [css-assets (assets/build-css! css (fs/path work "css"))
          db (make-db config css-assets)
          docs (site-docs (pages-fn db) db)
          island-nss (all-islands docs)
          js-assets (when (seq island-nss)
                      (assets/entry "/js/islands.js"
                                    (bundle/build! island-nss {:islands-dir islands
                                                               :work-dir (str (fs/path work "islands"))
                                                               :out-file (str (fs/path work "js" "islands.js"))})))
          all-assets (merge css-assets js-assets)
          plans (images/plan (all-images docs) image-cache)
          _ (images/generate! plans)
          finished (finish-docs docs plans (assets/asset {:bastro/assets all-assets} "/js/islands.js"))
          _ (check-links! finished config all-assets plans)
          html (render-docs finished)]
      (stasis/empty-directory! out)
      (assets/copy-public! public out)
      (assets/write! all-assets out)
      (images/write! plans out)
      (stasis/export-pages html out)
      (println (format "bastro: %d pages, %d island(s), %d image(s), %d stylesheet(s) -> %s"
                       (count html) (count island-nss) (count plans) (count css-assets) out))
      html)))

(defn print-routes! [site-sym]
  (let [{:keys [config pages-fn]} (load-site site-sym)
        db (make-db config {})]
    (doseq [url (pages/routes (pages-fn db))] (println url))))
