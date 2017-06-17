const fs = require('fs');
const path = require('path');
const _base = new (require('./_base.js'));
const isdir = require('isdir')

module.exports = ((params) => {

	let depPath = path.resolve(`./gulp/generate/files/default/css/test.js`);
	isdir(depPath,function(err,dir){
		if(err) throw err;
		//console.log(dir);
	});



	// let treeFolder = {

	// };
	

	let scanFolder = function(filePath){
		fs.readdirSync(path.resolve(filePath)).forEach(file => {
	  		if(_base.fileOrFolder(file) === 'dir'){
	  			depPath = depPath + file + '/';
	  			scanFolder(path.resolve(depPath));
	  		}else{
	  			console.log(file);
	  		}
		})
	}

})();

