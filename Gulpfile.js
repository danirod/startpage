const gulp = require('gulp');

const bowerFiles = require('main-bower-files'),
  clean = require('gulp-clean'),
  htmlmin = require('gulp-htmlmin'),
  inject = require('gulp-inject'),
  sass = require('gulp-sass'),
  typescript = require('gulp-typescript'),
  watch = require('gulp-watch'),
  webserver = require('gulp-webserver');

// Clean output
gulp.task('clean', () => {
  gulp.src('dist/').pipe(clean());
});

// Serve
gulp.task('server', () => {
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

// TypeScript
gulp.task('build:ts', () => {
  gulp.src('src/**/*.ts')
    .pipe(typescript({ noImplicitAny: true, out: 'app.js' }))
    .pipe(gulp.dest('./dist'));
});

// HTML
gulp.task('build:html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(inject(gulp.src(['dist/vendor/**/*.css', 'dist/**/*.css', 'dist/**/*.js']), { relative: true }))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist'))
});

// Watch
gulp.task('watch', ['serve'], () => {
  gulp.watch(['src/**/*.html', 'src/**/*.scss', 'src/**/*.ts'], ['build']);
});

gulp.task('build', ['build:bower', 'build:sass', 'build:ts', 'build:html']);
gulp.task('serve', ['build', 'server']);
gulp.task('serve:watch', ['serve', 'watch']);