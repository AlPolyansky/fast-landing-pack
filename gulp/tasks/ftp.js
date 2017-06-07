const gulp = require('gulp');
const ftp = require( 'vinyl-ftp' );
const config = require('../../ftp.json');

// Отрпаляет файлы по ftp
// params       - объект с параметрами
// params.files - строка(массив) с путем исходных файлов
// params.dest  - строка с путем , куда скопировать файлы

module.exports = function (params){

	function getFtpConnection() {  
	    return ftp.create(config);
	}


  return function(){

  	var conn = getFtpConnection();

		return gulp.src(params.files,  {buffer: false })
		 	.pipe( conn.newer( config.remotePath ) )
		 	.pipe( conn.dest( config.remotePath ) )
	};
};