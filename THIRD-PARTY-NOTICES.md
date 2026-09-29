# Third-party notices

bastro itself is MIT licensed, see `LICENSE`. The compiled client under `resources/bastro/` is
built from these projects and carries their code. Their license texts are in `licenses/`.

| project | what is included | license | copyright |
|---|---|---|---|
| [Replicant](https://github.com/cjohansen/replicant) | compiled modules under `resources/bastro/client/replicant/`, and inside `resources/bastro/dev.js` | MIT, `licenses/replicant-MIT.txt` | Christian Johansen |
| [cherry](https://github.com/squint-cljs/cherry) with ClojureScript's `cljs.core` | inside `resources/bastro/dev.js` | EPL 1.0, `licenses/EPL-1.0.txt` | Michiel Borkent, Rich Hickey and contributors |
| [transit-js](https://github.com/cognitect/transit-js) | inside `resources/bastro/dev.js` | Apache 2.0, `licenses/transit-js-Apache-2.0.txt` | Cognitect |

The sources of the EPL-licensed parts are available from the projects linked above. The files are
reproduced by running `bb client:build`.

Libraries that bastro only depends on, without shipping their code, are listed in `deps.edn` and
`package.json`.
