import * as cherry_core from 'cherry-cljs/cljs.core.js';
var get_transition_stats = function (transition_duration_s) {
let str_1 = `${transition_duration_s??''}`;
let n_2 = 0;
let duration_3 = 0;
while(true){
const s_4 = str_1.indexOf("s");
const ms_5 = str_1.indexOf("ms");
const comma_6 = str_1.indexOf(",");
if (cherry_core.truth_.call(null, ((s_4 < 0) && (ms_5 < 0)))) {
return cherry_core.vector(n_2, cherry_core.unchecked_int.call(null, duration_3))} else {
let G__7 = (((comma_6 < 0)) ? ("") : (str_1.substring(cherry_core.unchecked_inc_int.call(null, comma_6)).trimLeft()));
let G__8 = cherry_core.unchecked_inc_int.call(null, n_2);
let G__9 = cherry_core.max.call(null, duration_3, ((cherry_core.truth_.call(null, (() => {
const or__23992__auto___10 = (s_4 < ms_5);
if (or__23992__auto___10) {
return or__23992__auto___10} else {
return (ms_5 < 0)};

})())) ? ((1000 * cherry_core.parse_double.call(null, str_1.substring(0, s_4)))) : (cherry_core.parse_long.call(null, str_1.substring(0, ms_5)))));
str_1 = G__7;
n_2 = G__8;
duration_3 = G__9;
continue;
};
;break;
}
;

};

export { get_transition_stats }
