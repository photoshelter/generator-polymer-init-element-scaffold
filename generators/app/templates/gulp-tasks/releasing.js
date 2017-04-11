var gulp = require('gulp');
var bump = require('gulp-bump');
var git  = require('gulp-git');
var filter = require('gulp-filter');
var tag = require('gulp-tag-version');
var push = require('gulp-git-push');

function newRelease(importance) {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump(
            {type:importance}
        ))
        .pipe(gulp.dest('./'))
        // commit the changed files
        .pipe(git.commit('bump version'))
        // filter one file
        .pipe(filter('package.json'))
        // create tag based on the filtered file
        .pipe(tag())
        // push changes into repository
        .pipe(push({                      
            repository: 'origin',
            refspec: 'HEAD'
        }));
};

gulp.task('tag-patch', function () { return newRelease('patch'); });
gulp.task('tag-minor', function () { return newRelease('minor'); });
gulp.task('tag-major', function () { return newRelease('major'); });

gulp.task('reset-cache', function () {
 return gulp.src(['./package.json', './bower.json'])
    .pipe(git.rm({args:'--cached'}));
});

gulp.task('commit-json', function () {
   return gulp.src(['./package.json', './bower.json'])
        .pipe(git.commit('bump version'));
});

gulp.task('version-push', function(done){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
  done();
});

gulp.task('commit-bump', gulp.series('reset-cache', 'commit-json', 'version-push'));