import * as cherry_core from 'cherry-cljs/cljs.core.js';
import t from 'transit-js';
var rdr = t.reader.call(null, "json");
var __GT_clj = function (x) {
if (cherry_core.truth_.call(null, t.isKeyword.call(null, x))) {
return cherry_core.keyword.call(null, x._name)} else {
if (cherry_core.truth_.call(null, t.isSymbol.call(null, x))) {
return cherry_core.symbol.call(null, x._name)} else {
if (cherry_core.truth_.call(null, t.isMap.call(null, x))) {
const m_1 = cherry_core.atom.call(null, cherry_core.array_map());
x.forEach((function (v, k) {
return cherry_core.swap_BANG_.call(null, m_1, cherry_core.assoc, __GT_clj.call(null, k), __GT_clj.call(null, v));

}));
return cherry_core.deref.call(null, m_1);
} else {
if (cherry_core.truth_.call(null, t.isSet.call(null, x))) {
const s_2 = cherry_core.atom.call(null, cherry_core.hash_set());
x.forEach((function (v) {
return cherry_core.swap_BANG_.call(null, s_2, cherry_core.conj, __GT_clj.call(null, v));

}));
return cherry_core.deref.call(null, s_2);
} else {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___3 = t.isTaggedValue.call(null, x);
if (cherry_core.truth_.call(null, and__24022__auto___3)) {
return ("list" === x.tag)} else {
return and__24022__auto___3};

})())) {
return cherry_core.apply.call(null, cherry_core.list, cherry_core.map.call(null, __GT_clj, x.rep))} else {
if (cherry_core.truth_.call(null, cherry_core.array_QMARK_.call(null, x))) {
return cherry_core.mapv.call(null, __GT_clj, x)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return x} else {
return null}}}}}}};

};
var read_str = function (s) {
return __GT_clj.call(null, rdr.read(s));

};

export { __GT_clj, read_str }
