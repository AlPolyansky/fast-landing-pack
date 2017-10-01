const config = require('../../options-gulp.js');
const src = config.path.sourse;
const parse = require('pug-parser');
const genSource = require('pug-source-gen');
const walk = require('pug-walk');
const fs = require('fs');
const path = require('path');

let lex = require('pug-lexer');
const createFile = require('../base/create-file.js');

module.exports = function (params,cb){

	// Сканируем и кешируем index-target
	let indexTarget = fs.readFileSync(path.resolve(params.indexPath),'utf-8');

	let indexTargetTokens = lex(indexTarget);
	let indexTargetAst = parse(indexTargetTokens, {indexTarget});
	let indexData = [];
	indexTargetAst = walk(indexTargetAst, function(node, replace){
		if(node.attrs){
			node.attrs.forEach(attr => {
				if(attr.name === 'data-xd'){
					indexData.push({
						conten: node.block.nodes,
						dataXd: attr.val
					});
				};
			})
		};
	})


	// Заменяем ast файла


	let itemContent = fs.readFileSync(params.itemPath,'utf-8');
	let currentPugTokens = lex(itemContent);
	let currentPugtAst = parse(currentPugTokens, {itemContent});

	currentPugtAst = walk(currentPugtAst, function(node, replace){
		if(node.attrs){
			node.attrs.forEach(attr => {
				if(attr.name === 'data-xd'){
					indexData.forEach(elem => {
						if(attr.val === elem.dataXd){
							node.block.nodes = elem.conten;
						}
					});
				};
			});
		}
	});


		createFile({
			path: params.output,
			content: genSource(currentPugtAst),
			replace: true,
		},cb);
}