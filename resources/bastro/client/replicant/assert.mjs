import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as console from './console_logger.mjs';
import * as replicant_DOT_console_logger from './console_logger.mjs';
import * as hiccup from './hiccup_headers.mjs';
import * as replicant_DOT_hiccup_headers from './hiccup_headers.mjs';
var current_context = cherry_core.atom.call(null, null);
var current_node = cherry_core.atom.call(null, null);
var error = cherry_core.atom.call(null, null);
var assert_QMARK_ = function () {
return null;

};
var add_reporter = function (k, f) {
cherry_core.remove_watch.call(null, error, cherry_core.keyword("replicant.assert/default"));
return cherry_core.add_watch.call(null, error, k, (function (_, __1, __2, error) {
if ((typeof requestAnimationFrame !== 'undefined')) {
return requestAnimationFrame((function () {
return f.call(null, error);

}))} else {
return f.call(null, error)};

}));

};
var remove_reporter = function (k) {
return cherry_core.remove_watch.call(null, error, k);

};

export { current_context, current_node, error, assert_QMARK_, add_reporter, remove_reporter }
