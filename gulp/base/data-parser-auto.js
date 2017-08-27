const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const createFile = require('./create-file.js');
const minify = require('html-minifier').minify;
const pretty = require('pretty');
const randomstring = require("randomstring");


// params - объект с параметрами
// params.index - путь до html файла
// params.dataName - имя data атрибута

module.exports = function (params,cb){


var lastHtml;

//console.log(cb);

async.series([
	function(callback_1){
		lastHtml	= fs.readFile(params.index,'utf-8',(err,data)=>{
			if(err) throw err;
			lastHtml = data;
			callback_1();
		});
	},
	function(callback_1){

		let minLastHtml = minify(lastHtml,{
			collapseWhitespace: true,
		});

		
		let $ = cheerio.load(minLastHtml,{ decodeEntities: false ,normalizeWhitespace: false});

		let rootElem = $('body');

		let iter = 0;
		let addRandoData = function(parent){
					let chield = parent.contents();
					chield.each(function(i,elem){

						if(elem.type === 'text'){
							if($(elem.parent).attr(`data-${params.dataName}`)){
								return false;
							}
							$(elem.parent).attr('data-' + params.dataName,randomstring.generate({length: 5,charset: 'alphabetic'}) +  '-' + iter);
							iter++;
						}
						else if(elem.type === 'tag'){
							if(elem.name !== 'form'){
								addRandoData($(elem));
							}else{
								if($(elem).attr(`data-${params.dataName}`)){
									return false;
								}
								$(elem).attr('data-' + params.dataName,randomstring.generate({length: 5,charset: 'alphabetic'}) +  '-' + iter);
								iter++;
							}
						}
					});
			}

		addRandoData(rootElem);


		createFile({
			path: params.index,
			content: pretty($.html()),
			replace: true
		},callback_1);


	}
	],(err)=>{
		if(err) throw err;
		return cb();
	})


}