/* eslint-disable no-undef */
const gulp = require('gulp');
const ghPages  = require('gulp-gh-pages');

gulp.task('pages', function() {
  const pagesSrc = [
    './index.html',
    './demo/*',
    './test/*',
    './bower_components/**/*'];

  return gulp.src(pagesSrc, {base: '.'})
      .pipe(ghPages());
});
