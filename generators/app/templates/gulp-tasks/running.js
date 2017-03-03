const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('copy',() =>
  gulp.src("scffold-tag*")
  .pipe(gulp.dest("./bower_components/scffold-tag"))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);

  gulp.watch("scffold-tag*").on('change', gulp.series('copy', browserSync.reload));
  gulp.watch("demo/**").on('change', gulp.series(browserSync.reload));

});