module.exports = function (){
let path = require('../../options-gulp.js').path;

let dist = path.dist;

	
	let foldersArray = [

		{
			path: `${dist.folder}/index.html`,
			content: 
				'<body>\n' +
					'\t<ul>\n' +
						'\t\t<li>\n' +
							'\t\t\t<a href="./'+ dist.resp +'/">Адаптив</a>\n' +
						'\t\t</li>\n' +
						'\t\t<li>\n' +
							'\t\t\t<a href="./'+ dist.sep +'/">Десктопная версия</a>\n' +
						'\t\t</li>\n' +
						'\t\t<li>\n' +
							'\t\t\t<a href="./'+ dist.sep + '/' + dist.mobile +  '/">Мобильная версия</a>\n' +
						'\t\t</li>\n' +
					'\t</ul>\n' +
				'</body>'
		}
	 


	]


	return foldersArray;
}