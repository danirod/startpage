const gulp = require('gulp');

const bowerFiles = require('main-bower-files'),
  clean = require('gulp-clean'),
  htmlmin = require('gulp-htmlmin'),
  inject = require('gulp-inject'),
  sass = require('gulp-sass'),
  webserver = require('gulp-webserver');

// Clean output
gulp.task('clean', () => {
  gulp.src('dist/').pipe(clean());
});

// Serve
gulp.task('serve', () => {
  gulp.src('./dist/')
    .pipe(webserver());
});

// Bundle Bower
gulp.task('build:bower', () => {
  gulp.src(bowerFiles())
    .pipe(gulp.dest('./dist/vendor'));
});

// SASS
gulp.task('build:sass', () => {
  gulp.src('./src/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// HTML
gulp.task('build:html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(inject(gulp.src(['dist/vendor/**/*.css', 'dist/**/*.css']), { relative: true }))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', ['build:bower', 'build:sass', 'build:html'])