const fs = require('fs');
const async = require('async');
const base = new (require('./_base.js'));




let createFile = function(filePath,data = '',replace = false,totalCallback = function(){}){



	arguments.forEach = [].forEach;


	arguments.forEach(function(elem){
		if(typeof(elem) === 'function'){
			totalCallback = elem;
		}
	});




	let originPath = arguments[0];
	let createFileOrDir = function(originPath){

		// 1) Создаем массив с данными о пути
		let arr = base.strParse(originPath);

		// 2) Проверяем на сущестование пути
		async.eachSeries(arr, (item,callback) => {

			fs.exists(item.totalPath,function(exists){

				// Если существует файл или папка

				if(exists){
					// Если стоит флаг 'replace' (заменить) и это файл
					if(replace === 'replace' && base.fileOrFolder(item.elem) === 'file'){
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
					if(base.fileOrFolder(item.elem) === 'file'){

						fs.writeFile(item.totalPath,data,(err) => {
							if(err) throw err;
							callback();
						});
					}

					// Если папка, то создадим её
					if(base.fileOrFolder(item.elem) === 'dir'){

						fs.mkdir(item.totalPath,(err)=>{
							if(err) throw err;
							callback();
						});
					}
				}

			},(err)=>{
				if(err) throw err;
			});
		},function(err){
			if(err) throw err;
			return totalCallback();
		});
		
	}

	createFileOrDir(originPath);
	
};

module.exports = function (filePath,data,replace,totalCallback){
	return createFile(filePath,data,replace,totalCallback);
};