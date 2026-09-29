(ns test-island.counter
  "An island used by the tests: three pure functions, no DOM.")

(defn init [props] {:count (:start props 0)})

(defn view [state _props]
  [:div.counter [:button {:on {:click [[:inc]]}} "+"] [:span (:count state)]])

(defn step [state action]
  (case (first action)
    :inc (update state :count inc)
    state))
