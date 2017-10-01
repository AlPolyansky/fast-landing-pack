const gulp = require('gulp');
const tasks = require('../tasks-init.js');
const config = require('../../options-gulp.js');
const src = config.path.sourse;
const plugins = require('gulp-load-plugins')();
const fs = require('fs');
const path = require('path');
const async = require('async');

// Переводи Исходники на нужный язык

module.exports = function removeDuplicateImg (params){


	//Копируем исходники
  gulp.task( 'copy-src', tasks['copy']({
    files: `./${config.path.sourse.folder}/**/*`,
    dest: `./gulp/translate/ru` 
  }));

  // /f/f - костыль, чтобы распаковывалось в нужное место

  gulp.task('unzip',function(){
  	return gulp.src(`./translate/${config.translate}/*.zip`)
  			.pipe(plugins.unzip())
  			.pipe(gulp.dest(`./translate/${config.translate}/tmp/f/f`))
  });

  gulp.task('html2pug',function(){
  	return gulp.src(`./translate/${config.translate}/tmp/index-target.html`)
  		.pipe(plugins.html2pug())
  		.pipe(gulp.dest(`./translate/${config.translate}/tmp/`))
  });

   gulp.task('translate-src',function(cb){
   	let pugRoot = path.resolve(`./${src.folder}/${src.pugRoot}/sections/`);

   	async.series([

   		function(cb_1){
   			fs.readdir(pugRoot, (err,files) => {


		   		async.eachSeries(files,(item,cb_2) => {
		   			require('../base/pug-translater.js')({
			   			root: pugRoot,
			   			itemPath: pugRoot + '/' + item,
			   			item: item
		   			},cb_2);
		   		},err =>{
			  		if(err) throw err;
			  		return cb_1();
			  	})


		   	});
   		}

   	], err =>{
	  	if(err) throw err;
	  	return cb();
	  });  	
  });

	return gulp.series([
		'copy-src',
		'unzip',
		'html2pug',
		'translate-src'
	]);
};