module.exports = function (files,libs){

	// Данный таск удаляет папку со скомпилированными файлами

	// files 	- строка с путем к файлу(папке), который нужно удалить
	// libs		- объект с Node.js плагинами 

	return function(){
		return libs.del(files);
	};
};