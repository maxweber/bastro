(ns bastro.wire
  "What goes over the dev channel: a document split into html attributes, head children and body children."
  (:require [clojure.string :as str]
            [bastro.errors :as errors]
            [bastro.hiccup :as h]))

(defn page->wire [doc]
  {:html-attrs (h/attrs doc)
   :head (h/children (h/find-child doc "head"))
   :body (h/children (h/find-child doc "body"))})

(defn error->wire [e]
  {:message (ex-message e)
   :details (if (ex-data e)
              (errors/format-error e)
              (str/join "\n" (map str (.getStackTrace ^Throwable e))))})
