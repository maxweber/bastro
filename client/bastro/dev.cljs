(ns bastro.dev
  "The dev client: pages arrive over server-sent events as hiccup and are diffed into the live document."
  (:require [replicant.dom :as r]
            [bastro.transit :as transit]))

(defn- set-attrs! [el attrs]
  (doseq [[k v] attrs] (.setAttribute el (name k) (str v))))

(defn apply-page! [{:keys [html-attrs head body]}]
  (set-attrs! (.-documentElement js/document) html-attrs)
  (r/render (.-head js/document) (seq head))
  (r/render (.-body js/document) (seq body))
  (.dispatchEvent js/document (js/CustomEvent. "bastro:rendered")))

(defn show-error! [{:keys [message details]}]
  (r/render (.-body js/document)
            [:main {:style {:font-family "monospace" :padding "2rem" :white-space "pre-wrap"}}
             [:h1 "bastro: build error"]
             [:pre message]
             [:pre details]]))

(defn- handle-message! [{:keys [event data]}]
  (case event
    :page (apply-page! data)
    :build-error (show-error! data)
    :reload (.reload js/location)
    nil))

(defn connect!
  "One WebSocket per page. Every tab gets its own without touching the browser's small
   per-host limit on HTTP connections, and a dropped connection is retried every second."
  []
  (let [proto (if (= "https:" (.-protocol js/location)) "wss:" "ws:")
        url (str proto "//" (.-host js/location) "/__bastro/events?uri=" (js/encodeURIComponent (.-pathname js/location)))
        ws (js/WebSocket. url)]
    (set! (.-onopen ws) (fn [_] (js/console.log "bastro dev: live")))
    (set! (.-onmessage ws) (fn [e] (handle-message! (transit/read-str (.-data e)))))
    (set! (.-onclose ws) (fn [_] (js/setTimeout connect! 1000)))))

(when (js/document.querySelector "script[src='/__bastro/dev.js']") (connect!))
