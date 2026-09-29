(ns bastro.loader
  "The islands runtime. Every side effect of an island lives here: the one store per page,
   dispatch, the client directives, and rendering. Islands are pure init, view and step functions."
  (:require [replicant.dom :as r]
            [bastro.transit :as transit]))

(defonce db (atom {:islands {} :state {}}))
(defonce registry (atom {}))
(defonce counter (atom 0))

(defn state "The whole store, for inspection." [] @db)

(defn- island-id! [el]
  (or (.-bastroIsland el)
      (let [id (str "island-" (swap! counter inc))]
        (set! (.-bastroIsland el) id)
        id)))

(defn- render-island! [{:keys [el view props]} s]
  (r/render el (view s props)))

(add-watch db ::render
  (fn [_ _ old new]
    (doseq [[id island] (:islands new)]
      (let [s (get-in new [:state id])]
        (when (or (not (contains? (:islands old) id))
                  (not= s (get-in old [:state id])))
          (render-island! island s))))))

(defn- dispatch [rd actions]
  (when-let [el (some-> (:replicant/node rd) (.closest "[data-island]"))]
    (let [id (.-bastroIsland el)]
      (when-let [step (get-in @db [:islands id :step])]
        (swap! db update-in [:state id] (fn [s] (reduce step s actions)))))))

(defn- when-ready [el f]
  (let [ds (.-dataset el)
        client (.-client ds)]
    (cond
      (= client "idle")
      (if (.-requestIdleCallback js/window) (js/requestIdleCallback f) (js/setTimeout f 1))

      (= client "visible")
      (let [obs (js/IntersectionObserver.
                 (fn [entries o]
                   (when (some (fn [e] (.-isIntersecting e)) (array-seq entries))
                     (.disconnect o)
                     (f))))]
        (.observe obs el))

      (= client "media")
      (let [mq (js/matchMedia (.-media ds))]
        (if (.-matches mq)
          (f)
          (let [handler (fn handler [e]
                          (when (.-matches e)
                            (.removeEventListener mq "change" handler)
                            (f)))]
            (.addEventListener mq "change" handler))))

      :else (f))))

(defn mount! [el]
  (let [ns-name (.-island (.-dataset el))]
    (if-let [island (get @registry ns-name)]
      (let [props (transit/read-str (.-props (.-dataset el)))
            id (island-id! el)
            init (get island "init")]
        (swap! db (fn [d]
                    (-> d
                        (assoc-in [:islands id] {:el el :view (get island "view") :step (get island "step") :props props})
                        (assoc-in [:state id] (init props))))))
      (js/console.warn "bastro: no island registered for" ns-name))))

(defn- prune! []
  (swap! db (fn [d]
              (let [gone (for [[id {:keys [el]}] (:islands d) :when (not (.-isConnected el))] id)]
                (-> d
                    (update :islands (fn [m] (apply dissoc m gone)))
                    (update :state (fn [m] (apply dissoc m gone))))))))

(defn scan! "Mounts every island container not seen before." []
  (prune!)
  (doseq [el (array-seq (js/document.querySelectorAll "[data-island]"))]
    (when-not (.-bastroSeen el)
      (set! (.-bastroSeen el) true)
      (when-ready el (fn [] (mount! el))))))

(defn start!
  "islands: {\"island.ns\" {\"init\" f \"view\" f \"step\" f}}, a ClojureScript map or a JS object."
  [islands]
  (swap! registry merge (if (map? islands) islands (js->clj islands)))
  (r/set-dispatch! dispatch)
  (if (= "loading" (.-readyState js/document))
    (.addEventListener js/document "DOMContentLoaded" (fn [_] (scan!)))
    (scan!))
  (.addEventListener js/document "bastro:rendered" (fn [_] (scan!))))
