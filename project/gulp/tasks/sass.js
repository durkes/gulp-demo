'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

module.exports = function () {
	return gulp.src('../src/css/*.+(css|scss)')
	.pipe(sass({errLogToConsole: true, precision: 8}))
	.pipe(gulp.dest('../build/css'));
};