module.exports = function (gulp,files,plugins,obj){

  // Данный таск переносит файлы на удаленный сервер

  // gulp  		- переменная с подключенным gulp
  // files 		- строка с путем к исходным файлам
  // plugins 	- объект с gulp плагинами
  // obj 			- объект с ftp настройками


  return function(callback){

		return gulp.src(files)
		    .pipe(plugins.ftp(obj))
	};
};