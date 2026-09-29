(ns example.counter
  "An island: three pure functions. The loader owns the store, the events and the DOM.
   babashka renders the fallback on the server with the same code cherry compiles for the browser.")

(defn init [props]
  {:count (:start props 0)})

(defn view [{:keys [count]} _props]
  [:div.counter
   [:button {:on {:click [[:counter/dec]]}} "−"]
   [:span.count count]
   [:button {:on {:click [[:counter/inc]]}} "+"]])

(defn step [state [action]]
  (case action
    :counter/inc (update state :count inc)
    :counter/dec (update state :count dec)
    state))
