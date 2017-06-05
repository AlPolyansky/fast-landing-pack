const fs = require('fs');
const async = require('async');
const base = new (require('./_base.js'));


// Функция создает файлы или папку

module.exports = (params,totalCallback = function(){}) => {

//=== Инициализируем параметры по умолчанию
	const defaultParams = {
    path: '',
    content: '',
    replace: false,
  }


	let finalParams = defaultParams;


	for (let key in params) {
		if (params.hasOwnProperty(key)) {
			if (params[key] !== undefined) {
				finalParams[key] = params[key];
			}
		}
  }

//=== Инициализируем параметры по умолчанию



		let arr = base.strParse(params.path);
		let replace = params.replace;
		let data = params.content;

		async.eachSeries(arr, (item,callback) => {
			fs.exists(item.totalPath,function(exists){
				let totalPath = item.totalPath; // Обсалютный путь элемента
				let elem = item.elem;						// Элемент 

				if(exists){
					// Если стоит флаг 'replace' (заменить) и это файл
					if(replace && base.fileOrFolder(elem) === 'file'){
							// То перепишем
							fs.writeFile(totalPath,data,(err) => {
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
					if(base.fileOrFolder(elem) === 'file'){

						fs.writeFile(totalPath,data,(err) => {
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
		
};
