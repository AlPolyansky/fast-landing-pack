const createFile = require('../base/create-file.js');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const _base = new (require('../base/_base'))





module.exports = function ImageCss(params) {
	
	

	const { imagesFolder } = params



	function filterImage(imgs){
		let photos = [];
		let icons = [];

		imgs.forEach( item => {
			if(item.indexOf('ico-') + 1){
				icons.push(item)
			}

			if(item.indexOf('photo-') + 1){
				photos.push(item)
			}
		})
		

		return {
			photos,
			icons
		}
	}


	function createPhotoStr(photos){

		var output = `
			.photo{
				background: no-repeat center / cover;
			`; 

		photos.forEach( (item,idx) => {

			

			output = output + `&-${idx + 1}{
					background-image: url(#{$imgPath}/photo-${idx + 1}.jpg);
				}
			`

		})

		console.log(output)

	}



	function getImageParams(path){
		sizeOf(path, (err, img) => console.log(img))
	}





	fs.readdir(imagesFolder,  (err, item) => {
		if(_base.fileOrFolder(item) === 'file'){

			const filtered = filterImage(item)


			createPhotoStr(filtered.photos)

			//item.forEach(image => getImageParams(path.resolve(imagesFolder, image)))
		}
		else{
			return false;
		}
	})



	

	return function(cb){
		return cb();
	}
}