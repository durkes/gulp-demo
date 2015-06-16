'use strict';

var browserSync = require('browser-sync').create();

exports.init = function () {
	browserSync.init({
		server: {
			baseDir: '../build'
		}
	});
};

exports.reload = function () {
	browserSync.reload();
};