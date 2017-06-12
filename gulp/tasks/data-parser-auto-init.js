const gulp = require('gulp');


// Подключаем скрипт с data парсером

// params       - объект с параметрами для data парсера
// params.index 	- путь к первому файлу, из которого будет копировать
// params.dataName 		- название data- атрибута 

module.exports = function dataParserAuto (params){
  return function(callback){
  	require('../base/data-parser-auto.js')(params,callback);
  };
};