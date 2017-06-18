const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const through = require('through2');

module.exports = function (params){

  // Собираем css файлы через sass

  // params               - объект с параметрами
  // params.files         - Файлы scss, которые следует обработать 
  // params.build         - путь, куда положить скомпилированные файлы
  // params.wathFile      - файл который обратывается, береться из watch
  // params.errCb         - колбек функция, которая произойдет, при ошибке
  // params.mobileFirst   - true/false


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
      .pipe(through.obj(function (chunk, enc, cb) {
        let pattern = /url\(/g;
        let str = '' + chunk._contents;
        let chunkPath = chunk.path;
        let result;


        if(chunkPath.indexOf('style.css') + 1){
          result = str.replace(pattern,'url(../img/');
        }
        
        if(chunkPath.indexOf('media.css') + 1){
          if(params.mobileFirst){
           result = str.replace(pattern,'url(../img/desktop/');
          }else{
            result = str.replace(pattern,'url(../img/mobile/');
          }
        }



        chunk._contents = Buffer.from(result, 'utf8');
        cb(null, chunk)
      }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(params.build))
      .pipe(global._browserSync.stream())
  }
};