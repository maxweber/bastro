(ns bastro.watch
  "A polling file watcher. A snapshot of the tree is a pure function, a change is the diff of two
   snapshots, and one loop every few hundred milliseconds is the only effect. No native watcher,
   no inotify limits, the same behaviour on every OS."
  (:require [babashka.fs :as fs]))

(defn snapshot
  "{path last-modified} for every regular file under dirs."
  [dirs]
  (into {} (for [d dirs
                 :when (fs/exists? d)
                 f (fs/glob d "**")
                 :when (fs/regular-file? f)]
             [(str f) (fs/last-modified-time f)])))

(defn diff
  "Events between two snapshots: {:type :create|:write|:remove :path path}."
  [old new]
  (concat (for [[p t] new :let [o (get old p)] :when (not= o t)]
            {:type (if o :write :create) :path p})
          (for [[p _] old :when (not (contains? new p))]
            {:type :remove :path p})))

(defn watch!
  "Polls dirs every interval-ms and calls (on-change events) with each non-empty batch.
   Returns a function that stops the watcher."
  [dirs on-change {:keys [interval-ms] :or {interval-ms 250}}]
  (let [running (atom true)]
    (future
      (loop [prev (snapshot dirs)]
        (Thread/sleep interval-ms)
        (when @running
          (let [cur (snapshot dirs)
                events (diff prev cur)]
            (when (seq events)
              (try (on-change events)
                   (catch Exception e (println "bastro dev: watcher:" (ex-message e)))))
            (recur cur)))))
    (fn [] (reset! running false))))
