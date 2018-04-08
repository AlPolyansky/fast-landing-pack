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



	function createCssFile(content, fileName){
		return createFile({
			path: path.resolve(createFileFolder, fileName),
			replace: true,
			content
		})
	}



	let desktop = false
	
	function create(folder){

		//console.log(folder)

		fs.readdir(folder,  (err, items) => {
			if(err) throw err


			
			let files = []
			

			items.forEach(item => {


				if(_base.fileOrFolder(item) === 'file'){
					files.push(item)
				}
				else if(_base.fileOrFolder(item) === 'dir'){
					desktop = true
					let newPath = path.resolve(folder, item)
					create(newPath)
				}
				else {
					return false
				}

			})

			const filtered = filterImage(files,folder)

			let photosContent = createPhotoStr(filtered.photos)
			let iconsContent = createIconSrc(filtered.icons)

			console.log(desktop)

			createCssFile(`${photosContent}\n\n${iconsContent}`, desktop ? 
				'_image--m.scss' : '_image.scss'
			)
		})

	}

	create(imagesFolder)



	

	return function(cb){
		return cb();
	}
}