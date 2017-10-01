const fs = require('fs');
const parse = require('pug-parser');
const genSource = require('pug-source-gen');
const walk = require('pug-walk');
const randomstring = require("randomstring");
const createFile = require('../base/create-file.js');


// Простовляет data-xd в pug исходники
// params - объект с параметрами
// params.root -  директория откуда взять pug файлы для data-xd генерации
// сb - функция коллбек



// ! Адаптировать, Ускоротить!


module.exports = function (params,cb){

	let lex = require('pug-lexer');

		let src = fs.readFileSync(params.root,'utf-8');
		let tokens = lex(src);
		let iter = 1;
		let ast = parse(tokens, {src});




		ast = walk(ast, function(node, replace){
			if(node.type === 'Tag' 
				&& node.name !== 'style'
				&& node.name !== 'script'){

				iter++;
				let children = node.block.nodes;

				children.forEach((item)=> {

					item.parent = {
						name: node.name,
						attrs: node.attrs,
						type: node.type,
					};

					let flag = true;

					if(item.type === 'Text'){

						if(node.name === 'option'){
							return false;
						}

						let str = item.val.trim();
						node.attrs.forEach(attr => {
							if(attr.name === 'data-xd'){
								flag = false;
							}
						})

						if(str.length && flag){
							node.attrs.push({
				    		name: 'data-xd',
				    		val: `\'${randomstring.generate({length: 7,charset: 'alphabetic'})}-${iter}\'`,
				    		mustEscape: false,
				    	})
				    	
				    	node.dataXd = true;
						}
					}
				})


				if(node.name === 'select'){
					let attrInit = true;
					node.attrs.forEach(attr => {
						if(attr.name === 'data-xd'){
							attrInit = false;
						}
					})

					if(attrInit){
						node.attrs.push({
					  	name: 'data-xd',
					    val: `\'${randomstring.generate({length: 7,charset: 'alphabetic'})}-${iter}\'`,
					    mustEscape: false,
					  })
					}
				}


				if(node.name === 'input'){
					let attrInit = true;
					node.parent.attrs.forEach(attr => {
						if(attr.name === 'data-xd'){
							attrInit = false;
						}
					})

					if(attrInit){
						node.parent.attrs.push({
					  	name: 'data-xd',
					    val: `\'${randomstring.generate({length: 7,charset: 'alphabetic'})}-${iter}\'`,
					    mustEscape: false,
					  })
					}
				}


			}
		},function after(node, replace){
			if(
				node.type === 'Tag' 
				&& node.name !== 'style'
				&& node.name !== 'script'
				&& node.name !== 'option'
			){

				let children = node.block.nodes;
				if(node.dataXd){
					node.parent.attrs.forEach( attr => {
						if(attr.name === 'data-xd'){
							node.attrs = node.attrs.filter(function(item){
								return item.name !== 'data-xd'
							});
						}
					});
				};
				
			}
		});


	const output = genSource(ast);
	createFile({
		path: params.root,
		content: output,
		replace: true,
	},cb)
};