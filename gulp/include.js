module.exports = function (gulp,plugins,file,dest){


	// Данный таск вставляет содержимое содердимое файта в другой файл

	return function(){

		return gulp.src(file)
	    .pipe(plugins.fileInclude({
	      prefix: '@@'
	    }))
	    .pipe(gulp.dest(dest));
	};


};