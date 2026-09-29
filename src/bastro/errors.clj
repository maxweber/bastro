(ns bastro.errors
  "Human and agent readable reporting of bastro's ex-infos.")

(defn format-error [e]
  (let [{:keys [errors]} (ex-data e)]
    (str (ex-message e) "\n"
         (apply str (for [{:keys [path errors collection]} (when (sequential? errors) errors)]
                      (str "  " path (when collection (str " (" (name collection) ")")) ": " (pr-str errors) "\n"))))))

(defn print! [e]
  (binding [*out* *err*] (println (format-error e))))
