const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();


// Удаляет фотографии с одинковым именем

module.exports = function removeDuplicateImg (params){
	return function(cb){
		require('./../base/clean-html.js')(params,cb);
	}
};