const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const through = require('through2');

module.exports = function (params){

  // Собираем css

  // params               - объект с параметрами
  // params.files         - Файлы scss, которые следует обработать 
  // params.build         - путь, куда положить скомпилированные файлы

  return function sass(){
    return gulp.src(params.files)
      .pipe(plugins.autoprefixer(params.autoprefixer, {cascade: true})
        .on('error', plugins.notify.onError({title: 'Style'})))
      .pipe(gulp.dest(params.build))
      .pipe(global._browserSync.stream())
  }
};