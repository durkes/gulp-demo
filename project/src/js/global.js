/*import and instantly run alertify with global argument*/
require('./_incl/alertify')(global);

/*flood calls alertify.log, alertify.success, and alertify.error at once*/
var flood = require('./_incl/flood');

/*flood is scoped to the current module, so let's make it usable in the browser*/
/*This is verbose for demo. We could have combined the assignments: global.flood = require('./_incl/flood');*/
global.flood = flood;