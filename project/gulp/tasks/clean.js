'use strict';

var del = require('del');

module.exports = function () {
	/*del.sync is blocking - no need to list task as a dependency*/
	return del.sync(['../build/**/*'], {force: true});
};