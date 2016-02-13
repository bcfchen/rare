var gulp = require('gulp')
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
     port: process.env.PORT || 5000,
    livereload: false
  });
});