const createFile = require('../base/create-file.js');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const _base = new (require('../base/_base'))





module.exports = function ImageCss(params) {


	const { imagesFolder, createFileFolder } = params

	function filterImage(imgs, filePath){
		let photos = [];
		let icons = [];

		

		imgs.forEach( item => {
			if(item.indexOf('ico-') + 1){
				icons.push({
					name: item,
					path: path.resolve(filePath, item)
				})
			}

			if(item.indexOf('photo-') + 1){
				photos.push({
					name: item,
					path: path.resolve(filePath, item)
				})
			}
		})
		

		return {
			photos,
			icons
		}
	}


	function createPhotoStr(photos){


		let output = `.photo{background: no-repeat center / cover;`;

		photos.forEach( (item,idx) => {
			const itemNum = item.name.match(/\d/g).join('')
			output = output + `	&-${itemNum}{background-image: url(#{$imgPath}/${item.name});}`

		})

		return output + `}`

	}



	function getImageParams(path){
		return sizeOf(path)
	}



	
	function createIconSrc(icons){
		let output = `.ico{
			display: inline-block;
			font-style: normal;
			background: no-repeat center / contain;
		`

		icons.forEach( (item,idx) => {

			const params = getImageParams(item.path)

			

			

			const itemNum = item.name.match(/\d/g).join('')
			output = output + `	&-${itemNum}{
				background-image: url(#{$imgPath}/${item.name});
				width: ${params.width}px;
				height: ${params.height}px;
			}`

		})

		return output + `}`
	}



	function createCssFile(content){
		return createFile({
			path: path.resolve(createFileFolder, '_image.scss'),
			replace: true,
			content
		})
	}







	fs.readdir(imagesFolder,  (err, item) => {
		if(err) throw err

		if(_base.fileOrFolder(item) === 'file'){


			const filtered = filterImage(item,imagesFolder)


			let photosContent = createPhotoStr(filtered.photos)
			let iconsContent = createIconSrc(filtered.icons)
			
			createCssFile(`${photosContent}\n\n${iconsContent}`)

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