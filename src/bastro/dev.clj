(ns bastro.dev
  "The dev server. One atom holds the content database, the built dev assets, the last error and
   the open connections. A file change swaps in a new database, and every open page is re-derived
   from it and pushed as hiccup over a WebSocket."
  (:require [babashka.fs :as fs]
            [clojure.java.io :as io]
            [clojure.string :as str]
            [org.httpkit.server :as http]
            [bastro.assets :as assets]
            [bastro.build :as build]
            [bastro.bundle :as bundle]
            [bastro.errors :as errors]
            [bastro.hiccup :as h]
            [bastro.images :as images]
            [bastro.pages :as pages]
            [bastro.render :as render]
            [bastro.transit :as transit]
            [bastro.watch :as watch]
            [bastro.wire :as wire]))

(defonce !state (atom nil))

(def dev-script [:script {:type "module" :src "/__bastro/dev.js"}])
(def work-dir "target/dev")
(def image-cache "target/dev/images")

(def mime
  {"css" "text/css" "js" "text/javascript" "mjs" "text/javascript" "html" "text/html"
   "json" "application/json" "svg" "image/svg+xml" "png" "image/png" "jpg" "image/jpeg"
   "jpeg" "image/jpeg" "gif" "image/gif" "webp" "image/webp" "avif" "image/avif"
   "ico" "image/x-icon" "woff" "font/woff" "woff2" "font/woff2" "txt" "text/plain"
   "xml" "application/xml" "map" "application/json"})

(defn- config [] (get-in @!state [:site :config]))
(defn- cfg [k default] (get (config) k default))

;; --- deriving documents ------------------------------------------------------------

(defn- site-pages [state]
  (when-let [db (:db state)]
    ((get-in state [:site :pages-fn]) db)))

