'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var through = require('through2');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path'); /*internal*/

module.exports = function () {
	return gulp.src('../src/js/*.js')
	.pipe(bundler())
	.pipe(gulp.dest('../build/js'));
};

/*browserify custom helper for gulp - github.com/durkes*/
/*adds support globs and retains original filename*/
function bundler() {
	return through.obj(function (file, enc, done) {
		var _this = this;

		browserify(file.path)
		.bundle()
		.on('error', done)
		.pipe(source(path.basename(file.path)))
		.pipe(buffer())
		.on('data', function (chunk) {
			_this.push(chunk);
		})
		.on('end', done);
	});
}