const fs = require('fs');
const parse = require('pug-parser');
const genSource = require('pug-source-gen');
const walk = require('pug-walk');



module.exports = function (param){

	// Простовляет data-xd в pug исходники
	// param.file - директория откуда взять pug файлы для data-xd генерации

	return function lex(){
		let lex = require('pug-lexer');

		let src = fs.readFileSync(param.file,'utf-8');
		let tokens = lex(src);

		let ast = parse(tokens, {src});

		ast = walk(ast, function(node, replace){
			if(node.type === 'Tag'){
				let children = node.block.nodes;

				children.forEach((item)=> {

					item.parent = {
						name: node.name,
						attrs: node.attrs,
						type: node.type,
					};

					let flag = true;

					if(item.type === 'Text'){

						let str = item.val.trim();
						node.attrs.forEach(attr => {
							if(attr.name === 'data-xd'){
								flag = false;
							}
						})

						if(str.length && flag){
							node.attrs.push({
				    		name: 'data-xd',
				    		val: '\'123\'',
				    		mustEscape: false,
				    	})
				    	
				    	node.dataXd = true;
						}
					}
				})
			}
		},function after(node, replace){
			if(node.type === 'Tag'){
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
		console.log(output);
	};
};