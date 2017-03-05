module.exports = function (gulp,plugins,options,files,dest){

	// Данный таск удаляет папку со скомпилированными файлами

	// gulp 	 - переменная с gulp
	// plugins - Объект с gulp плагинами
	// files 	- строка с путем к файлу(папке), который нужно удалить
	// dest   - папка куда выложить файл

	return function(){

		return gulp.src(files)
    .pipe(plugins.removeCode(options))
    .pipe(gulp.dest(dest))
	};
};