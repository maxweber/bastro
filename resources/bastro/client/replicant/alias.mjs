import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as walk from 'cherry-cljs/lib/clojure.walk.js';
import * as clojure_DOT_walk from 'cherry-cljs/lib/clojure.walk.js';
import * as assert from './assert.mjs';
import * as replicant_DOT_assert from './assert.mjs';
import * as r from './core.mjs';
import * as replicant_DOT_core from './core.mjs';
import * as h from './hiccup.mjs';
import * as replicant_DOT_hiccup from './hiccup.mjs';
import * as hiccup from './hiccup_headers.mjs';
import * as replicant_DOT_hiccup_headers from './hiccup_headers.mjs';
var aliases = cherry_core.atom.call(null, cherry_core.array_map());
var register_BANG_ = function (k, f) {
return cherry_core.swap_BANG_.call(null, aliases, cherry_core.assoc, k, f);

};
var get_registered_aliases = function () {
return cherry_core.deref.call(null, aliases);

};
var __GT_hiccup = function (headers) {
if (cherry_core.truth_.call(null, headers)) {
const or__23992__auto___1 = headers[8];
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
return cherry_core.into.call(null, cherry_core.vector(cherry_core.keyword.call(null, headers[0]), (() => {
const attrs_2 = r.get_attrs.call(null, headers);
const G__2530_3 = headers[4];
const G__2530_4 = ((cherry_core.truth_.call(null, cherry_core.keyword("id").call(null, attrs_2))) ? (cherry_core.assoc.call(null, G__2530_3, cherry_core.keyword("id"), cherry_core.keyword("id").call(null, attrs_2))) : (G__2530_3));
if (cherry_core.truth_.call(null, cherry_core.keyword("classes").call(null, attrs_2))) {
return cherry_core.assoc.call(null, G__2530_4, cherry_core.keyword("class"), cherry_core.set.call(null, cherry_core.keyword("classes").call(null, attrs_2)))} else {
return G__2530_4};

})()), r.flatten_seqs.call(null, headers[5]))};
};

};
var alias_hiccup_QMARK_ = function (x) {
const and__24022__auto___1 = h.hiccup_QMARK_.call(null, x);
if (cherry_core.truth_.call(null, and__24022__auto___1)) {
return cherry_core.qualified_keyword_QMARK_.call(null, cherry_core.first.call(null, x))} else {
return and__24022__auto___1};

};
var expand_aliased_hiccup = function (x, opt) {
if (cherry_core.truth_.call(null, alias_hiccup_QMARK_.call(null, x))) {
const headers_1 = r.get_hiccup_headers.call(null, null, x);
const defined_QMARK__2 = cherry_core.get.call(null, cherry_core.keyword("aliases").call(null, opt), headers_1[0]);
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___3 = cherry_core.not.call(null, defined_QMARK__2);
if (cherry_core.truth_.call(null, and__24022__auto___3)) {
return cherry_core.false_QMARK_.call(null, cherry_core.get.call(null, opt, cherry_core.keyword("ignore-missing-alias?"), true))} else {
return and__24022__auto___3};

})())) {
throw cherry_core.ex_info.call(null, `${"Tried to expand undefined alias "}${headers_1[0]??''}`, cherry_core.array_map(cherry_core.keyword("alias"), headers_1[0]))};
const G__2811_4 = headers_1;
const G__2811_5 = ((cherry_core.truth_.call(null, cherry_core.get.call(null, cherry_core.keyword("aliases").call(null, opt), headers_1[0]))) ? (r.get_alias_headers.call(null, opt, G__2811_4)) : (G__2811_4));
if (cherry_core.truth_.call(null, cherry_core.keyword("then"))) {
return __GT_hiccup.call(null, G__2811_5)} else {
return G__2811_5};
} else {
return x};

};
var get_opts = function (opt) {
return cherry_core.update.call(null, opt, cherry_core.keyword("aliases"), (function (_PERCENT_1) {
const or__23992__auto___1 = _PERCENT_1;
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
return get_registered_aliases.call(null)};

}));

};
var expand_1 = (() => {
const f2937 = (function (var_args) {
const args2938_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i2939_3 = 0;
while(true){
if ((i2939_3 < len__22792__auto___2)) {
args2938_1.push((arguments[i2939_3]));
let G__4 = (i2939_3 + 1);
i2939_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((1 < args2938_1.length)) ? ((new cherry_core.IndexedSeq(args2938_1.slice(1), 0, null))) : (null));
return f2937.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), argseq__23180__auto___5);

});
f2937.cljs$core$IFn$_invoke$arity$variadic = (function (hiccup, p__3137) {
const vec__3143_6 = p__3137;
const opt_7 = cherry_core.nth.call(null, vec__3143_6, 0, null);
const opt_8 = get_opts.call(null, opt_7);
return walk.postwalk.call(null, (function (_PERCENT_1) {
return expand_aliased_hiccup.call(null, _PERCENT_1, opt_8);

}), hiccup);

});
f2937.cljs$lang$maxFixedArity = 1;
f2937.cljs$lang$applyTo = (function (seq2940) {
const G__2941_9 = cherry_core.first.call(null, seq2940);
const seq2940_10 = cherry_core.next.call(null, seq2940);
const self__22809__auto___11 = this;
return self__22809__auto___11.cljs$core$IFn$_invoke$arity$variadic(G__2941_9, seq2940_10);

});
return f2937;

})();
var expand = (() => {
const f3276 = (function (var_args) {
const args3277_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i3278_3 = 0;
while(true){
if ((i3278_3 < len__22792__auto___2)) {
args3277_1.push((arguments[i3278_3]));
let G__4 = (i3278_3 + 1);
i3278_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((1 < args3277_1.length)) ? ((new cherry_core.IndexedSeq(args3277_1.slice(1), 0, null))) : (null));
return f3276.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), argseq__23180__auto___5);

});
f3276.cljs$core$IFn$_invoke$arity$variadic = (function (hiccup, p__3476) {
const vec__3482_6 = p__3476;
const opt_7 = cherry_core.nth.call(null, vec__3482_6, 0, null);
const opt_8 = get_opts.call(null, opt_7);
return walk.prewalk.call(null, (function (_PERCENT_1) {
return expand_aliased_hiccup.call(null, _PERCENT_1, opt_8);

}), hiccup);

});
f3276.cljs$lang$maxFixedArity = 1;
f3276.cljs$lang$applyTo = (function (seq3279) {
const G__3280_9 = cherry_core.first.call(null, seq3279);
const seq3279_10 = cherry_core.next.call(null, seq3279);
const self__22809__auto___11 = this;
return self__22809__auto___11.cljs$core$IFn$_invoke$arity$variadic(G__3280_9, seq3279_10);

});
return f3276;

})();

export { get_registered_aliases, alias_hiccup_QMARK_, aliases, expand_1, expand, expand_aliased_hiccup, __GT_hiccup, register_BANG_, get_opts }
