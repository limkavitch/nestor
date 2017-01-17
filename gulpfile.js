"use strict";

var gulp = require("gulp");
var del = require("del");
var concat = require('gulp-concat');
var minify = require('gulp-minify');


var config = {
  "input":
  {
    "javascript":
    {
      "nestor.js" :"./src/javascript/nestor.js"
    },
    "html":
    {
      "all"       :"./src/html/**/*"
    }
  },
  "output":
  {
    "javascript"  : "./dist",
    "html"        :"./dist"
  }
};

function objectKeysToArray(object)
{
  let array = [];

  Object.keys(object).forEach(function(key)
  {
    array.push(object[key]);
  });

  return array;
}

gulp.task("clean", function()
{
  return del(objectKeysToArray(config.output));
});

gulp.task("javascript", ["clean"], function()
{
  return gulp.src(objectKeysToArray(config.input["javascript"]))
    .pipe(gulp.dest(config.output["javascript"]));
});

gulp.task("html", ["clean"], function()
{
  return gulp.src(objectKeysToArray(config.input["html"]))
    .pipe(gulp.dest(config.output["html"]));
});

gulp.task(  "default",
          [
            "javascript",
            "html"
          ]);
