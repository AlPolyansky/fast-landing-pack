const fs = require('fs');
const base = new (require('../base/_base.js'));
const async = require('async');


module.exports = function (params){
	  return function(callback){

	  	async.series([

	  		// function(cb_1){
	  		// 	base.deepClone(params.root,params.origin,cb_1)
	  		// },

	  		function(cb_1){
		  		fs.readdir(params.root,(err,files)=>{
			  		if(err) throw err;
			  		async.eachSeries(files,(item,cal_2) => {
			  			require('../base/data-pug-parser.js')({
			  				root: params.root + item
			  			},
			  			cal_2);
			  		},err =>{
			  			if(err) throw err;
			  			return cb_1();
			  		})
			  	});
	  		},



	  		function(cb_1){
		  		fs.readdir(params.root,(err,files)=>{
			  		if(err) throw err;
			  		async.eachSeries(files,(item,cal_2) => {
			  			require('../base/del-data-pug.js')({
			  				root: params.root + item,
			  				clone: params.origin,
			  				item
			  			},
			  			cal_2);
			  		},err =>{
			  			if(err) throw err;
			  			return cb_1();
			  		})
			  	});
	  		}

	  	],err =>{
	  		if(err) throw err;
	  		return callback();
	  	})
  	};
};