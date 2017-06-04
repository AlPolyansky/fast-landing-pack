const gulp = require('gulp');


// Копирует файлы
// params       - объект с параметрами
// params.files - строка(массив) с путем исходных файлов
// params.dest  - строка с путем , куда скопировать файлы


module.exports = function copy (params){
  return function(){
		return gulp.src(params.files)
		  .pipe(gulp.dest(params.dest));
	};
};