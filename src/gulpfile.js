var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var merge = require('merge2');
var filter = require('gulp-filter');

gulp.task('build.ios', function(){
    var tsProj = ts.createProject('tsconfig.json');
    var iosFilter = filter(['**/*ios*', '!index.ios*']);

    var tsResult = tsProj.src()
        .pipe(iosFilter)
        .pipe(sourcemaps.init())
        .pipe(tsProj());

    return merge([
        tsResult.js
            .pipe(concat('index.ios.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('.')),
        tsResult.dts
            .pipe(concat('index.ios.d.ts'))
            .pipe(gulp.dest('.'))    
    ]);
});

gulp.task('build.android', function(){
    var tsProj = ts.createProject('tsconfig.json');
    var iosFilter = filter(['**/*android*', '!index.android*']);

    var tsResult = tsProj.src()
        .pipe(iosFilter)
        .pipe(sourcemaps.init())
        .pipe(tsProj());

    return merge([
        tsResult.js
            .pipe(concat('index.android.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('.')),
        tsResult.dts
            .pipe(concat('index.anroid.d.ts'))
            .pipe(gulp.dest('.'))
    ]);
});

gulp.task('build', [ 'build.ios', 'build.android' ]);