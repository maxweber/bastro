# bastro example site

A blog with tags, a hero image, a stylesheet and one island. It doubles as bastro's integration test.

```
bb routes   # every URL, without building
bb build    # dist/
bb dev      # http://localhost:8321/ with live reload
```

Node tools come from the parent repo's `node_modules`; a standalone site would list
`cherry-cljs`, `esbuild`, `transit-js` and `sharp-cli` in its own `package.json`.
