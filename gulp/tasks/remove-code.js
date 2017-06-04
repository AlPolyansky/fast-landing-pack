const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();


// Удаляет код в спепц. коментариях

// params       - объект с параметрами
// params.opt		- Объект с параметрами плагина removeCode
// params.files - строка(массив) с путем исходных файлов
// params.dest  - строка с путем , куда скопировать файлы

module.exports = function removeCode (params){
	return function(){
		return gulp.src(params.files)
    .pipe(plugins.removeCode(params.opt))
    .pipe(gulp.dest(params.dest))
	};
};