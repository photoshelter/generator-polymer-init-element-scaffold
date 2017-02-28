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

module.exports = {
    newRelease: newRelease
};
