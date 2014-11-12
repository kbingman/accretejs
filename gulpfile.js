// var source = require('vinyl-source-stream');
// var browserify = require('browserify');
var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = [
  'src/astro.js',
  'src/dole_params.js',
  'src/dust_bands.js',
  'src/planetismal.js',
  'src/accrete.js'
];

gulp.task('concat', function() {
  return gulp.src(paths)
    .pipe(concat('accrete.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
  gulp.start('concat');
});
