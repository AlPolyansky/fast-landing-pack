module.exports = function (gulp,plugins,path,libs){

  // Данный таск компилирует все JS библиотеки из конфига, сжимает и преобразует их в один файл

  return function(callback){
  	if(path.jsLibs().length){
	   	return gulp.src(path.jsLibs())
	    .pipe(plugins.concat(path.build.js_libs))
	    .pipe(plugins.uglify(path.build.js_libs))
	    .pipe(gulp.dest(path.build.folder + "/" + path.build.js))
	  }
	  else{
	  	callback();
	  };
  };
};