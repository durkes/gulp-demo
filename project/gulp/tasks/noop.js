'use strict';

var gulp = require('gulp');

module.exports = function () {
	return gulp.src('../src/noop/**')
	.pipe(gulp.dest('../build'));
};