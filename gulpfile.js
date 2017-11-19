var gulp = require("gulp"); //本地安装gulp所用到的地方
var gutil = require("gulp-util");
var del = require("del"); //删除文件
var less = require('gulp-less'); //less语法
var concat = require("gulp-concat"); //合并
var minifycss = require('gulp-minify-css'); //压缩css
var autoprefixer = require('gulp-autoprefixer'); //自动补全浏览器兼容后缀
var cached = require('gulp-cached'); // 搭配 gulp-remember 可增量编译
var remember = require('gulp-remember'); //搭配 gulp-cached 可增量编译
var plumber = require('gulp-plumber'); //校正报错
var replace = require('gulp-replace'); //替换
var webpack = require('webpack');
var connect = require('gulp-connect'); //本地服务
var rest = require('connect-rest');
var uglify = require('gulp-uglify');


var browserSync = require('browser-sync');
var webreload = browserSync.reload;
var nodemon = require('gulp-nodemon');


var src = {
    css: './html/css/index.less',
    file: './html/file/**/*',
    view: './html/view/**/*',
    js: './html/js/**/*',
    images:'./html/images/**/*'
}

var dist = {
    css: './dist/pcstyle',
    file: './dist/pcstyle',
    view: './dist/',
    js: './dist/js',
    images:'./dist/images'
}



function node(done) {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'

        }
    })
    done();

}

function webStart(done){
    browserSync.init('./app/**/*', {
         proxy: 'http://localhost:8099',
         browser: 'chrome',
         notify: false,
         port: 8100
     });
     done();
}




function connectServer(done) {
    connect.server({
        root: dist.view,
        port:  9244,
        livereload:{
            port:27248
        },
        middleware: function(connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    done();
}


function clean(done) {
    del.sync(['dist/**/*']);
    done();
}


function html(done) {
    return gulp.src(src.view)
        .pipe(gulp.dest(dist.view));
    done();
}

function js(done) {
    return gulp.src(src.js)
        .pipe(uglify())
        .pipe(gulp.dest(dist.js));
    done();
}

function file(done) {
    return gulp.src(src.file)
        .pipe(gulp.dest(dist.file));
    done();
}


function images(done) {
    return gulp.src(src.images)
        .pipe(gulp.dest(dist.images));
    done();
}
function css(done) {
    gulp.src(src.css) //该任务针对的文件
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifycss()) //该任务调用的模块
    .pipe(gulp.dest(dist.css))
    .pipe(connect.reload());
done();

}

function watch() {
    gulp.watch([
        './html/js/**/*.js'
    ], gulp.series(js, reload));
    gulp.watch([
        './html/view/**/*.html'
    ], gulp.series(html, reload));
    gulp.watch([
        './html/file/**/*'
    ], gulp.series(file, reload));
    gulp.watch([
        './html/images/**/*'
    ], gulp.series(images, reload));
    gulp.watch([
        './html/css/*.less'
    ], gulp.series(css));
}
function reload() {
     return gulp.src('dist/')
        .pipe(connect.reload()); //自动刷新
}


function watchs(done){
    gulp.watch('./app/**/*',webreload);
    done();
}

gulp.task("default", gulp.series(clean,html,js,css,file,images,connectServer,watch));


gulp.task('dev',gulp.series(node,webStart,watchs));