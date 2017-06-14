
/**
 *  The require statement tells Node to look into the node_modules folder for a package named gulp.
 *  Once the package is found, we assign its contents to the variable gulp
 * */
var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('hello', function() {
    console.log('Hello World');
});


gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')    // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())   // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch',['browserSync', 'sass'] ,function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir: 'app'
        },
        notify: false
    })
});