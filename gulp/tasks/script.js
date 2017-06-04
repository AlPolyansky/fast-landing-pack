const gulp = require('gulp');
//const plugins = require('gulp-load-plugins')()

module.exports = function (params){

  // Переносим js файлы

  // params.files - строка(массив) с путями к исходным файлам
  // params.build - строка с путем , куда скопировать файлы


  return function script(callback){
    return gulp.src(params.files)
      .pipe(gulp.dest(params.build))
  };
};