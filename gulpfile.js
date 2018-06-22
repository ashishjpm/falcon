var SRC = "assets/css/scss";
var DEST = "assets/css";

var gulp = require('gulp');

var sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');

// gulp sass task
gulp.task('build-css', function() {
  return gulp.src(SRC+'/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(DEST));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch(SRC+'/**/*.scss', ['build-css']);
});

// define the default task and add the watch task to it
gulp.task('default', ['build-css']);
