(ns bastro.hiccup
  "Pure helpers for treating hiccup as data."
  (:require [clojure.string :as str]))

(defn tag-name
  "Element name of a hiccup tag keyword, without id and class shorthand."
  [tag]
  (first (str/split (name tag) #"[.#]")))

(defn element? [x] (and (vector? x) (keyword? (first x))))
(defn attrs [el] (when (map? (second el)) (second el)))
(defn children [el] (vec (if (map? (second el)) (subvec el 2) (subvec el 1))))
(defn with-children [el kids] (into (if (map? (second el)) (subvec el 0 2) (subvec el 0 1)) kids))
(defn is? [el tag] (and (element? el) (= tag (tag-name (first el)))))
(defn find-child [el tag] (some #(when (is? % tag) %) (children el)))
(defn update-child [el tag f] (with-children el (map #(if (is? % tag) (f %) %) (children el))))
(defn append [el & kids] (with-children el (concat (children el) kids)))
(defn update-head [doc f] (update-child doc "head" f))
(defn update-body [doc f] (update-child doc "body" f))

(defn nodes
  "Every hiccup element in the tree, depth first. Attribute maps are not entered."
  [hiccup]
  (filter element? (tree-seq (some-fn vector? seq?) seq hiccup)))
