'use strict';

var gulp = require('gulp');
var del = require('del');
var fileInclude = require('gulp-file-include');
var sass = require('gulp-sass');
var browserify = require('browserify');
var through = require('through2');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path'); /*internal*/
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();


/*tasks*/
gulp.task('clean', function () {
	/*del.sync is blocking - no need to list task as a dependency*/
	return del.sync(['../build/*'], {force: true});
});

gulp.task('noop', function () {
	return gulp.src('../src/noop/**')
	.pipe(gulp.dest('../build'));
});

gulp.task('html', function () {
	return gulp.src('../src/*.html')
	.pipe(fileInclude({prefix: '@@', basepath: '@file'}))
	.pipe(gulp.dest('../build'));
});

gulp.task('css', function () {
	return gulp.src('../src/css/*.+(css|scss)')
	.pipe(sass({errLogToConsole: true, precision: 8}))
	.pipe(gulp.dest('../build/css'));
});

gulp.task('js', function () {
	return gulp.src('../src/js/*.js')
	.pipe(bundler())
	.pipe(gulp.dest('../build/js'));
});

gulp.task('minifyHTML', ['html'], function () {
	return gulp.src('../build/**/*.html')
	.pipe(minifyHTML({empty: true, cdata: true, conditionals: true, spare: true, quotes: false}))
	.pipe(gulp.dest('../build'));
});

gulp.task('minifyCSS', ['css'], function () {
	return gulp.src('../build/**/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('../build'));
});

gulp.task('minifyJS', ['js'], function () {
	return gulp.src('../build/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('../build'));
});


/*groups*/
gulp.task('minify', ['minifyHTML', 'minifyCSS', 'minifyJS']);
gulp.task('build', ['clean', 'noop', 'html', 'css', 'js', 'minify']);
gulp.task('default', ['watch']);


/*browsersync + watch*/
gulp.task('browsersync', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: '../build'
		}
	});
});

gulp.task('reload', ['build'], function() {
	browserSync.reload();
});

gulp.task('watch', ['browsersync'], function () {
	var watcher = gulp.watch('../src/**', ['reload']);

	watcher.on('change', function (event) {
		console.log('\nFile ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});


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