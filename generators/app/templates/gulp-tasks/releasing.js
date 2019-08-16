/* eslint-disable no-undef */
const gulp = require('gulp');
const bump = require('gulp-bump');
const git  = require('gulp-git');
const filter = require('gulp-filter');
const tag = require('gulp-tag-version');
const savefile = require('gulp-savefile');

/**
 * Hepler function pdates the release value 
 * in the bower and package files based on semver 
 * and the importance that you specify.
 * @param {string} importance as it relates to the semver numbers
 * @return {Object} the stream
 */
function newRelease(importance) {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump(
            {type:importance}
        ))
        .pipe(savefile())
        .pipe(git.commit('bump version'))
        .pipe(filter('package.json'))
        .pipe(tag())
};

gulp.task('tag-patch', function() {
  return newRelease('patch');
});
gulp.task('tag-minor', function() {
  return newRelease('minor');
});
gulp.task('tag-major', function() {
  return newRelease('major');
});

gulp.task('push-tag', function(done) {
  git.push('origin', 'master', {args: ' --tags'}, function(err) {
    if (err) throw err;
    done();
  });
});