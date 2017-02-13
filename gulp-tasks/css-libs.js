module.exports = function (gulp,plugins,path,libs){

  // Данный таск компилирует все CSS библиотеки из конфига, сжимает и преобразует их в один файл



  return function(callback){
  	if(path.cssLibs().length){
	    return gulp.src(path.cssLibs())
	    .pipe(plugins.concat(path.build.css_libs))
	    .pipe(plugins.csso(path.build.css_libs))
	    .pipe(gulp.dest(path.build.folder + "/" + path.build.css))
	  }else{
	  	callback();
	  };

  };
};