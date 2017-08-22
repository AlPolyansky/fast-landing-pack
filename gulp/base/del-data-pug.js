const fs = require('fs');
const parse = require('pug-parser');
const genSource = require('pug-source-gen');
const walk = require('pug-walk');
const randomstring = require("randomstring");
const createFile = require('../base/create-file.js');


// Удаляет data-xd в pug исходниках
// params - объект с параметрами
// params.root -  директория откуда взять pug файлы для data-xd генерации
// сb - функция коллбек



module.exports = function (params,cb){

		let lex = require('pug-lexer');

		let src = fs.readFileSync(params.root,'utf-8');
		let tokens = lex(src);
		let ast = parse(tokens, {src});

		ast = walk(ast, null ,function after(node, replace){

		});


	const output = genSource(ast);
	createFile({
		path: params.root,
		content: output,
		replace: true,
	},cb)
};