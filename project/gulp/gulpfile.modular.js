'use strict';

var gulp = require('gulp');

/*tasks*/
gulp.task('clean', require('./tasks/clean.js'));
gulp.task('noop', require('./tasks/noop.js'));
gulp.task('html', require('./tasks/html.js'));
gulp.task('css', require('./tasks/sass.js'));
gulp.task('js', require('./tasks/browserify.js'));
gulp.task('minify', ['html', 'css', 'js'], require('./tasks/minify.js'));

/*groups*/
gulp.task('build', ['clean', 'noop', 'html', 'css', 'js', 'minify']);
gulp.task('default', ['watch']);

/*browsersync + watch*/
var browsersync = require('./tasks/browsersync.js');
gulp.task('browsersync', ['build'], browsersync.init);
gulp.task('reload', ['build'], browsersync.reload);
gulp.task('watch', ['browsersync'], require('./tasks/watch.js'));