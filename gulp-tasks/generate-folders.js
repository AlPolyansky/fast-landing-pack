module.exports = function (path){

  // Данный таск генерирует дерево файлов, если оно не создано и дополняет уже существующие.



  let async = require('async');
  let fs = require('fs');
  let colors = require('colors');
  let createFile = require('create-file');
  let varJson = require(`../${path.sourse.folder}/${path.sourse.json}/${path.sourse.jsonVars}`);


  //console.log(varJson);
  var fileNumbers = 0;
  var folderNumbers = 0;


  // Папка с исходниками

  let sourse = './' + path.sourse.folder;



  // Данный массив используется для генерации файлов и папок. Можно менять по своему вкусу и усмотрению.
  // Главное чтобы совпадал путь

  let foldersArray = 
  [
  	// ============= Папки из конфига 
  	// Желательно не меня эти параметры
  	sourse,
  	'./' + path.sourse.pug,
  	sourse + '/' + path.sourse.fonts,
  	sourse + '/' + path.sourse.sass,
  	sourse + '/' + path.sourse.js,
  	sourse + '/' + path.sourse.svg,
  	sourse + '/' + path.sourse.img,
  	sourse + '/' + path.sourse.json,

  	// =============


  	// Дополнительные папки для вашего удобства

  	'./' + path.sourse.pug + '/pages/',
  	'./' + path.sourse.pug + '/core/',
  	'./' + path.sourse.pug + '/blocks/',
  	sourse + '/' + path.sourse.sass + '/modules',
  	sourse + '/' + path.sourse.sass + '/core',
  	sourse + '/' + path.sourse.sass + '/blocks',
  	sourse + '/' + path.sourse.sass + '/libs',
  	sourse + '/' + path.sourse.js + '/modules',

  	// Создаем файлы
  	{
  		path: sourse + '/' + path.sourse.json + '/var.json',
  		content: '{\n"desktop" : "1200px",\n"tablet" : "768px",\n"mobile" : "480px"\n}'
  	},
  	{
  		path: sourse + '/' + path.sourse.js + 	'/app.js',
  		content: ''
  	},
  	{
  		path: sourse + '/' + path.sourse.sass + '/app.scss',
  		content: ''
  	},
  	{
  		path: sourse + '/' + path.sourse.sass + '/core/_base.scss',
  		content: ''
  	},
  	{
  		path: sourse + '/' + path.sourse.sass + '/core/_var.scss',
  		content: ''
  	},
  	{
  		path: './' + path.sourse.pug + '/_template.pug',
  		content: ''
  	},
  	{
  		path: './' + path.sourse.pug + '/_template.pug',
  		content: ''
  	},
  	{
  		path: './' + path.sourse.pug + '/pages/index.pug',
  		content: ''
  	},
  	{
  		path: './' + path.sourse.pug + '/core/_mixins.pug',
  		content: ''
  	},
  	{
  		path: sourse + '/' + path.sourse.js + '/modules/_vars.js',
  		content: 'var varsModule  = (function(){ \nreturn ' + JSON.stringify(varJson,null, 2) + '\n})();'
  	},

  ];








  // Отличаем файл от папки

/*  let folderOrFile = function(str){
  	let patter = /\w\./;
  	return patter.test(str);
  }*/


  // Генератор папки
  let folderGenerator = function(folder,callback){

  	if((typeof folder === "object") && (folder !== null) ){
  		fs.stat(folder.path, function(err,stats){
  			if(!stats){
  				createFile(folder.path,folder.content,(err) => {
	      	if(err) throw err;
	      	fileNumbers++;
	      	console.log('Создан файл '.blue + folder.path.blue);
	      	callback();
	      })
  			}
  			else{
  				callback();
  			}
  		})
  		
		}else{
			fs.stat(folder, function(err,stats){
      if(!stats){
        fs.mkdir(folder,(err) =>{
          if(err) throw err;
          folderNumbers++;
        	console.log('Создана папка '.green + folder.green);
          callback();
        })
      }else{
        callback();
      }
    })
  }
};


  return function(callback){
		async.each(foldersArray,(folder,callback_2)=>{

			folderGenerator(folder,callback_2);

		},()=>{
			console.log('Созданно файлов '.blue + fileNumbers);
			console.log('Созданно папок '.green + folderNumbers);
			callback();
		})


	};
};