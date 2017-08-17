const config = require('../../options-gulp.js');
const path = config.path;
const sourse = path.sourse;






// Инициализуем настройки пользователя

let style = config.sass ? sourse.sass : sourse.css;

let htmlOutput = {};



//====== Инициализуем html или pug файл
if(config.pug){
	htmlOutput.path 		= `./${sourse.folder}/${sourse.pugRoot}/templates/_default.pug`
	//htmlOutput.content = 
}else{
	//htmlOutput.path
}



// Создаем структуру

module.exports = function (){	
	return [

		// Ключевые файлы
		{
      path: `./ftp.json`,
      content: 
      '{\n' +
        '\t"host": "your_host",\n' +
        '\t"user": "your_login",\n' +
        '\t"pass": "ftp_pass",\n' +
        '\t"remotePath" : "/yourPath/"\n' +
      '}'
    },

		// Корневые папки
		{path: './' + sourse.folder},										// Корневой коталог с исходинка 
		{path: `./${sourse.folder}/${style}`},					// Папка со стилями
		{path: `./${sourse.folder}/${config.pug ?	sourse.pugRoot : ''}`},						// Папка с pug файлами, если требуется
		{path: `./${sourse.folder}/${sourse.img}`},			// Папка с изображениями
		{path: `./${sourse.folder}/${sourse.fonts}`},		// Папка с изображениями
		{path: `./${sourse.folder}/${sourse.js}`},			// Папка с js

		// Базовые файлы
		{path: `./${sourse.folder}/${sourse.js}/main.js`},
		//htmlOutput


	]
};