//引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');

var fs = require('fs');
var path = require('path');
var url = require('url');

//启动server
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            host: '169.254.210.46',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/index.html') {
                    res.end(JSON.stringify({ code: 1, msg: '成功!' }));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

//sass 在src生成压缩后的css
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('src/css'))
})

//js 在belit生成压缩后的js
gulp.task('js', function() {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('belit'))
})

//html 在belit生成html
gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('belit'))
})

//belitCss 在belit生成压缩后的css
gulp.task('belitCss', function() {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('belit'))
})