const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Копирует файлы
// params       - объект с параметрами
// params.firstIndex 	- путь к первому файлу, из которого будет копировать
// params.lastIndex 	- путь ко второму файлу, в который будем вставлять содержимое
// params.dataName 		- название data- атрибута 


module.exports = function dataParser (params){
  return function(){
		return gulp.src(params.files)
			.pipe(plugins.changed(params.dest))
		  .pipe(gulp.dest(params.dest));
	};
};