(ns build-client
  "Compiles bastro's client with cherry, keeps the ES modules under resources/bastro/client
   for sites to bundle with their islands, and bundles the dev client on its own."
  (:require [babashka.fs :as fs]
            [babashka.process :refer [shell]]))

(fs/delete-tree "target/client")
(shell "npx cherry compile")
(fs/delete-tree "resources/bastro/client")
(fs/create-dirs "resources/bastro/client")
(doseq [d ["bastro" "replicant"]]
  (fs/copy-tree (fs/path "target/client" d) (fs/path "resources/bastro/client" d)))
(fs/delete-if-exists "resources/bastro/client/bastro/dev.mjs")
(shell "npx esbuild target/client/bastro/dev.mjs --bundle --minify --format=esm --outfile=resources/bastro/dev.js")
(println "client: dev.js" (fs/size "resources/bastro/dev.js") "bytes;"
         (count (fs/glob "resources/bastro/client" "**.mjs")) "modules for sites")
