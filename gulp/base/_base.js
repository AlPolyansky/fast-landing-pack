const fs = require('fs');
const copydir = require('copy-dir');
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



// Метод не возвращает null, если путь для require не найден
Base.prototype.require = (path) => {
	let output;
  try{
    output = require(path);
  } catch (err){
    output = {};
  }
  return output;
}



// Фунция клонирует все содержимое из директории root (включая вложенные файлы и папки)
// и выгружает по нужному пути (path)
Base.prototype.deepClone = (root,path,cb) => {
	return copydir(root, path, err => {
		if(err) throw err;
			return cb();
	})
}

Base.prototype.changeGlob = (data) =>{
	fs.writeFileSync(path.resolve('./gulp/base/_global.json'),JSON.stringify(data,null,2));
};

Base.prototype.glob = function(){
	return JSON.parse(fs.readFileSync(path.resolve('./gulp/base/_global.json'),'utf-8'));
};


module.exports = Base;