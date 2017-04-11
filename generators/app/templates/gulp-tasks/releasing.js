var gulp = require('gulp');
var bump = require('gulp-bump');
var git  = require('gulp-git');
var filter = require('gulp-filter');
var tag = require('gulp-tag-version');
var savefile = require('gulp-savefile');

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

gulp.task('tag-patch', function () { return newRelease('patch'); });
gulp.task('tag-minor', function () { return newRelease('minor'); });
gulp.task('tag-major', function () { return newRelease('major'); });

gulp.task('push-tag', function(done){
  git.push('origin', 'master' , {args: " --tags"}, function (err) {
    if (err) throw err;
    done();
  });
});