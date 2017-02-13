module.exports = function (gulp,plugins,path,libs){

  // Данный таск берет все svg файлы из папки со спрайтами и создает svg спрайт.

 return function(){
	 return gulp.src(path.sourse.folder + '/' + path.sourse.svg + '/*.svg')
	    .pipe(plugins.svgmin({
	      js2svg: {
	        pretty: true
	      }
	    }))
	    .pipe(plugins.cheerio({
	      run: function ($) {
	        $('[fill]').removeAttr('fill');
	        $('[stroke]').removeAttr('stroke');
	        $('[style]').removeAttr('style');
	      },
	      parserOptions: {xmlMode: true}
	    }))
	    .pipe(plugins.replace('&gt;', '>'))
	    .pipe(plugins.svgSprite({
	      mode: {
	        symbol: {
	          sprite: "../sprite.svg"
	        }
	      }
	    }))
	    .pipe(gulp.dest(path.build.folder + '/' + path.build.svg))
  };
};