'use strict';

var gulp = require('gulp');

module.exports = function () {
	var watcher = gulp.watch('../src/**/*', ['reload']);

	watcher.on('change', function (event) {
		console.log('\nFile ' + event.path + ' was ' + event.type + ', running tasks...');
	});
};