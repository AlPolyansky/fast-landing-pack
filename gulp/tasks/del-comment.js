const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();


// Удаляет комментарии из файлов html,js (css - опционально)

// params       - объект с параметрами
// params.opt		- Объект с параметрами плагина stripComments
// params.files - строка(массив) с путем исходных файлов
// params.dest  - строка с путем , куда скопировать файлы
// params.css   - если стоит true, будет удалять комментарии из файлов css(другим плагином)


module.exports = function (params){
  let plugin = params.css === true ? 'stripCssComments' : 'stripComments';

  return function delCommets(){
		return gulp.src(params.files)
			.pipe(plugins[plugin](params.opt))
		  .pipe(gulp.dest(params.dest));
	};
};