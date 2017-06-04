// Пустой шаблон для генерации дерева файлов

// В массив foldersArray можно писать строки , они будут папками

// Также в массив можно добавить объект такого типа
// 		{
//				path: строка с путем, куда сгенерируется файл
//				content: 	строка с контентом в данном файле
//		}

// Специальные символы:
// \t - табуляция
// \n - перенос строки 

module.exports = function (){
let path = require('../../options-gulp.js').path.sourse;  // Подключенный файл с настройками (со всеми путями)
	
	let foldersArray = [

		'test',

		{
			path: 'test/index.html',
			content : 
				'<body>\n' + 
					'\t<h1>Hello world</h1>\n'+
				'</body>'
		}



	]


	return foldersArray;
}