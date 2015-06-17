'use strict';

var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');

module.exports = function () {
	return gulp.src('../build/**/*.html')
	.pipe(minifyHTML({empty: true, cdata: true, conditionals: true, spare: true, quotes: false}))
	.pipe(gulp.dest('../build'));
};