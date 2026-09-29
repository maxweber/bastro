import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as str from 'cherry-cljs/lib/clojure.string.js';
import * as clojure_DOT_string from 'cherry-cljs/lib/clojure.string.js';
import * as alias from './alias.mjs';
import * as replicant_DOT_alias from './alias.mjs';
import * as r from './core.mjs';
import * as replicant_DOT_core from './core.mjs';
import * as h from './hiccup.mjs';
import * as replicant_DOT_hiccup from './hiccup.mjs';
import * as hiccup from './hiccup_headers.mjs';
import * as replicant_DOT_hiccup_headers from './hiccup_headers.mjs';
var IStringifier = function(){};
let IStringifier$append$dyn21481 = (function (this$, s) {
const x__22796__auto___1 = (((this$ == null)) ? (null) : (this$));
const m__22797__auto___2 = (append[cherry_core.goog_typeOf.call(null, x__22796__auto___1)]);
if (cherry_core.truth_.call(null, cherry_core.not.call(null, (m__22797__auto___2 == null)))) {
return m__22797__auto___2.call(null, this$, s)} else {
const m__22795__auto___3 = (append["_"]);
if (cherry_core.truth_.call(null, cherry_core.not.call(null, (m__22795__auto___3 == null)))) {
return m__22795__auto___3.call(null, this$, s)} else {
throw cherry_core.missing_protocol.call(null, "IStringifier.append", this$)};
};

});
var append = function (this$, s) {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___4 = cherry_core.not.call(null, (this$ == null));
if (cherry_core.truth_.call(null, and__24022__auto___4)) {
return cherry_core.not.call(null, (this$.IStringifier$append$arity$2 == null))} else {
return and__24022__auto___4};

})())) {
return this$.IStringifier$append$arity$2(this$, s)} else {
return IStringifier$append$dyn21481.call(null, this$, s)};

};
let IStringifier$to_string$dyn21717 = (function (this$) {
const x__22796__auto___5 = (((this$ == null)) ? (null) : (this$));
const m__22797__auto___6 = (to_string[cherry_core.goog_typeOf.call(null, x__22796__auto___5)]);
if (cherry_core.truth_.call(null, cherry_core.not.call(null, (m__22797__auto___6 == null)))) {
return m__22797__auto___6.call(null, this$)} else {
const m__22795__auto___7 = (to_string["_"]);
if (cherry_core.truth_.call(null, cherry_core.not.call(null, (m__22795__auto___7 == null)))) {
return m__22795__auto___7.call(null, this$)} else {
throw cherry_core.missing_protocol.call(null, "IStringifier.to-string", this$)};
};

});
var to_string = function (this$) {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___8 = cherry_core.not.call(null, (this$ == null));
if (cherry_core.truth_.call(null, and__24022__auto___8)) {
return cherry_core.not.call(null, (this$.IStringifier$to_string$arity$1 == null))} else {
return and__24022__auto___8};

})())) {
return this$.IStringifier$to_string$arity$1(this$)} else {
return IStringifier$to_string$dyn21717.call(null, this$)};

};
var create_renderer = function () {
const sb_1 = [];
const reify21968_2 = cherry_core.js_obj.call(null);
reify21968_2.IStringifier$ = cherry_core.PROTOCOL_SENTINEL;
reify21968_2.IStringifier$append$arity$2 = (function (_, s) {
const self__ = this;
const __3 = this;
return sb_1.push(s);

});
reify21968_2.IStringifier$to_string$arity$1 = (function (_) {
const self__ = this;
const __4 = this;
return sb_1.join("");

});
return reify21968_2;

};
var self_closing_QMARK_ = cherry_core.hash_set("track", "br", "img", "area", "base", "hr", "col", "param", "input", "link", "source", "audio", "meta", "wbr", "embed");
var str_join = function (stringifier, sep, xs) {
const G__22139_1 = cherry_core.first.call(null, xs);
if ((G__22139_1 == null)) {
} else {
append.call(null, stringifier, G__22139_1)};
let seq__22170_2 = cherry_core.seq.call(null, cherry_core.rest.call(null, xs));
let chunk__22171_3 = null;
let count__22172_4 = 0;
let i__22173_5 = 0;
while(true){
if ((i__22173_5 < count__22172_4)) {
const x_6 = cherry_core._nth.call(null, chunk__22171_3, i__22173_5);
if (cherry_core.truth_.call(null, x_6)) {
append.call(null, stringifier, sep);
append.call(null, stringifier, x_6)};
let G__7 = seq__22170_2;
let G__8 = chunk__22171_3;
let G__9 = count__22172_4;
let G__10 = cherry_core.unchecked_inc.call(null, i__22173_5);
seq__22170_2 = G__7;
chunk__22171_3 = G__8;
count__22172_4 = G__9;
i__22173_5 = G__10;
continue;
} else {
const temp__23929__auto___11 = cherry_core.seq.call(null, seq__22170_2);
if (cherry_core.truth_.call(null, temp__23929__auto___11)) {
const seq__22170_12 = temp__23929__auto___11;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__22170_12))) {
const c__24215__auto___13 = cherry_core.chunk_first.call(null, seq__22170_12);
let G__14 = cherry_core.chunk_rest.call(null, seq__22170_12);
let G__15 = c__24215__auto___13;
let G__16 = cherry_core.count.call(null, c__24215__auto___13);
let G__17 = 0;
seq__22170_2 = G__14;
chunk__22171_3 = G__15;
count__22172_4 = G__16;
i__22173_5 = G__17;
continue;
} else {
const x_18 = cherry_core.first.call(null, seq__22170_12);
if (cherry_core.truth_.call(null, x_18)) {
append.call(null, stringifier, sep);
append.call(null, stringifier, x_18)};
let G__19 = cherry_core.next.call(null, seq__22170_12);
let G__20 = null;
let G__21 = 0;
let G__22 = 0;
seq__22170_2 = G__19;
chunk__22171_3 = G__20;
count__22172_4 = G__21;
i__22173_5 = G__22;
continue;
}}};break;
}
;
return stringifier;

};
var escape_html = function (text) {
return str.replace.call(null, str.replace.call(null, str.replace.call(null, str.replace.call(null, str.replace.call(null, text, "&", "&amp;"), "<", "&lt;"), ">", "&gt;"), "\"", "&#39;"), "'", "&apos;");

};
var render_attrs = function (stringifier, attrs) {
return cherry_core.reduce_kv.call(null, (function (_, k, v) {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___1 = cherry_core.not.call(null, cherry_core.hash_set(cherry_core.keyword("on"), cherry_core.keyword("innerHTML")).call(null, k));
if (cherry_core.truth_.call(null, and__24022__auto___1)) {
const and__24022__auto___2 = v;
if (cherry_core.truth_.call(null, and__24022__auto___2)) {
return (cherry_core.namespace.call(null, k) == null)} else {
return and__24022__auto___2};
} else {
return and__24022__auto___1};

})())) {
const v_3 = (() => {
const G__22589_4 = v;
if (cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, v))) {
return cherry_core.name.call(null, G__22589_4)} else {
return G__22589_4};

})();
append.call(null, stringifier, " ");
const G__22630_5 = k;
const G__22630_6 = ((cherry_core.truth_.call(null, cherry_core.keyword_QMARK_.call(null, G__22630_5))) ? (cherry_core.subs.call(null, `${G__22630_5??''}`, 1)) : (null));
switch (G__22630_6) {case "classes":
append.call(null, stringifier, "class=\"");
str_join.call(null, stringifier, " ", cherry_core.mapv.call(null, escape_html, v_3));
append.call(null, stringifier, "\"");

break;
case "style":
append.call(null, stringifier, "style=\"");
str_join.call(null, stringifier, " ", cherry_core.keep.call(null, (function (p__22731) {
const vec__22737_8 = p__22731;
const prop_9 = cherry_core.nth.call(null, vec__22737_8, 0, null);
const val_10 = cherry_core.nth.call(null, vec__22737_8, 1, null);
const temp__23929__auto___11 = r.get_style_val.call(null, prop_9, val_10);
if (cherry_core.truth_.call(null, temp__23929__auto___11)) {
const val_12 = temp__23929__auto___11;
return `${cherry_core.name.call(null, prop_9)}${": "}${escape_html.call(null, val_12)??''}${";"}`;
};

}), v_3));
append.call(null, stringifier, "\"");

break;
default:
const num_QMARK__13 = cherry_core.number_QMARK_.call(null, v_3);
if (cherry_core.truth_.call(null, (() => {
const or__23992__auto___14 = num_QMARK__13;
if (cherry_core.truth_.call(null, or__23992__auto___14)) {
return or__23992__auto___14} else {
const and__24022__auto___15 = cherry_core.string_QMARK_.call(null, v_3);
if (cherry_core.truth_.call(null, and__24022__auto___15)) {
return (0 < cherry_core.count.call(null, v_3))} else {
return and__24022__auto___15};
};

})())) {
const G__22920_16 = stringifier;
append.call(null, G__22920_16, cherry_core.name.call(null, k));
append.call(null, G__22920_16, "=\"");
append.call(null, G__22920_16, (() => {
const G__22951_17 = v_3;
if (cherry_core.truth_.call(null, cherry_core.not.call(null, num_QMARK__13))) {
return escape_html.call(null, G__22951_17)} else {
return G__22951_17};

})());
append.call(null, G__22920_16, "\"");
G__22920_16} else {
append.call(null, stringifier, cherry_core.name.call(null, k))}}};
return null;

}), null, attrs);

};
var get_expanded_headers = function (opt, headers) {
if (cherry_core.truth_.call(null, (() => {
const and__24022__auto___1 = cherry_core.qualified_keyword_QMARK_.call(null, headers[0]);
if (cherry_core.truth_.call(null, and__24022__auto___1)) {
return (cherry_core.get.call(null, cherry_core.keyword("aliases").call(null, opt), headers[0]) == null)} else {
return and__24022__auto___1};

})())) {
throw cherry_core.ex_info.call(null, `${"Tried to expand undefined alias "}${headers[0]??''}`, cherry_core.array_map(cherry_core.keyword("missing"), headers[0], cherry_core.keyword("available"), cherry_core.keyword("aliases").call(null, opt)))};
const or__23992__auto___2 = (() => {
const temp__23929__auto___3 = r.get_alias_headers.call(null, opt, headers);
if (cherry_core.truth_.call(null, temp__23929__auto___3)) {
const aliased_4 = temp__23929__auto___3;
return get_expanded_headers.call(null, opt, aliased_4);
};

})();
if (cherry_core.truth_.call(null, or__23992__auto___2)) {
return or__23992__auto___2} else {
return headers};

};
var render_node = function (stringifier, headers, p__23207) {
const map__23213_1 = p__23207;
const map__23213_2 = cherry_core.__destructure_map.call(null, map__23213_1);
const depth_3 = cherry_core.get.call(null, map__23213_2, cherry_core.keyword("depth"));
const indent_4 = cherry_core.get.call(null, map__23213_2, cherry_core.keyword("indent"));
const aliases_5 = cherry_core.get.call(null, map__23213_2, cherry_core.keyword("aliases"));
const alias_data_6 = cherry_core.get.call(null, map__23213_2, cherry_core.keyword("alias-data"));
const indent_QMARK__7 = (indent_4 > 0);
const indent_s_8 = ((indent_QMARK__7) ? (str.join.call(null, cherry_core.repeat.call(null, (depth_3 * indent_4), " "))) : (""));
const newline_9 = ((indent_QMARK__7) ? ("\n") : (""));
const headers_10 = get_expanded_headers.call(null, cherry_core.array_map(cherry_core.keyword("aliases"), aliases_5, cherry_core.keyword("alias-data"), alias_data_6), headers);
const temp__23846__auto___11 = headers_10[8];
if (cherry_core.truth_.call(null, temp__23846__auto___11)) {
const text_12 = temp__23846__auto___11;
const G__23329_13 = stringifier;
append.call(null, G__23329_13, indent_s_8);
append.call(null, G__23329_13, escape_html.call(null, text_12));
append.call(null, G__23329_13, newline_9);
return G__23329_13;
} else {
const tag_name_14 = headers_10[0];
const attrs_15 = r.get_attrs.call(null, headers_10);
const ns_string_16 = ((cherry_core.truth_.call(null, (("svg" === tag_name_14) && cherry_core.not.call(null, cherry_core.keyword("xmlns").call(null, attrs_15))))) ? (" xmlns=\"http://www.w3.org/2000/svg\"") : (""));
const G__23425_17 = stringifier;
append.call(null, G__23425_17, indent_s_8);
append.call(null, G__23425_17, "<");
append.call(null, G__23425_17, tag_name_14);
append.call(null, G__23425_17, ns_string_16);
G__23425_17;
render_attrs.call(null, stringifier, attrs_15);
const G__23461_18 = stringifier;
append.call(null, G__23461_18, ">");
append.call(null, G__23461_18, newline_9);
G__23461_18;
if (cherry_core.truth_.call(null, cherry_core.keyword("innerHTML").call(null, attrs_15))) {
append.call(null, stringifier, cherry_core.keyword("innerHTML").call(null, attrs_15))} else {
cherry_core.run_BANG_.call(null, (function (child) {
if (cherry_core.truth_.call(null, child)) {
return render_node.call(null, stringifier, child, cherry_core.array_map(cherry_core.keyword("depth"), (depth_3 + 1), cherry_core.keyword("indent"), indent_4, cherry_core.keyword("aliases"), aliases_5, cherry_core.keyword("alias-data"), alias_data_6));
};

}), r.get_children.call(null, headers_10, headers_10[6]))};
if (cherry_core.truth_.call(null, self_closing_QMARK_.call(null, tag_name_14))) {
} else {
const G__23582_19 = stringifier;
append.call(null, G__23582_19, indent_s_8);
append.call(null, G__23582_19, "</");
append.call(null, G__23582_19, tag_name_14);
append.call(null, G__23582_19, ">");
append.call(null, G__23582_19, newline_9);
G__23582_19};
return stringifier;
};

};
var render = (() => {
const f23628 = (function (var_args) {
const args23629_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i23630_3 = 0;
while(true){
if ((i23630_3 < len__22792__auto___2)) {
args23629_1.push((arguments[i23630_3]));
let G__4 = (i23630_3 + 1);
i23630_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((1 < args23629_1.length)) ? ((new cherry_core.IndexedSeq(args23629_1.slice(1), 0, null))) : (null));
return f23628.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), argseq__23180__auto___5);

});
f23628.cljs$core$IFn$_invoke$arity$variadic = (function (hiccup, p__23828) {
const vec__23834_6 = p__23828;
const map__23837_7 = cherry_core.nth.call(null, vec__23834_6, 0, null);
const map__23837_8 = cherry_core.__destructure_map.call(null, map__23837_7);
const aliases_9 = cherry_core.get.call(null, map__23837_8, cherry_core.keyword("aliases"));
const alias_data_10 = cherry_core.get.call(null, map__23837_8, cherry_core.keyword("alias-data"));
const indent_11 = cherry_core.get.call(null, map__23837_8, cherry_core.keyword("indent"));
const opt_12 = cherry_core.array_map(cherry_core.keyword("indent"), (() => {
const or__23992__auto___13 = indent_11;
if (cherry_core.truth_.call(null, or__23992__auto___13)) {
return or__23992__auto___13} else {
return 0};

})(), cherry_core.keyword("depth"), 0, cherry_core.keyword("aliases"), (() => {
const or__23992__auto___14 = aliases_9;
if (cherry_core.truth_.call(null, or__23992__auto___14)) {
return or__23992__auto___14} else {
return alias.get_registered_aliases.call(null)};

})(), cherry_core.keyword("alias-data"), alias_data_10);
if (cherry_core.truth_.call(null, h.hiccup_QMARK_.call(null, hiccup))) {
const stringifier_15 = create_renderer.call(null);
render_node.call(null, stringifier_15, r.get_hiccup_headers.call(null, null, hiccup), opt_12);
return to_string.call(null, stringifier_15);
} else {
if (cherry_core.truth_.call(null, r.proper_seq_QMARK_.call(null, hiccup))) {
const stringifier_16 = create_renderer.call(null);
let seq__24018_17 = cherry_core.seq.call(null, hiccup);
let chunk__24019_18 = null;
let count__24020_19 = 0;
let i__24021_20 = 0;
while(true){
if ((i__24021_20 < count__24020_19)) {
const hiccup_node_21 = cherry_core._nth.call(null, chunk__24019_18, i__24021_20);
render_node.call(null, stringifier_16, r.get_hiccup_headers.call(null, null, hiccup_node_21), opt_12);
let G__22 = seq__24018_17;
let G__23 = chunk__24019_18;
let G__24 = count__24020_19;
let G__25 = cherry_core.unchecked_inc.call(null, i__24021_20);
seq__24018_17 = G__22;
chunk__24019_18 = G__23;
count__24020_19 = G__24;
i__24021_20 = G__25;
continue;
} else {
const temp__23929__auto___26 = cherry_core.seq.call(null, seq__24018_17);
if (cherry_core.truth_.call(null, temp__23929__auto___26)) {
const seq__24018_27 = temp__23929__auto___26;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__24018_27))) {
const c__24215__auto___28 = cherry_core.chunk_first.call(null, seq__24018_27);
let G__29 = cherry_core.chunk_rest.call(null, seq__24018_27);
let G__30 = c__24215__auto___28;
let G__31 = cherry_core.count.call(null, c__24215__auto___28);
let G__32 = 0;
seq__24018_17 = G__29;
chunk__24019_18 = G__30;
count__24020_19 = G__31;
i__24021_20 = G__32;
continue;
} else {
const hiccup_node_33 = cherry_core.first.call(null, seq__24018_27);
render_node.call(null, stringifier_16, r.get_hiccup_headers.call(null, null, hiccup_node_33), opt_12);
let G__34 = cherry_core.next.call(null, seq__24018_27);
let G__35 = null;
let G__36 = 0;
let G__37 = 0;
seq__24018_17 = G__34;
chunk__24019_18 = G__35;
count__24020_19 = G__36;
i__24021_20 = G__37;
continue;
}}};break;
}
;
return to_string.call(null, stringifier_16);
} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return `${hiccup??''}`} else {
return null}}};

});
f23628.cljs$lang$maxFixedArity = 1;
f23628.cljs$lang$applyTo = (function (seq23631) {
const G__23632_38 = cherry_core.first.call(null, seq23631);
const seq23631_39 = cherry_core.next.call(null, seq23631);
const self__22809__auto___40 = this;
return self__22809__auto___40.cljs$core$IFn$_invoke$arity$variadic(G__23632_38, seq23631_39);

});
return f23628;

})();

export { render_node, create_renderer, IStringifier, get_expanded_headers, to_string, self_closing_QMARK_, render_attrs, str_join, render, append, escape_html }
