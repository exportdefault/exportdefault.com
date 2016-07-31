'use strict';

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const minifyCss     = require('gulp-minify-css');
const rename        = require('gulp-rename');
const filter        = require('gulp-filter');
const scsslint      = require('gulp-scss-lint');

const lintScss = [
  './src/scss/**/*.scss'
  //'./styles/site/*.scss',
  //'./styles/mixins/*.scss',
  //'./styles/typography/*.scss',
  //'./styles/variables/*.scss',
  //'./styles/main.scss'
];

gulp.task('lint:scss', () => {
  return gulp.src(lintScss)
    .pipe(scsslint({
      config: './scsslint.yml'
    }));
});

gulp.task('build:css', ['lint:scss'], () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/**/*.scss', ['build:css']);
});

gulp.task('default', ['build:css'])