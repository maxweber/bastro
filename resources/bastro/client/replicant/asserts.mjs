import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as str from 'cherry-cljs/lib/clojure.string.js';
import * as clojure_DOT_string from 'cherry-cljs/lib/clojure.string.js';
import * as assert from './assert.mjs';
import * as replicant_DOT_assert from './assert.mjs';
import * as hiccup from './hiccup_headers.mjs';
import * as replicant_DOT_hiccup_headers from './hiccup_headers.mjs';
import * as h from './hiccup.mjs';
import * as replicant_DOT_hiccup from './hiccup.mjs';
import * as vdom from './vdom.mjs';
import * as replicant_DOT_vdom from './vdom.mjs';
var camel__GT_dash = function (s) {
return str.join.call(null, "-", cherry_core.map.call(null, str.lower_case, cherry_core.re_seq.call(null, /[A-Z][a-z0-9]*|[a-z0-9]+/, s)));

};
var camel__GT_dash_k = function (k) {
return cherry_core.keyword.call(null, camel__GT_dash.call(null, cherry_core.name.call(null, k)));

};
var has_bad_conditional_attrs_QMARK_ = function (vdom, headers) {
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___1 = (0 < cherry_core.count.call(null, headers[5]));
if (or__23992__auto___1) {
return or__23992__auto___1} else {
return (0 < cherry_core.count.call(null, vdom[4]))};

})())) {
const vec__4278_2 = headers[7];
const new_selector_3 = cherry_core.nth.call(null, vec__4278_2, 0, null);
const new_attrs_4 = cherry_core.nth.call(null, vec__4278_2, 1, null);
const vec__4281_5 = vdom[7];
const old_selector_6 = cherry_core.nth.call(null, vec__4281_5, 0, null);
const old_attrs_7 = cherry_core.nth.call(null, vec__4281_5, 1, null);
if (cherry_core.not.call(null, cherry_core._EQ_.call(null, new_selector_3, old_selector_6))) {
return false} else {
if ((new_attrs_4 == null)) {
return cherry_core.map_QMARK_.call(null, old_attrs_7)} else {
if (cherry_core.truth_.call(null, cherry_core.map_QMARK_.call(null, new_attrs_4))) {
return (old_attrs_7 == null)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return false} else {
return null}}}};
} else {
return false};

};
var abbreviate_map = function (m, n) {
return `${"{"}${str.join.call(null, ", ", cherry_core.mapv.call(null, (function (p__4434) {
const vec__4440_1 = p__4434;
const k_2 = cherry_core.nth.call(null, vec__4440_1, 0, null);
const v_3 = cherry_core.nth.call(null, vec__4440_1, 1, null);
return `${k_2??''}${" "}${((cherry_core.truth_.call(null, cherry_core.map_QMARK_.call(null, v_3))) ? (abbreviate_map.call(null, v_3, n)) : (cherry_core.pr_str.call(null, v_3)))??''}`;

}), cherry_core.take.call(null, n, m)))??''}${(((n < cherry_core.count.call(null, m))) ? (" ,,,") : (null))??''}${"}"}`;

};
var abbreviate_node = function (x) {
if (cherry_core.truth_.call(null, h.hiccup_QMARK_.call(null, x))) {
return `${"["}${cherry_core.first.call(null, x)??''}${" ,,,]"}`} else {
if ((x == null)) {
return "nil"} else {
if (cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, x))) {
if ((20 < cherry_core.count.call(null, x))) {
return `${str.join.call(null, cherry_core.take.call(null, 20, x))??''}${"..."}`} else {
return x}} else {
if (cherry_core.truth_.call(null, cherry_core.coll_QMARK_.call(null, x))) {
return `${"(,,,)"}`} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return cherry_core.pr_str.call(null, x)} else {
return null}}}}};

};
var format_hiccup_part = function (x) {
if (cherry_core.truth_.call(null, cherry_core.map_QMARK_.call(null, x))) {
return abbreviate_map.call(null, x, 2)} else {
if (cherry_core.truth_.call(null, h.hiccup_QMARK_.call(null, x))) {
const s_1 = cherry_core.pr_str.call(null, x);
if ((cherry_core.count.call(null, s_1) < 20)) {
return s_1} else {
return abbreviate_node.call(null, x)};
} else {
if (cherry_core.truth_.call(null, cherry_core.coll_QMARK_.call(null, x))) {
if ((1 === cherry_core.count.call(null, x))) {
return `${"("}${abbreviate_node.call(null, cherry_core.first.call(null, x))??''}${")"}`} else {
return `${"("}${abbreviate_node.call(null, cherry_core.first.call(null, x))??''}${" ,,,)"}`}} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return cherry_core.pr_str.call(null, x)} else {
return null}}}};

};
var convey_bad_conditional_attributes = function (vdom, headers) {
const vec__4883_1 = cherry_core.first.call(null, (() => {
const or__23992__auto___2 = cherry_core.not_empty.call(null, vdom[3]);
if (cherry_core.truth_.call(null, or__23992__auto___2)) {
return or__23992__auto___2} else {
return cherry_core.not_empty.call(null, headers[4])};

})());
const k_3 = cherry_core.nth.call(null, vec__4883_1, 0, null);
const v_4 = cherry_core.nth.call(null, vec__4883_1, 1, null);
return `${"Replicant treats nils as hints of nodes that come and go. Wrapping "}${"the entire attribute map in a conditional such that what used to be "}${format_hiccup_part.call(null, cherry_core.second.call(null, vdom[7]))??''}${" is now "}${format_hiccup_part.call(null, cherry_core.second.call(null, headers[7]))??''}${" can impair how well Replicant can match up child nodes without keys, and "}${"may lead to undesirable behavior for life-cycle events and transitions.\n\n"}${"Instead of:\n["}${cherry_core.first.call(null, headers[7])??''}${" (when something? {"}${((cherry_core.truth_.call(null, k_3)) ? (`${k_3??''}${" "}${cherry_core.pr_str.call(null, v_4)??''}`) : (null))??''}${"}) ,,,]\n\nConsider:\n["}${cherry_core.first.call(null, headers[7])??''}${((cherry_core.truth_.call(null, k_3)) ? (`${"\n  "}${"(cond-> {}\n    something? (assoc "}${k_3??''}${" "}${cherry_core.pr_str.call(null, v_4)??''}${"))\n"}`) : (" {}"))??''}${" ,,,]"}`;

};

export { camel__GT_dash, camel__GT_dash_k, has_bad_conditional_attrs_QMARK_, abbreviate_map, abbreviate_node, format_hiccup_part, convey_bad_conditional_attributes }
