module.exports = function (gulp,plugins,libs,files,newFile,build){

  // Данный таск склеивает ваши js файлы из конфига в один и переносит в папку с готовыми файлами


  // gulp  - переменная с подключенным gulp
  // plugins - объект с gulp плагинами
  // libs - объект с node.js плагинами
  // files - строка(массив) с путями к исходным файлам
  // newFile - Новый скомпилированный файл
  // build - строка с путем , куда скопировать файлы


  return function(callback){
    if(files.length){
  	return gulp.src(files)
    	.pipe(plugins.sourcemaps.init())
    	.pipe(plugins.concat(newFile))
    	.pipe(plugins.sourcemaps.write())
    	.pipe(gulp.dest(build))
    	.pipe(libs.browserSync.reload({stream:true}));
    }else{
      callback();
    }
  };
};