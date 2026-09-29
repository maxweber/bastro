import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as d from './core.mjs';
import * as replicant_DOT_core from './core.mjs';
import * as replicant from './protocols.mjs';
import * as replicant_DOT_protocols from './protocols.mjs';
var __GT_hiccup = function (element) {
const temp__23929__auto___1 = (() => {
const G__21397_2 = element;
if ((G__21397_2 == null)) {
return null} else {
return cherry_core.deref.call(null, G__21397_2)};

})();
if (cherry_core.truth_.call(null, temp__23929__auto___1)) {
const el_3 = temp__23929__auto___1;
const temp__23846__auto___4 = cherry_core.keyword("tag-name").call(null, el_3);
if (cherry_core.truth_.call(null, temp__23846__auto___4)) {
const tag_name_5 = temp__23846__auto___4;
return cherry_core.into.call(null, cherry_core.vector(cherry_core.keyword.call(null, tag_name_5)), (() => {
const temp__23846__auto___6 = cherry_core.get.call(null, el_3, "innerHTML");
if (cherry_core.truth_.call(null, temp__23846__auto___6)) {
const inner_html_7 = temp__23846__auto___6;
return cherry_core.vector(inner_html_7);
} else {
return cherry_core.map.call(null, __GT_hiccup, cherry_core.keyword("children").call(null, el_3))};

})());
} else {
return cherry_core.keyword("text").call(null, el_3)};
};

};
var _insert_before = function (children, child, reference) {
const idx_1 = children.indexOf(reference);
return cherry_core.vec.call(null, cherry_core.concat.call(null, cherry_core.remove.call(null, cherry_core.hash_set(child), cherry_core.take.call(null, idx_1, children)), cherry_core.vector(child), cherry_core.remove.call(null, cherry_core.hash_set(child), cherry_core.drop.call(null, idx_1, children))));

};
var replace_by = function (xs, f, new$, replace) {
const replace_v_1 = f.call(null, replace);
const iter__24061__auto___2 = (function iter__21398 (s__21399) {
return (new cherry_core.LazySeq(null, (function () {
let s__21399_3 = s__21399;
while(true){
const temp__23929__auto___4 = cherry_core.seq.call(null, s__21399_3);
if (cherry_core.truth_.call(null, temp__23929__auto___4)) {
const s__21399_5 = temp__23929__auto___4;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, s__21399_5))) {
const c__24058__auto___6 = cherry_core.chunk_first.call(null, s__21399_5);
const size__24059__auto___7 = cherry_core.count.call(null, c__24058__auto___6);
const b__21401_8 = cherry_core.chunk_buffer.call(null, size__24059__auto___7);
if ((() => {
let i__21400_9 = 0;
while(true){
if ((i__21400_9 < size__24059__auto___7)) {
const x_10 = cherry_core._nth.call(null, c__24058__auto___6, i__21400_9);
cherry_core.chunk_append.call(null, b__21401_8, ((cherry_core._EQ_.call(null, f.call(null, x_10), replace_v_1)) ? (new$) : (x_10)));
let G__11 = cherry_core.unchecked_inc.call(null, i__21400_9);
i__21400_9 = G__11;
continue;
} else {
return true};
;break;
}

})()) {
return cherry_core.chunk_cons.call(null, cherry_core.chunk.call(null, b__21401_8), iter__21398.call(null, cherry_core.chunk_rest.call(null, s__21399_5)))} else {
return cherry_core.chunk_cons.call(null, cherry_core.chunk.call(null, b__21401_8), null)};
} else {
const x_12 = cherry_core.first.call(null, s__21399_5);
return cherry_core.cons.call(null, ((cherry_core._EQ_.call(null, f.call(null, x_12), replace_v_1)) ? (new$) : (x_12)), iter__21398.call(null, cherry_core.rest.call(null, s__21399_5)));
};
};
;break;
}
;

}), null, null));

});
return iter__24061__auto___2.call(null, xs);

};
var _replace_child = function (element, insert_child, replace_child) {
if (cherry_core.truth_.call(null, cherry_core.keyword("replicant.mutation-log/id").call(null, cherry_core.deref.call(null, replace_child)))) {
return cherry_core.update.call(null, element, cherry_core.keyword("children"), replace_by, (function (_PERCENT_1) {
return cherry_core.keyword("replicant.mutation-log/id").call(null, cherry_core.deref.call(null, _PERCENT_1));

}), insert_child, replace_child)} else {
return cherry_core.update.call(null, element, cherry_core.keyword("children"), replace_by, cherry_core.deref, insert_child, replace_child)};

};
var _get_child = function (el, idx) {
return cherry_core.nth.call(null, cherry_core.keyword("children").call(null, cherry_core.deref.call(null, el)), idx);

};
var _remove_child = function (el, child_node) {
const id_1 = cherry_core.hash_set(cherry_core.keyword("replicant.mutation-log/id").call(null, cherry_core.deref.call(null, child_node)));
return cherry_core.update.call(null, el, cherry_core.keyword("children"), (function (_PERCENT_1) {
return cherry_core.vec.call(null, cherry_core.remove.call(null, cherry_core.comp.call(null, id_1, cherry_core.keyword("replicant.mutation-log/id"), cherry_core.deref), _PERCENT_1));

}));

};
var id = cherry_core.atom.call(null, 0);
var get_snapshot = function (element) {
const el_1 = cherry_core.deref.call(null, element);
const G__21402_2 = el_1;
if (cherry_core.truth_.call(null, cherry_core.keyword("children").call(null, el_1))) {
return cherry_core.update.call(null, G__21402_2, cherry_core.keyword("children"), (function (_PERCENT_1) {
return cherry_core.map.call(null, get_snapshot, _PERCENT_1);

}))} else {
return G__21402_2};

};
var atom_QMARK_ = function (x) {
return cherry_core.instance_QMARK_.call(null, cherry_core.Atom, x);

};
var log = function (this$, event) {
return cherry_core.swap_BANG_.call(null, cherry_core.keyword("log").call(null, this$), cherry_core.conj, cherry_core.mapv.call(null, (function (_PERCENT_1) {
if (cherry_core.truth_.call(null, atom_QMARK_.call(null, _PERCENT_1))) {
return get_snapshot.call(null, _PERCENT_1)} else {
return _PERCENT_1};

}), event));

};
var set_parent = function (node, new_parent) {
const temp__23929__auto___1 = cherry_core.keyword("parent").call(null, cherry_core.meta.call(null, cherry_core.deref.call(null, node)));
if (cherry_core.truth_.call(null, temp__23929__auto___1)) {
const parent_2 = temp__23929__auto___1;
if (cherry_core._EQ_.call(null, parent_2, new_parent)) {
} else {
cherry_core.swap_BANG_.call(null, parent_2, _remove_child, node)}};
return cherry_core.swap_BANG_.call(null, node, cherry_core.with_meta, cherry_core.array_map(cherry_core.keyword("parent"), new_parent));

};
var _append_child = function (el, child_node) {
set_parent.call(null, child_node, el);
return cherry_core.swap_BANG_.call(null, el, cherry_core.update, cherry_core.keyword("children"), (function (_PERCENT_1) {
return cherry_core.conj.call(null, cherry_core.vec.call(null, _PERCENT_1), child_node);

}));

};
var get_node_ids = function (element) {
return cherry_core.set.call(null, cherry_core.map.call(null, cherry_core.comp.call(null, cherry_core.keyword("replicant.mutation-log/id"), cherry_core.deref), cherry_core.filter.call(null, atom_QMARK_, cherry_core.tree_seq.call(null, (function (x) {
const or__23992__auto___1 = cherry_core.coll_QMARK_.call(null, x);
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
return atom_QMARK_.call(null, x)};

}), (function (x) {
const G__21403_2 = x;
if (cherry_core.truth_.call(null, atom_QMARK_.call(null, x))) {
return cherry_core.deref.call(null, G__21403_2)} else {
return G__21403_2};

}), (() => {
const G__21404_3 = element;
if (cherry_core.truth_.call(null, atom_QMARK_.call(null, element))) {
return cherry_core.deref.call(null, G__21404_3)} else {
return G__21404_3};

})()))));

};
var mutation_log_impl = cherry_core.hash_map(cherry_core.symbol.call(null, "replicant.protocols/remove-attribute"), (function (this$, el, attr) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("remove-attribute"), attr));
cherry_core.swap_BANG_.call(null, el, cherry_core.dissoc, attr);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/remember"), (function (_, node, data) {
return cherry_core.swap_BANG_.call(null, node, cherry_core.assoc, cherry_core.keyword("replicant/memory"), data);

}), cherry_core.symbol.call(null, "replicant.protocols/remove-style"), (function (this$, el, style) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("remove-style"), el, style));
cherry_core.swap_BANG_.call(null, el, cherry_core.update, cherry_core.keyword("style"), cherry_core.dissoc, style);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/attached?"), (function (this$, el) {
return cherry_core.contains_QMARK_.call(null, get_node_ids.call(null, cherry_core.keyword("element").call(null, this$)), cherry_core.keyword("replicant.mutation-log/id").call(null, cherry_core.deref.call(null, el)));

}), cherry_core.symbol.call(null, "replicant.protocols/add-class"), (function (this$, el, cn) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("add-class"), el, cn));
cherry_core.swap_BANG_.call(null, el, cherry_core.update, cherry_core.keyword("classes"), (function (_PERCENT_1) {
return cherry_core.set.call(null, cherry_core.conj.call(null, _PERCENT_1, cn));

}));
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/next-frame"), (function (this$, f) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("next-frame")));
return f.call(null);

}), cherry_core.symbol.call(null, "replicant.protocols/get-child"), (function (this$, el, idx) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("get-child"), idx));
return _get_child.call(null, el, idx);

}), cherry_core.symbol.call(null, "replicant.protocols/remove-event-handler"), (function (this$, el, event, opt) {
log.call(null, this$, (() => {
const G__21405_1 = cherry_core.vector(cherry_core.keyword("remove-event-handler"), el, event);
if (cherry_core.truth_.call(null, opt)) {
return cherry_core.conj.call(null, G__21405_1, opt)} else {
return G__21405_1};

})());
cherry_core.swap_BANG_.call(null, el, cherry_core.update, cherry_core.keyword("on"), cherry_core.dissoc, event);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/set-event-handler"), (function (this$, el, event, handler, opt) {
log.call(null, this$, (() => {
const G__21406_2 = cherry_core.vector(cherry_core.keyword("set-event-handler"), el, event, handler);
if (cherry_core.truth_.call(null, opt)) {
return cherry_core.conj.call(null, G__21406_2, opt)} else {
return G__21406_2};

})());
cherry_core.swap_BANG_.call(null, el, cherry_core.assoc_in, cherry_core.vector(cherry_core.keyword("on"), event), handler);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/insert-before"), (function (this$, el, child_node, reference_node) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("insert-before"), el, child_node, reference_node));
cherry_core.swap_BANG_.call(null, el, cherry_core.update, cherry_core.keyword("children"), _insert_before, child_node, reference_node);
set_parent.call(null, child_node, el);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/recall"), (function (_, node) {
return cherry_core.keyword("replicant/memory").call(null, cherry_core.deref.call(null, node));

}), cherry_core.symbol.call(null, "replicant.protocols/set-style"), (function (this$, el, style, v) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("set-style"), el, style, v));
cherry_core.swap_BANG_.call(null, el, cherry_core.assoc_in, cherry_core.vector(cherry_core.keyword("style"), style), v);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/remove-all-children"), (function (this$, el) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("remove-all-children"), el));
cherry_core.swap_BANG_.call(null, el, cherry_core.assoc, cherry_core.keyword("children"), cherry_core.vector());
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/on-transition-end"), (function (this$, el, f) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("on-transition-end"), el));
cherry_core.swap_BANG_.call(null, cherry_core.keyword("callbacks").call(null, this$), cherry_core.conj, f);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/create-element"), (function (this$, tag_name, options) {
log.call(null, this$, (() => {
const G__21407_3 = cherry_core.vector(cherry_core.keyword("create-element"), tag_name);
if (cherry_core.truth_.call(null, cherry_core.keyword("ns").call(null, options))) {
return cherry_core.conj.call(null, G__21407_3, cherry_core.keyword("ns").call(null, options))} else {
return G__21407_3};

})());
return cherry_core.atom.call(null, cherry_core.array_map(cherry_core.keyword("tag-name"), tag_name, cherry_core.keyword("replicant.mutation-log/id"), cherry_core.swap_BANG_.call(null, id, cherry_core.inc)));

}), cherry_core.symbol.call(null, "replicant.protocols/set-attribute"), (function (this$, el, attr, v, opt) {
log.call(null, this$, (() => {
const G__21408_4 = cherry_core.vector(cherry_core.keyword("set-attribute"), get_snapshot.call(null, el), attr, v);
if (cherry_core.truth_.call(null, cherry_core.keyword("ns").call(null, opt))) {
return cherry_core.conj.call(null, G__21408_4, cherry_core.keyword("ns").call(null, opt))} else {
return G__21408_4};

})());
cherry_core.swap_BANG_.call(null, el, cherry_core.assoc, attr, v);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/create-text-node"), (function (this$, text) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("create-text-node"), text));
return cherry_core.atom.call(null, cherry_core.array_map(cherry_core.keyword("text"), text, cherry_core.keyword("replicant.mutation-log/id"), cherry_core.swap_BANG_.call(null, id, cherry_core.inc)));

}), cherry_core.symbol.call(null, "replicant.protocols/remove-class"), (function (this$, el, cn) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("remove-class"), el, cn));
cherry_core.swap_BANG_.call(null, el, cherry_core.update, cherry_core.keyword("classes"), cherry_core.disj, cn);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/append-child"), (function (this$, el, child_node) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("append-child"), el, child_node));
_append_child.call(null, el, child_node);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/remove-child"), (function (this$, el, child_node) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("remove-child"), el, child_node));
cherry_core.swap_BANG_.call(null, el, _remove_child, child_node);
return this$;

}), cherry_core.symbol.call(null, "replicant.protocols/replace-child"), (function (this$, el, insert_child, replace_child) {
log.call(null, this$, cherry_core.vector(cherry_core.keyword("replace-child"), insert_child, replace_child));
cherry_core.swap_BANG_.call(null, el, _replace_child, insert_child, replace_child);
return this$;

}));
var create_renderer = function (p__21409) {
const map__21410_1 = p__21409;
const map__21410_2 = cherry_core.__destructure_map.call(null, map__21410_1);
const log_3 = cherry_core.get.call(null, map__21410_2, cherry_core.keyword("log"));
const element_4 = cherry_core.get.call(null, map__21410_2, cherry_core.keyword("element"));
const callbacks_5 = cherry_core.get.call(null, map__21410_2, cherry_core.keyword("callbacks"));
return cherry_core.with_meta.call(null, cherry_core.array_map(cherry_core.keyword("log"), (() => {
const or__23992__auto___6 = log_3;
if (cherry_core.truth_.call(null, or__23992__auto___6)) {
return or__23992__auto___6} else {
return cherry_core.atom.call(null, cherry_core.vector())};

})(), cherry_core.keyword("element"), (() => {
const or__23992__auto___7 = element_4;
if (cherry_core.truth_.call(null, or__23992__auto___7)) {
return or__23992__auto___7} else {
return cherry_core.atom.call(null, cherry_core.array_map())};

})(), cherry_core.keyword("callbacks"), (() => {
const or__23992__auto___8 = callbacks_5;
if (cherry_core.truth_.call(null, or__23992__auto___8)) {
return or__23992__auto___8} else {
return cherry_core.atom.call(null, cherry_core.vector())};

})()), mutation_log_impl);

};
var render = (() => {
const f21411 = (function (var_args) {
const args21412_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i21413_3 = 0;
while(true){
if ((i21413_3 < len__22792__auto___2)) {
args21412_1.push((arguments[i21413_3]));
let G__4 = (i21413_3 + 1);
i21413_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((2 < args21412_1.length)) ? ((new cherry_core.IndexedSeq(args21412_1.slice(2), 0, null))) : (null));
return f21411.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), (arguments[1]), argseq__23180__auto___5);

});
f21411.cljs$core$IFn$_invoke$arity$variadic = (function (element, new_hiccup, p__21417) {
const vec__21418_6 = p__21417;
const old_vdom_7 = cherry_core.nth.call(null, vec__21418_6, 0, null);
const map__21421_8 = cherry_core.nth.call(null, vec__21418_6, 1, null);
const map__21421_9 = cherry_core.__destructure_map.call(null, map__21421_8);
const unmounts_10 = cherry_core.get.call(null, map__21421_9, cherry_core.keyword("unmounts"));
const unmount_hooks_11 = cherry_core.get.call(null, map__21421_9, cherry_core.keyword("unmount-hooks"));
const aliases_12 = cherry_core.get.call(null, map__21421_9, cherry_core.keyword("aliases"));
const on_alias_exception_13 = cherry_core.get.call(null, map__21421_9, cherry_core.keyword("on-alias-exception"));
const callbacks_14 = cherry_core.get.call(null, map__21421_9, cherry_core.keyword("callbacks"));
const el_15 = cherry_core.atom.call(null, (() => {
const or__23992__auto___16 = element;
if (cherry_core.truth_.call(null, or__23992__auto___16)) {
return or__23992__auto___16} else {
return cherry_core.array_map()};

})());
const renderer_17 = create_renderer.call(null, cherry_core.array_map(cherry_core.keyword("log"), cherry_core.atom.call(null, cherry_core.vector()), cherry_core.keyword("element"), el_15, cherry_core.keyword("callbacks"), callbacks_14));
return cherry_core.assoc.call(null, cherry_core.assoc.call(null, d.reconcile.call(null, renderer_17, el_15, new_hiccup, old_vdom_7, cherry_core.array_map(cherry_core.keyword("unmounts"), unmounts_10, cherry_core.keyword("unmount-hooks"), unmount_hooks_11, cherry_core.keyword("aliases"), aliases_12, cherry_core.keyword("on-alias-exception"), on_alias_exception_13)), cherry_core.keyword("el"), cherry_core.update.call(null, cherry_core.update.call(null, renderer_17, cherry_core.keyword("log"), cherry_core.deref), cherry_core.keyword("element"), cherry_core.deref)), cherry_core.keyword("aliases"), aliases_12);

});
f21411.cljs$lang$maxFixedArity = 2;
f21411.cljs$lang$applyTo = (function (seq21414) {
const G__21415_18 = cherry_core.first.call(null, seq21414);
const seq21414_19 = cherry_core.next.call(null, seq21414);
const G__21416_20 = cherry_core.first.call(null, seq21414_19);
const seq21414_21 = cherry_core.next.call(null, seq21414_19);
const self__22809__auto___22 = this;
return self__22809__auto___22.cljs$core$IFn$_invoke$arity$variadic(G__21415_18, G__21416_20, seq21414_21);

});
return f21411;

})();

export { create_renderer, _append_child, mutation_log_impl, get_node_ids, id, get_snapshot, log, __GT_hiccup, _remove_child, replace_by, set_parent, _get_child, _replace_child, _insert_before, render, atom_QMARK_ }
