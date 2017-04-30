module.exports = function (firstIndex,lastIndex,dataName = 'xd',callback){

let async = require('async');
let fs = require('fs');
let cheerio = require('cheerio');
let createFile = require('./create-file.js');

var 
	firstHtml,
	lastHtml;

async.series([

	function(callback_1){
		fs.readFile(firstIndex,'utf-8',(err,data)=>{
			if(err) throw err;
			firstHtml = data;
			callback_1();
		});
	},
	function(callback_1){
		lastHtml	= fs.readFile(lastIndex,'utf-8',(err,data)=>{
			if(err) throw err;
			lastHtml = data;
			callback_1();
		});
	},
	function(callback_1){
		let dataParse = function(){

			let $ = cheerio.load(firstHtml,{ decodeEntities: false, normalizeWhitespace: false });
			let $$ = cheerio.load(lastHtml,{ decodeEntities: false ,normalizeWhitespace: false});



			let rootElem = $$('body');




			let clearText = function(parent){

				if(parent.children().length){
					let chield = parent.contents();
					chield.each(function(i,elem){
						if(elem.type === 'text'){
							elem.data = '';
						}
						else if(elem.type === 'tag'){
							clearText($(elem));
						}
					});
				}
				else{
					parent.text('')
				}
			}

			clearText(rootElem);




			let dataCompare = ($firstHtml,$lastHtml) =>{


				let dataFirst = $(`[data-${dataName}]`);
				let dataLast = $$(`[data-${dataName}]`);

				dataFirst.each(function(i,elem){



					let xd = $(this).data(dataName);
					let inner = $(this).html();


					dataLast.each(function(i,elem){

						let lastXd = $$(this).data(dataName);
						let lastInner = $$(this).html();


						
						if(xd === lastXd && $$(this).data('flag') !== false){
							$$(this).attr('data-flag',false).html(inner);
						}
					});


				});

				let elemFlag = $$('[data-flag]');
				elemFlag.each(function(){
					$$(this).removeAttr('data-flag');
				})



				createFile(lastIndex,$$.html(),'replace');
			}
			dataCompare($,$$);

		}

		dataParse();
		callback_1();
	}

	],(err)=>{
		if(err) throw err;
		callback();
	})
};





