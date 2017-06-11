const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

module.exports = function (params){

  // Собираем css файлы через sass

  // params         - объект с параметрами
  // params.files   - Файлы scss, которые следует обработать 
  // params.build   - путь, куда положить скомпилированные файлы
  // params.wathFile     - файл который обратывается, береться из watch
  // params.errCb   - колбек функция, которая произойдет, при ошибке


  return function sass(){
    return gulp.src(params.files)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
          outputStyle: 'expanded',
          errLogToConsole: true,
        })).on('error', function(err){
          
          let arr = params.wathFile.split('\\');

          if(err.messageOriginal.indexOf(arr[arr.length - 1] + '.') + 1){
            params.errCb();
          }else{
            plugins.notify.onError({title: 'Style'}).call(this,err)
          }
          this.emit('end');
      })
      .pipe(plugins.autoprefixer(params.autoprefixer, {cascade: true}))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(params.build))
      .pipe(global._browserSync.stream())
  }
};