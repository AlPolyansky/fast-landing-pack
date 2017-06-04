const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();


// Копирует файлы
// params       - объект с параметрами
// params.files - строка(массив) с путем исходных файлов
// params.dest  - строка с путем , куда скопировать файлы


module.exports = function pug (params){
  return function(){
		return gulp.src(params.files)
      .pipe(plugins.pug(
        {
          pretty: true
        }
      ))
      .on('error', plugins.notify.onError(function (error) {
      return {
        title: 'Pug',
        message: error.message
      }
      }))
		  .pipe(gulp.dest(params.dest));
	};
};