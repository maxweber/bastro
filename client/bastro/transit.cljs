(ns bastro.transit
  "transit-js values become ClojureScript data. Arrays become vectors, tagged lists become lists,
   so hiccup elements and runs of children keep their distinction."
  (:require ["transit-js$default" :as t]))

(def ^:private rdr (t/reader "json"))

(defn ->clj [x]
  (cond
    (t/isKeyword x) (keyword (.-_name x))
    (t/isSymbol x) (symbol (.-_name x))
    (t/isMap x) (let [m (atom {})]
                  (.forEach x (fn [v k] (swap! m assoc (->clj k) (->clj v))))
                  @m)
    (t/isSet x) (let [s (atom #{})]
                  (.forEach x (fn [v] (swap! s conj (->clj v))))
                  @s)
    (and (t/isTaggedValue x) (= "list" (.-tag x))) (apply list (map ->clj (.-rep x)))
    (array? x) (mapv ->clj x)
    :else x))

(defn read-str [s] (->clj (.read rdr s)))
