'use strict';
/*---------- REQUIRE ----------*/
var gulp = require('gulp');

var browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    imagemin = require('gulp-imagemin'),
    minifyHtml = require('gulp-minify-html'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint');

/*---------- PATHS ----------*/
var paths = {
        bootstrapScript: 'js/**/main.js',
        scripts: 'js/**/*.js',
        images: 'img/**/*',
        scss: 'scss/**/*.scss',
        html: '*.html'
    },
    buildpPath = 'build/',
    buildpPaths = {
        scripts: buildpPath + 'js/',
        images: buildpPath + 'img/',
        css: buildpPath + 'css/',
        cssFile: buildpPath + 'css/style.css',
        html: buildpPath + '*.html'
    },
    copyResources = [
        {
            path: '',
            fileName: 'favicon.ico'
        }
    ];

/*---------- BUILD TASKS ----------*/
// Copy all static images
gulp.task('images', function () {
    gulp.src(buildpPaths.images, {read: false})
        .pipe(clean());// clean folder before task

    gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('build/img'))
        .pipe(connect.reload());
});

// Resolve require and minify
gulp.task('scripts', function () {
    gulp.src(buildpPaths.scripts, {read: false})
        .pipe(clean());// clean folder before task

    gulp.src(paths.scripts)
        .pipe(jshint())// run linting JavaScript files before building
        .pipe(jshint.reporter('default'));

    gulp.src(paths.bootstrapScript)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(rename('bundle.js'))// RENAME main.js->bundle.js
        .pipe(gulp.dest(
            buildpPaths.scripts
        ))
        .pipe(connect.reload());
});

// Compile css with compass
gulp.task('styles', function () {
    gulp.src(buildpPaths.css, {read: false})
        .pipe(clean());// clean folder before task

    gulp.src(paths.scss)
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'scss'
        }))
        .pipe(gulp.dest(
            buildpPaths.css
        ))
        .pipe(connect.reload());
});

// Minify html
gulp.task('minifyHtml', function () {
    gulp.src(buildpPaths.html, {read: false})
        .pipe(clean());// remove *.html files

    var opts = {
        spare: true// do not remove redundant attributes
    };

    gulp.src(paths.html)
        .pipe(minifyHtml(opts))
        .pipe(gulp.dest(buildpPath))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
    copyResources.forEach(function (resource) {
        var path = resource.path,
            fileName = resource.fileName;
        gulp.src(buildpPath + path + fileName, {read: false})
            .pipe(clean());// remove

        gulp.src(path + fileName)
            .pipe(gulp.dest(buildpPath + path));// copy
    });
});

/*---------- OTHER TASKS ----------*/
// Build project task
gulp.task('build', [
    'images',
    'scripts',
    'styles',
    'minifyHtml',
    'copy'
]);

// Run server on http://localhost:3000/ and init livereload
gulp.task('connect', function () {
    connect.server({
        root: ['build'],
        livereload: true
    });
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.html, ['minifyHtml']);
    copyResources.forEach(function (resource) {
        var path = resource.path,
            fileName = resource.fileName;
        gulp.watch(path + fileName, ['copy']);
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
    'build',
    'connect',
    'watch'
]);