'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');

module.exports = function () {
	return gulp.src('../build/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('../build'));
};