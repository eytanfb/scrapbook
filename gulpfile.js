var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify({
      entries: './js/app.js',
      extensions: ['.jsx'],
      debug: true
    })
    .transform('babelify', {
      presets: ['es2015', 'react']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('./js/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
