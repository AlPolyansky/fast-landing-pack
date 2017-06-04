const del = require('del');


module.exports = function (param){

	// Удаляет ресурс

	// param.files 	- строка с путем к файлу(папке) или массив с путями, который нужно удалить

	return function clean(){
		return del(param.files);
	};
};