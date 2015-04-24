var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var connect = require("gulp-connect");
var browserSync = require("browser-sync");

var middlewares = [];
var viewsPath = "app/src/**/*.html";
var jsPath = "app/src/js/**/*.js";
var scssPath = "app/src/scss/*.scss";

var url = require('url'); // https://www.npmjs.org/package/url
var proxy = require('proxy-middleware');
var proxyOptions = url.parse('http://localhost:3000');
proxyOptions.route = '/api';

var middlewares = [proxy(proxyOptions)];

gulp.task("browser-sync", function (){
  browserSync({
    server: {
    baseDir: "./",
    middleware: middlewares
  }
  });
});



gulp.task("js", function (){
  return gulp.src(jsPath).pipe(browserSync.reload({stream: true}));

});

gulp.task("views", function (){
  return gulp.src(viewsPath).pipe(browserSync.reload({stream: true}));
});

gulp.task("sass", function (){
  return gulp.src(scssPath)
    //.pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    //.pipe(plugins.sourcemaps.write({includeContent: false}))
    //.pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./app/compiled/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function (){
    gulp.watch(jsPath, ['js']);

    gulp.watch(scssPath, ['sass']);

    gulp.watch([viewsPath, "index.html"], ['views']);
});

gulp.task('default',['serve', 'browser-sync']);

