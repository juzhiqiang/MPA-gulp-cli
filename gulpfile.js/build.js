/*
 * @Author: null
 * @Email: 3027704690@qq.com
 * @Date: 2020-09-11 17:36:36
 * @LastEditors: null
 * @LastEditTime: 2020-09-12 15:07:29
 * @Description: dev模式
 * @form: (0 U 0)
 */
const {
    series,
    task,
    src,
    dest,
} = require('gulp');
const uglify = require('gulp-uglify'); //js压缩
const concat = require('gulp-concat'); //文件合并
const rename = require('gulp-rename'); // 重命名
const minifycss = require('gulp-minify-css'); // 压缩css
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin'); //图片压缩 
const babel = require('gulp-babel');
const del = require('del'); //文件删除
const replace = require('gulp-replace');

task('js', function (cb) {
    src('./src/static/js/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('dist/static/js'))
    cb();
});


task('css', function (cb) {
    src('./src/static/css/*.css')
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('dist/static/css'))
    cb();
});


task('html', function (cb) {
    src('./src/**/*.html')
        .pipe(dest('dist/'))
    cb();
})

task('image', function (cb) {
    src('./src/static/image/**/*.(jpg|png)')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(dest('dist/static/image'))
    cb();
})

task('templates', function(cb){
    src('./src/**/*.html')
      .pipe(replace(/(\.min)?(\.js)/, '.min.js'))
      .pipe(replace(/(\.min)?(\.css)/, '.min.css'))
      .pipe(dest('dist/'));
    cb();
  });

//执行压缩前，先删除以前压缩的文件
task('clean', function () {
    return del(['./dist'])
});

module.exports = series('clean','html', 'image', 'js', 'css','templates');