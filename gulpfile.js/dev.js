/*
 * @Author: null
 * @Email: 3027704690@qq.com
 * @Date: 2020-09-11 17:36:36
 * @LastEditors: null
 * @LastEditTime: 2020-09-15 14:41:53
 * @Description: dev模式
 * @form: (0 U 0)
 */
const {
    parallel,
    series,
    task,
    src,
    watch
} = require('gulp');
const connect = require('gulp-connect'); // 自动刷新页面
// const watchs = (cb) => {}

function dev(obj) {
    const {
        port,
        root,
        name,
        https
    } = Object.prototype.toString.call(obj) === "[object Object]" ? obj : {};
    task('server', function (cb) {
        connect.server({
            port: port || 8080, //localhost:8080直接访问
            root: root || './', //指定html文件起始的根目录
            livereload: true //启动实时刷新功能（配合上边的connect.reload()方法同步使用）
        });
        cb();
    });

    task('js:dev', function (cb) {
        src('./src/static/js/*.js')
            .pipe(connect.reload())
        cb();
    });

    task('css:dev', function (cb) {
        src('./src/static/css/*.css')
            .pipe(connect.reload())
        cb();
    });

    task('html:dev', function (cb) {
        src('./src/**/*.html')
            .pipe(connect.reload())
        cb();
    })

    task('image:dev', function (cb) {
        src('./src/static/image/**/*.(jpg|png)')
            .pipe(connect.reload())
        cb();
    })

    task('watchs', function (cb) {
        watch('./src/**/*.*', series('image:dev', 'js:dev', 'css:dev','html:dev'));
        cb();
    })


    return series(parallel('server', 'watchs'), function (cb) {
        cb();
    });
}

module.exports = dev;