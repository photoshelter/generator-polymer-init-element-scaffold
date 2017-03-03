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

/**
 * Tagging Releases 
**/
gulp.task('release-patch', gulp.series('tag-patch', 'commit-bump'));
gulp.task('release-minor', gulp.series('tag-minor', 'commit-bump'));
gulp.task('release-major', gulp.series('tag-major', 'commit-bump'));