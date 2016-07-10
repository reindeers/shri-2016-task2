var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('dev', function(callback) {
    sequence('build:examples', 'watch', 'serve', callback);
});
