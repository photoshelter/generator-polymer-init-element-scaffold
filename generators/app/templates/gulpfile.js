const gulp = require('gulp');
require('require-dir')('./gulp-tasks');

/**
 * Running the project
**/
gulp.task('default', gulp.series('copy', 'serve'));

/**
 * GitHub Pages Demos 
**/
gulp.task('pages-deployment', gulp.series('copy', 'pages'));
