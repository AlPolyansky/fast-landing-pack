module.exports = function (gulp,plugins,obj,files,dest){



  // Данный переносит файлы

  // gulp  - переменная с подключенным gulp
  // plugons - объект с gulp плагинами
  // obj - объект с найтройками gulp-strip-css-comments
  // files - строка с путем к исходным файлам
  // dest - строка с путем , куда скопировать файлы


  return function(){

		return gulp.src(files)
			.pipe(plugins.stripCssComments(obj))
		  .pipe(gulp.dest(dest));
	};
};