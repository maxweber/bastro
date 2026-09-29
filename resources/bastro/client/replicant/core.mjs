import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as assert from './assert.mjs';
import * as replicant_DOT_assert from './assert.mjs';
import * as asserts from './asserts.mjs';
import * as replicant_DOT_asserts from './asserts.mjs';
import * as errors from './errors.mjs';
import * as replicant_DOT_errors from './errors.mjs';
import * as h from './hiccup.mjs';
import * as replicant_DOT_hiccup from './hiccup.mjs';
import * as hiccup from './hiccup_headers.mjs';
import * as replicant_DOT_hiccup_headers from './hiccup_headers.mjs';
import * as r from './protocols.mjs';
import * as replicant_DOT_protocols from './protocols.mjs';
import * as vdom from './vdom.mjs';
import * as replicant_DOT_vdom from './vdom.mjs';
var parse_tag = function (tag) {
const ns_1 = cherry_core.namespace.call(null, tag);
const tag_2 = cherry_core.name.call(null, tag);
const id_index_3 = (() => {
const index_4 = tag_2.indexOf("#");
if ((index_4 > 0)) {
return index_4;
};

})();
const class_index_5 = (() => {
const index_6 = tag_2.indexOf(".");
if ((index_6 > 0)) {
return index_6;
};

})();
const tag_name_7 = (() => {
const G__5241_8 = ((cherry_core.truth_.call(null, id_index_3)) ? (tag_2.substring(0, id_index_3)) : (((cherry_core.truth_.call(null, class_index_5)) ? (tag_2.substring(0, class_index_5)) : (((cherry_core.truth_.call(null, cherry_core.keyword("else"))) ? (tag_2) : (null))))));
if (cherry_core.truth_.call(null, ns_1)) {
return cherry_core.keyword.call(null, ns_1, G__5241_8)} else {
return G__5241_8};

})();
const id_9 = ((cherry_core.truth_.call(null, id_index_3)) ? (((cherry_core.truth_.call(null, class_index_5)) ? (tag_2.substring(cherry_core.unchecked_inc_int.call(null, id_index_3), class_index_5)) : (tag_2.substring(cherry_core.unchecked_inc_int.call(null, id_index_3))))) : (null));
const classes_10 = ((cherry_core.truth_.call(null, class_index_5)) ? (cherry_core.seq.call(null, tag_2.substring(cherry_core.unchecked_inc_int.call(null, class_index_5)).split("."))) : (null));
return [tag_name_7, id_9, classes_10];

};
var get_hiccup_headers = function (ns, sexp) {
if (cherry_core.truth_.call(null, sexp)) {
if (cherry_core.truth_.call(null, h.hiccup_QMARK_.call(null, sexp))) {
const sym_1 = cherry_core.first.call(null, sexp);
const args_2 = cherry_core.rest.call(null, sexp);
const has_args_QMARK__3 = cherry_core.map_QMARK_.call(null, cherry_core.first.call(null, args_2));
const attrs_4 = ((cherry_core.truth_.call(null, has_args_QMARK__3)) ? (cherry_core.first.call(null, args_2)) : (cherry_core.array_map()));
const pt__2321__auto___5 = parse_tag.call(null, sym_1);
const G__5542_6 = pt__2321__auto___5;
G__5542_6.push((() => {
const temp__23929__auto___7 = cherry_core.keyword("replicant/key").call(null, attrs_4);
if (cherry_core.truth_.call(null, temp__23929__auto___7)) {
const k__2312__auto___8 = temp__23929__auto___7;
return replicant_DOT_hiccup_headers.make_key.call(null, pt__2321__auto___5[0], k__2312__auto___8);
};

})());
G__5542_6.push(attrs_4);
G__5542_6.push(((cherry_core.truth_.call(null, has_args_QMARK__3)) ? (cherry_core.rest.call(null, args_2)) : (args_2)));
G__5542_6.push(ns);
G__5542_6.push(sexp);
G__5542_6.push(null);
G__5542_6.push(null);
return G__5542_6;
} else {
const text__2334__auto___9 = `${sexp??''}`;
return (new Array(null, null, null, null, null, null, null, text__2334__auto___9, text__2334__auto___9, null));
};
};

};
var get_classes = function (classes) {
if (cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, classes))) {
return cherry_core.vector(cherry_core.name.call(null, classes))} else {
if (cherry_core.truth_.call(null, cherry_core.symbol_QMARK_.call(null, classes))) {
return cherry_core.vector(cherry_core.name.call(null, classes))} else {
if (cherry_core.truth_.call(null, cherry_core.empty_QMARK_.call(null, classes))) {
return cherry_core.vector()} else {
if (cherry_core.truth_.call(null, cherry_core.coll_QMARK_.call(null, classes))) {
return cherry_core.keep.call(null, (function (class$) {
if (cherry_core.truth_.call(null, class$)) {
if (cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, class$))) {
return cherry_core.name.call(null, class$)} else {
if (cherry_core.truth_.call(null, cherry_core.symbol_QMARK_.call(null, class$))) {
return cherry_core.name.call(null, class$)} else {
if (cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, class$))) {
return cherry_core.not_empty.call(null, class$.trim())} else {
return null}}};
};

}), classes)} else {
if (cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, classes))) {
return cherry_core.keep.call(null, (function (_PERCENT_1) {
return cherry_core.not_empty.call(null, _PERCENT_1.trim());

}), classes.split(" "))} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
throw cherry_core.ex_info.call(null, "class name is neither string, keyword, or a collection of those", cherry_core.array_map(cherry_core.keyword("classes"), classes))} else {
return null}}}}}};

};
var skip_pixelize_attrs = cherry_core.hash_set(cherry_core.keyword("line-height"), cherry_core.keyword("box-flex-group"), cherry_core.keyword("zoom"), cherry_core.keyword("column-count"), cherry_core.keyword("flex-negative"), cherry_core.keyword("tab-size"), cherry_core.keyword("font-weight"), cherry_core.keyword("stroke-opacity"), cherry_core.keyword("flex-order"), cherry_core.keyword("flex-grow"), cherry_core.keyword("stroke-dashoffset"), cherry_core.keyword("flex"), cherry_core.keyword("flex-shrink"), cherry_core.keyword("stop-opacity"), cherry_core.keyword("orphans"), cherry_core.keyword("widows"), cherry_core.keyword("z-index"), cherry_core.keyword("stroke-width"), cherry_core.keyword("opacity"), cherry_core.keyword("box-ordinal-group"), cherry_core.keyword("order"), cherry_core.keyword("animation-iteration-count"), cherry_core.keyword("line-clamp"), cherry_core.keyword("fill-opacity"), cherry_core.keyword("flex-positive"), cherry_core.keyword("box-flex"));
var explode_styles = function (s) {
return cherry_core.into.call(null, cherry_core.array_map(), cherry_core.map.call(null, (function (kv) {
const vec__6018_1 = cherry_core.map.call(null, (function (_PERCENT_1) {
return _PERCENT_1.trim();

}), kv.split(":"));
const k_2 = cherry_core.nth.call(null, vec__6018_1, 0, null);
const v_3 = cherry_core.nth.call(null, vec__6018_1, 1, null);
return cherry_core.vector(cherry_core.keyword.call(null, k_2), v_3);

}), s.split(";")));

};
var get_style_val = function (attr, v) {
if (cherry_core.truth_.call(null, cherry_core.number_QMARK_.call(null, v))) {
if (cherry_core.truth_.call(null, skip_pixelize_attrs.call(null, attr))) {
return `${v??''}`} else {
return `${v??''}px`}} else {
if (cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, v))) {
return cherry_core.name.call(null, v)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return v} else {
return null}}};

};
var prep_attrs = function (attrs, id, classes) {
const classes_1 = cherry_core.concat.call(null, get_classes.call(null, cherry_core.keyword("class").call(null, attrs)), classes);
const G__6206_2 = cherry_core.dissoc.call(null, attrs, cherry_core.keyword("class"), cherry_core.keyword("replicant/mounting"), cherry_core.keyword("replicant/unmounting"));
const G__6206_3 = ((cherry_core.truth_.call(null, id)) ? (cherry_core.assoc.call(null, G__6206_2, cherry_core.keyword("id"), id)) : (G__6206_2));
const G__6206_4 = ((cherry_core.truth_.call(null, cherry_core.seq.call(null, classes_1))) ? (cherry_core.assoc.call(null, G__6206_3, cherry_core.keyword("classes"), classes_1)) : (G__6206_3));
if (cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, cherry_core.keyword("style").call(null, attrs)))) {
return cherry_core.update.call(null, G__6206_4, cherry_core.keyword("style"), explode_styles)} else {
return G__6206_4};

};
var get_attrs = function (headers) {
return prep_attrs.call(null, headers[4], headers[1], headers[2]);

};
var merge_attrs = function (attrs, overrides) {
const G__6342_1 = cherry_core.merge.call(null, attrs, cherry_core.dissoc.call(null, overrides, cherry_core.keyword("style")));
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___2 = cherry_core.keyword("style").call(null, attrs);
if (cherry_core.truth_.call(null, or__23992__auto___2)) {
return or__23992__auto___2} else {
return cherry_core.keyword("style").call(null, overrides)};

})())) {
return cherry_core.update.call(null, G__6342_1, cherry_core.keyword("style"), cherry_core.merge, cherry_core.keyword("style").call(null, overrides))} else {
return G__6342_1};

};
var get_mounting_attrs = function (headers) {
const temp__23846__auto___1 = cherry_core.keyword("replicant/mounting").call(null, headers[4]);
if (cherry_core.truth_.call(null, temp__23846__auto___1)) {
const mounting_2 = temp__23846__auto___1;
return cherry_core.vector(get_attrs.call(null, headers), (() => {
const headers_3 = (() => {
const G__6478_4 = headers;
if (cherry_core.truth_.call(null, mounting_2)) {
const headers__2343__auto___5 = G__6478_4;
(headers__2343__auto___5[4] = merge_attrs.call(null, headers__2343__auto___5[4], mounting_2));
return headers__2343__auto___5;
} else {
return G__6478_4};

})();
return prep_attrs.call(null, headers_3[4], headers_3[1], headers_3[2]);

})());
} else {
return cherry_core.vector(get_attrs.call(null, headers))};

};
var get_unmounting_attrs = function (vdom) {
if (cherry_core.truth_.call(null, vdom[6])) {
return prep_attrs.call(null, merge_attrs.call(null, vdom[3], cherry_core.keyword("replicant/unmounting").call(null, cherry_core.nth.call(null, vdom[7], 1))), null, vdom[2]);
};

};
var seq_tag = null;
var __GT_seq = function (xs) {
return cherry_core.seq.call(null, xs);

};
var proper_seq_QMARK_ = function (x) {
return cherry_core.seq_QMARK_.call(null, x);

};
var flatten_seqs_STAR_ = function (xs, coll) {
return cherry_core.reduce.call(null, (function (_, x) {
if (cherry_core.truth_.call(null, proper_seq_QMARK_.call(null, x))) {
return flatten_seqs_STAR_.call(null, x, coll)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return cherry_core.conj_BANG_.call(null, coll, x)} else {
return null}};

}), null, xs);

};
var flatten_seqs = function (xs) {
const coll_1 = cherry_core.transient$.call(null, cherry_core.vector());
flatten_seqs_STAR_.call(null, xs, coll_1);
return cherry_core.persistent_BANG_.call(null, coll_1);

};
var flatten_map_seqs_STAR_ = function (f, xs, coll) {
return cherry_core.reduce.call(null, (function (_, x) {
if (cherry_core.truth_.call(null, proper_seq_QMARK_.call(null, x))) {
return flatten_map_seqs_STAR_.call(null, f, x, coll)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return cherry_core.conj_BANG_.call(null, coll, f.call(null, x))} else {
return null}};

}), null, xs);

};
var flatten_map_seqs = function (f, xs) {
const coll_1 = cherry_core.transient$.call(null, cherry_core.vector());
flatten_map_seqs_STAR_.call(null, f, xs, coll_1);
return cherry_core.persistent_BANG_.call(null, coll_1);

};
var get_children = function (headers, ns) {
if (cherry_core.truth_.call(null, cherry_core.keyword("innerHTML").call(null, headers[4]))) {
return null} else {
return flatten_map_seqs.call(null, (function (_PERCENT_1) {
const G__6964_1 = _PERCENT_1;
if ((G__6964_1 == null)) {
return null} else {
return get_hiccup_headers.call(null, ns, G__6964_1)};

}), headers[5]);
};

};
var get_children_ks = function (headers, ns) {
const vec__7015_1 = cherry_core.reduce.call(null, (function (p__7038, hiccup) {
const vec__7044_2 = p__7038;
const children_3 = cherry_core.nth.call(null, vec__7044_2, 0, null);
const ks_4 = cherry_core.nth.call(null, vec__7044_2, 1, null);
if (cherry_core.truth_.call(null, hiccup)) {
const headers_5 = get_hiccup_headers.call(null, ns, hiccup);
const k_6 = headers_5[3];
return cherry_core.vector(cherry_core.conj_BANG_.call(null, children_3, headers_5), (() => {
const G__7102_7 = ks_4;
if (cherry_core.truth_.call(null, k_6)) {
return cherry_core.conj_BANG_.call(null, G__7102_7, k_6)} else {
return G__7102_7};

})());
} else {
return cherry_core.vector(cherry_core.conj_BANG_.call(null, children_3, null), ks_4)};

}), cherry_core.vector(cherry_core.transient$.call(null, cherry_core.vector()), cherry_core.transient$.call(null, cherry_core.hash_set())), flatten_seqs.call(null, headers[5]));
const children_8 = cherry_core.nth.call(null, vec__7015_1, 0, null);
const ks_9 = cherry_core.nth.call(null, vec__7015_1, 1, null);
return cherry_core.vector(cherry_core.persistent_BANG_.call(null, children_8), cherry_core.persistent_BANG_.call(null, ks_9));

};
var _STAR_dispatch_STAR_ = ({val: null});
var build_event_map = function (e) {
const node_1 = e.target;
const G__7218_2 = cherry_core.array_map(cherry_core.keyword("replicant/trigger"), cherry_core.keyword("replicant.trigger/dom-event"), cherry_core.keyword("replicant/dom-event"), e);
const G__7218_3 = ((cherry_core.truth_.call(null, node_1)) ? (cherry_core.assoc.call(null, G__7218_2, cherry_core.keyword("replicant/node"), node_1)) : (G__7218_2));
if (cherry_core.truth_.call(null, cherry_core.ifn_QMARK_.call(null, _STAR_dispatch_STAR_.val))) {
return cherry_core.assoc.call(null, G__7218_3, cherry_core.keyword("replicant/dispatch"), _STAR_dispatch_STAR_.val)} else {
return G__7218_3};

};
var get_event_handler = function (handler, event, options) {
const or__23992__auto___1 = ((cherry_core.truth_.call(null, (() => {
const or__23992__auto___2 = cherry_core.fn_QMARK_.call(null, handler);
if (cherry_core.truth_.call(null, or__23992__auto___2)) {
return or__23992__auto___2} else {
const and__24022__auto___3 = cherry_core.var_QMARK_.call(null, handler);
if (cherry_core.truth_.call(null, and__24022__auto___3)) {
return cherry_core.fn_QMARK_.call(null, cherry_core.deref.call(null, handler))} else {
return and__24022__auto___3};
};

})())) ? (((cherry_core.truth_.call(null, cherry_core.keyword("replicant.event/wrap-handler?").call(null, options))) ? ((function (e) {
return handler.call(null, build_event_map.call(null, e));

})) : (handler))) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
const or__23992__auto___4 = ((cherry_core.truth_.call(null, cherry_core.ifn_QMARK_.call(null, _STAR_dispatch_STAR_.val))) ? ((function (e) {
return _STAR_dispatch_STAR_.val.call(null, cherry_core.assoc.call(null, build_event_map.call(null, e), cherry_core.keyword("replicant/js-event"), e), handler);

})) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___4)) {
return or__23992__auto___4} else {
const or__23992__auto___5 = ((cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, handler))) ? (handler) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___5)) {
return or__23992__auto___5} else {
throw cherry_core.ex_info.call(null, "Cannot use non-function event handler when replicant.core/*dispatch* is not bound to a function", cherry_core.array_map(cherry_core.keyword("event"), event, cherry_core.keyword("handler"), handler, cherry_core.keyword("dispatch"), _STAR_dispatch_STAR_.val))};
};
};

};
var get_life_cycle_hook = function (handler) {
const or__23992__auto___1 = ((cherry_core.truth_.call(null, cherry_core.fn_QMARK_.call(null, handler))) ? (handler) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
const or__23992__auto___2 = ((cherry_core.truth_.call(null, (() => {
const and__24022__auto___3 = handler;
if (cherry_core.truth_.call(null, and__24022__auto___3)) {
return cherry_core.ifn_QMARK_.call(null, _STAR_dispatch_STAR_.val)} else {
return and__24022__auto___3};

})())) ? ((function (e) {
return _STAR_dispatch_STAR_.val.call(null, e, handler);

})) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___2)) {
return or__23992__auto___2} else {
if (cherry_core.truth_.call(null, handler)) {
throw cherry_core.ex_info.call(null, "Cannot use non-function life-cycle hook when replicant.core/*dispatch* is not bound to a function", cherry_core.array_map(cherry_core.keyword("handler"), handler, cherry_core.keyword("dispatch"), _STAR_dispatch_STAR_.val));
}};
};

};
var call_hook = function (renderer, p__7784) {
const vec__7790_1 = p__7784;
const hook_2 = cherry_core.nth.call(null, vec__7790_1, 0, null);
const k_3 = cherry_core.nth.call(null, vec__7790_1, 1, null);
const node_4 = cherry_core.nth.call(null, vec__7790_1, 2, null);
const new$_5 = cherry_core.nth.call(null, vec__7790_1, 3, null);
const old_6 = cherry_core.nth.call(null, vec__7790_1, 4, null);
const details_7 = cherry_core.nth.call(null, vec__7790_1, 5, null);
const life_cycle_8 = cherry_core.nth.call(null, vec__7790_1, 6, null);
const f_9 = get_life_cycle_hook.call(null, hook_2);
const life_cycle_10 = (() => {
const or__23992__auto___11 = life_cycle_8;
if (cherry_core.truth_.call(null, or__23992__auto___11)) {
return or__23992__auto___11} else {
if ((old_6 == null)) {
return cherry_core.keyword("replicant.life-cycle/mount")} else {
if ((new$_5 == null)) {
return cherry_core.keyword("replicant.life-cycle/unmount")} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return cherry_core.keyword("replicant.life-cycle/update")} else {
return null}}}};

})();
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___12 = cherry_core._EQ_.call(null, cherry_core.keyword("replicant/on-render"), k_3);
if (or__23992__auto___12) {
return or__23992__auto___12} else {
const or__23992__auto___13 = (cherry_core._EQ_.call(null, k_3, cherry_core.keyword("replicant/on-mount")) && cherry_core._EQ_.call(null, life_cycle_10, cherry_core.keyword("replicant.life-cycle/mount")));
if (cherry_core.truth_.call(null, or__23992__auto___13)) {
return or__23992__auto___13} else {
const or__23992__auto___14 = (cherry_core._EQ_.call(null, k_3, cherry_core.keyword("replicant/on-unmount")) && cherry_core._EQ_.call(null, life_cycle_10, cherry_core.keyword("replicant.life-cycle/unmount")));
if (cherry_core.truth_.call(null, or__23992__auto___14)) {
return or__23992__auto___14} else {
return (cherry_core._EQ_.call(null, k_3, cherry_core.keyword("replicant/on-update")) && cherry_core._EQ_.call(null, life_cycle_10, cherry_core.keyword("replicant.life-cycle/update")))};
};
};

})())) {
return f_9.call(null, (() => {
const G__8133_15 = cherry_core.array_map(cherry_core.keyword("replicant/trigger"), cherry_core.keyword("replicant.trigger/life-cycle"), cherry_core.keyword("replicant/life-cycle"), life_cycle_10, cherry_core.keyword("replicant/node"), node_4, cherry_core.keyword("replicant/remember"), (function remember (memory) {
return r.remember.call(null, renderer, node_4, memory);

}));
const G__8133_16 = ((cherry_core.truth_.call(null, details_7)) ? (cherry_core.assoc.call(null, G__8133_15, cherry_core.keyword("replicant/details"), details_7)) : (G__8133_15));
const G__8133_17 = ((cherry_core.not.call(null, cherry_core._EQ_.call(null, life_cycle_10, cherry_core.keyword("replicant.life-cycle/mount")))) ? (cherry_core.assoc.call(null, G__8133_16, cherry_core.keyword("replicant/memory"), r.recall.call(null, renderer, node_4))) : (G__8133_16));
if (cherry_core.truth_.call(null, cherry_core.ifn_QMARK_.call(null, _STAR_dispatch_STAR_.val))) {
return cherry_core.assoc.call(null, G__8133_17, cherry_core.keyword("replicant/dispatch"), _STAR_dispatch_STAR_.val)} else {
return G__8133_17};

})());
};

};
var node_map = function () {
return cherry_core.array_map();

};
var register_hooks = (() => {
const f8264 = (function (var_args) {
const args8265_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i8266_3 = 0;
while(true){
if ((i8266_3 < len__22792__auto___2)) {
args8265_1.push((arguments[i8266_3]));
let G__4 = (i8266_3 + 1);
i8266_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((3 < args8265_1.length)) ? ((new cherry_core.IndexedSeq(args8265_1.slice(3), 0, null))) : (null));
return f8264.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), (arguments[1]), (arguments[2]), argseq__23180__auto___5);

});
f8264.cljs$core$IFn$_invoke$arity$variadic = (function (p__8486, node, headers, p__8487) {
const map__8493_6 = p__8486;
const map__8493_7 = cherry_core.__destructure_map.call(null, map__8493_6);
const hooks_8 = cherry_core.get.call(null, map__8493_7, cherry_core.keyword("hooks"));
const unmount_hooks_9 = cherry_core.get.call(null, map__8493_7, cherry_core.keyword("unmount-hooks"));
const vec__8494_10 = p__8487;
const vdom_11 = cherry_core.nth.call(null, vec__8494_10, 0, null);
const details_12 = cherry_core.nth.call(null, vec__8494_10, 1, null);
const target_13 = ((cherry_core.truth_.call(null, headers)) ? (headers[4]) : (vdom_11[3]));
const new_hooks_14 = cherry_core.keep.call(null, (function (life_cycle_key) {
const temp__23929__auto___15 = cherry_core.get.call(null, target_13, life_cycle_key);
if (cherry_core.truth_.call(null, temp__23929__auto___15)) {
const hook_16 = temp__23929__auto___15;
return cherry_core.vector(life_cycle_key, hook_16);
};

}), cherry_core.vector(cherry_core.keyword("replicant/on-render"), cherry_core.keyword("replicant/on-mount"), cherry_core.keyword("replicant/on-unmount"), cherry_core.keyword("replicant/on-update")));
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___17 = cherry_core.get.call(null, cherry_core.deref.call(null, unmount_hooks_9), node);
if (cherry_core.truth_.call(null, and__24022__auto___17)) {
const and__24022__auto___18 = headers;
if (cherry_core.truth_.call(null, and__24022__auto___18)) {
return cherry_core.empty_QMARK_.call(null, new_hooks_14)} else {
return and__24022__auto___18};
} else {
return and__24022__auto___17};

})())) {
cherry_core.vreset_BANG_.call(null, unmount_hooks_9, cherry_core.dissoc.call(null, cherry_core.deref.call(null, unmount_hooks_9), node))};
if (cherry_core.truth_.call(null, cherry_core.empty_QMARK_.call(null, new_hooks_14))) {
return null} else {
const headers_sexp_19 = (() => {
const G__8767_20 = headers;
if ((G__8767_20 == null)) {
return null} else {
return G__8767_20[7]};

})();
const vdom_sexp_21 = (() => {
const G__8793_22 = vdom_11;
if ((G__8793_22 == null)) {
return null} else {
return G__8793_22[7]};

})();
const new_hooks_23 = cherry_core.map.call(null, (function (p__8834) {
const vec__8840_24 = p__8834;
const k_25 = cherry_core.nth.call(null, vec__8840_24, 0, null);
const hook_26 = cherry_core.nth.call(null, vec__8840_24, 1, null);
return cherry_core.vector(hook_26, k_25, node, headers_sexp_19, vdom_sexp_21, details_12);

}), new_hooks_14);
const temp__23929__auto___27 = cherry_core.mapv.call(null, (function (p__8883) {
const vec__8889_28 = p__8883;
const __29 = cherry_core.nth.call(null, vec__8889_28, 0, null);
const __30 = cherry_core.nth.call(null, vec__8889_28, 1, null);
const node_31 = cherry_core.nth.call(null, vec__8889_28, 2, null);
const hook_32 = vec__8889_28;
return cherry_core.vector(node_31, cherry_core.conj.call(null, hook_32, cherry_core.keyword("replicant.life-cycle/unmount")));

}), cherry_core.filterv.call(null, cherry_core.comp.call(null, cherry_core.hash_set(cherry_core.keyword("replicant/on-render"), cherry_core.keyword("replicant/on-unmount")), cherry_core.second), new_hooks_23));
if (cherry_core.truth_.call(null, temp__23929__auto___27)) {
const new_unmount_hooks_33 = temp__23929__auto___27;
cherry_core.vreset_BANG_.call(null, unmount_hooks_9, cherry_core.into.call(null, cherry_core.deref.call(null, unmount_hooks_9), new_unmount_hooks_33))};
return cherry_core.vreset_BANG_.call(null, hooks_8, cherry_core.into.call(null, cherry_core.deref.call(null, hooks_8), new_hooks_23));
};

});
f8264.cljs$lang$maxFixedArity = 3;
f8264.cljs$lang$applyTo = (function (seq8267) {
const G__8268_34 = cherry_core.first.call(null, seq8267);
const seq8267_35 = cherry_core.next.call(null, seq8267);
const G__8269_36 = cherry_core.first.call(null, seq8267_35);
const seq8267_37 = cherry_core.next.call(null, seq8267_35);
const G__8270_38 = cherry_core.first.call(null, seq8267_37);
const seq8267_39 = cherry_core.next.call(null, seq8267_37);
const self__22809__auto___40 = this;
return self__22809__auto___40.cljs$core$IFn$_invoke$arity$variadic(G__8268_34, G__8269_36, G__8270_38, seq8267_39);

});
return f8264;

})();
var register_mount = function (p__9102, node, mounting_attrs, attrs) {
const map__9108_1 = p__9102;
const map__9108_2 = cherry_core.__destructure_map.call(null, map__9108_1);
const mounts_3 = cherry_core.get.call(null, map__9108_2, cherry_core.keyword("mounts"));
return cherry_core.vreset_BANG_.call(null, mounts_3, cherry_core.conj.call(null, cherry_core.deref.call(null, mounts_3), cherry_core.vector(node, mounting_attrs, attrs)));

};
var update_styles = function (renderer, el, new_styles, old_styles) {
const new_ks_1 = cherry_core.set.call(null, cherry_core.remove.call(null, (function (_PERCENT_1) {
return (cherry_core.get.call(null, new_styles, _PERCENT_1) == null);

}), cherry_core.keys.call(null, new_styles)));
const old_ks_2 = cherry_core.set.call(null, cherry_core.keys.call(null, old_styles));
cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return r.remove_style.call(null, renderer, el, _PERCENT_1);

}), cherry_core.remove.call(null, new_ks_1, old_ks_2));
return cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
const new_style_3 = cherry_core.get.call(null, new_styles, _PERCENT_1);
if (cherry_core.not.call(null, cherry_core._EQ_.call(null, new_style_3, cherry_core.get.call(null, old_styles, _PERCENT_1)))) {
return r.set_style.call(null, renderer, el, _PERCENT_1, get_style_val.call(null, _PERCENT_1, new_style_3));
};

}), new_ks_1);

};
var update_classes = function (renderer, el, new_classes, old_classes) {
cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return r.remove_class.call(null, renderer, el, _PERCENT_1);

}), cherry_core.remove.call(null, cherry_core.set.call(null, new_classes), old_classes));
return cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return r.add_class.call(null, renderer, el, _PERCENT_1);

}), cherry_core.remove.call(null, cherry_core.set.call(null, old_classes), new_classes));

};
var get_event_handler_options = function (m) {
return cherry_core.reduce.call(null, (function (res, k) {
const G__9389_1 = res;
if (("replicant.event" === cherry_core.namespace.call(null, k))) {
return cherry_core.assoc.call(null, G__9389_1, cherry_core.name.call(null, k), cherry_core.get.call(null, m, k))} else {
return G__9389_1};

}), null, cherry_core.keys.call(null, cherry_core.dissoc.call(null, m, cherry_core.keyword("replicant.event/handler"), cherry_core.keyword("replicant.event/wrap-handler?"))));

};
var add_event_listeners = function (renderer, el, val) {
return cherry_core.run_BANG_.call(null, (function (p__9480) {
const vec__9486_1 = p__9480;
const event_2 = cherry_core.nth.call(null, vec__9486_1, 0, null);
const handler_3 = cherry_core.nth.call(null, vec__9486_1, 1, null);
const temp__23846__auto___4 = cherry_core.keyword("replicant.event/handler").call(null, handler_3);
if (cherry_core.truth_.call(null, temp__23846__auto___4)) {
const eh_5 = temp__23846__auto___4;
const temp__23929__auto___6 = get_event_handler.call(null, eh_5, event_2, handler_3);
if (cherry_core.truth_.call(null, temp__23929__auto___6)) {
const eh_7 = temp__23929__auto___6;
return r.set_event_handler.call(null, renderer, el, event_2, eh_7, get_event_handler_options.call(null, handler_3));
};
} else {
const temp__23929__auto___8 = get_event_handler.call(null, handler_3, event_2, null);
if (cherry_core.truth_.call(null, temp__23929__auto___8)) {
const handler_9 = temp__23929__auto___8;
return r.set_event_handler.call(null, renderer, el, event_2, handler_9, null);
};
};

}), cherry_core.remove.call(null, cherry_core.comp.call(null, cherry_core.nil_QMARK_, cherry_core.second), val));

};
var update_event_listeners = function (renderer, el, new_handlers, old_handlers) {
return cherry_core.run_BANG_.call(null, (function (event) {
const new_handler_1 = cherry_core.get.call(null, new_handlers, event);
const old_handler_2 = cherry_core.get.call(null, old_handlers, event);
const old_opts_3 = ((cherry_core.truth_.call(null, cherry_core.get.call(null, old_handler_2, cherry_core.keyword("replicant.event/handler")))) ? (cherry_core.not_empty.call(null, get_event_handler_options.call(null, old_handler_2))) : (null));
const new_opts_4 = ((cherry_core.truth_.call(null, cherry_core.get.call(null, new_handler_1, cherry_core.keyword("replicant.event/handler")))) ? (cherry_core.not_empty.call(null, get_event_handler_options.call(null, new_handler_1))) : (null));
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___5 = old_handler_2;
if (cherry_core.truth_.call(null, and__24022__auto___5)) {
const or__23992__auto___6 = (new_handler_1 == null);
if (or__23992__auto___6) {
return or__23992__auto___6} else {
return cherry_core.not.call(null, cherry_core._EQ_.call(null, old_opts_3, new_opts_4))};
} else {
return and__24022__auto___5};

})())) {
r.remove_event_handler.call(null, renderer, el, event, old_opts_3)};
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___7 = new_handler_1;
if (cherry_core.truth_.call(null, and__24022__auto___7)) {
return cherry_core.not.call(null, cherry_core._EQ_.call(null, new_handler_1, old_handler_2))} else {
return and__24022__auto___7};

})())) {
const temp__23846__auto___8 = cherry_core.get.call(null, new_handler_1, cherry_core.keyword("replicant.event/handler"));
if (cherry_core.truth_.call(null, temp__23846__auto___8)) {
const handler_9 = temp__23846__auto___8;
return r.set_event_handler.call(null, renderer, el, event, get_event_handler.call(null, handler_9, event, new_handler_1), new_opts_4);
} else {
return r.set_event_handler.call(null, renderer, el, event, get_event_handler.call(null, new_handler_1, event, null), null)};
};

}), cherry_core.into.call(null, cherry_core.set.call(null, cherry_core.keys.call(null, new_handlers)), cherry_core.keys.call(null, old_handlers)));

};
var xlinkns = "http://www.w3.org/1999/xlink";
var xmlns = "http://www.w3.org/XML/1998/namespace";
var stringify = function (x) {
return `${(() => {
const temp__23929__auto___1 = cherry_core.namespace.call(null, x);
if (cherry_core.truth_.call(null, temp__23929__auto___1)) {
const ns_2 = temp__23929__auto___1;
return `${ns_2??''}${"/"}`;
};

})()??''}${cherry_core.name.call(null, x)}`;

};
var set_attr_val = function (renderer, el, attr, v) {
const an_1 = cherry_core.name.call(null, attr);
return r.set_attribute.call(null, renderer, el, an_1, (() => {
const G__10139_2 = v;
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___3 = cherry_core.keyword_QMARK_.call(null, v);
if (cherry_core.truth_.call(null, or__23992__auto___3)) {
return or__23992__auto___3} else {
return cherry_core.symbol_QMARK_.call(null, v)};

})())) {
return stringify.call(null, G__10139_2)} else {
return G__10139_2};

})(), (() => {
const G__10205_4 = cherry_core.array_map();
const G__10205_5 = (((0 === an_1.indexOf("xml:"))) ? (cherry_core.assoc.call(null, G__10205_4, cherry_core.keyword("ns"), xmlns)) : (G__10205_4));
if ((0 === an_1.indexOf("xlink:"))) {
return cherry_core.assoc.call(null, G__10205_5, cherry_core.keyword("ns"), xlinkns)} else {
return G__10205_5};

})());

};
var update_attr = function (renderer, el, attr, new$, old) {
if (cherry_core.truth_.call(null, cherry_core.namespace.call(null, attr))) {
return null} else {
const G__10316_1 = attr;
const G__10316_2 = ((cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, G__10316_1))) ? (cherry_core.subs.call(null, `${G__10316_1??''}`, 1)) : (null));
switch (G__10316_2) {case "style":
return update_styles.call(null, renderer, el, cherry_core.keyword("style").call(null, new$), cherry_core.keyword("style").call(null, old));

break;
case "classes":
return update_classes.call(null, renderer, el, cherry_core.keyword("classes").call(null, new$), cherry_core.keyword("classes").call(null, old));

break;
case "on":
return update_event_listeners.call(null, renderer, el, cherry_core.keyword("on").call(null, new$), cherry_core.keyword("on").call(null, old));

break;
default:
const temp__23846__auto___4 = cherry_core.get.call(null, new$, attr);
if (cherry_core.truth_.call(null, temp__23846__auto___4)) {
const v_5 = temp__23846__auto___4;
if (cherry_core.not.call(null, cherry_core._EQ_.call(null, v_5, cherry_core.get.call(null, old, attr)))) {
return set_attr_val.call(null, renderer, el, attr, v_5);
};
} else {
return r.remove_attribute.call(null, renderer, el, cherry_core.name.call(null, attr))};
};
};

};
var update_attributes = function (renderer, el, new_attrs, old_attrs) {
return cherry_core.reduce.call(null, (function (_PERCENT_1, _PERCENT_2) {
return update_attr.call(null, renderer, el, _PERCENT_2, new_attrs, old_attrs);

}), null, cherry_core.into.call(null, cherry_core.set.call(null, cherry_core.keys.call(null, new_attrs)), cherry_core.keys.call(null, old_attrs)));

};
var reconcile_attributes = function (renderer, el, new_attrs, old_attrs) {
if (cherry_core._EQ_.call(null, new_attrs, old_attrs)) {
return false} else {
update_attributes.call(null, renderer, el, new_attrs, old_attrs);
return true;
};

};
var set_styles = function (renderer, el, new_styles) {
return cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return r.set_style.call(null, renderer, el, _PERCENT_1, get_style_val.call(null, _PERCENT_1, cherry_core.get.call(null, new_styles, _PERCENT_1)));

}), cherry_core.filter.call(null, new_styles, cherry_core.keys.call(null, new_styles)));

};
var set_classes = function (renderer, el, new_classes) {
return cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return r.add_class.call(null, renderer, el, _PERCENT_1);

}), new_classes);

};
var set_attr = function (renderer, el, attr, new$) {
if (cherry_core.truth_.call(null, cherry_core.namespace.call(null, attr))) {
return null} else {
const G__10687_1 = attr;
const G__10687_2 = ((cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, G__10687_1))) ? (cherry_core.subs.call(null, `${G__10687_1??''}`, 1)) : (null));
switch (G__10687_2) {case "style":
return set_styles.call(null, renderer, el, cherry_core.keyword("style").call(null, new$));

break;
case "classes":
return set_classes.call(null, renderer, el, cherry_core.keyword("classes").call(null, new$));

break;
case "on":
return add_event_listeners.call(null, renderer, el, cherry_core.keyword("on").call(null, new$));

break;
default:
return set_attr_val.call(null, renderer, el, attr, cherry_core.get.call(null, new$, attr))};
};

};
var set_attributes = function (renderer, el, new_attrs) {
cherry_core.run_BANG_.call(null, (function (p__10788) {
const vec__10794_1 = p__10788;
const attr_2 = cherry_core.nth.call(null, vec__10794_1, 0, null);
const v_3 = cherry_core.nth.call(null, vec__10794_1, 1, null);
if (cherry_core.truth_.call(null, v_3)) {
return set_attr.call(null, renderer, el, attr_2, new_attrs);
};

}), cherry_core.dissoc.call(null, new_attrs, cherry_core.keyword("value"), cherry_core.keyword("default-value")));
if (cherry_core.truth_.call(null, cherry_core.keyword("value").call(null, new_attrs))) {
set_attr.call(null, renderer, el, cherry_core.keyword("value"), new_attrs)};
if (cherry_core.truth_.call(null, cherry_core.keyword("default-value").call(null, new_attrs))) {
return set_attr.call(null, renderer, el, cherry_core.keyword("default-value"), new_attrs);
};

};
var render_default_alias = function (tag_name, _attrs, children) {
return cherry_core.vector(cherry_core.keyword("div"), cherry_core.array_map(cherry_core.keyword("data-replicant-error"), `${"Undefined alias "}${tag_name??''}`), (() => {
const iter__24061__auto___1 = (function iter__10912 (s__10913) {
return (new cherry_core.LazySeq(null, (function () {
let s__10913_2 = s__10913;
while(true){
const temp__23929__auto___3 = cherry_core.seq.call(null, s__10913_2);
if (cherry_core.truth_.call(null, temp__23929__auto___3)) {
const s__10913_4 = temp__23929__auto___3;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, s__10913_4))) {
const c__24058__auto___5 = cherry_core.chunk_first.call(null, s__10913_4);
const size__24059__auto___6 = cherry_core.count.call(null, c__24058__auto___5);
const b__10915_7 = cherry_core.chunk_buffer.call(null, size__24059__auto___6);
if ((() => {
let i__10914_8 = 0;
while(true){
if ((i__10914_8 < size__24059__auto___6)) {
const child_9 = cherry_core._nth.call(null, c__24058__auto___5, i__10914_8);
cherry_core.chunk_append.call(null, b__10915_7, (() => {
const G__11096_10 = child_9;
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___11 = cherry_core.not.call(null, cherry_core.string_QMARK_.call(null, child_9));
if (cherry_core.truth_.call(null, and__24022__auto___11)) {
return cherry_core.not.call(null, h.hiccup_QMARK_.call(null, child_9))} else {
return and__24022__auto___11};

})())) {
return cherry_core.pr_str.call(null, G__11096_10)} else {
return G__11096_10};

})());
let G__12 = cherry_core.unchecked_inc.call(null, i__10914_8);
i__10914_8 = G__12;
continue;
} else {
return true};
;break;
}

})()) {
return cherry_core.chunk_cons.call(null, cherry_core.chunk.call(null, b__10915_7), iter__10912.call(null, cherry_core.chunk_rest.call(null, s__10913_4)))} else {
return cherry_core.chunk_cons.call(null, cherry_core.chunk.call(null, b__10915_7), null)};
} else {
const child_13 = cherry_core.first.call(null, s__10913_4);
return cherry_core.cons.call(null, (() => {
const G__11237_14 = child_13;
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___15 = cherry_core.not.call(null, cherry_core.string_QMARK_.call(null, child_13));
if (cherry_core.truth_.call(null, and__24022__auto___15)) {
return cherry_core.not.call(null, h.hiccup_QMARK_.call(null, child_13))} else {
return and__24022__auto___15};

})())) {
return cherry_core.pr_str.call(null, G__11237_14)} else {
return G__11237_14};

})(), iter__10912.call(null, cherry_core.rest.call(null, s__10913_4)));
};
};
;break;
}
;

}), null, null));

});
return iter__24061__auto___1.call(null, children);

})());

};
var add_classes = function (class_attr, classes) {
if (cherry_core.truth_.call(null, cherry_core.coll_QMARK_.call(null, class_attr))) {
return cherry_core.set.call(null, cherry_core.concat.call(null, class_attr, classes))} else {
if ((class_attr == null)) {
return cherry_core.set.call(null, classes)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return cherry_core.conj.call(null, cherry_core.set.call(null, classes), class_attr)} else {
return null}}};

};
var get_alias_headers = function (p__11433, headers) {
const map__11439_1 = p__11433;
const map__11439_2 = cherry_core.__destructure_map.call(null, map__11439_1);
const aliases_3 = cherry_core.get.call(null, map__11439_2, cherry_core.keyword("aliases"));
const alias_data_4 = cherry_core.get.call(null, map__11439_2, cherry_core.keyword("alias-data"));
const on_alias_exception_5 = cherry_core.get.call(null, map__11439_2, cherry_core.keyword("on-alias-exception"));
const tag_name_6 = headers[0];
if (cherry_core.truth_.call(null, cherry_core.qualified_keyword_QMARK_.call(null, tag_name_6))) {
const f_7 = (() => {
const or__23992__auto___8 = cherry_core.get.call(null, aliases_3, tag_name_6);
if (cherry_core.truth_.call(null, or__23992__auto___8)) {
return or__23992__auto___8} else {
return cherry_core.partial.call(null, render_default_alias, tag_name_6)};

})();
const id_9 = headers[1];
const classes_10 = headers[2];
const attrs_11 = headers[4];
const attrs_12 = (() => {
const G__11565_13 = attrs_11;
const G__11565_14 = ((cherry_core.truth_.call(null, id_9)) ? (cherry_core.update.call(null, G__11565_13, cherry_core.keyword("id"), (function (_PERCENT_1) {
const or__23992__auto___15 = _PERCENT_1;
if (cherry_core.truth_.call(null, or__23992__auto___15)) {
return or__23992__auto___15} else {
return id_9};

}))) : (G__11565_13));
const G__11565_16 = ((cherry_core.truth_.call(null, (() => {
const or__23992__auto___17 = cherry_core.seq.call(null, classes_10);
if (cherry_core.truth_.call(null, or__23992__auto___17)) {
return or__23992__auto___17} else {
return cherry_core.keyword("class").call(null, attrs_11)};

})())) ? (cherry_core.update.call(null, G__11565_14, cherry_core.keyword("class"), add_classes, classes_10)) : (G__11565_14));
if (cherry_core.truth_.call(null, alias_data_4)) {
return cherry_core.assoc.call(null, G__11565_16, cherry_core.keyword("replicant/alias-data"), alias_data_4)} else {
return G__11565_16};

})();
const children_18 = __GT_seq.call(null, flatten_seqs.call(null, headers[5]));
const alias_hiccup_19 = f_7.call(null, attrs_12, children_18);
const hh__2352__auto___20 = get_hiccup_headers.call(null, null, alias_hiccup_19);
const alias__2353__auto___21 = headers;
if (cherry_core.truth_.call(null, hh__2352__auto___20)) {
const G__11761_22 = hh__2352__auto___20;
(G__11761_22[3] = (() => {
const or__23992__auto___23 = alias__2353__auto___21[3];
if (cherry_core.truth_.call(null, or__23992__auto___23)) {
return or__23992__auto___23} else {
return hh__2352__auto___20[3]};

})());
(G__11761_22[6] = alias__2353__auto___21[6]);
(G__11761_22[7] = hh__2352__auto___20[7]);
(G__11761_22[9] = alias__2353__auto___21[7]);
return G__11761_22;
};
};

};
var get_ns = function (headers) {
if (("foreignObject" === headers[0])) {
return null} else {
const or__23992__auto___1 = headers[6];
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
if (("svg" === headers[0])) {
return "http://www.w3.org/2000/svg";
}};
};

};
var create_node = function (p__12002, headers) {
const map__12008_1 = p__12002;
const map__12008_2 = cherry_core.__destructure_map.call(null, map__12008_1);
const impl_3 = map__12008_2;
const renderer_4 = cherry_core.get.call(null, map__12008_2, cherry_core.keyword("renderer"));
const or__23992__auto___5 = (() => {
const temp__23929__auto___6 = headers[8];
if (cherry_core.truth_.call(null, temp__23929__auto___6)) {
const text_7 = temp__23929__auto___6;
return cherry_core.vector(r.create_text_node.call(null, renderer_4, text_7), (() => {
const text__4045__auto___8 = text_7;
return (new Array(null, null, null, null, null, null, false, text__4045__auto___8, text__4045__auto___8, null, null));

})());
};

})();
if (cherry_core.truth_.call(null, or__23992__auto___5)) {
return or__23992__auto___5} else {
const or__23992__auto___9 = (() => {
const temp__23929__auto___10 = get_alias_headers.call(null, impl_3, headers);
if (cherry_core.truth_.call(null, temp__23929__auto___10)) {
const alias_headers_11 = temp__23929__auto___10;
const vec__12179_12 = create_node.call(null, impl_3, alias_headers_11);
const child_node_13 = cherry_core.nth.call(null, vec__12179_12, 0, null);
const vdom_14 = cherry_core.nth.call(null, vec__12179_12, 1, null);
const k_15 = alias_headers_11[3];
const vdom_16 = (() => {
const headers__4054__auto___17 = headers;
return (new Array(headers__4054__auto___17[0], headers__4054__auto___17[3], headers__4054__auto___17[2], headers[4], cherry_core.vector(vdom_14), (() => {
const G__12247_18 = cherry_core.hash_set();
if (cherry_core.truth_.call(null, k_15)) {
return cherry_core.conj.call(null, G__12247_18, k_15)} else {
return G__12247_18};

})(), cherry_core.boolean$.call(null, cherry_core.keyword("replicant/unmounting").call(null, headers__4054__auto___17[4])), headers__4054__auto___17[7], null, null, 1));

})();
return cherry_core.vector(child_node_13, vdom_16);
};

})();
if (cherry_core.truth_.call(null, or__23992__auto___9)) {
return or__23992__auto___9} else {
const tag_name_19 = headers[0];
const ns_20 = get_ns.call(null, headers);
const node_21 = r.create_element.call(null, renderer_4, tag_name_19, ((cherry_core.truth_.call(null, ns_20)) ? (cherry_core.array_map(cherry_core.keyword("ns"), ns_20)) : (null)));
const vec__12313_22 = get_mounting_attrs.call(null, headers);
const attrs_23 = cherry_core.nth.call(null, vec__12313_22, 0, null);
const mounting_attrs_24 = cherry_core.nth.call(null, vec__12313_22, 1, null);
const __25 = set_attributes.call(null, renderer_4, node_21, (() => {
const or__23992__auto___26 = mounting_attrs_24;
if (cherry_core.truth_.call(null, or__23992__auto___26)) {
return or__23992__auto___26} else {
return attrs_23};

})());
const vec__12316_27 = cherry_core.reduce.call(null, (function (p__12419, child_headers) {
const vec__12425_28 = p__12419;
const children_29 = cherry_core.nth.call(null, vec__12425_28, 0, null);
const ks_30 = cherry_core.nth.call(null, vec__12425_28, 1, null);
const n_31 = cherry_core.nth.call(null, vec__12425_28, 2, null);
if (cherry_core.truth_.call(null, child_headers)) {
const vec__12468_32 = create_node.call(null, impl_3, child_headers);
const child_node_33 = cherry_core.nth.call(null, vec__12468_32, 0, null);
const vdom_34 = cherry_core.nth.call(null, vec__12468_32, 1, null);
const k_35 = vdom_34[1];
r.append_child.call(null, renderer_4, node_21, child_node_33);
return cherry_core.vector(cherry_core.conj_BANG_.call(null, children_29, vdom_34), (() => {
const G__12506_36 = ks_30;
if (cherry_core.truth_.call(null, k_35)) {
return cherry_core.conj_BANG_.call(null, G__12506_36, k_35)} else {
return G__12506_36};

})(), cherry_core.unchecked_inc_int.call(null, n_31));
} else {
return cherry_core.vector(cherry_core.conj_BANG_.call(null, children_29, null), ks_30, n_31)};

}), cherry_core.vector(cherry_core.transient$.call(null, cherry_core.vector()), cherry_core.transient$.call(null, cherry_core.hash_set()), 0), get_children.call(null, headers, ns_20));
const children_37 = cherry_core.nth.call(null, vec__12316_27, 0, null);
const ks_38 = cherry_core.nth.call(null, vec__12316_27, 1, null);
const n_children_39 = cherry_core.nth.call(null, vec__12316_27, 2, null);
register_hooks.call(null, impl_3, node_21, headers);
if (cherry_core.truth_.call(null, mounting_attrs_24)) {
register_mount.call(null, impl_3, node_21, mounting_attrs_24, attrs_23)};
return cherry_core.vector(node_21, (() => {
const headers__4054__auto___40 = headers;
return (new Array(headers__4054__auto___40[0], headers__4054__auto___40[3], headers__4054__auto___40[2], attrs_23, cherry_core.persistent_BANG_.call(null, children_37), cherry_core.persistent_BANG_.call(null, ks_38), cherry_core.boolean$.call(null, cherry_core.keyword("replicant/unmounting").call(null, headers__4054__auto___40[4])), headers__4054__auto___40[7], null, null, n_children_39));

})());
};
};

};
var reusable_QMARK_ = function (headers, vdom) {
const or__23992__auto___1 = (() => {
const and__24022__auto___2 = headers[8];
if (cherry_core.truth_.call(null, and__24022__auto___2)) {
return vdom[8]} else {
return and__24022__auto___2};

})();
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
return (cherry_core._EQ_.call(null, headers[3], vdom[1]) && cherry_core._EQ_.call(null, headers[0], vdom[0]))};

};
var same_QMARK_ = function (headers, vdom) {
return (cherry_core._EQ_.call(null, headers[3], vdom[1]) && cherry_core._EQ_.call(null, headers[0], vdom[0]));

};
var index_of = function (f, xs) {
let coll_n_1 = 0;
let dom_n_2 = 0;
let xs_3 = cherry_core.seq.call(null, xs);
while(true){
if ((xs_3 == null)) {
return cherry_core.vector(-1, -1)} else {
if ((cherry_core.first.call(null, xs_3) == null)) {
let G__4 = cherry_core.unchecked_inc_int.call(null, coll_n_1);
let G__5 = dom_n_2;
let G__6 = cherry_core.next.call(null, xs_3);
coll_n_1 = G__4;
dom_n_2 = G__5;
xs_3 = G__6;
continue;
} else {
if (cherry_core.truth_.call(null, f.call(null, cherry_core.first.call(null, xs_3)))) {
return cherry_core.vector(coll_n_1, dom_n_2)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
let G__7 = cherry_core.unchecked_inc_int.call(null, coll_n_1);
let G__8 = cherry_core.unchecked_inc_int.call(null, dom_n_2);
let G__9 = cherry_core.next.call(null, xs_3);
coll_n_1 = G__7;
dom_n_2 = G__8;
xs_3 = G__9;
continue;
} else {
return null}}}};
;break;
}
;

};
var insert_children = function (p__13022, el, children, vdom) {
const map__13028_1 = p__13022;
const map__13028_2 = cherry_core.__destructure_map.call(null, map__13028_1);
const impl_3 = map__13028_2;
const renderer_4 = cherry_core.get.call(null, map__13028_2, cherry_core.keyword("renderer"));
return cherry_core.reduce.call(null, (function (p__13059, child) {
const vec__13065_5 = p__13059;
const res_6 = cherry_core.nth.call(null, vec__13065_5, 0, null);
const n_7 = cherry_core.nth.call(null, vec__13065_5, 1, null);
if (cherry_core.truth_.call(null, child)) {
const vec__13103_8 = create_node.call(null, impl_3, child);
const node_9 = cherry_core.nth.call(null, vec__13103_8, 0, null);
const vdom_10 = cherry_core.nth.call(null, vec__13103_8, 1, null);
r.append_child.call(null, renderer_4, el, node_9);
return cherry_core.vector(cherry_core.conj_BANG_.call(null, res_6, vdom_10), cherry_core.unchecked_inc_int.call(null, n_7));
} else {
return cherry_core.vector(cherry_core.conj_BANG_.call(null, res_6, null), n_7)};

}), cherry_core.vector(vdom, 0), children);

};
var remove_child = function (p__13161, unmounts, el, n, vdom) {
const map__13167_1 = p__13161;
const map__13167_2 = cherry_core.__destructure_map.call(null, map__13167_1);
const impl_3 = map__13167_2;
const renderer_4 = cherry_core.get.call(null, map__13167_2, cherry_core.keyword("renderer"));
const temp__23846__auto___5 = vdom[9];
if (cherry_core.truth_.call(null, temp__23846__auto___5)) {
const id_6 = temp__23846__auto___5;
if (cherry_core.truth_.call(null, cherry_core.contains_QMARK_.call(null, unmounts, id_6))) {
return vdom;
};
} else {
const res_7 = (() => {
const temp__23846__auto___8 = get_unmounting_attrs.call(null, vdom);
if (cherry_core.truth_.call(null, temp__23846__auto___8)) {
const attrs_9 = temp__23846__auto___8;
const vdom_10 = (() => {
const vdom__4037__auto___11 = vdom;
(vdom__4037__auto___11[9] = cherry_core.vreset_BANG_.call(null, replicant_DOT_vdom.id, (cherry_core.deref.call(null, replicant_DOT_vdom.id) + 1)));
return vdom__4037__auto___11;

})();
const child_12 = r.get_child.call(null, renderer_4, el, n);
update_attributes.call(null, renderer_4, child_12, attrs_9, vdom_10[3]);
cherry_core.vreset_BANG_.call(null, cherry_core.keyword("unmounts").call(null, impl_3), cherry_core.conj.call(null, cherry_core.deref.call(null, cherry_core.keyword("unmounts").call(null, impl_3)), vdom_10[9]));
r.on_transition_end.call(null, renderer_4, child_12, (function () {
cherry_core.vreset_BANG_.call(null, cherry_core.keyword("unmounts").call(null, impl_3), cherry_core.disj.call(null, cherry_core.deref.call(null, cherry_core.keyword("unmounts").call(null, impl_3)), vdom_10[9]));
r.remove_child.call(null, renderer_4, el, child_12);
const temp__23929__auto___13 = cherry_core.keyword("replicant/on-render").call(null, vdom_10[3]);
if (cherry_core.truth_.call(null, temp__23929__auto___13)) {
const hook_14 = temp__23929__auto___13;
call_hook.call(null, renderer_4, cherry_core.vector(hook_14, cherry_core.keyword("replicant/on-render"), child_12, null, vdom_10))};
return renderer_4;

}));
return vdom_10;
} else {
const child_15 = r.get_child.call(null, renderer_4, el, n);
r.remove_child.call(null, renderer_4, el, child_15);
register_hooks.call(null, impl_3, child_15, null, vdom);
return null;
};

})();
return res_7;
};

};
var move_node_details = cherry_core.vector(cherry_core.keyword("replicant/move-node"));
var unchanged_QMARK_ = function (headers, vdom) {
return cherry_core._EQ_.call(null, (() => {
const G__13518_1 = headers;
if ((G__13518_1 == null)) {
return null} else {
return G__13518_1[7]};

})(), (() => {
const G__13544_2 = vdom;
if ((G__13544_2 == null)) {
return null} else {
return G__13544_2[7]};

})());

};
var move_nodes = function (p__13600, el, headers, new_children, vdom, old_children, n, n_children) {
const map__13606_1 = p__13600;
const map__13606_2 = cherry_core.__destructure_map.call(null, map__13606_1);
const impl_3 = map__13606_2;
const renderer_4 = cherry_core.get.call(null, map__13606_2, cherry_core.keyword("renderer"));
const vec__13627_5 = ((cherry_core.truth_.call(null, headers[3])) ? (index_of.call(null, (function (_PERCENT_1) {
return same_QMARK_.call(null, headers, _PERCENT_1);

}), old_children)) : (cherry_core.vector(-1, -1)));
const o_idx_6 = cherry_core.nth.call(null, vec__13627_5, 0, null);
const o_dom_idx_7 = cherry_core.nth.call(null, vec__13627_5, 1, null);
const vec__13630_8 = ((cherry_core.truth_.call(null, vdom[1])) ? (index_of.call(null, (function (_PERCENT_1) {
return same_QMARK_.call(null, _PERCENT_1, vdom);

}), new_children)) : (cherry_core.vector(-1, -1)));
const n_idx_9 = cherry_core.nth.call(null, vec__13630_8, 0, null);
const n_dom_idx_10 = cherry_core.nth.call(null, vec__13630_8, 1, null);
if ((o_idx_6 < n_idx_9)) {
const idx_11 = cherry_core.unchecked_inc_int.call(null, cherry_core.unchecked_add_int.call(null, n, n_dom_idx_10));
const child_12 = r.get_child.call(null, renderer_4, el, n);
if ((idx_11 < n_children)) {
r.insert_before.call(null, renderer_4, el, child_12, r.get_child.call(null, renderer_4, el, idx_11))} else {
r.append_child.call(null, renderer_4, el, child_12)};
register_hooks.call(null, impl_3, child_12, cherry_core.nth.call(null, new_children, n_idx_9), vdom, move_node_details);
return cherry_core.vector(new_children, cherry_core.concat.call(null, cherry_core.take.call(null, n_idx_9, cherry_core.next.call(null, old_children)), cherry_core.vector(cherry_core.first.call(null, old_children)), cherry_core.drop.call(null, cherry_core.unchecked_inc_int.call(null, n_idx_9), old_children)), n, cherry_core.unchecked_dec_int.call(null, idx_11));
} else {
const idx_13 = cherry_core.unchecked_add_int.call(null, n, o_dom_idx_7);
const child_14 = r.get_child.call(null, renderer_4, el, idx_13);
const corresponding_old_vdom_15 = cherry_core.nth.call(null, old_children, o_idx_6);
r.insert_before.call(null, renderer_4, el, child_14, r.get_child.call(null, renderer_4, el, n));
reconcile_STAR_.call(null, impl_3, el, headers, corresponding_old_vdom_15, n);
if (cherry_core.truth_.call(null, unchanged_QMARK_.call(null, headers, corresponding_old_vdom_15))) {
register_hooks.call(null, impl_3, child_14, headers, corresponding_old_vdom_15, move_node_details)};
return cherry_core.vector(cherry_core.next.call(null, new_children), cherry_core.concat.call(null, cherry_core.take.call(null, o_idx_6, old_children), cherry_core.drop.call(null, cherry_core.unchecked_inc_int.call(null, o_idx_6), old_children)), cherry_core.unchecked_inc_int.call(null, n), cherry_core.unchecked_inc_int.call(null, cherry_core.unchecked_add_int.call(null, n, o_idx_6)), corresponding_old_vdom_15);
};

};
var insert_node = function (r, el, child, n, n_children) {
if ((n_children <= n)) {
return replicant_DOT_protocols.append_child.call(null, r, el, child)} else {
return replicant_DOT_protocols.insert_before.call(null, r, el, child, replicant_DOT_protocols.get_child.call(null, r, el, n))};

};
var update_children = function (impl, el, new_children, new_ks, old_children, old_ks, n_children) {
const r_1 = cherry_core.keyword("renderer").call(null, impl);
const unmounts_2 = cherry_core.deref.call(null, cherry_core.keyword("unmounts").call(null, impl));
let new_c_3 = cherry_core.seq.call(null, new_children);
let old_c_4 = cherry_core.seq.call(null, old_children);
let n_5 = 0;
let move_n_6 = 0;
let n_children_7 = (() => {
const or__23992__auto___8 = n_children;
if (cherry_core.truth_.call(null, or__23992__auto___8)) {
return or__23992__auto___8} else {
return 0};

})();
let changed_QMARK__9 = false;
let vdom_10 = cherry_core.transient$.call(null, cherry_core.vector());
while(true){
const new_headers_11 = cherry_core.first.call(null, new_c_3);
const old_vdom_12 = cherry_core.first.call(null, old_c_4);
const new_empty_QMARK__13 = (new_c_3 == null);
const old_empty_QMARK__14 = (old_c_4 == null);
const new_nil_QMARK__15 = (new_headers_11 == null);
const old_nil_QMARK__16 = (old_vdom_12 == null);
if (cherry_core.truth_.call(null, (new_empty_QMARK__13 && old_empty_QMARK__14))) {
return cherry_core.vector(changed_QMARK__9, cherry_core.persistent_BANG_.call(null, vdom_10), new_ks, n_children_7)} else {
if (new_empty_QMARK__13) {
let children_17 = cherry_core.seq.call(null, old_c_4);
let vdom_18 = vdom_10;
let n_19 = n_5;
let n_children_20 = n_children_7;
while(true){
if ((children_17 == null)) {
return cherry_core.vector(true, cherry_core.persistent_BANG_.call(null, vdom_18), new_ks, n_children_20)} else {
if ((cherry_core.first.call(null, children_17) == null)) {
let G__21 = cherry_core.next.call(null, children_17);
let G__22 = cherry_core.conj_BANG_.call(null, vdom_18, null);
let G__23 = n_19;
let G__24 = n_children_20;
children_17 = G__21;
vdom_18 = G__22;
n_19 = G__23;
n_children_20 = G__24;
continue;
} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
const temp__23846__auto___25 = remove_child.call(null, impl, unmounts_2, el, n_19, cherry_core.first.call(null, children_17));
if (cherry_core.truth_.call(null, temp__23846__auto___25)) {
const pending_vdom_26 = temp__23846__auto___25;
let G__27 = cherry_core.next.call(null, children_17);
let G__28 = cherry_core.conj_BANG_.call(null, vdom_18, pending_vdom_26);
let G__29 = cherry_core.unchecked_inc_int.call(null, n_19);
let G__30 = n_children_20;
children_17 = G__27;
vdom_18 = G__28;
n_19 = G__29;
n_children_20 = G__30;
continue;
} else {
let G__31 = cherry_core.next.call(null, children_17);
let G__32 = vdom_18;
let G__33 = n_19;
let G__34 = cherry_core.unchecked_dec_int.call(null, n_children_20);
children_17 = G__31;
vdom_18 = G__32;
n_19 = G__33;
n_children_20 = G__34;
continue;
};
} else {
return null}}};
;break;
}
} else {
if (old_empty_QMARK__14) {
const vec__14293_35 = insert_children.call(null, impl, el, new_c_3, vdom_10);
const vdom_36 = cherry_core.nth.call(null, vec__14293_35, 0, null);
const n_37 = cherry_core.nth.call(null, vec__14293_35, 1, null);
return cherry_core.vector(true, cherry_core.persistent_BANG_.call(null, vdom_36), new_ks, (n_children_7 + n_37));
} else {
if (cherry_core.truth_.call(null, (new_nil_QMARK__15 && old_nil_QMARK__16))) {
let G__38 = cherry_core.next.call(null, new_c_3);
let G__39 = cherry_core.next.call(null, old_c_4);
let G__40 = n_5;
let G__41 = move_n_6;
let G__42 = n_children_7;
let G__43 = changed_QMARK__9;
let G__44 = cherry_core.conj_BANG_.call(null, vdom_10, null);
new_c_3 = G__38;
old_c_4 = G__39;
n_5 = G__40;
move_n_6 = G__41;
n_children_7 = G__42;
changed_QMARK__9 = G__43;
vdom_10 = G__44;
continue;
} else {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___45 = old_vdom_12;
if (cherry_core.truth_.call(null, and__24022__auto___45)) {
return old_vdom_12[9]} else {
return and__24022__auto___45};

})())) {
const vec__14426_46 = ((cherry_core.truth_.call(null, (() => {
const and__24022__auto___47 = new_headers_11;
if (cherry_core.truth_.call(null, and__24022__auto___47)) {
return cherry_core.not.call(null, cherry_core.contains_QMARK_.call(null, old_ks, new_headers_11[3]))} else {
return and__24022__auto___47};

})())) ? ((() => {
const res_48 = create_node.call(null, impl, new_headers_11);
insert_node.call(null, r_1, el, cherry_core.first.call(null, res_48), n_5, n_children_7);
return res_48;

})()) : (null));
const child_49 = cherry_core.nth.call(null, vec__14426_46, 0, null);
const child_vdom_50 = cherry_core.nth.call(null, vec__14426_46, 1, null);
if (cherry_core.truth_.call(null, cherry_core.contains_QMARK_.call(null, unmounts_2, old_vdom_12[9]))) {
if (new_nil_QMARK__15) {
let G__51 = cherry_core.next.call(null, new_c_3);
let G__52 = cherry_core.next.call(null, old_c_4);
let G__53 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__54 = move_n_6;
let G__55 = n_children_7;
let G__56 = changed_QMARK__9;
let G__57 = cherry_core.conj_BANG_.call(null, vdom_10, old_vdom_12);
new_c_3 = G__51;
old_c_4 = G__52;
n_5 = G__53;
move_n_6 = G__54;
n_children_7 = G__55;
changed_QMARK__9 = G__56;
vdom_10 = G__57;
continue;
} else {
if (cherry_core.truth_.call(null, child_49)) {
let G__58 = cherry_core.next.call(null, new_c_3);
let G__59 = cherry_core.next.call(null, old_c_4);
let G__60 = (n_5 + 2);
let G__61 = move_n_6;
let G__62 = cherry_core.unchecked_inc_int.call(null, n_children_7);
let G__63 = true;
let G__64 = cherry_core.conj_BANG_.call(null, cherry_core.conj_BANG_.call(null, vdom_10, child_vdom_50), old_vdom_12);
new_c_3 = G__58;
old_c_4 = G__59;
n_5 = G__60;
move_n_6 = G__61;
n_children_7 = G__62;
changed_QMARK__9 = G__63;
vdom_10 = G__64;
continue;
} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
let G__65 = new_c_3;
let G__66 = cherry_core.next.call(null, old_c_4);
let G__67 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__68 = move_n_6;
let G__69 = n_children_7;
let G__70 = changed_QMARK__9;
let G__71 = cherry_core.conj_BANG_.call(null, vdom_10, old_vdom_12);
new_c_3 = G__65;
old_c_4 = G__66;
n_5 = G__67;
move_n_6 = G__68;
n_children_7 = G__69;
changed_QMARK__9 = G__70;
vdom_10 = G__71;
continue;
} else {
return null}}}} else {
if (new_nil_QMARK__15) {
let G__72 = cherry_core.next.call(null, new_c_3);
let G__73 = cherry_core.next.call(null, old_c_4);
let G__74 = n_5;
let G__75 = cherry_core.unchecked_dec_int.call(null, move_n_6);
let G__76 = cherry_core.unchecked_dec_int.call(null, n_children_7);
let G__77 = changed_QMARK__9;
let G__78 = cherry_core.conj_BANG_.call(null, vdom_10, null);
new_c_3 = G__72;
old_c_4 = G__73;
n_5 = G__74;
move_n_6 = G__75;
n_children_7 = G__76;
changed_QMARK__9 = G__77;
vdom_10 = G__78;
continue;
} else {
if (cherry_core.truth_.call(null, child_49)) {
let G__79 = cherry_core.next.call(null, new_c_3);
let G__80 = cherry_core.next.call(null, old_c_4);
let G__81 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__82 = move_n_6;
let G__83 = n_children_7;
let G__84 = true;
let G__85 = cherry_core.conj_BANG_.call(null, vdom_10, child_vdom_50);
new_c_3 = G__79;
old_c_4 = G__80;
n_5 = G__81;
move_n_6 = G__82;
n_children_7 = G__83;
changed_QMARK__9 = G__84;
vdom_10 = G__85;
continue;
} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
let G__86 = new_c_3;
let G__87 = cherry_core.next.call(null, old_c_4);
let G__88 = n_5;
let G__89 = cherry_core.unchecked_dec_int.call(null, move_n_6);
let G__90 = cherry_core.unchecked_dec_int.call(null, n_children_7);
let G__91 = changed_QMARK__9;
let G__92 = vdom_10;
new_c_3 = G__86;
old_c_4 = G__87;
n_5 = G__88;
move_n_6 = G__89;
n_children_7 = G__90;
changed_QMARK__9 = G__91;
vdom_10 = G__92;
continue;
} else {
return null}}}};
} else {
if (new_nil_QMARK__15) {
if (cherry_core.truth_.call(null, cherry_core.contains_QMARK_.call(null, new_ks, old_vdom_12[1]))) {
let G__93 = cherry_core.next.call(null, new_c_3);
let G__94 = old_c_4;
let G__95 = n_5;
let G__96 = move_n_6;
let G__97 = n_children_7;
let G__98 = true;
let G__99 = vdom_10;
new_c_3 = G__93;
old_c_4 = G__94;
n_5 = G__95;
move_n_6 = G__96;
n_children_7 = G__97;
changed_QMARK__9 = G__98;
vdom_10 = G__99;
continue;
} else {
const temp__23846__auto___100 = remove_child.call(null, impl, unmounts_2, el, n_5, old_vdom_12);
if (cherry_core.truth_.call(null, temp__23846__auto___100)) {
const unmounting_node_101 = temp__23846__auto___100;
let G__102 = cherry_core.next.call(null, new_c_3);
let G__103 = cherry_core.next.call(null, old_c_4);
let G__104 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__105 = move_n_6;
let G__106 = n_children_7;
let G__107 = true;
let G__108 = cherry_core.conj_BANG_.call(null, vdom_10, unmounting_node_101);
new_c_3 = G__102;
old_c_4 = G__103;
n_5 = G__104;
move_n_6 = G__105;
n_children_7 = G__106;
changed_QMARK__9 = G__107;
vdom_10 = G__108;
continue;
} else {
let G__109 = cherry_core.next.call(null, new_c_3);
let G__110 = cherry_core.next.call(null, old_c_4);
let G__111 = n_5;
let G__112 = move_n_6;
let G__113 = cherry_core.unchecked_dec_int.call(null, n_children_7);
let G__114 = true;
let G__115 = cherry_core.conj_BANG_.call(null, vdom_10, null);
new_c_3 = G__109;
old_c_4 = G__110;
n_5 = G__111;
move_n_6 = G__112;
n_children_7 = G__113;
changed_QMARK__9 = G__114;
vdom_10 = G__115;
continue;
};
}} else {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___116 = old_vdom_12;
if (cherry_core.truth_.call(null, and__24022__auto___116)) {
return reusable_QMARK_.call(null, new_headers_11, old_vdom_12)} else {
return and__24022__auto___116};

})())) {
const new_vdom_117 = reconcile_STAR_.call(null, impl, el, new_headers_11, old_vdom_12, n_5);
const node_unchanged_QMARK__118 = unchanged_QMARK_.call(null, new_headers_11, old_vdom_12);
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___119 = node_unchanged_QMARK__118;
if (cherry_core.truth_.call(null, and__24022__auto___119)) {
return (n_5 < move_n_6)} else {
return and__24022__auto___119};

})())) {
register_hooks.call(null, impl, replicant_DOT_protocols.get_child.call(null, r_1, el, n_5), new_headers_11, old_vdom_12, move_node_details)};
let G__120 = cherry_core.next.call(null, new_c_3);
let G__121 = cherry_core.next.call(null, old_c_4);
let G__122 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__123 = move_n_6;
let G__124 = n_children_7;
let G__125 = (() => {
const or__23992__auto___126 = changed_QMARK__9;
if (or__23992__auto___126) {
return or__23992__auto___126} else {
return cherry_core.not.call(null, node_unchanged_QMARK__118)};

})();
let G__127 = cherry_core.conj_BANG_.call(null, vdom_10, new_vdom_117);
new_c_3 = G__120;
old_c_4 = G__121;
n_5 = G__122;
move_n_6 = G__123;
n_children_7 = G__124;
changed_QMARK__9 = G__125;
vdom_10 = G__127;
continue;
} else {
if (cherry_core.truth_.call(null, cherry_core.not.call(null, cherry_core.contains_QMARK_.call(null, old_ks, new_headers_11[3])))) {
const vec__15129_128 = create_node.call(null, impl, new_headers_11);
const child_129 = cherry_core.nth.call(null, vec__15129_128, 0, null);
const child_vdom_130 = cherry_core.nth.call(null, vec__15129_128, 1, null);
insert_node.call(null, r_1, el, child_129, n_5, n_children_7);
let G__131 = cherry_core.next.call(null, new_c_3);
let G__132 = (() => {
const G__15167_133 = old_c_4;
if ((old_vdom_12 == null)) {
return cherry_core.next.call(null, G__15167_133)} else {
return G__15167_133};

})();
let G__134 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__135 = move_n_6;
let G__136 = cherry_core.unchecked_inc_int.call(null, n_children_7);
let G__137 = true;
let G__138 = cherry_core.conj_BANG_.call(null, vdom_10, child_vdom_130);
new_c_3 = G__131;
old_c_4 = G__132;
n_5 = G__134;
move_n_6 = G__135;
n_children_7 = G__136;
changed_QMARK__9 = G__137;
vdom_10 = G__138;
continue;
} else {
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___139 = old_nil_QMARK__16;
if (or__23992__auto___139) {
return or__23992__auto___139} else {
return cherry_core.not.call(null, cherry_core.contains_QMARK_.call(null, new_ks, old_vdom_12[1]))};

})())) {
if (old_nil_QMARK__16) {
let G__140 = new_c_3;
let G__141 = cherry_core.next.call(null, old_c_4);
let G__142 = n_5;
let G__143 = move_n_6;
let G__144 = n_children_7;
let G__145 = changed_QMARK__9;
let G__146 = vdom_10;
new_c_3 = G__140;
old_c_4 = G__141;
n_5 = G__142;
move_n_6 = G__143;
n_children_7 = G__144;
changed_QMARK__9 = G__145;
vdom_10 = G__146;
continue;
} else {
const temp__23846__auto___147 = remove_child.call(null, impl, unmounts_2, el, n_5, old_vdom_12);
if (cherry_core.truth_.call(null, temp__23846__auto___147)) {
const unmounting_node_148 = temp__23846__auto___147;
let G__149 = new_c_3;
let G__150 = cherry_core.next.call(null, old_c_4);
let G__151 = cherry_core.unchecked_inc_int.call(null, n_5);
let G__152 = move_n_6;
let G__153 = n_children_7;
let G__154 = true;
let G__155 = cherry_core.conj_BANG_.call(null, vdom_10, unmounting_node_148);
new_c_3 = G__149;
old_c_4 = G__150;
n_5 = G__151;
move_n_6 = G__152;
n_children_7 = G__153;
changed_QMARK__9 = G__154;
vdom_10 = G__155;
continue;
} else {
let G__156 = new_c_3;
let G__157 = cherry_core.next.call(null, old_c_4);
let G__158 = n_5;
let G__159 = move_n_6;
let G__160 = cherry_core.unchecked_dec_int.call(null, n_children_7);
let G__161 = true;
let G__162 = vdom_10;
new_c_3 = G__156;
old_c_4 = G__157;
n_5 = G__158;
move_n_6 = G__159;
n_children_7 = G__160;
changed_QMARK__9 = G__161;
vdom_10 = G__162;
continue;
};
}} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
const vec__15363_163 = move_nodes.call(null, impl, el, new_headers_11, new_c_3, old_vdom_12, old_c_4, n_5, n_children_7);
const nc_164 = cherry_core.nth.call(null, vec__15363_163, 0, null);
const oc_165 = cherry_core.nth.call(null, vec__15363_163, 1, null);
const n_166 = cherry_core.nth.call(null, vec__15363_163, 2, null);
const move_n_167 = cherry_core.nth.call(null, vec__15363_163, 3, null);
const vdom_node_168 = cherry_core.nth.call(null, vec__15363_163, 4, null);
let G__169 = nc_164;
let G__170 = oc_165;
let G__171 = n_166;
let G__172 = move_n_167;
let G__173 = n_children_7;
let G__174 = true;
let G__175 = (() => {
const G__15406_176 = vdom_10;
if (cherry_core.truth_.call(null, vdom_node_168)) {
return cherry_core.conj_BANG_.call(null, G__15406_176, vdom_node_168)} else {
return G__15406_176};

})();
new_c_3 = G__169;
old_c_4 = G__170;
n_5 = G__171;
move_n_6 = G__172;
n_children_7 = G__173;
changed_QMARK__9 = G__174;
vdom_10 = G__175;
continue;
} else {
return null}}}}}}}}}};
;break;
}
;

};
var reconcile_STAR_ = function (p__15452, el, headers, vdom, index) {
const map__15458_1 = p__15452;
const map__15458_2 = cherry_core.__destructure_map.call(null, map__15458_1);
const impl_3 = map__15458_2;
const renderer_4 = cherry_core.get.call(null, map__15458_2, cherry_core.keyword("renderer"));
const or__23992__auto___5 = ((cherry_core.truth_.call(null, unchanged_QMARK_.call(null, headers, vdom))) ? (vdom) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___5)) {
return or__23992__auto___5} else {
const or__23992__auto___6 = (() => {
const temp__23929__auto___7 = get_alias_headers.call(null, impl_3, headers);
if (cherry_core.truth_.call(null, temp__23929__auto___7)) {
const alias_headers_8 = temp__23929__auto___7;
const vdom_child_9 = cherry_core.first.call(null, vdom[4]);
const updated_vdom_10 = ((cherry_core.truth_.call(null, reusable_QMARK_.call(null, alias_headers_8, vdom_child_9))) ? (reconcile_STAR_.call(null, impl_3, el, alias_headers_8, vdom_child_9, index)) : ((() => {
const vec__15629_11 = create_node.call(null, impl_3, alias_headers_8);
const node_12 = cherry_core.nth.call(null, vec__15629_11, 0, null);
const updated_vdom_13 = cherry_core.nth.call(null, vec__15629_11, 1, null);
r.replace_child.call(null, renderer_4, el, node_12, r.get_child.call(null, renderer_4, el, index));
return updated_vdom_13;

})()));
const headers__4054__auto___14 = headers;
return (new Array(headers__4054__auto___14[0], headers__4054__auto___14[3], headers__4054__auto___14[2], headers[4], cherry_core.vector(updated_vdom_10), (() => {
const temp__23929__auto___15 = updated_vdom_10[1];
if (cherry_core.truth_.call(null, temp__23929__auto___15)) {
const k_16 = temp__23929__auto___15;
return cherry_core.vector(k_16);
};

})(), cherry_core.boolean$.call(null, cherry_core.keyword("replicant/unmounting").call(null, headers__4054__auto___14[4])), headers__4054__auto___14[7], null, null, 1));
};

})();
if (cherry_core.truth_.call(null, or__23992__auto___6)) {
return or__23992__auto___6} else {
const or__23992__auto___17 = ((cherry_core.not.call(null, cherry_core._EQ_.call(null, headers[8], vdom[8]))) ? ((() => {
const vec__15832_18 = create_node.call(null, impl_3, headers);
const node_19 = cherry_core.nth.call(null, vec__15832_18, 0, null);
const vdom_20 = cherry_core.nth.call(null, vec__15832_18, 1, null);
r.replace_child.call(null, renderer_4, el, node_19, r.get_child.call(null, renderer_4, el, index));
return vdom_20;

})()) : (null));
if (cherry_core.truth_.call(null, or__23992__auto___17)) {
return or__23992__auto___17} else {
const child_21 = r.get_child.call(null, renderer_4, el, index);
const headers_22 = (() => {
const or__23992__auto___23 = get_alias_headers.call(null, impl_3, headers);
if (cherry_core.truth_.call(null, or__23992__auto___23)) {
return or__23992__auto___23} else {
return headers};

})();
const attrs_24 = get_attrs.call(null, headers_22);
const vdom_attrs_25 = vdom[3];
const attrs_changed_QMARK__26 = reconcile_attributes.call(null, renderer_4, child_21, attrs_24, vdom_attrs_25);
const vec__15885_27 = ((cherry_core.truth_.call(null, cherry_core.keyword("innerHTML").call(null, headers_22[4]))) ? (cherry_core.vector(null, null, true)) : (get_children_ks.call(null, headers_22, get_ns.call(null, headers_22))));
const new_children_28 = cherry_core.nth.call(null, vec__15885_27, 0, null);
const new_ks_29 = cherry_core.nth.call(null, vec__15885_27, 1, null);
const inner_html_QMARK__30 = cherry_core.nth.call(null, vec__15885_27, 2, null);
const vec__15888_31 = ((cherry_core.truth_.call(null, cherry_core.keyword("contenteditable").call(null, vdom_attrs_25))) ? ((() => {
r.remove_all_children.call(null, renderer_4, child_21);
return cherry_core.vector(null, null, 0)
})()) : (((cherry_core.truth_.call(null, inner_html_QMARK__30)) ? (cherry_core.vector(null, null, 0)) : (((cherry_core.truth_.call(null, cherry_core.keyword("else"))) ? (cherry_core.vector(vdom[4], vdom[5], vdom[10])) : (null))))));
const old_children_32 = cherry_core.nth.call(null, vec__15888_31, 0, null);
const old_ks_33 = cherry_core.nth.call(null, vec__15888_31, 1, null);
const old_nc_34 = cherry_core.nth.call(null, vec__15888_31, 2, null);
const vec__15891_35 = update_children.call(null, impl_3, child_21, new_children_28, new_ks_29, old_children_32, old_ks_33, old_nc_34);
const children_changed_QMARK__36 = cherry_core.nth.call(null, vec__15891_35, 0, null);
const children_37 = cherry_core.nth.call(null, vec__15891_35, 1, null);
const child_ks_38 = cherry_core.nth.call(null, vec__15891_35, 2, null);
const n_children_39 = cherry_core.nth.call(null, vec__15891_35, 3, null);
const attrs_changed_QMARK__40 = (() => {
const or__23992__auto___41 = attrs_changed_QMARK__26;
if (cherry_core.truth_.call(null, or__23992__auto___41)) {
return or__23992__auto___41} else {
return cherry_core.not.call(null, cherry_core._EQ_.call(null, cherry_core.keyword("replicant/on-render").call(null, headers_22[4]), cherry_core.keyword("replicant/on-render").call(null, vdom_attrs_25)))};

})();
register_hooks.call(null, impl_3, child_21, headers_22, vdom, ((cherry_core.truth_.call(null, (() => {
const and__24022__auto___42 = attrs_changed_QMARK__40;
if (cherry_core.truth_.call(null, and__24022__auto___42)) {
return children_changed_QMARK__36} else {
return and__24022__auto___42};

})())) ? (cherry_core.vector(cherry_core.keyword("replicant/updated-attrs"), cherry_core.keyword("replicant/updated-children"))) : (((cherry_core.truth_.call(null, attrs_changed_QMARK__40)) ? (cherry_core.vector(cherry_core.keyword("replicant/updated-attrs"))) : (((cherry_core.truth_.call(null, cherry_core.keyword("else"))) ? (cherry_core.vector(cherry_core.keyword("replicant/updated-children"))) : (null)))))));
const headers__4054__auto___43 = headers_22;
return (new Array(headers__4054__auto___43[0], headers__4054__auto___43[3], headers__4054__auto___43[2], attrs_24, children_37, child_ks_38, cherry_core.boolean$.call(null, cherry_core.keyword("replicant/unmounting").call(null, headers__4054__auto___43[4])), headers__4054__auto___43[7], null, null, n_children_39));
};
};
};

};
var perform_post_mount_update = function (renderer, p__16299) {
const vec__16305_1 = p__16299;
const node_2 = cherry_core.nth.call(null, vec__16305_1, 0, null);
const mounting_attrs_3 = cherry_core.nth.call(null, vec__16305_1, 1, null);
const attrs_4 = cherry_core.nth.call(null, vec__16305_1, 2, null);
return update_attributes.call(null, renderer, node_2, attrs_4, mounting_attrs_3);

};
var get_hooks_to_call = function (p__16348) {
const map__16354_1 = p__16348;
const map__16354_2 = cherry_core.__destructure_map.call(null, map__16354_1);
const renderer_3 = cherry_core.get.call(null, map__16354_2, cherry_core.keyword("renderer"));
const hooks_4 = cherry_core.get.call(null, map__16354_2, cherry_core.keyword("hooks"));
const unmount_hooks_5 = cherry_core.get.call(null, map__16354_2, cherry_core.keyword("unmount-hooks"));
const potential_unmounts_6 = cherry_core.deref.call(null, unmount_hooks_5);
const hooks_to_call_7 = cherry_core.deref.call(null, hooks_4);
const unmounted_nodes_8 = cherry_core.remove.call(null, cherry_core.set.call(null, cherry_core.mapv.call(null, (function (p__16425) {
const vec__16431_9 = p__16425;
const __10 = cherry_core.nth.call(null, vec__16431_9, 0, null);
const __11 = cherry_core.nth.call(null, vec__16431_9, 1, null);
const node_12 = cherry_core.nth.call(null, vec__16431_9, 2, null);
return node_12;

}), hooks_to_call_7)), cherry_core.remove.call(null, (function (_PERCENT_1) {
return r.attached_QMARK_.call(null, renderer_3, _PERCENT_1);

}), cherry_core.keys.call(null, potential_unmounts_6)));
if (cherry_core.truth_.call(null, unmounted_nodes_8)) {
cherry_core.vreset_BANG_.call(null, unmount_hooks_5, (function (h) {
return cherry_core.apply.call(null, cherry_core.dissoc, h, unmounted_nodes_8);

}).call(null, cherry_core.deref.call(null, unmount_hooks_5)))};
return cherry_core.into.call(null, hooks_to_call_7, cherry_core.vals.call(null, cherry_core.select_keys.call(null, potential_unmounts_6, unmounted_nodes_8)));

};
var reconcile = (() => {
const f16544 = (function (var_args) {
const args16545_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i16546_3 = 0;
while(true){
if ((i16546_3 < len__22792__auto___2)) {
args16545_1.push((arguments[i16546_3]));
let G__4 = (i16546_3 + 1);
i16546_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((3 < args16545_1.length)) ? ((new cherry_core.IndexedSeq(args16545_1.slice(3), 0, null))) : (null));
return f16544.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), (arguments[1]), (arguments[2]), argseq__23180__auto___5);

});
f16544.cljs$core$IFn$_invoke$arity$variadic = (function (renderer, el, hiccup, p__16766) {
const vec__16772_6 = p__16766;
const vdom_7 = cherry_core.nth.call(null, vec__16772_6, 0, null);
const map__16775_8 = cherry_core.nth.call(null, vec__16772_6, 1, null);
const map__16775_9 = cherry_core.__destructure_map.call(null, map__16775_8);
const unmounts_10 = cherry_core.get.call(null, map__16775_9, cherry_core.keyword("unmounts"));
const unmount_hooks_11 = cherry_core.get.call(null, map__16775_9, cherry_core.keyword("unmount-hooks"));
const aliases_12 = cherry_core.get.call(null, map__16775_9, cherry_core.keyword("aliases"));
const alias_data_13 = cherry_core.get.call(null, map__16775_9, cherry_core.keyword("alias-data"));
const on_alias_exception_14 = cherry_core.get.call(null, map__16775_9, cherry_core.keyword("on-alias-exception"));
const impl_15 = cherry_core.array_map(cherry_core.keyword("renderer"), renderer, cherry_core.keyword("hooks"), cherry_core.volatile_BANG_.call(null, cherry_core.vector()), cherry_core.keyword("mounts"), cherry_core.volatile_BANG_.call(null, cherry_core.vector()), cherry_core.keyword("unmount-hooks"), (() => {
const or__23992__auto___16 = unmount_hooks_11;
if (cherry_core.truth_.call(null, or__23992__auto___16)) {
return or__23992__auto___16} else {
return cherry_core.volatile_BANG_.call(null, node_map.call(null))};

})(), cherry_core.keyword("unmounts"), (() => {
const or__23992__auto___17 = unmounts_10;
if (cherry_core.truth_.call(null, or__23992__auto___17)) {
return or__23992__auto___17} else {
return cherry_core.volatile_BANG_.call(null, cherry_core.hash_set())};

})(), cherry_core.keyword("aliases"), aliases_12, cherry_core.keyword("alias-data"), alias_data_13, cherry_core.keyword("on-alias-exception"), on_alias_exception_14);
const vdom_18 = ((cherry_core.truth_.call(null, proper_seq_QMARK_.call(null, hiccup))) ? ((() => {
const vec__16931_19 = get_children_ks.call(null, (() => {
const pt__2321__auto___20 = [null, null, null];
const G__16954_21 = pt__2321__auto___20;
G__16954_21.push((() => {
const temp__23929__auto___22 = cherry_core.keyword("replicant/key").call(null, null);
if (cherry_core.truth_.call(null, temp__23929__auto___22)) {
const k__2312__auto___23 = temp__23929__auto___22;
return replicant_DOT_hiccup_headers.make_key.call(null, pt__2321__auto___20[0], k__2312__auto___23);
};

})());
G__16954_21.push(null);
G__16954_21.push(hiccup);
G__16954_21.push(null);
G__16954_21.push(null);
G__16954_21.push(null);
G__16954_21.push(null);
return G__16954_21;

})(), null);
const children_24 = cherry_core.nth.call(null, vec__16931_19, 0, null);
const ks_25 = cherry_core.nth.call(null, vec__16931_19, 1, null);
return cherry_core.second.call(null, update_children.call(null, impl_15, el, children_24, ks_25, vdom_7, cherry_core.set.call(null, cherry_core.keep.call(null, (function (_PERCENT_1) {
const G__17085_26 = _PERCENT_1;
if ((G__17085_26 == null)) {
return null} else {
return G__17085_26[1]};

}), vdom_7)), cherry_core.count.call(null, vdom_7)));

})()) : ((() => {
const headers_27 = get_hiccup_headers.call(null, null, hiccup);
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___28 = headers_27;
if (cherry_core.truth_.call(null, and__24022__auto___28)) {
const and__24022__auto___29 = vdom_7;
if (cherry_core.truth_.call(null, and__24022__auto___29)) {
const and__24022__auto___30 = unchanged_QMARK_.call(null, headers_27, cherry_core.first.call(null, vdom_7));
if (cherry_core.truth_.call(null, and__24022__auto___30)) {
return (1 === cherry_core.count.call(null, vdom_7))} else {
return and__24022__auto___30};
} else {
return and__24022__auto___29};
} else {
return and__24022__auto___28};

})())) {
return vdom_7} else {
const k_31 = ((cherry_core.truth_.call(null, headers_27)) ? (headers_27[3]) : (null));
return cherry_core.second.call(null, update_children.call(null, impl_15, el, ((cherry_core.truth_.call(null, headers_27)) ? (cherry_core.vector(headers_27)) : (null)), (() => {
const G__17331_32 = cherry_core.hash_set();
if (cherry_core.truth_.call(null, k_31)) {
return cherry_core.conj.call(null, G__17331_32, k_31)} else {
return G__17331_32};

})(), vdom_7, cherry_core.set.call(null, cherry_core.keep.call(null, (function (_PERCENT_1) {
return _PERCENT_1[1];

}), vdom_7)), ((cherry_core.truth_.call(null, cherry_core.first.call(null, vdom_7))) ? (1) : (0))));
};

})()));
const hooks_to_call_33 = get_hooks_to_call.call(null, impl_15);
const temp__23846__auto___34 = cherry_core.seq.call(null, cherry_core.deref.call(null, cherry_core.keyword("mounts").call(null, impl_15)));
if (cherry_core.truth_.call(null, temp__23846__auto___34)) {
const mounts_35 = temp__23846__auto___34;
r.next_frame.call(null, renderer, (function () {
cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return perform_post_mount_update.call(null, renderer, _PERCENT_1);

}), mounts_35);
return cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return call_hook.call(null, renderer, _PERCENT_1);

}), hooks_to_call_33);

}))} else {
cherry_core.run_BANG_.call(null, (function (_PERCENT_1) {
return call_hook.call(null, renderer, _PERCENT_1);

}), hooks_to_call_33)};
return cherry_core.array_map(cherry_core.keyword("hooks"), hooks_to_call_33, cherry_core.keyword("vdom"), vdom_18, cherry_core.keyword("unmounts"), cherry_core.keyword("unmounts").call(null, impl_15), cherry_core.keyword("unmount-hooks"), cherry_core.keyword("unmount-hooks").call(null, impl_15));

});
f16544.cljs$lang$maxFixedArity = 3;
f16544.cljs$lang$applyTo = (function (seq16547) {
const G__16548_36 = cherry_core.first.call(null, seq16547);
const seq16547_37 = cherry_core.next.call(null, seq16547);
const G__16549_38 = cherry_core.first.call(null, seq16547_37);
const seq16547_39 = cherry_core.next.call(null, seq16547_37);
const G__16550_40 = cherry_core.first.call(null, seq16547_39);
const seq16547_41 = cherry_core.next.call(null, seq16547_39);
const self__22809__auto___42 = this;
return self__22809__auto___42.cljs$core$IFn$_invoke$arity$variadic(G__16548_36, G__16549_38, G__16550_40, seq16547_41);

});
return f16544;

})();

export { get_children, update_styles, set_styles, build_event_map, get_children_ks, __GT_seq, insert_node, xmlns, same_QMARK_, move_node_details, perform_post_mount_update, prep_attrs, set_attr, set_attr_val, get_mounting_attrs, register_hooks, register_mount, unchanged_QMARK_, node_map, explode_styles, update_attributes, xlinkns, merge_attrs, reconcile_STAR_, reconcile_attributes, get_classes, update_attr, set_classes, skip_pixelize_attrs, create_node, add_event_listeners, get_style_val, parse_tag, remove_child, update_children, get_hiccup_headers, add_classes, update_classes, get_life_cycle_hook, get_event_handler_options, flatten_seqs, get_unmounting_attrs, render_default_alias, get_hooks_to_call, stringify, seq_tag, proper_seq_QMARK_, set_attributes, update_event_listeners, _STAR_dispatch_STAR_, get_event_handler, index_of, reusable_QMARK_, reconcile, get_attrs, get_alias_headers, call_hook, get_ns }
