const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() { //structuring scss and css files
  return gulp.src('src/styles/scss/main.scss') // where my scss files are
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) 
    .pipe(gulp.dest('src/styles/css')); // where do i save compiled css
}

function watchTask() {
  gulp.watch('src/styles/scss/**/*.scss', buildStyles);
}

exports.default = gulp.series(buildStyles, watchTask);

