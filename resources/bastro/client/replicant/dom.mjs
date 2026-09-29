import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as alias from './alias.mjs';
import * as replicant_DOT_alias from './alias.mjs';
import * as asserts from './asserts.mjs';
import * as replicant_DOT_asserts from './asserts.mjs';
import * as r from './core.mjs';
import * as replicant_DOT_core from './core.mjs';
import * as env from './env.mjs';
import * as replicant_DOT_env from './env.mjs';
import * as errors from './errors.mjs';
import * as replicant_DOT_errors from './errors.mjs';
import * as replicant from './protocols.mjs';
import * as replicant_DOT_protocols from './protocols.mjs';
import * as transition from './transition.mjs';
import * as replicant_DOT_transition from './transition.mjs';
var remove_listener = function (el, event, opt) {
const temp__23929__auto___1 = (() => {
const G__17667_2 = el;
const G__17667_3 = (((G__17667_2 == null)) ? (null) : (G__17667_2.replicantHandlers));
if ((G__17667_3 == null)) {
return null} else {
return G__17667_3[event]};

})();
if (cherry_core.truth_.call(null, temp__23929__auto___1)) {
const old_handler_4 = temp__23929__auto___1;
return el.removeEventListener(event, old_handler_4, cherry_core.clj__GT_js.call(null, opt));
};

};
var on_next_frame = function (f) {
return requestAnimationFrame((function () {
return requestAnimationFrame(f);

}));

};
var _on_transition_end = function (el, f) {
const vec__17803_1 = transition.get_transition_stats.call(null, window.getComputedStyle(el).getPropertyValue("transition-duration"));
const n_2 = cherry_core.nth.call(null, vec__17803_1, 0, null);
const dur_3 = cherry_core.nth.call(null, vec__17803_1, 1, null);
if ((n_2 === 0)) {
return f.call(null)} else {
const complete_4 = cherry_core.volatile_BANG_.call(null, 0);
const timer_5 = cherry_core.volatile_BANG_.call(null, null);
const started_6 = (new Date());
const callback_7 = (() => {
const listener = (function (var_args) {
const args17896_8 = cherry_core.array.call(null);
const len__22792__auto___9 = arguments.length;
let i17897_10 = 0;
while(true){
if ((i17897_10 < len__22792__auto___9)) {
args17896_8.push((arguments[i17897_10]));
let G__11 = (i17897_10 + 1);
i17897_10 = G__11;
continue;
};break;
}
;
const argseq__23180__auto___12 = (((0 < args17896_8.length)) ? ((new cherry_core.IndexedSeq(args17896_8.slice(0), 0, null))) : (null));
return listener.cljs$core$IFn$_invoke$arity$variadic(argseq__23180__auto___12);

});
listener.cljs$core$IFn$_invoke$arity$variadic = (function (_args) {
const cn_13 = cherry_core.vreset_BANG_.call(null, complete_4, (cherry_core.deref.call(null, complete_4) + 1));
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___14 = (n_2 <= cn_13);
if (or__23992__auto___14) {
return or__23992__auto___14} else {
return (dur_3 < ((new Date()) - started_6))};

})())) {
el.removeEventListener("transitionend", listener);
clearTimeout(cherry_core.deref.call(null, timer_5));
return f.call(null);
};

});
listener.cljs$lang$maxFixedArity = 0;
listener.cljs$lang$applyTo = (function (seq17898) {
const self__22810__auto___15 = this;
return self__22810__auto___15.cljs$core$IFn$_invoke$arity$variadic(cherry_core.seq.call(null, seq17898));

});
return listener;

})();
el.addEventListener("transitionend", callback_7);
return cherry_core.vreset_BANG_.call(null, timer_5, setTimeout(callback_7, (dur_3 + 200)));
};

};
var memories = (new WeakMap());
var recall = function (node) {
return memories.get(node);

};
var create_renderer = function () {
const reify18324_1 = cherry_core.js_obj.call(null);
reify18324_1.IRender$ = cherry_core.PROTOCOL_SENTINEL;
reify18324_1.IRender$attached_QMARK_$arity$2 = (function (_this, el) {
const self__ = this;
const _this_2 = this;
return el.isConnected;

});
reify18324_1.IRender$create_text_node$arity$2 = (function (_this, text) {
const self__ = this;
const _this_3 = this;
return document.createTextNode(text);

});
reify18324_1.IRender$create_element$arity$3 = (function (_this, tag_name, options) {
const self__ = this;
const _this_4 = this;
const temp__23846__auto___5 = cherry_core.keyword("ns").call(null, options);
if (cherry_core.truth_.call(null, temp__23846__auto___5)) {
const ns_6 = temp__23846__auto___5;
return document.createElementNS(ns_6, tag_name);
} else {
return document.createElement(tag_name)};

});
reify18324_1.IRender$set_style$arity$4 = (function (this$, el, style, v) {
const self__ = this;
const this$_7 = this;
el.style.setProperty(cherry_core.name.call(null, style), v);
return this$_7;

});
reify18324_1.IRender$remove_style$arity$3 = (function (this$, el, style) {
const self__ = this;
const this$_8 = this;
el.style.removeProperty(cherry_core.name.call(null, style));
return this$_8;

});
reify18324_1.IRender$add_class$arity$3 = (function (this$, el, cn) {
const self__ = this;
const this$_9 = this;
el.classList.add(cn);
return this$_9;

});
reify18324_1.IRender$remove_class$arity$3 = (function (this$, el, cn) {
const self__ = this;
const this$_10 = this;
el.classList.remove(cn);
return this$_10;

});
reify18324_1.IRender$set_attribute$arity$5 = (function (this$, el, attr, v, opt) {
const self__ = this;
const this$_11 = this;
if (("innerHTML" === attr)) {
el.innerHTML = v} else {
if (("value" === attr)) {
el.value = v} else {
if (("default-value" === attr)) {
el.setAttribute("value", v)} else {
if (("selected" === attr)) {
el.selected = v} else {
if (("default-selected" === attr)) {
el.setAttribute("selected", v)} else {
if (("checked" === attr)) {
el.checked = v} else {
if (("default-checked" === attr)) {
el.setAttribute("checked", v)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("ns").call(null, opt))) {
el.setAttributeNS(cherry_core.keyword("ns").call(null, opt), attr, v)} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
el.setAttribute(attr, v)} else {
}}}}}}}}};
return this$_11;

});
reify18324_1.IRender$remove_attribute$arity$3 = (function (this$, el, attr) {
const self__ = this;
const this$_12 = this;
if (("innerHTML" === attr)) {
el.innerHTML = ""} else {
if (("value" === attr)) {
el.value = null} else {
if (("default-value" === attr)) {
el.removeAttribute("value")} else {
if (("selected" === attr)) {
el.selected = null} else {
if (("default-selected" === attr)) {
el.removeAttribute("selected")} else {
if (("checked" === attr)) {
el.checked = null} else {
if (("default-checked" === attr)) {
el.removeAttribute("checked")} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
el.removeAttribute(attr)} else {
}}}}}}}};
return this$_12;

});
reify18324_1.IRender$set_event_handler$arity$5 = (function (this$, el, event, handler, opt) {
const self__ = this;
const this$_13 = this;
if (cherry_core.truth_.call(null, el.replicantHandlers)) {
} else {
el.replicantHandlers = ({  })};
const event_14 = cherry_core.name.call(null, event);
remove_listener.call(null, el, event_14, opt);
(el.replicantHandlers[event_14] = handler);
el.addEventListener(event_14, handler, cherry_core.clj__GT_js.call(null, opt));
return this$_13;

});
reify18324_1.IRender$remove_event_handler$arity$4 = (function (this$, el, event, opt) {
const self__ = this;
const this$_15 = this;
const event_16 = cherry_core.name.call(null, event);
remove_listener.call(null, el, event_16, opt);
(el.replicantHandlers[event_16] = null);
return this$_15;

});
reify18324_1.IRender$append_child$arity$3 = (function (this$, el, child_node) {
const self__ = this;
const this$_17 = this;
el.appendChild(child_node);
return this$_17;

});
reify18324_1.IRender$insert_before$arity$4 = (function (this$, el, child_node, reference_node) {
const self__ = this;
const this$_18 = this;
el.insertBefore(child_node, reference_node);
return this$_18;

});
reify18324_1.IRender$remove_child$arity$3 = (function (this$, el, child_node) {
const self__ = this;
const this$_19 = this;
el.removeChild(child_node);
return this$_19;

});
reify18324_1.IRender$on_transition_end$arity$3 = (function (this$, el, f) {
const self__ = this;
const this$_20 = this;
_on_transition_end.call(null, el, f);
return this$_20;

});
reify18324_1.IRender$replace_child$arity$4 = (function (this$, el, insert_child, replace_child) {
const self__ = this;
const this$_21 = this;
el.replaceChild(insert_child, replace_child);
return this$_21;

});
reify18324_1.IRender$remove_all_children$arity$2 = (function (this$, el) {
const self__ = this;
const this$_22 = this;
el.textContent = "";
return this$_22;

});
reify18324_1.IRender$get_child$arity$3 = (function (_this, el, idx) {
const self__ = this;
const _this_23 = this;
return el.childNodes[idx];

});
reify18324_1.IRender$next_frame$arity$2 = (function (_this, f) {
const self__ = this;
const _this_24 = this;
return on_next_frame.call(null, f);

});
reify18324_1.IMemory$ = cherry_core.PROTOCOL_SENTINEL;
reify18324_1.IMemory$remember$arity$3 = (function (_this, node, memory) {
const self__ = this;
const _this_25 = this;
return memories.set(node, memory);

});
reify18324_1.IMemory$recall$arity$2 = (function (_this, node) {
const self__ = this;
const _this_26 = this;
return memories.get(node);

});
return reify18324_1;

};
var state = cherry_core.volatile_BANG_.call(null, r.node_map.call(null));
var render = (() => {
const f20385 = (function (var_args) {
const args20386_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i20387_3 = 0;
while(true){
if ((i20387_3 < len__22792__auto___2)) {
args20386_1.push((arguments[i20387_3]));
let G__4 = (i20387_3 + 1);
i20387_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((2 < args20386_1.length)) ? ((new cherry_core.IndexedSeq(args20386_1.slice(2), 0, null))) : (null));
return f20385.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), (arguments[1]), argseq__23180__auto___5);

});
f20385.cljs$core$IFn$_invoke$arity$variadic = (function (el, hiccup, p__20596) {
const vec__20602_6 = p__20596;
const map__20605_7 = cherry_core.nth.call(null, vec__20602_6, 0, null);
const map__20605_8 = cherry_core.__destructure_map.call(null, map__20605_7);
const aliases_9 = cherry_core.get.call(null, map__20605_8, cherry_core.keyword("aliases"));
const alias_data_10 = cherry_core.get.call(null, map__20605_8, cherry_core.keyword("alias-data"));
const rendering_QMARK__11 = cherry_core.get_in.call(null, cherry_core.deref.call(null, state), cherry_core.vector(el, cherry_core.keyword("rendering?")));
if (cherry_core.truth_.call(null, cherry_core.contains_QMARK_.call(null, cherry_core.deref.call(null, state), el))) {
} else {
el.innerHTML = "";
cherry_core.vreset_BANG_.call(null, state, cherry_core.assoc.call(null, cherry_core.deref.call(null, state), el, cherry_core.array_map(cherry_core.keyword("renderer"), create_renderer.call(null), cherry_core.keyword("unmounts"), cherry_core.volatile_BANG_.call(null, cherry_core.hash_set()), cherry_core.keyword("unmount-hooks"), cherry_core.volatile_BANG_.call(null, r.node_map.call(null)), cherry_core.keyword("rendering?"), true)))};
if (cherry_core.truth_.call(null, rendering_QMARK__11)) {
cherry_core.vreset_BANG_.call(null, state, cherry_core.assoc_in.call(null, cherry_core.deref.call(null, state), cherry_core.vector(el, cherry_core.keyword("queued")), hiccup))} else {
cherry_core.vreset_BANG_.call(null, state, cherry_core.assoc_in.call(null, cherry_core.deref.call(null, state), cherry_core.vector(el, cherry_core.keyword("rendering?")), true));
const map__20796_12 = cherry_core.get.call(null, cherry_core.deref.call(null, state), el);
const map__20796_13 = cherry_core.__destructure_map.call(null, map__20796_12);
const renderer_14 = cherry_core.get.call(null, map__20796_13, cherry_core.keyword("renderer"));
const current_15 = cherry_core.get.call(null, map__20796_13, cherry_core.keyword("current"));
const unmounts_16 = cherry_core.get.call(null, map__20796_13, cherry_core.keyword("unmounts"));
const unmount_hooks_17 = cherry_core.get.call(null, map__20796_13, cherry_core.keyword("unmount-hooks"));
const aliases_18 = (() => {
const or__23992__auto___19 = aliases_9;
if (cherry_core.truth_.call(null, or__23992__auto___19)) {
return or__23992__auto___19} else {
return alias.get_registered_aliases.call(null)};

})();
const hiccup_20 = ((cherry_core.truth_.call(null, alias_data_10)) ? (hiccup) : (hiccup));
const map__20797_21 = (() => {
try{
return r.reconcile.call(null, renderer_14, el, hiccup_20, current_15, cherry_core.array_map(cherry_core.keyword("unmounts"), unmounts_16, cherry_core.keyword("unmount-hooks"), unmount_hooks_17, cherry_core.keyword("aliases"), aliases_18, cherry_core.keyword("alias-data"), alias_data_10));
}
catch(e_22){
console.error(`${"Caught exception during rendering. "}${((cherry_core.truth_.call(null, aliases_18)) ? ("You may have misbehaving aliases, or you have encountered a bug in Replicant.") : ("This is likely a bug in Replicant."))??''}`, e_22);
return null;
}

})();
const map__20797_23 = cherry_core.__destructure_map.call(null, map__20797_21);
const vdom_24 = cherry_core.get.call(null, map__20797_23, cherry_core.keyword("vdom"));
cherry_core.vreset_BANG_.call(null, state, cherry_core.update.call(null, cherry_core.deref.call(null, state), el, cherry_core.merge, (() => {
const G__20943_25 = cherry_core.array_map(cherry_core.keyword("rendering?"), false);
if (cherry_core.truth_.call(null, vdom_24)) {
return cherry_core.assoc.call(null, G__20943_25, cherry_core.keyword("current"), vdom_24)} else {
return G__20943_25};

})()));
const temp__23929__auto___26 = cherry_core.keyword("queued").call(null, cherry_core.get.call(null, cherry_core.deref.call(null, state), el));
if (cherry_core.truth_.call(null, temp__23929__auto___26)) {
const pending_27 = temp__23929__auto___26;
requestAnimationFrame((function () {
return render.call(null, el, pending_27);

}));
cherry_core.vreset_BANG_.call(null, state, cherry_core.update.call(null, cherry_core.deref.call(null, state), el, cherry_core.dissoc, cherry_core.keyword("queued")))}};
return el;

});
f20385.cljs$lang$maxFixedArity = 2;
f20385.cljs$lang$applyTo = (function (seq20388) {
const G__20389_28 = cherry_core.first.call(null, seq20388);
const seq20388_29 = cherry_core.next.call(null, seq20388);
const G__20390_30 = cherry_core.first.call(null, seq20388_29);
const seq20388_31 = cherry_core.next.call(null, seq20388_29);
const self__22809__auto___32 = this;
return self__22809__auto___32.cljs$core$IFn$_invoke$arity$variadic(G__20389_28, G__20390_30, seq20388_31);

});
return f20385;

})();
var unmount = function (el) {
if (cherry_core.truth_.call(null, cherry_core.get_in.call(null, cherry_core.deref.call(null, state), cherry_core.vector(el, cherry_core.keyword("rendering?"))))) {
return requestAnimationFrame((function () {
return unmount.call(null, el);

}))} else {
render.call(null, el, null);
cherry_core.vreset_BANG_.call(null, state, cherry_core.dissoc.call(null, cherry_core.deref.call(null, state), el));
return null;
};

};
var set_dispatch_BANG_ = function (f) {
return r._STAR_dispatch_STAR_.val = f;

};

export { create_renderer, recall, set_dispatch_BANG_, on_next_frame, remove_listener, render, state, unmount, memories, _on_transition_end }
