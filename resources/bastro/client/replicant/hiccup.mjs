import * as cherry_core from 'cherry-cljs/cljs.core.js';
var hiccup_QMARK_ = function (sexp) {
const and__24022__auto___1 = cherry_core.vector_QMARK_.call(null, sexp);
if (cherry_core.truth_.call(null, and__24022__auto___1)) {
const and__24022__auto___2 = cherry_core.not.call(null, cherry_core.map_entry_QMARK_.call(null, sexp));
if (cherry_core.truth_.call(null, and__24022__auto___2)) {
return cherry_core.keyword_QMARK_.call(null, cherry_core.first.call(null, sexp))} else {
return and__24022__auto___2};
} else {
return and__24022__auto___1};

};
var update_attrs = (() => {
const f21283 = (function (var_args) {
const args21284_1 = cherry_core.array.call(null);
const len__22792__auto___2 = arguments.length;
let i21285_3 = 0;
while(true){
if ((i21285_3 < len__22792__auto___2)) {
args21284_1.push((arguments[i21285_3]));
let G__4 = (i21285_3 + 1);
i21285_3 = G__4;
continue;
};break;
}
;
const argseq__23180__auto___5 = (((1 < args21284_1.length)) ? ((new cherry_core.IndexedSeq(args21284_1.slice(1), 0, null))) : (null));
return f21283.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), argseq__23180__auto___5);

});
f21283.cljs$core$IFn$_invoke$arity$variadic = (function (hiccup, args) {
if (cherry_core.truth_.call(null, cherry_core.map_QMARK_.call(null, cherry_core.second.call(null, hiccup)))) {
return cherry_core.apply.call(null, cherry_core.update, hiccup, 1, args)} else {
return cherry_core.into.call(null, cherry_core.vector(cherry_core.first.call(null, hiccup), cherry_core.apply.call(null, cherry_core.first.call(null, args), cherry_core.array_map(), cherry_core.rest.call(null, args))), cherry_core.rest.call(null, hiccup))};

});
f21283.cljs$lang$maxFixedArity = 1;
f21283.cljs$lang$applyTo = (function (seq21286) {
const G__21287_6 = cherry_core.first.call(null, seq21286);
const seq21286_7 = cherry_core.next.call(null, seq21286);
const self__22809__auto___8 = this;
return self__22809__auto___8.cljs$core$IFn$_invoke$arity$variadic(G__21287_6, seq21286_7);

});
return f21283;

})();
var set_attr = function (hiccup, attr, v) {
return update_attrs.call(null, hiccup, cherry_core.assoc, attr, v);

};

export { hiccup_QMARK_, update_attrs, set_attr }
