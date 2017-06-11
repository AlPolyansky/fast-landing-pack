const gulp = require('gulp');
const path = require('path');


// Подключаем скрипт с data парсером

// params       - объект с параметрами для data парсера
// params.firstIndex 	- путь к первому файлу, из которого будет копировать
// params.lastIndex 	- путь ко второму файлу, в который будем вставлять содержимое
// params.dataName 		- название data- атрибута 

module.exports = function dataParser (params){
  return function(callback){
  	require('../base/data-parser.js')(params,callback);
  };
};