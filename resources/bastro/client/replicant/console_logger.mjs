import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as walk from 'cherry-cljs/lib/clojure.walk.js';
import * as clojure_DOT_walk from 'cherry-cljs/lib/clojure.walk.js';
var log = function (x) {
return console.log(x);

};
var print_heading = function (x) {
return console.group(x);

};
var close_group = function () {
return console.groupEnd();

};
var pprstr = function (x) {
return cherry_core.pr_str.call(null, x);

};
var scrub_sexp = function (sexp) {
return walk.prewalk.call(null, (function (x) {
if (cherry_core.truth_.call(null, cherry_core.map_QMARK_.call(null, x))) {
return cherry_core.into.call(null, cherry_core.array_map(), cherry_core.remove.call(null, (function (_PERCENT_1) {
return cherry_core.keyword("replicant/internal").call(null, cherry_core.meta.call(null, cherry_core.val.call(null, _PERCENT_1)));

}), x))} else {
return x};

}), sexp);

};
var abbreviate_sexp = function (hiccup) {
const scrubbed_1 = scrub_sexp.call(null, hiccup);
const len_2 = cherry_core.count.call(null, cherry_core.pr_str.call(null, scrubbed_1));
if ((len_2 < 100)) {
return scrubbed_1} else {
return cherry_core.conj.call(null, cherry_core.vec.call(null, cherry_core.take.call(null, 2, scrubbed_1)), cherry_core.symbol.call(null, "..."))};

};
var report = function (p__5076) {
const map__5077_1 = p__5076;
const map__5077_2 = cherry_core.__destructure_map.call(null, map__5077_1);
const title_3 = cherry_core.get.call(null, map__5077_2, cherry_core.keyword("title"));
const message_4 = cherry_core.get.call(null, map__5077_2, cherry_core.keyword("message"));
const hiccup_5 = cherry_core.get.call(null, map__5077_2, cherry_core.keyword("hiccup"));
const fname_6 = cherry_core.get.call(null, map__5077_2, cherry_core.keyword("fname"));
const alias_7 = cherry_core.get.call(null, map__5077_2, cherry_core.keyword("alias"));
const data_8 = cherry_core.get.call(null, map__5077_2, cherry_core.keyword("data"));
print_heading.call(null, `${"Replicant warning: "}${title_3??''}`);
log.call(null, message_4);
if (cherry_core.truth_.call(null, fname_6)) {
log.call(null, `${"Function: "}${fname_6??''}`)};
if (cherry_core.truth_.call(null, alias_7)) {
log.call(null, `${"Alias: "}${alias_7??''}`)};
if (cherry_core.truth_.call(null, data_8)) {
const formatted_9 = pprstr.call(null, data_8);
if ((cherry_core.count.call(null, formatted_9) < 80)) {
log.call(null, `${"Input data: "}${formatted_9??''}`)} else {
log.call(null, "Input data:");
log.call(null, formatted_9)}};
log.call(null, "Offending hiccup: ");
log.call(null, pprstr.call(null, abbreviate_sexp.call(null, hiccup_5)));
return close_group.call(null);

};

export { log, print_heading, close_group, pprstr, scrub_sexp, abbreviate_sexp, report }
