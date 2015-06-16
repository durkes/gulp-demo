'use strict';

var gulp = require('gulp');
var fileInclude = require('gulp-file-include');

module.exports = function () {
	return gulp.src('../src/*.html')
	.pipe(fileInclude({prefix: '@@', basepath: '@file'}))
	.pipe(gulp.dest('../build'));
};