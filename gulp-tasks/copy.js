module.exports = function (gulp,files,dest){



  // Данный переносит файлы

  // gulp  - переменная с подключенным gulp
  // files - строка с путем к исходным файлам
  // dest - строка с путем , куда скопировать файлы


  return function(){

		return gulp.src(files)
		  .pipe(gulp.dest(dest));
	};
};