'use strict';

var gulp = require('gulp');

/*tasks*/
gulp.task('clean', require('./tasks/clean'));
gulp.task('noop', require('./tasks/noop'));
gulp.task('html', require('./tasks/html'));
gulp.task('css', require('./tasks/sass'));
gulp.task('js', require('./tasks/browserify'));
gulp.task('minifyHTML', ['html'], require('./tasks/minify-html'));
gulp.task('minifyCSS', ['css'], require('./tasks/minify-css'));
gulp.task('minifyJS', ['js'], require('./tasks/minify-js'));

/*groups*/
gulp.task('minify', ['minifyHTML', 'minifyCSS', 'minifyJS']);
gulp.task('build', ['clean', 'noop', 'html', 'css', 'js', 'minify']);
gulp.task('default', ['watch']);

/*browsersync + watch*/
var browsersync = require('./tasks/browsersync');
gulp.task('browsersync', ['build'], browsersync.init);
gulp.task('reload', ['build'], browsersync.reload);
gulp.task('watch', ['browsersync'], require('./tasks/watch'));