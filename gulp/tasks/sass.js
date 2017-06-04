const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

module.exports = function (params){

  // Собираем css файлы через sass

  // params         - объект с параметрами
  // params.files   - Файлы scss, которые следует обработать 
  // params.build   - путь, куда положить скомпилированные файлы

  return function sass(){
    return gulp.src(params.files)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
          outputStyle: 'expanded',
          errLogToConsole: true,
        })).on('error', plugins.notify.onError({title: 'Style'}))
      .pipe(plugins.autoprefixer('last 15 versions', {cascade: true}))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(params.build))
      .pipe(global._browserSync.stream())
  }
};