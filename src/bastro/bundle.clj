(ns bastro.bundle
  "The island bundle for a site: bastro's client modules plus the site's islands, compiled by
   cherry and bundled by esbuild into one file. Only built when the site uses islands."
  (:require [babashka.fs :as fs]
            [babashka.process :refer [shell]]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(defn client-modules-dir
  "Where bastro's precompiled client ES modules live on the classpath."
  []
  (let [url (io/resource "bastro/client/bastro/loader.mjs")]
    (when-not url
      (throw (ex-info "bastro's client modules are missing: run `bb client:build` in the bastro repo"
                      {:bastro/error :no-client})))
    (-> (.getPath url) fs/path fs/parent fs/parent)))

(defn path->ns [root path]
  (-> (str (fs/relativize root path))
      (str/replace #"\.clj[cs]$" "")
      (str/replace "/" ".")
      (str/replace "_" "-")
      symbol))

(defn island-namespaces
  "Every island namespace under dir, sorted."
  [dir]
  (if (fs/exists? dir)
    (mapv #(path->ns dir %) (sort (fs/glob dir "**.{cljc,cljs}")))
    []))

(defn entry-source
  "The generated entry namespace: requires every island and hands them to the loader."
  [island-nss]
  (str "(ns bastro.entry\n  (:require [\"./loader.mjs\" :as loader]"
       (apply str (map #(str "\n            [" % "]") island-nss))
       "))\n\n(loader/start!\n {"
       (str/join "\n  " (for [n island-nss]
                          (str "\"" n "\" {\"init\" " n "/init \"view\" " n "/view \"step\" " n "/step}")))
       "})\n"))

(defn build!
  "Compiles island-nss (symbols found under islands-dir) together with bastro's client into out-file.
   work-dir holds the intermediate modules. Returns out-file."
  [island-nss {:keys [islands-dir work-dir out-file minify?]
               :or {islands-dir "islands" work-dir "target/islands" minify? true}}]
  (let [work (fs/absolutize work-dir)
        client (fs/path work "client")
        gen (fs/path work "gen")]
    (fs/delete-tree work)
    (fs/create-dirs (fs/path gen "bastro"))
    (fs/copy-tree (client-modules-dir) client)
    (spit (str (fs/path gen "bastro" "entry.cljs")) (entry-source island-nss))
    (spit (str (fs/path work "cherry.edn"))
          (pr-str {:paths [(str (fs/absolutize islands-dir)) (str gen)] :output-dir (str client)}))
    (shell {:dir (str work)} "npx cherry compile")
    (fs/create-dirs (fs/parent (fs/absolutize out-file)))
    (apply shell (remove nil? ["npx" "esbuild" (str (fs/path client "bastro" "entry.mjs"))
                               "--bundle" "--format=esm" "--log-level=warning"
                               (when minify? "--minify")
                               (str "--outfile=" out-file)]))
    (str out-file)))
