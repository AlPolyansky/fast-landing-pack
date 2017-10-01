const gulp = require('gulp');
const tasks = require('../tasks-init.js');
const config = require('../../options-gulp.js');
const src = config.path.sourse;
const plugins = require('gulp-load-plugins')();
const fs = require('fs');
const path = require('path');
const async = require('async');
const args = process.argv.slice(2);

// Переводи Исходники на нужный язык

module.exports = function translate (params){
  let lang = args[1] ? args[1].replace('-','') : '';


	//Копируем старые исходники
  gulp.task( 'copy-src', tasks['copy']({
    files: `./${config.path.sourse.folder}/**/*`,
    dest: `./gulp/translate/${config.lang}` 
  }));

  // /f/f - костыль, чтобы распаковывалось в нужное место

  gulp.task('unzip',function(){
  	return gulp.src(`./translate/${lang}/*.zip`)
  			.pipe(plugins.unzip())
  			.pipe(gulp.dest(`./translate/${lang}/tmp/f/f`))
  });

  gulp.task('html2pug',function(){
  	return gulp.src(`./translate/${lang}/tmp/index-target.html`)
  		.pipe(plugins.html2pug())
  		.pipe(gulp.dest(`./translate/${lang}/tmp/`))
  });

   gulp.task('translate-src', function(cb){
   	let pugRoot = path.resolve(`./${src.folder}/${src.pugRoot}/sections/`);

   	async.series([

   		function(cb_1){
   			fs.readdir(pugRoot, (err,files) => {


		   		async.eachSeries(files,(item,cb_2) => {
		   			require('../base/pug-translater.js')({
			   			root: pugRoot,
			   			itemPath: pugRoot + '/' + item,
			   			item: item,
              indexPath: `./translate/${lang}/tmp/index-target.pug`,
              output: `./gulp/translate/${lang}/${src.pugRoot}/sections/${item}/`,
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


  gulp.task( 'clean-tmp' ,tasks.clean({
    files: `./translate/${lang}/tmp`
  }));

  gulp.task( 'copy-translate-src', tasks['copy']({
    files: `./${config.path.sourse.folder}/**/*`,
    dest: `./gulp/translate/${lang}` 
  }));


	return gulp.series([
		'copy-src',
		'unzip',
		'html2pug',
		'translate-src',
    'clean-tmp',
    'copy-translate-src'
	]);
};