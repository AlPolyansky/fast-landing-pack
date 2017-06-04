const fs = require('fs');
const path = require('path');

function Base(){};


// Функция парсит строку с путем и разибивает на массив по слешку
// Создаем массив из объектов с самим елементом и путем
Base.prototype.strParse = (filePath) => {
	var output = [];

	let arrElem = filePath.split('/').filter((elem) => {
		if(elem !== '.'){
			return elem;
		}
	});

	let arrPath = filePath.replace(/\//g, '/,').split(',');

	if(arrPath[0] === './'){
		// Если первый елемент массива './', то удалим его, а ко второму добавим ./
		arrPath.splice(0,1);
		arrPath.splice(0,1,'./' + arrPath[0]);
	}

	let totalPath = [];

	for(let i = 0; i < arrElem.length; i++){

			let next = arrPath[i + 1];
			
			
			if(i == 0){
				totalPath.push(arrPath[i]);
			}
			if(i > 0){
				totalPath.push(totalPath[i - 1] + arrPath[i]);
			}

			output.push({
				elem : arrElem[i],
				path : arrPath[i],
				totalPath: totalPath[i],
			});
	}

	return output;
}


// Функция ищет наличие разрешения в строке, тем самым отличает файл от папка
// Возвращает file или dir
Base.prototype.fileOrFolder = (str) => {
	let patern = /\.[^.]/g

	if(patern.test(str)){
		return 'file';
	}else{
		return 'dir';
	};
}

// Функция фозвращает массив с названием папкок из директории

Base.prototype.getDirectories = (srcpath) => {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}


module.exports = Base;