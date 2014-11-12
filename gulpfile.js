// var source = require('vinyl-source-stream');
// var browserify = require('browserify');
var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = [
  'src/Astro.js',
  'src/DoleParams.js',
  'src/DustBands.js',
  'src/Planetismal.js',
  'src/Accrete.js'
];

gulp.task('concat', function() {
  return gulp.src(paths)
    .pipe(concat('accrete.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
  gulp.start('concat');
});
