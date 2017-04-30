const fs = require('fs');
const async = require('async');




let createFile = function(filePath,data = '',replace = false){


	let originPath = filePath;


	// Функция парсит строку с путем и разибивает на массив по слешку
	// Создаем массив из объектов с самим елементом и путем
	let strParse = (filePath) => {

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
	let fileOrFolder = (str) => {

		
		let patern = /\.[^.]/g

		if(patern.test(str)){
			return 'file';
		}else{
			return 'dir';
		};
	}



	let createFileOrDir = function(originPath){

		// 1) Создаем массив с данными о пути
		let arr = strParse(originPath);

		// 2) Проверяем на сущестование пути
		async.eachSeries(arr, (item,callback) => {

			fs.exists(item.totalPath,function(exists){

				// Если существует файл или папка

				if(exists){
					// Если стоит флаг 'replace' (заменить) и это файл
					if(replace === 'replace' && fileOrFolder(item.elem) === 'file'){
							// То перепишем
							fs.writeFile(item.totalPath,data,(err) => {
							if(err) throw err;
							callback();
						});
					}else{
						// Иначе дальше
						callback();
					}
				}else{
					
					// Если не существует файла или папки

					// Определим:
					// Если файл, запишем его
					if(fileOrFolder(item.elem) === 'file'){

						fs.writeFile(item.totalPath,data,(err) => {
							if(err) throw err;
							callback();
						});
					}

					// Если папка, то создадим её
					if(fileOrFolder(item.elem) === 'dir'){

						fs.mkdir(item.totalPath,(err)=>{
							if(err) throw err;
							callback();
						});
					}
				}

			},(err)=>{
				throw err;
			});

		});
	}


	createFileOrDir(originPath);
};

module.exports = function (filePath,data,replace){
	createFile(filePath,data,replace);
};