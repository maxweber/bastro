(ns bastro.transit
  "Transit JSON in and out of strings. The wire format for island props and the dev channel."
  (:require [cognitect.transit :as t])
  (:import [java.io ByteArrayInputStream ByteArrayOutputStream]))

(defn write-str [x]
  (let [out (ByteArrayOutputStream.)]
    (t/write (t/writer out :json) x)
    (.toString out "UTF-8")))

(defn read-str [s]
  (t/read (t/reader (ByteArrayInputStream. (.getBytes ^String s "UTF-8")) :json)))
