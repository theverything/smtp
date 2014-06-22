/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = {
    context: __dirname + "/src/scripts",
    entry: "./index",
    output: {
        path: __dirname + "/dist/scripts",
        filename: "main.js"
    },
    plugins: []
};

var paths = {
  js: ['src/scripts/**/*.js'],
  scss: ['src/styles/**/*.scss', '!src/styles/components/components.scss'],
  css: ['src/styles/**/*.css'],
  images: ['src/images/**/*'],
  html: ['src/**/*.html']
};

// Optimize Images
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Automatically Prefix CSS
gulp.task('styles:css', function () {
  return gulp.src(paths.css)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'styles:css'}));
});

// Compile Any Sass Files  (app/styles)
gulp.task('styles:scss', function () {
  return gulp.src(paths.scss)
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['src/styles']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'styles:scss'}));
});

// Output Final CSS Styles
gulp.task('styles', ['styles:scss', 'styles:css']);

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new $.util.PluginError("webpack:build", err);
    $.util.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new $.util.PluginError("webpack:build-dev", err);
    $.util.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));


// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['images', 'build'], cb);
});

