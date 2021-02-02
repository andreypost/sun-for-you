const { src, dest, watch, parallel, series } = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    cssnano = require('gulp-cssnano'),
    // sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify')
// livereload = require('gulp-livereload')

// function delFiles() {
// return del([
// 'dist/html', 'dist/css', 'dist/js', 'dist/images'
// here we use a globbing pattern to match everything inside the `mobile` folder
// 'dist/mobile/**/*',
// we don't want to clean this file though so we negate the pattern
// '!dist/mobile/deploy.json'
// ]);
// }

const htmlPath = 'src/*.html', cssPath = 'src/css/*.css', sassPath = 'src/scss/**/*.scss', jsPath = 'src/js/*.js'

function copyHtml() {
    return src(htmlPath).pipe(dest('./'))
}

function svgTask() {
    return src('src/svg/*.svg').pipe(svgSprite({
        // mode: {
        //     css: { // Activate the «css» mode
        //       render: {
        //         css: true // Activate CSS output (with default options)
        //       }
        //     }
        //   }
        //   mode: {
        //     view: { // Activate the «view» mode
        //       bust: false,
        //       render: {
        //         scss: true // Activate Sass output (with default options)
        //       }
        //     },
        //     symbol: true // Activate the «symbol» mode
        //   },
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        },
    }))
        .pipe(dest('./images'))
}

function imgTask() {
    return src('src/images/*')
        .pipe(imagemin())
        .pipe(dest('./images'))
}

function cssTask() {
    return src([cssPath, sassPath])
        // .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(concatCss('styles.css'))
        .pipe(cssnano())
        // .pipe(sourcemaps.write('.'))
        .pipe(dest('./css'));
}

function jsTask() {
    return src(jsPath)
        // .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(dest('./js'))
}

function watchTask() {
    watch([htmlPath, cssPath, sassPath, jsPath], { events: 'all' }, parallel(copyHtml, cssTask, jsTask));
}

exports.copyHtml = copyHtml
exports.svgTask = svgTask
exports.imgTask = imgTask
exports.cssTask = cssTask
exports.jsTask = jsTask
exports.default = series(parallel(copyHtml, svgTask, imgTask, cssTask, jsTask), watchTask);


if (process.env.NODE_ENV === 'production') {
    exports.build = series(transpile, minify);
  } else {
    exports.build = series(parallel(copyHtml, svgTask, imgTask, cssTask, jsTask), watchTask);
  }

