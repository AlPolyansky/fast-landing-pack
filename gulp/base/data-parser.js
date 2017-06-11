const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const createFile = require('./create-file.js');



// Дата парсер, нужен для быстрого копирования текста с декстопной версии на мобильную, копирование происходит
// по data атрибуту.
// Удобно при переводе

// params 						- объект с параметрами
// params.firstIndex 	- путь к первому файлу, из которого будет копировать
// params.lastIndex 	- путь ко второму файлу, в который будем вставлять содержимое
// params.dataName 		- название data- атрибута 

module.exports = function (params,cb){



var 
	firstHtml,
	lastHtml;

async.series([

	function(callback_1){
		fs.readFile(params.firstIndex,'utf-8',(err,data)=>{
			if(err) throw err;
			firstHtml = data;
			callback_1();
		});
	},
	function(callback_1){
		lastHtml	= fs.readFile(params.lastIndex,'utf-8',(err,data)=>{
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


				let dataFirst = $(`[data-${params.dataName}]`);
				let dataLast = $$(`[data-${params.dataName}]`);

				dataFirst.each(function(i,elem){



					let xd = $(this).data(params.dataName);
					let inner = $(this).html();


					dataLast.each(function(i,elem){

						let lastXd = $$(this).data(params.dataName);
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



				createFile({
					path: params.lastIndex,
					content: $$.html(),
					replace: true
				});
			}
			dataCompare($,$$);

		}

		dataParse();
		callback_1();
	}

	],(err)=>{
		if(err) throw err;
		return cb();
	})
};







