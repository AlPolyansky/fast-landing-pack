const path = require('../../options-gulp.js').path;
const dist = path.dist;

	
module.exports = [

		{
			path: `${dist.folder}/index.html`,
			content: 
				'<head>\n'+ 
					'\t<meta charset="utf-8">' + 
				'</head>\n' + 
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
	 


];