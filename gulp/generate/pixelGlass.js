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
let pglass = require('../../options-gulp.js').path.pixel;  // Подключенный файл с настройками (со всеми путями)
let media = 'max'

if(pglass.mobileFirst){
	media = 'min';
}
	
	let foldersArray = [
		{
			path: 'gulp/libs/debug/pixel-glass/include-1.html',
			content : 
				'<!-- removeIf(all) -->\n' + 
					'\t<style>\n'+
						'\t\thtml {\n'+
							'\t\t\tbackground-repeat: no-repeat;\n'+
							'\t\t\tbackground-position:  50% 0;\n'+
							'\t\t\tbackground-image: url( "./debug/pixel-glass/' + pglass.mobilePhoto + '" );\n'+
						'\t\t}\n'+
						'\t\t@media ( ' + media + '-width: ' + pglass.breakPoint_1 + ') {\n'+
							'\t\t\thtml {\n'+
								'\t\t\t\tbackground-image: url( "./debug/pixel-glass/'+  pglass.desktopPhoto +'" );\n'+
							'\t\t\t}\n'+
						'\t\t}\n'+
						'\t\tbody{\n'+
						'\t\t\topacity: .5;\n'+
						'\t\t}\n'+
					'\t</style>\n'+
					'\n'+
					'\t<link rel="stylesheet" href="./debug/pixel-glass/styles.css">\n'+
				'<!-- endRemoveIf(all) -->'
		},
		{
			path: 'gulp/libs/debug/pixel-glass/include-2.html',
			content : 
				'<!-- removeIf(all) -->\n' + 
					'\t<script src="./debug/pixel-glass/script.js" type="text/javascript"></script>\n'+
				'<!-- endRemoveIf(all) -->'
		}


	]


	return foldersArray;
}