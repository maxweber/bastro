import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as r from './../replicant/dom.mjs';
import * as replicant_DOT_dom from './../replicant/dom.mjs';
import * as transit from './transit.mjs';
import * as bastro_DOT_transit from './transit.mjs';
var db = cherry_core.atom.call(null, cherry_core.array_map(cherry_core.keyword("islands"), cherry_core.array_map(), cherry_core.keyword("state"), cherry_core.array_map()));
var registry = cherry_core.atom.call(null, cherry_core.array_map());
var counter = cherry_core.atom.call(null, 0);
var state = function () {
return cherry_core.deref.call(null, db);

};
var island_id_BANG_ = function (el) {
const or__23992__auto___1 = el.bastroIsland;
if (cherry_core.truth_.call(null, or__23992__auto___1)) {
return or__23992__auto___1} else {
const id_2 = `island-${cherry_core.swap_BANG_.call(null, counter, cherry_core.inc)??''}`;
el.bastroIsland = id_2;
return id_2;
};

};
var render_island_BANG_ = function (p__18, s) {
const map__19_1 = p__18;
const map__19_2 = cherry_core.__destructure_map.call(null, map__19_1);
const el_3 = cherry_core.get.call(null, map__19_2, cherry_core.keyword("el"));
const view_4 = cherry_core.get.call(null, map__19_2, cherry_core.keyword("view"));
const props_5 = cherry_core.get.call(null, map__19_2, cherry_core.keyword("props"));
return r.render.call(null, el_3, view_4.call(null, s, props_5));

};
cherry_core.add_watch.call(null, db, cherry_core.keyword("bastro.loader/render"), (function (_, __1, old, new$) {
let seq__20_2 = cherry_core.seq.call(null, cherry_core.keyword("islands").call(null, new$));
let chunk__21_3 = null;
let count__22_4 = 0;
let i__23_5 = 0;
while(true){
if ((i__23_5 < count__22_4)) {
const vec__24_6 = cherry_core._nth.call(null, chunk__21_3, i__23_5);
const id_7 = cherry_core.nth.call(null, vec__24_6, 0, null);
const island_8 = cherry_core.nth.call(null, vec__24_6, 1, null);
const s_9 = cherry_core.get_in.call(null, new$, cherry_core.vector(cherry_core.keyword("state"), id_7));
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___10 = cherry_core.not.call(null, cherry_core.contains_QMARK_.call(null, cherry_core.keyword("islands").call(null, old), id_7));
if (cherry_core.truth_.call(null, or__23992__auto___10)) {
return or__23992__auto___10} else {
return cherry_core.not.call(null, cherry_core._EQ_.call(null, s_9, cherry_core.get_in.call(null, old, cherry_core.vector(cherry_core.keyword("state"), id_7))))};

})())) {
render_island_BANG_.call(null, island_8, s_9)};
let G__11 = seq__20_2;
let G__12 = chunk__21_3;
let G__13 = count__22_4;
let G__14 = cherry_core.unchecked_inc.call(null, i__23_5);
seq__20_2 = G__11;
chunk__21_3 = G__12;
count__22_4 = G__13;
i__23_5 = G__14;
continue;
} else {
const temp__23929__auto___15 = cherry_core.seq.call(null, seq__20_2);
if (cherry_core.truth_.call(null, temp__23929__auto___15)) {
const seq__20_16 = temp__23929__auto___15;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__20_16))) {
const c__24215__auto___17 = cherry_core.chunk_first.call(null, seq__20_16);
let G__18 = cherry_core.chunk_rest.call(null, seq__20_16);
let G__19 = c__24215__auto___17;
let G__20 = cherry_core.count.call(null, c__24215__auto___17);
let G__21 = 0;
seq__20_2 = G__18;
chunk__21_3 = G__19;
count__22_4 = G__20;
i__23_5 = G__21;
continue;
} else {
const vec__27_22 = cherry_core.first.call(null, seq__20_16);
const id_23 = cherry_core.nth.call(null, vec__27_22, 0, null);
const island_24 = cherry_core.nth.call(null, vec__27_22, 1, null);
const s_25 = cherry_core.get_in.call(null, new$, cherry_core.vector(cherry_core.keyword("state"), id_23));
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___26 = cherry_core.not.call(null, cherry_core.contains_QMARK_.call(null, cherry_core.keyword("islands").call(null, old), id_23));
if (cherry_core.truth_.call(null, or__23992__auto___26)) {
return or__23992__auto___26} else {
return cherry_core.not.call(null, cherry_core._EQ_.call(null, s_25, cherry_core.get_in.call(null, old, cherry_core.vector(cherry_core.keyword("state"), id_23))))};

})())) {
render_island_BANG_.call(null, island_24, s_25)};
let G__27 = cherry_core.next.call(null, seq__20_16);
let G__28 = null;
let G__29 = 0;
let G__30 = 0;
seq__20_2 = G__27;
chunk__21_3 = G__28;
count__22_4 = G__29;
i__23_5 = G__30;
continue;
};
};
};
;break;
}
;

}));
var dispatch = function (rd, actions) {
const temp__23929__auto___1 = (() => {
const G__30_2 = cherry_core.keyword("replicant/node").call(null, rd);
if ((G__30_2 == null)) {
return null} else {
return G__30_2.closest("[data-island]")};

})();
if (cherry_core.truth_.call(null, temp__23929__auto___1)) {
const el_3 = temp__23929__auto___1;
const id_4 = el_3.bastroIsland;
const temp__23929__auto___5 = cherry_core.get_in.call(null, cherry_core.deref.call(null, db), cherry_core.vector(cherry_core.keyword("islands"), id_4, cherry_core.keyword("step")));
if (cherry_core.truth_.call(null, temp__23929__auto___5)) {
const step_6 = temp__23929__auto___5;
return cherry_core.swap_BANG_.call(null, db, cherry_core.update_in, cherry_core.vector(cherry_core.keyword("state"), id_4), (function (s) {
return cherry_core.reduce.call(null, step_6, s, actions);

}));
};
};

};
var when_ready = function (el, f) {
const ds_1 = el.dataset;
const client_2 = ds_1.client;
if ((client_2 === "idle")) {
if (cherry_core.truth_.call(null, window.requestIdleCallback)) {
return requestIdleCallback(f)} else {
return setTimeout(f, 1)}} else {
if ((client_2 === "visible")) {
const obs_3 = (new IntersectionObserver((function (entries, o) {
if (cherry_core.truth_.call(null, cherry_core.some.call(null, (function (e) {
return e.isIntersecting;

}), cherry_core.array_seq.call(null, entries)))) {
o.disconnect();
return f.call(null);
};

})));
return obs_3.observe(el);
} else {
if ((client_2 === "media")) {
const mq_4 = matchMedia(ds_1.media);
if (cherry_core.truth_.call(null, mq_4.matches)) {
return f.call(null)} else {
const handler_5 = (function handler (e) {
if (cherry_core.truth_.call(null, e.matches)) {
mq_4.removeEventListener("change", handler);
return f.call(null);
};

});
return mq_4.addEventListener("change", handler_5);
};
} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return f.call(null)} else {
return null}}}};

};
var mount_BANG_ = function (el) {
const ns_name_1 = el.dataset.island;
const temp__23846__auto___2 = cherry_core.get.call(null, cherry_core.deref.call(null, registry), ns_name_1);
if (cherry_core.truth_.call(null, temp__23846__auto___2)) {
const island_3 = temp__23846__auto___2;
const props_4 = transit.read_str.call(null, el.dataset.props);
const id_5 = island_id_BANG_.call(null, el);
const init_6 = cherry_core.get.call(null, island_3, "init");
return cherry_core.swap_BANG_.call(null, db, (function (d) {
return cherry_core.assoc_in.call(null, cherry_core.assoc_in.call(null, d, cherry_core.vector(cherry_core.keyword("islands"), id_5), cherry_core.array_map(cherry_core.keyword("el"), el, cherry_core.keyword("view"), cherry_core.get.call(null, island_3, "view"), cherry_core.keyword("step"), cherry_core.get.call(null, island_3, "step"), cherry_core.keyword("props"), props_4)), cherry_core.vector(cherry_core.keyword("state"), id_5), init_6.call(null, props_4));

}));
} else {
return console.warn("bastro: no island registered for", ns_name_1)};

};
var prune_BANG_ = function () {
return cherry_core.swap_BANG_.call(null, db, (function (d) {
const gone_1 = (() => {
const iter__24061__auto___2 = (function iter__31 (s__32) {
return (new cherry_core.LazySeq(null, (function () {
let s__32_3 = s__32;
while(true){
const temp__23929__auto___4 = cherry_core.seq.call(null, s__32_3);
if (cherry_core.truth_.call(null, temp__23929__auto___4)) {
const s__32_5 = temp__23929__auto___4;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, s__32_5))) {
const c__24058__auto___6 = cherry_core.chunk_first.call(null, s__32_5);
const size__24059__auto___7 = cherry_core.count.call(null, c__24058__auto___6);
const b__34_8 = cherry_core.chunk_buffer.call(null, size__24059__auto___7);
if ((() => {
let i__33_9 = 0;
while(true){
if ((i__33_9 < size__24059__auto___7)) {
const vec__35_10 = cherry_core._nth.call(null, c__24058__auto___6, i__33_9);
const id_11 = cherry_core.nth.call(null, vec__35_10, 0, null);
const map__38_12 = cherry_core.nth.call(null, vec__35_10, 1, null);
const map__38_13 = cherry_core.__destructure_map.call(null, map__38_12);
const el_14 = cherry_core.get.call(null, map__38_13, cherry_core.keyword("el"));
if (cherry_core.truth_.call(null, cherry_core.not.call(null, el_14.isConnected))) {
cherry_core.chunk_append.call(null, b__34_8, id_11);
let G__15 = cherry_core.unchecked_inc.call(null, i__33_9);
i__33_9 = G__15;
continue;
} else {
let G__16 = cherry_core.unchecked_inc.call(null, i__33_9);
i__33_9 = G__16;
continue;
};
} else {
return true};
;break;
}

})()) {
return cherry_core.chunk_cons.call(null, cherry_core.chunk.call(null, b__34_8), iter__31.call(null, cherry_core.chunk_rest.call(null, s__32_5)))} else {
return cherry_core.chunk_cons.call(null, cherry_core.chunk.call(null, b__34_8), null)};
} else {
const vec__39_17 = cherry_core.first.call(null, s__32_5);
const id_18 = cherry_core.nth.call(null, vec__39_17, 0, null);
const map__42_19 = cherry_core.nth.call(null, vec__39_17, 1, null);
const map__42_20 = cherry_core.__destructure_map.call(null, map__42_19);
const el_21 = cherry_core.get.call(null, map__42_20, cherry_core.keyword("el"));
if (cherry_core.truth_.call(null, cherry_core.not.call(null, el_21.isConnected))) {
return cherry_core.cons.call(null, id_18, iter__31.call(null, cherry_core.rest.call(null, s__32_5)))} else {
let G__22 = cherry_core.rest.call(null, s__32_5);
s__32_3 = G__22;
continue;
};
};
};
;break;
}
;

}), null, null));

});
return iter__24061__auto___2.call(null, cherry_core.keyword("islands").call(null, d));

})();
return cherry_core.update.call(null, cherry_core.update.call(null, d, cherry_core.keyword("islands"), (function (m) {
return cherry_core.apply.call(null, cherry_core.dissoc, m, gone_1);

})), cherry_core.keyword("state"), (function (m) {
return cherry_core.apply.call(null, cherry_core.dissoc, m, gone_1);

}));

}));

};
var scan_BANG_ = function () {
prune_BANG_.call(null);
let seq__43_1 = cherry_core.seq.call(null, cherry_core.array_seq.call(null, document.querySelectorAll("[data-island]")));
let chunk__44_2 = null;
let count__45_3 = 0;
let i__46_4 = 0;
while(true){
if ((i__46_4 < count__45_3)) {
const el_5 = cherry_core._nth.call(null, chunk__44_2, i__46_4);
if (cherry_core.truth_.call(null, el_5.bastroSeen)) {
} else {
el_5.bastroSeen = true;
when_ready.call(null, el_5, (function () {
return mount_BANG_.call(null, el_5);

}))};
let G__6 = seq__43_1;
let G__7 = chunk__44_2;
let G__8 = count__45_3;
let G__9 = cherry_core.unchecked_inc.call(null, i__46_4);
seq__43_1 = G__6;
chunk__44_2 = G__7;
count__45_3 = G__8;
i__46_4 = G__9;
continue;
} else {
const temp__23929__auto___10 = cherry_core.seq.call(null, seq__43_1);
if (cherry_core.truth_.call(null, temp__23929__auto___10)) {
const seq__43_11 = temp__23929__auto___10;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__43_11))) {
const c__24215__auto___12 = cherry_core.chunk_first.call(null, seq__43_11);
let G__13 = cherry_core.chunk_rest.call(null, seq__43_11);
let G__14 = c__24215__auto___12;
let G__15 = cherry_core.count.call(null, c__24215__auto___12);
let G__16 = 0;
seq__43_1 = G__13;
chunk__44_2 = G__14;
count__45_3 = G__15;
i__46_4 = G__16;
continue;
} else {
const el_17 = cherry_core.first.call(null, seq__43_11);
if (cherry_core.truth_.call(null, el_17.bastroSeen)) {
} else {
el_17.bastroSeen = true;
when_ready.call(null, el_17, (function () {
return mount_BANG_.call(null, el_17);

}))};
let G__18 = cherry_core.next.call(null, seq__43_11);
let G__19 = null;
let G__20 = 0;
let G__21 = 0;
seq__43_1 = G__18;
chunk__44_2 = G__19;
count__45_3 = G__20;
i__46_4 = G__21;
continue;
};
};
};
;break;
}
;

};
var start_BANG_ = function (islands) {
cherry_core.swap_BANG_.call(null, registry, cherry_core.merge, ((cherry_core.truth_.call(null, cherry_core.map_QMARK_.call(null, islands))) ? (islands) : (cherry_core.js__GT_clj.call(null, islands))));
r.set_dispatch_BANG_.call(null, dispatch);
if (("loading" === document.readyState)) {
document.addEventListener("DOMContentLoaded", (function (_) {
return scan_BANG_.call(null);

}))} else {
scan_BANG_.call(null)};
return document.addEventListener("bastro:rendered", (function (_) {
return scan_BANG_.call(null);

}));

};

export { dispatch, counter, mount_BANG_, scan_BANG_, island_id_BANG_, when_ready, render_island_BANG_, registry, start_BANG_, prune_BANG_, state, db }
