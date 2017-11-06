const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const through = require('through2');
const mqpacker = require("css-mqpacker");

module.exports = function (params){

  // Собираем css файлы через sass

  // params               - объект с параметрами
  // params.files         - Файлы scss, которые следует обработать 
  // params.build         - путь, куда положить скомпилированные файлы
  // params.wathFile      - файл который обратывается, береться из watch
  // params.errCb         - колбек функция, которая произойдет, при ошибке
  // params.mobileFirst   - true/false

  let postcssPlugin = [
    mqpacker
  ]

  return function sass(){
    return gulp.src(params.files)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
          outputStyle: 'expanded',
          errLogToConsole: true,
        })).on('error', plugins.notify.onError({title: 'Style'}))
      .pipe(plugins.autoprefixer(params.autoprefixer, {cascade: true}))
      .pipe(plugins.postcss(postcssPlugin))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(params.build))
      .pipe(global._browserSync.stream())
  }
};