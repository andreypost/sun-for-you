const { src, dest, watch, parallel, series } = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    svgSprite = require('gulp-svg-sprite'),
    imagemin = require('gulp-imagemin')


const htmlPath = 'src/*.html', cssPath = 'src/css/*.css', sassPath = 'src/scss/**/*.scss', jsPath = 'src/js/*.js', svgPath = 'src/svg/*.svg'

function copyHtml() {
    return src(htmlPath).pipe(htmlmin({ collapseWhitespace: true })).pipe(dest('./'))
}

function cssTask() {
    return src([cssPath, sassPath]).pipe(sass()).pipe(autoprefixer({ cascade: false })).pipe(concatCss('styles.css')).pipe(cssnano()).pipe(dest('./css'));
}

function jsTask() {
    return src(jsPath).pipe(babel({ presets: ['@babel/env'] })).pipe(concat('main.js')).pipe(uglify()).pipe(dest('./js'))
}

function svgTask() {
    return src(svgPath).pipe(svgSprite({
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
        .pipe(dest('./svg'))
}

function fontsTask() {
    return src('src/fonts/*').pipe(dest('./fonts'))
    // return src('src/fonts/*.{eot,svg,ttf,woff,woff2}').pipe(dest('./fonts'))
}

function imgTask() {
    return src('src/images/*').pipe(imagemin()).pipe(dest('./images'))
}

function watchTask() {
    watch([htmlPath, cssPath, sassPath, jsPath, svgPath], { events: 'all' }, parallel(copyHtml, cssTask, jsTask, svgTask));
}

exports.copyHtml = copyHtml
exports.cssTask = cssTask
exports.jsTask = jsTask
exports.svgTask = svgTask
exports.fontsTask = fontsTask
exports.imgTask = imgTask
exports.default = series(parallel(copyHtml, cssTask, jsTask, svgTask, fontsTask, imgTask), watchTask);


// if (process.env.NODE_ENV === 'production') {
//     exports.build = series(transpile, minify);
// } else {
//     exports.build = series(parallel(copyHtml, cssTask, jsTask, svgTask, imgTask), watchTask);
// }

