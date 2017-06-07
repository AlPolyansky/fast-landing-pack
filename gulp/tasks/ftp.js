const gulp = require('gulp');
const gutil = require('gulp-util');
const ftp = require( 'vinyl-ftp' );


// Отрпаляет файлы по ftp
// params       	- объект с параметрами
// params.files 	- строка(массив) с путем исходных файлов
// params.config 	- объект с настройками vinyl-ftp

module.exports = function (params){

	const config = params.config;

	function getFtpConnection() {  
	    return ftp.create(config);
	}

	config.log = gutil.log;


  return function(){

  	var conn = getFtpConnection();

		return gulp.src(params.files,  {buffer: false })
		 	.pipe( conn.newer( config.remotePath ) )
		 	.pipe( conn.dest( config.remotePath ) )
	};
};