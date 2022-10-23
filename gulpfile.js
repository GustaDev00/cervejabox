'use strict'

const { version } = require('./package.json')
const gulp = require('gulp') //Gulp
const concat = require("gulp-concat")
const sourcemaps = require('gulp-sourcemaps') //Mapea codigo SASS para debug no console
const sass = require('gulp-sass')(require('node-sass')) //SASS
const autoprefixer = require('autoprefixer') //Aplica prefixo de navegadores antigos
const postcss = require('gulp-postcss') //PostCSS
const cssnano = require('cssnano')({zindex: false}) //Minifica css
const mqpacker = require('css-mqpacker') //Unifica todas as @medias da mesma condição em apenas uma
const terser = require('gulp-terser') //Minifica os arquivos js
const browserSync = require('browser-sync').create() //Synca os arquivos com o browser e faz o proxy reverso dos arquivos
const browserify = require('browserify') //Converte commonJs para ES
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify') //Transpila arquivos js para versões antigas do ES
const glob = require('glob') //Possibilita o uso da escrita do terminal no browserify
const clean = require('gulp-clean') //Deleta diretorios ou arquivos
const tsify = require('tsify')
const config = {
    nickName: 'cervejabox',
}
const paths = {
    dist: {
        dest: '/'
    },
    sass: {
        dest: './build/arquivos/',
        src: './src/styles/scss/*.scss'
    },
    cssold: {
        dest: './build/old/css/',
        src: './src/styles/css/*.css'
    },
    scripts: {
        dest: './build/arquivos/',
        src: './src/scripts/app/index.js',
        watch: './src/scripts/app/**/*.js'
    },
    scriptsOld: {
        dest: './build/old/js/',
        src: './src/scripts/old/*.js'
    }
}

gulp.task('default', function () {
    return gulp.src('./build', { read: false })
        .pipe(clean());
});

gulp.task("style-sass", () => {
    let processors = [autoprefixer, cssnano, mqpacker];
    return gulp
        .src(paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(`cervejabox-style-${version}.css`))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task("style-cssold", () => {
    return gulp
        .src(paths.cssold.src)
        .pipe(gulp.dest(paths.cssold.dest));
});

gulp.task('script', function () {
    let testFiles = glob.sync(paths.scripts.src)
    return browserify({
        entries: testFiles
    })
        .plugin(tsify)
        .transform(
            babelify.configure({
                presets: ['@babel/env']
            })
        )
        .bundle()
        .pipe(source(`${config.nickName}-script-${version}.js`))
        .pipe(buffer())
        .pipe(
            terser({
                toplevel: true
            })
        )
        .pipe(gulp.dest(paths.scripts.dest))
});

gulp.task('scriptOld', function () {
    return gulp
        .src(paths.scriptsOld.src)
        .pipe(gulp.dest(paths.scriptsOld.dest));
})

const watchDev = () => {
    gulp.watch(paths.sass.src, gulp.series('style-sass')).on('change', () => {
        browserSync.notify('Reinjetando estilos...', 3000)
        browserSync.reload('*.css')
    })
    gulp.watch(paths.scripts.watch, gulp.series('script')).on('change', browserSync.reload)

    gulp.watch(paths.cssold.src, gulp.series('style-cssold')).on('change', () => {
        browserSync.notify('Reinjetando estilos...', 3000)
        browserSync.reload('*.css')
    })
    gulp.watch(paths.scriptsOld.src, gulp.series('scriptOld')).on('change', browserSync.reload)
}
gulp.task(
    'dev',
    gulp.parallel('style-sass', 'script', 'style-cssold', 'scriptOld', watchDev)
)
gulp.task('build', gulp.parallel('style-sass', 'script', 'style-cssold', 'scriptOld'))
