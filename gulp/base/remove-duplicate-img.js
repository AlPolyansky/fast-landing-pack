const fs = require('fs');
const path = require('path');
const base = new (require('./_base.js'));
const del = require('del');




// Модуль ищет фотографии с одинаковым именем и удяляем лишнее


function deepReaddirSync(dir, parent) {
    var result = result || [];
    var contents = fs.readdirSync(dir);
    var parent = parent || '';
    dir = dir.substr(dir.length - 1) !== path.sep ? dir + path.sep : dir;


    contents.forEach(function (item) {
    	let fileName = item;	
        let filePath = dir + item;

        var stats = fs.statSync(filePath);
        if (filePath !== dir && stats.isDirectory()) {
            var recursiveContents = deepReaddirSync(filePath, item);
            result = result.concat(recursiveContents);
            return;
        }
        result.push({
        	filePath,
        	fileName,
        	parent
        });
    });

    return result;
}

module.exports = function (params,cb){
    if(!params.enable) return cb();

    let type = params.mobileFirst ? 'desktop' : 'mobile';

	if(params.type === type){
		let temp = [];
		let items = deepReaddirSync(params.root);

        let filtered = items.filter( (item,index,arr) => {
            let fileName = item.fileName;
            let iter = 0;
            arr.forEach( cur => {
                if(fileName == cur.fileName){
                    iter++;
                };
            })

            return iter > 1;
        })




        
        filtered.forEach( item => {
            
            if(item.parent !== type){

                del.sync(item.filePath);
            }
        }) 

	}
	return cb();
}