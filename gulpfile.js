var gulp       = require('gulp'),
    open       = require('gulp-open'),
    connect    = require('gulp-connect'),
    browserify = require('browserify'),
    vueify     = require('vueify')
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    sass       = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('open', function() {
    gulp.src('index.html')
        .pipe(open('<%file.path%>', {url: 'http://localhost:8080'} ));
});

gulp.task('connect', function() {
    connect.server({ livereload: true });
});

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('javascript', function() {
    gulp.src('*.js')
        .pipe(connect.reload());
});

gulp.task('compileVue', function() {
    browserify({
        entries: 'src/app.js',
        debug: true
    })
        .transform(vueify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(['*.html'], ['html']);
    gulp.watch(['src/**/*.js', 'src/**/*.vue'], ['compileVue']);
});
 
//gulp.task('default', ['connect', 'watch', 'open']);
gulp.task('default', ['connect', 'watch']);
