const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const plugins = require('gulp-load-plugins')();

// Создаем png спрайт
// params       - объект с параметрами
// params.src 	-	строка или массив с путем , откуда брать спрайты (указывается корневая папка сос прайтами)


module.exports = function pngSprite (params){

	const config = params.userConfig;
	let rootPath = params.spriteFolder;
	let cash = [];
	let sprites = [

	];

	// Определяет папку, возвращает bool
	const isDir = totalPath => fs.lstatSync(totalPath).isDirectory();

	// Функция принимает путь, и смотрим вложения по этому пути (папки файлы)
	const initRootSprites = (rootPath,spriteNameReplace = true) =>{
		// Инициализируем дефолтный таск
		let defaultSprite = {
			spriteName: 'sprite',
			images: [],
		};



		// Бежим по первому уровню спрайтов, инициализируем имена
		fs.readdirSync(rootPath).forEach(item => {
			let spritePath = path.resolve(rootPath,item);
			let folderName = item;

			if(isDir(spritePath)){
				// Кешируем имена спрайтов
				if(spriteNameReplace){
					cash.push(item);
				}else{
					console.log(spritePath,item);
					//dirObj.desktop = item === 'desktop' ? true : false;
					//dirObj.mobile = item === 'mobile' ? true: false;



					//(cash[cash.length - 1],item);
					// Достаем направления спрайтов (desktop,mobile)
				}
				initRootSprites(rootPath + '/' + item,false);


			}else{
				// Если файл

				cash.forEach(cashItem => {
					if(spritePath.indexOf(cashItem) + 1){
						defaultSprite.spriteName =  cashItem;
					}else{
						defaultSprite.spriteName =  'sprite';
					};


				});

				defaultSprite.images.push(spritePath);
				if(defaultSprite.spriteName.indexOf('--i') + 1){
					//console.log(defaultSprite);
					defaultSprite.icons = true;
				}else{
					defaultSprite.icons = false;
				}


				if(rootPath.indexOf('--i') + 1){
					defaultSprite.icons = true;
				}

				//console.log(params.src);

			}
		});
		if(defaultSprite.images.length){
			// Запиываем конечный варинт;
			
			sprites.push(defaultSprite);
		}
	};






	initRootSprites(rootPath);

	//console.log(sprites);


	const dirIdent = (images) => {
		let output = '';
		images.forEach(image =>{
			let pathArr = image.split(path.sep);

			switch(pathArr[pathArr.length - 2]){
				case 'desktop':
					output = 'desktop';

					//cash[spriteName].desktop = true;
					break;
				case 'mobile':
					output = 'mobile';
					//cash[spriteName].mobile = true;
					break;
			}
		})

		return output;
	}


	const createSprite = (arr) =>{
			let sourseFolder = config.path.sourse.folder;
			let imgFolder = config.path.sourse.img;
			let sassFolder = config.path.sourse.sass;
			let spriteNames = {};
			

			

			arr.forEach(item => {
				spriteNames[item.spriteName] = {};
				// item.images.forEach(image =>{
				// 		let pathArr = image.split(path.sep);

				// 		switch(pathArr[pathArr.length - 2]){
				// 			case 'desktop':
				// 				output = 'desktop';

				// 				spriteNames[spriteName].desktop = true;
				// 				break;
				// 			case 'mobile':
				// 				output = 'mobile';
				// 				spriteNames[spriteName].mobile = true;
				// 				break;
				// 		}
				// 	})
				//console.log(spriteNames);

				let direction = dirIdent(item.images);


				let options = config.sass ?
					{
						cssFormat: 'scss',
						cssName: `_${item.spriteName}.scss`,
						imgName: item.spriteName + '.png',
						classType: '%'
					}

					:

					{
						cssFormat: 'css',
						cssName: `${item.spriteName}.css`,
						imgName: item.spriteName + '.png',
						classType: '.'
					}





				if(item.spriteName.indexOf('--i')){
					options.cssName = options.cssName.replace('--i','');
					options.imgName = options.imgName.replace('--i','');
					options.classType = '.'
				}


				//console.log(options.cssName);

				let spriteData;
				spriteData = gulp.src(item.images)
				.pipe(plugins.spritesmith({
	          imgName: options.imgName,
	          cssName: options.cssName,
	          cssFormat: options.cssFormat,
	          imgPath: `../build/img/sprite.png`,
	          cssOpts: {
	             cssSelector: function (item) {
	              return `${options.classType}i-` + item.name;
	            }
	          }
	      }))



	      //console.log(path.resolve(sourseFolder,imgFolder,direction))

	      spriteData.img.pipe(gulp.dest(path.resolve(sourseFolder,imgFolder,direction)));
				spriteData.css.pipe(gulp.dest(path.resolve(sourseFolder,sassFolder,'sprites',item.spriteName,direction)));

				})
	}


	



 	return function(cb){
 		createSprite(sprites);
		cb();
	};
};


//     var spriteData = 
//       gulp.src(`./${sourse.folder}/${sprite.folder}/**/*.png`)
//         .pipe(plugins.spritesmith({
//           imgName: `${sprite.imgName}.png`,
//           cssName: `_${sprite.fileName}.scss`,
//           cssFormat: 'scss',
//           imgPath: `../${sprite.img}/${sprite.imgName}.png`,
//           padding: sprite.padding,
//           cssOpts: {
//              cssSelector: function (item) {
//               return `.${sprite.prefix}` + item.name;
//             }
//           }
//       }))
//       spriteData.img.pipe(gulp.dest(`${sourse.folder}/${sprite.img}/`));
//       spriteData.css.pipe(gulp.dest(`${sourse.folder}/${sourse.sass}/${sprite.sassPath}`));
