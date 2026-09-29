(ns bastro.islands
  "Server side of the island contract: placeholder nodes, their expansion, and the per-page manifest."
  (:require [clojure.walk :as walk]
            [bastro.hiccup :as h]
            [bastro.transit :as transit]))

(defn island
  "A placeholder expanded at build time. ns is the island namespace symbol, whose
   init, view and step functions are pure. opts: :client one of :load :idle :visible :only
   or [:media \"(query)\"], default :load; :tag (default :div); :class."
  ([ns props] (island ns props {}))
  ([ns props opts] [:bastro/island (merge {:ns ns :props props :client :load :tag :div} opts)]))

(defn- placeholder? [x] (and (vector? x) (= :bastro/island (first x))))

(defn- resolve-fn [ns fname]
  (or (try (requiring-resolve (symbol (str ns) fname)) (catch Exception _ nil))
      (throw (ex-info (str "Island " ns " has no " fname " function")
                      {:bastro/error :island-not-found :ns ns :fn fname}))))

(defn fallback
  "Server-rendered hiccup for an island: (view (init props) props)."
  [ns props]
  (let [init (resolve-fn ns "init")
        view (resolve-fn ns "view")]
    (view (init props) props)))

(defn- client-attrs [client]
  (if (vector? client)
    {:data-client (name (first client)) :data-media (second client)}
    {:data-client (name client)}))

(defn expand-node [{:keys [ns props client tag class]}]
  (let [fb (when (not= client :only) (fallback ns props))]
    [tag (merge {:data-island (str ns)
                 :data-props (transit/write-str props)
                 :replicant/key (str ns "/" (hash [props fb]))}
                (client-attrs client)
                (when class {:class class}))
     fb]))

(defn expand "Replaces every placeholder with its container and server fallback." [hiccup]
  (walk/postwalk #(if (placeholder? %) (expand-node (second %)) %) hiccup))

(defn manifest "Sorted island namespaces (symbols) present in expanded hiccup." [hiccup]
  (->> (h/nodes hiccup) (keep #(some-> (h/attrs %) :data-island symbol)) distinct sort vec))
