const path = require('path');
const gulp = require('gulp');
const ghPages  = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();


/**
 * GitHub Pages Demos 
**/
gulp.task('copy',() =>
  gulp.src("<%=elementName%>*")
  .pipe(gulp.dest("./bower_components/<%=elementName%>"))
);
gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);

  gulp.watch("<%=elementName%>*").on('change', gulp.series('copy', browserSync.reload));
  gulp.watch("demo/**").on('change', gulp.series(browserSync.reload));

});
gulp.task('build', gulp.series('copy'));
gulp.task('default', gulp.series('build', 'serve'));


/**
 * GitHub Pages Demos 
**/
gulp.task('pages', function() {
  return gulp.src(["./index.html","./demo/*","./test/*", "./bower_components/**/*"],{base: '.'})
  .pipe(ghPages());
});
gulp.task('pages-deployment', gulp.series('build', 'pages'));


/**
 * Tagging Releases 
**/
const releasing = require("./gulp-tasks/releasing.js");
gulp.task('tag-patch', function() { return releasing.newRelease('patch')});
gulp.task('tag-minor', function() { return releasing.newRelease('minor')});
gulp.task('tag-major', function() { return releasing.newRelease('major')});