(defn dev-doc
  "The document for a uri with images generated and the dev client added, or nil for no page."
  [state uri]
  (when-let [page (get (site-pages state) uri)]
    (let [doc (build/page-doc page (:db state))
          plans (images/plan (images/placeholders doc) image-cache)]
      (images/generate! plans)
      (-> doc
          (images/expand plans)
          (build/with-island-script "/js/islands.js")
          (h/update-head #(h/append % dev-script))))))

(defn- shell-doc [title & body]
  [:html {:lang "en"}
   [:head [:meta {:charset "utf-8"}] [:title title] dev-script]
   (into [:body {:style {:font-family "monospace" :padding "2rem" :white-space "pre-wrap"}}] body)])

(defn- error-doc [e]
  (let [{:keys [message details]} (wire/error->wire e)]
    (shell-doc "bastro: build error" [:h1 "bastro: build error"] [:pre message] [:pre details])))

(defn- not-found-doc [state uri]
  (shell-doc "bastro: no page"
             [:h1 "No page at " uri]
             [:p "The site defines these routes:"]
             [:ul (for [u (pages/routes (site-pages state))] [:li [:a {:href u} u]])]))

;; --- the one atom, and what refreshes parts of it ----------------------------------

(defn- fail! [e] (swap! !state assoc :error e) (errors/print! e))

(defn- reload-db! []
  (let [result (try {:db (build/make-db (config) (:assets @!state)) :error nil}
                    (catch Exception e {:error e}))]
    (swap! !state merge result)
    (when-let [e (:error result)] (errors/print! e))))

(defn- reload-code! [path]
  (try
    (load-file (str path))
    (require (:site-sym @!state) :reload)
    (swap! !state assoc :error nil)
    (catch Exception e (fail! e))))

(defn- rebuild-css! []
  (try
    (let [built (assets/build-css! (cfg :css {}) (fs/path work-dir "css"))]
      (swap! !state assoc :assets (into {} (for [[url e] built] [url (assoc e :path url)]))))
    (catch Exception e (fail! e))))

(defn- rebuild-islands! []
  (let [dir (cfg :islands "islands")
        nss (bundle/island-namespaces dir)]
    (when (seq nss)
      (try
        (bundle/build! nss {:islands-dir dir
                            :work-dir (str (fs/path work-dir "islands"))
                            :out-file (str (fs/path work-dir "islands.js"))
                            :minify? false})
        (println "bastro dev: islands bundle rebuilt:" (str/join ", " nss))
        (catch Exception e (fail! e))))))

;; --- pushing to open pages ---------------------------------------------------------

(defn- send-event! [ch event data]
  (http/send! ch (transit/write-str {:event event :data data})))

(defn- push! [ch uri state]
  (if-let [e (:error state)]
    (send-event! ch :build-error (wire/error->wire e))
    (let [result (try (if-let [doc (dev-doc state uri)] {:doc doc} {:missing true})
                      (catch Exception e {:error e}))]
      (cond
        (:error result) (send-event! ch :build-error (wire/error->wire (:error result)))
        (:doc result) (send-event! ch :page (wire/page->wire (:doc result)))
        :else (send-event! ch :reload {})))))

(defn- broadcast! []
  (let [state @!state]
    (doseq [[ch uri] (:clients state)]
      (try (push! ch uri state)
           (catch Exception e (println "bastro dev: push failed:" (ex-message e)))))))

(defn- reload-all! []
  (doseq [[ch _] (:clients @!state)] (send-event! ch :reload {})))

(defn- under? [dir p]
  (str/starts-with? (str (fs/normalize (fs/absolutize p)))
                    (str (fs/normalize (fs/absolutize dir)) "/")))

(defn- classify [p]
  (cond
    (under? (cfg :islands "islands") p) :island
    (re-find #"\.(clj|cljc)$" p) :code
    (re-find #"\.(md|markdown|edn)$" p) :content
    (re-find #"\.css$" p) :css
    (under? (cfg :public "public") p) :public
    :else nil))

(defn- on-change!
  "One batch of file events: reload what the batch touched, then push once."
  [events]
  (let [paths (map (comp str :path) events)
        kinds (set (keep classify paths))]
    (doseq [p paths :when (and (#{:island :code} (classify p)) (fs/exists? p))]
      (reload-code! p))
    (when (:island kinds) (rebuild-islands!))
    (when (:css kinds) (rebuild-css!))
    (when (some kinds [:code :content :island]) (reload-db!))
    (if (some kinds [:island :css :public])
      (reload-all!)
      (when (some kinds [:code :content]) (broadcast!)))))

;; --- http ----------------------------------------------------------------------------

(defn- response [status type body]
  {:status status :headers {"Content-Type" type "Cache-Control" "no-cache"} :body body})

(defn- html [status doc] (response status "text/html; charset=utf-8" (render/html doc)))

(defn- file-response [f]
  (response 200 (get mime (fs/extension f) "application/octet-stream") (fs/file f)))

(defn- query-param [req name]
  (some-> (:query-string req)
          (->> (re-find (re-pattern (str "(?:^|&)" name "=([^&]*)"))))
          second
          (java.net.URLDecoder/decode "UTF-8")))

(defn- events
  "The dev channel: a WebSocket per open page, registered under the page's uri."
  [req]
  (let [uri (or (query-param req "uri") "/")]
    (http/as-channel req
      {:on-open (fn [ch] (swap! !state assoc-in [:clients ch] uri))
       :on-close (fn [ch _] (swap! !state update :clients dissoc ch))})))

(defn- safe-file [root uri]
  (let [root (fs/normalize (fs/absolutize root))
        f (fs/normalize (fs/path root (subs uri 1)))]
    (when (and (str/starts-with? (str f) (str root "/")) (fs/regular-file? f)) f)))

(defn- page-response [state uri]
  (let [result (try (if-let [doc (dev-doc state uri)] {:doc doc} {})
                    (catch Exception e {:error e}))]
    (cond
      (:error result) (html 500 (error-doc (:error result)))
      (:doc result) (html 200 (:doc result))
      (and (not (str/ends-with? uri "/")) (get (site-pages state) (str uri "/")))
      {:status 302 :headers {"Location" (str uri "/")}}
      :else (html 404 (not-found-doc state uri)))))

(defn- handle [req]
  (let [uri (:uri req)
        state @!state
        public (get-in state [:site :config :public] "public")]
    (cond
      (= uri "/__bastro/events") (events req)
      (= uri "/__bastro/dev.js") (response 200 "text/javascript" (slurp (io/resource "bastro/dev.js")))
      (= uri "/js/islands.js") (if-let [f (safe-file work-dir "/islands.js")]
                                 (file-response f)
                                 (response 404 "text/plain" "no islands bundle"))
      (get-in state [:assets uri]) (file-response (get-in state [:assets uri :file]))
      (str/starts-with? uri "/img/") (if-let [f (safe-file image-cache (subs uri 4))]
                                       (file-response f)
                                       (if-let [f (safe-file public uri)] (file-response f) (response 404 "text/plain" "no such image")))
      :else
      (if-let [f (safe-file public uri)]
        (file-response f)
        (if-let [e (:error state)]
          (html 500 (error-doc e))
          (page-response state uri))))))

(defn handler
  "Serves the request and logs one line per response, so a slow or stuck request is visible."
  [req]
  (let [t0 (System/currentTimeMillis)
        res (handle req)]
    (when-not (= "/__bastro/events" (:uri req))
      (println (str "bastro dev: " (name (:request-method req :get)) " " (:uri req) " " (:status res "…") " " (- (System/currentTimeMillis) t0) " ms")))
    res))

;; --- lifecycle -----------------------------------------------------------------------

(defn- step! [label f]
  (print (str "bastro dev: " label " ... ")) (flush)
  (let [t0 (System/currentTimeMillis) r (f)]
    (println (str (- (System/currentTimeMillis) t0) " ms")) (flush)
    r))

(defn stop! []
  (when-let [s @!state]
    (when-let [stop (:watcher s)] (stop))
    (when-let [stop (:server s)] (stop))
    (reset! !state nil)))

(defn start!
  "Starts watching and serving the site namespace. Blocks unless :block? is false."
  ([site-sym] (start! site-sym {}))
  ([site-sym {:keys [port block?] :or {port 8321 block? true}}]
   (let [site (build/load-site site-sym)
         config (:config site)
         dirs (->> (concat (map :dir (vals (:collections config)))
                           (map #(str (fs/parent %)) (vals (:css config {})))
                           ["src" (:islands config "islands") (:public config "public")])
                   distinct (filter fs/exists?))]
     (reset! !state {:site-sym site-sym :site site :clients {} :assets {}})
     (step! "stylesheets" rebuild-css!)
     (step! "content" reload-db!)
     (step! "islands" rebuild-islands!)
     (swap! !state assoc :server (step! (str "http-kit on port " port) #(http/run-server #'handler {:port port})))
     (swap! !state assoc :watcher (step! (str "watching " (str/join ", " dirs)) #(watch/watch! dirs on-change! {})))
     (println (str "bastro dev: ready at http://localhost:" port "/"))
     (flush)
     (when block? @(promise))
     @!state)))
