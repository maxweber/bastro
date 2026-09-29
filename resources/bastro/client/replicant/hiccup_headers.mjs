import * as cherry_core from 'cherry-cljs/cljs.core.js';
var make_key = function (tag, k) {
return cherry_core.vector(tag, k);

};

export { make_key }
