var gulp = require('gulp');
const ghPages  = require('gulp-gh-pages');

gulp.task('pages', function() {
  return gulp.src(["./index.html","./demo/*","./test/*", "./bower_components/**/*"],{base: '.'})
  .pipe(ghPages());
});