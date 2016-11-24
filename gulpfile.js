var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    browserify = require('browserify'),
    vueify     = require('vueify')
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    sass       = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('open', function() {
    gulp.src('./www/index.html')
        .pipe(open('<%file.path%>', {url: 'http://localhost:8080'} ));
});

gulp.task('connect', function() {
    connect.server({
        livereload: true,
        root: 'www'
    });
});

gulp.task('html', function() {
    gulp.src('./www/*.html')
        .pipe(connect.reload());
});

gulp.task('javascript', function() {
    gulp.src('src/*.js')
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('www/css'))
        .pipe(livereload());
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
        .pipe(gulp.dest('www/js/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['src/**/*.js', 'src/**/*.vue'], ['compileVue']);
});
 
gulp.task('default', ['connect', 'watch']);
