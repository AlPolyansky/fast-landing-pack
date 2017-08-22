const fs = require('fs');
const base = new (require('../base/_base.js'));
const async = require('async');


module.exports = function (params){
	  return function(callback){

	  	async.series([

	  		function(cb_1){
	  			//base.deepClone(params.root,params.origin,cb_1)
	  			cb_1()
	  		},

	  		function(cb_2){
		  		fs.readdir(params.root,(err,files)=>{
			  		if(err) throw err;
			  		async.eachSeries(files,(item,cal_3) => {
			  			require('../base/del-data-pug.js')({
			  				root: params.root + item
			  			},
			  			cal_3);
			  		},err =>{
			  			if(err) throw err;
			  			return cb_2();
			  		})
			  	});
	  		}

	  	],err =>{
	  		if(err) throw err;
	  		return callback();
	  	})
  	};
};