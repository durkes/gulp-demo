'use strict';

var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

module.exports = function (done) {
	gulp.src('../build/**/*.html')
	.pipe(minifyHTML({empty: true, cdata: true, conditionals: true, spare: true, quotes: false}))
	.pipe(gulp.dest('../build'));

	gulp.src('../build/**/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('../build'));

	gulp.src('../build/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('../build'));

	done();
};