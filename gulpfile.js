const gulp = require('gulp'); // gulp
const plugins = require('gulp-load-plugins')(); // Автоматическая подгрузка gulp плагинов
const op = require('./options-gulp.js');  // Файл с настройками
const fs = require('fs');// Управление файлами
const ftp = require('./ftp.json');  // Json файл с натстройками ftp
//const async = require('async'); 
const args = process.argv.slice(2);  // Массив с атрибутами, которые вводим в консоле





// Объект с Node.JS плагинами
const libs = {
  del: require('del'), // плагин для удаления файлов или папок
  browserSync : require('browser-sync').create(), // Плагин для запуска сервера
}


const sourse = op.path.sourse;                 // Объект с путями исходников
const build = op.path.build;                   // Объект с путями скомпилированных файлов
const dist = op.path.dist;                     // Объект с путями файлов продакшена
const sprite = op.path.sprite();               // Объект с путями png спрайтов
const tasks = `./${sourse.tasks}/`;            // Путь к gulp таскам






// Насттройки сервера

let serverOp = {
  open: op.open,
  server: build.folder,
  notify: false,
};





// png спрайт

gulp.task('png-sprite',function(cb){
  if(op.sass){

    var spriteData = 
      gulp.src(`./${sourse.folder}/${sprite.folder}/**/*.png`)
        .pipe(plugins.spritesmith({
          imgName: `${sprite.imgName}.png`,
          cssName: `_${sprite.fileName}.scss`,
          cssFormat: 'scss',
          imgPath: `../${sprite.img}/${sprite.imgName}.png`,
          padding: sprite.padding,
          cssOpts: {
             cssSelector: function (item) {
              return `.${sprite.prefix}` + item.name;
            }
          }
      }))
      spriteData.img.pipe(gulp.dest(`${sourse.folder}/${sprite.img}/`));
      spriteData.css.pipe(gulp.dest(`${sourse.folder}/${sourse.sass}/${sprite.sassPath}`));


    cb();
  }else{
    var spriteData = 
      gulp.src(`./${sourse.folder}/${sprite.folder}/**/*.png`)
        .pipe(plugins.spritesmith({
          imgName: `${sprite.imgName}.png`,
          cssName: `${sprite.fileName}.css`,
          cssFormat: 'css',
          imgPath: `../${sprite.img}/${sprite.imgName}.png`,
          padding: sprite.padding,
          cssOpts: {
             cssSelector: function (item) {
              return `.${sprite.prefix}` + item.name;
            }
          }
      }))
    spriteData.img.pipe(gulp.dest(`${build.folder}/${sprite.img}/`));
    spriteData.css.pipe(gulp.dest(`${sourse.folder}/${sourse.css}/`))
    cb();
  }
});


const template = {
  default: require(`${tasks}generate/${op.path.generate().template}.js`), 
  dist: require(`${tasks}generate/dist.js`), 
};



// ================================  Таски  ====================================
// =============================================================================
// =============================================================================



// Эта функция оставит указанные коментрии при удалении
function cssCommentNoDel (str){
  return {
    preserve: function(comment){
        if((comment.indexOf(str) + 1)){
          return true;
        }
    }
  }
}



/*1*/  gulp.task( 'ftp-require' ,require(tasks + 'ftp')(gulp ,dist.folder + '/**/*', plugins,ftp));
/*2*/  gulp.task( 'clean-build' , require(`${tasks}clean`)(build.folder, libs));
/*3*/  gulp.task( 'clean-dist' , require(`${tasks}clean`)(dist.folder, libs));
/*4*/  gulp.task( 'server' , require(`${tasks}server`)(libs,serverOp));
/*5*/  gulp.task( 'copy-imgs', require(`${tasks}copy`)(gulp, `${sourse.folder}/${sourse.img}/**/*`, `${build.folder}/${build.img}`));
/*6*/  gulp.task( 'copy-fonts', require(`${tasks}copy`)(gulp, `${sourse.folder}/${sourse.fonts}/**/*`, `${build.folder}/${build.fonts}`));
/*7*/  gulp.task( 'script', require(`${tasks}script`)(gulp, plugins, libs, op.path.jsCompile(), build.js_file, `${build.folder}/${build.js}`));
/*8*/  

/*9*/  gulp.task( 'mobile-pack', gulp.series(
          require(tasks + 'remove-code')(gulp, plugins, {mobile: true,noMobile: false,noDesktop: true,noResp: true,all:true} ,build.folder + '/index.html',dist.folder + '/'  + dist.sep +   '/' + dist.mobile),
          require(tasks + 'remove-code')(gulp, plugins, {mobile: true,noMobile: false,noDesktop: true,noResp: true,all:true} ,build.folder + '/' +  build.js + '/**/*', dist.folder + '/' + dist.sep + '/' +dist.mobile + '/' + dist.js),
          require(tasks + 'remove-code')(gulp, plugins, {mobile: true,noMobile: false,noDesktop: true,noResp: true,all:true} ,[build.folder + '/' + build.css + '/**/*','!' + build.folder + '/'+ build.css +'/media.css'],dist.folder + '/' +  dist.sep + '/' + dist.mobile + '/css'),
          require(tasks + 'copy')(gulp, [
            build.folder + '/' + build.img + '/**/*',
            '!' + build.folder + '/' + build.img + '/desktop',
            '!' + build.folder + '/' + build.img + '/desktop/**',
          ], dist.folder + '/' + dist.sep  + '/' + dist.mobile + '/' + dist.img),
          require(tasks + 'del-comment')(gulp,plugins,{safe:true},dist.folder + '/' + dist.sep + '/' + dist.mobile + '/index.html',dist.folder + '/' + dist.sep + '/' + dist.mobile + '/'),
          require(tasks + 'del-comment')(gulp,plugins,{safe:true},dist.folder + '/' + dist.sep + '/' + dist.mobile + '/**/*.js',dist.folder + '/' + dist.sep + '/' + dist.mobile + '/'),
          require(tasks + 'del-css-comment')(gulp,plugins,cssCommentNoDel('==='),dist.folder + '/' + dist.sep + '/' + dist.mobile + '/' + dist.css +'/**/*', dist.folder +  '/' + dist.sep + '/' + dist.mobile + '/' + dist.css),
          require(tasks + 'clean')(`${dist.folder}/${dist.sep}/${dist.mobile}/${dist.css}/${sprite.fileName}.css`, libs)
       ));



/*10*/  gulp.task( 'desktop-pack', gulp.series(

          require(tasks + 'remove-code')(gulp, plugins, {desktop: true,noMobile: true,noDesktop: false,noResp: true,all:true} ,`${build.folder}/**/*.html`, `${dist.folder}/${dist.sep}`),
          require(tasks + 'remove-code')(gulp, plugins, {desktop: true,noMobile: true,noDesktop: false,noResp: true,all:true} ,build.folder + '/' +  build.js + '/**/*', dist.folder + '/' + dist.sep + '/' +  dist.js),
          require(tasks + 'remove-code')(gulp, plugins, {desktop: true,noMobile: true,noDesktop: false,noResp: true,all:true} ,build.folder +  '/' + build.css + '/**/*', dist.folder + '/' + dist.sep + '/' + dist.css),
          require(tasks + 'copy')(gulp, [
            build.folder + '/' + build.img + '/**/*',
            '!' + build.folder + '/' + build.img + '/mobile',
            '!' + build.folder + '/' + build.img + '/mobile/**',
          ], dist.folder + '/' + dist.sep + '/' + dist.img),
          require(tasks + 'del-comment')(gulp,plugins,{safe:true},dist.folder + '/' + dist.sep + '/index.html',dist.folder + '/' + dist.sep + '/'),
          require(tasks + 'del-comment')(gulp,plugins,{safe:true},dist.folder + '/' + dist.sep + '/**/*.js',dist.folder + '/' + dist.sep + '/'),
          require(tasks + 'del-css-comment')(gulp,plugins,cssCommentNoDel('==='),dist.folder + '/' + dist.sep + '/' + dist.css +'/**/*', dist.folder +  '/' + dist.sep + '/' + dist.css),
          require(tasks + 'clean')(`${dist.folder}/${dist.sep}/${dist.css}/${sprite.fileName}.css`, libs)
       ));

      

/*11*/ gulp.task( 'responsive-pack' , gulp.series(
        require(tasks + 'copy')(gulp,`${build.folder}/**/*`,`./${dist.folder}/${dist.resp}`),
        require(tasks + 'remove-code')(gulp, plugins, {resp: true,noMobile: true,noDesktop: true,noResp: false,all:true} ,`${build.folder}/**/*.html`, `${dist.folder}/${dist.resp}`),
        require(tasks + 'remove-code')(gulp, plugins, {resp: true,noMobile: true,noDesktop: true,noResp: false,all:true} ,`${build.folder}/${build.js}/**/*`, `${dist.folder}/${dist.resp}/${dist.js}`),
        require(tasks + 'remove-code')(gulp, plugins, {resp: true,noMobile: true,noDesktop: true,noResp: false,all:true} ,build.folder +  '/' + build.css + '/**/*', dist.folder + '/' + dist.resp + '/' + dist.css),
        require(tasks + 'del-comment')(gulp,plugins,{safe:true},dist.folder + '/' + dist.resp + '/index.html',dist.folder + '/' + dist.resp + '/'),
        require(tasks + 'del-comment')(gulp,plugins,{safe:true},dist.folder + '/' + dist.resp + '/**/*.js',dist.folder + '/' + dist.resp + '/'),
        require(tasks + 'del-css-comment')(gulp,plugins,cssCommentNoDel('==='),dist.folder + '/' + dist.resp + '/' + dist.css +'/**/*', dist.folder +  '/' + dist.resp + '/' + dist.css),
        require(tasks + 'clean')(`${dist.folder}/${dist.resp}/${dist.css}/${sprite.fileName}.css`, libs)
      ));


/*12*/  gulp.task( 'create' ,require(tasks + 'generate-folders')(template.default));
/*13*/  gulp.task( 'generate-dist-list' ,require(tasks + 'generate-folders')(template.dist));


/*14*/
      gulp.task('data-parser',function(callback){
        require(tasks + 'data-parser')('./build/index.html','./dist/asia/mobile/index.html','xd',callback);
      });

      gulp.task('data-parser-desktop',function(callback){
        require(tasks + 'data-parser')('./build/index.html','./dist/asia/index.html','xd',callback);
      });

/*15*/
      let parsData = {
        type: 'data-parser',
        server : `${dist.folder}/${dist.sep}/${dist.mobile}`
      };
      if(args[1] === '-d'){
        parsData.type = 'data-parser-desktop';
        parsData.server = `${dist.folder}/${dist.sep}`
      }

      gulp.task('data-parser-init',gulp.series(
        parsData.type
      ))


/*16*/
    gulp.task('reload',function(cb){
      libs.browserSync.reload();
      cb();
    })





// ================================  Таски для вотчера =========================
// =============================================================================
// =============================================================================
// Эти таски находятся в этом файле, только для ускорее работы gulp



// Копирует html и перезагружает браузер
gulp.task('html', function(){
  return gulp.src(`${sourse.folder}/**/*.html`)
    .pipe(gulp.dest(`${build.folder}`))
    .pipe(libs.browserSync.reload({stream:true}));
})



// Копирует и обновляет css
gulp.task('style', function(cb){

  if(!op.sass){

  return gulp.src(`${sourse.folder}/${sourse.css}/**/*.css`)
    .pipe(plugins.autoprefixer([op.prefix], {cascade: true}))
    .pipe(gulp.dest(`${build.folder}/${build.css}`))


  }else{
    return cb();
  }
});


gulp.task('css-concat',function(cb){
  if(!op.sass){
    return gulp.src(op.path.cssCompile())
    .pipe(plugins.concat(build.css_file))
    .pipe(gulp.dest(`${build.folder}/${build.css}/`))
    .pipe(libs.browserSync.reload({stream:true}));
  }else{
    cb();
  }
})


gulp.task('sass',function(cb){
  if(op.sass){
    return gulp.src(`${sourse.folder}/${sourse.sass}/**/*.scss`)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
        outputStyle: 'expanded',
        errLogToConsole: true,
      })).on('error', plugins.notify.onError({title: 'Style'}))
    .pipe(plugins.autoprefixer([op.prefix], {cascade: true}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(`${build.folder}/${build.css}`))
    .pipe(libs.browserSync.stream())
  }else{
    return cb();
  }
})




gulp.task('pug', function(cb){
  if(op.pug){
  return gulp.src(`./${sourse.folder}/${sourse.pug}/**/*.pug`)
    .pipe(plugins.pug(
      {
        pretty: true
      }
    ))
    .on('error', plugins.notify.onError(function (error) {
      return {
        title: 'Pug',
        message: error.message
      }
    }))
    .pipe(gulp.dest(`${build.folder}/`));
  }else{
    return cb();
  }
});


if(op.pixelGlass){
  gulp.task('pixel-glass', gulp.series(
    require(`${tasks}copy`)(gulp, ['gulp/libs/debug/pixel-glass/styles.css','gulp/libs/debug/pixel-glass/script.js'], `${build.folder}/debug/pixel-glass`),
    require(tasks + 'generate-folders')(sourse,require(`${tasks}generate/pixelGlass.js`),'replace'),
    require(`${tasks}include`)(gulp ,plugins,`${build.folder}/index.html`,`${build.folder}/`),
    require(`${tasks}copy`)(gulp, `${sourse.folder}/pixel/**/*`, `${build.folder}/debug/pixel-glass`)
  ));
}else{
  gulp.task('pixel-glass', function(cb){
    return cb();
  });
}



// JS Библиотеки


if(op.path.jsLibs().length){
  gulp.task('js-libs', gulp.series(
    require(`${tasks}copy`)(gulp, op.path.jsLibs(), `${build.folder}/${build.js}`)
  ));
}else{
  gulp.task('js-libs', function(cb){
    return cb();
  });
}







// ================================  Вотчер  ===================================
// =============================================================================
// =============================================================================
// Слежка за файлами

gulp.task('watch', function () {

  if(op.sass){
    gulp.watch(`${sourse.folder}/${sourse.sass}/**/*.scss`, gulp.series('sass'));
  }else{
    gulp.watch(`${sourse.folder}/${sourse.css}/**/*.css`, gulp.series('style','css-concat'));
  }

  if(op.pug){
    gulp.watch(`${sourse.folder}/**/*.pug`, gulp.series('pug','reload'));
  }else{
    gulp.watch(`${sourse.folder}/*.html`, gulp.series('html','reload'));
  }

  gulp.watch(`${sourse.folder}/**/*.js`, gulp.series('script'));
})


gulp.task('data-watch',function(){
  if(op.pug){
    if(parsData.type === 'data-parser-desktop'){
      gulp.watch(`${sourse.folder}/**/*.pug`, gulp.series('pug','desktop-pack','data-parser-init','reload'));
    }else{
      gulp.watch(`${sourse.folder}/**/*.pug`, gulp.series('pug','mobile-pack','data-parser-init','reload'));
    }
    
  }else{
    if(parsData.type === 'data-parser-desktop'){
      gulp.watch(`${sourse.folder}/*.html`, gulp.series('html','desktop-pack','data-parser-init','reload'));
    }else{
      gulp.watch(`${sourse.folder}/*.html`, gulp.series('html','mobile-pack','data-parser-init','reload'));
    }
  }
})





// ================================ Порядок выполнения тасков ==================
// =============================================================================
// =============================================================================






gulp.task('build',gulp.series(
  'clean-build',
  'clean-dist',
  'script',
  'copy-imgs',
  'copy-fonts',
  'style',
  'sass',
  'html',
  'pug',
  'png-sprite',
  'css-concat',
  'js-libs'
));


gulp.task('mobile',gulp.series(
  'clean-dist',
  'mobile-pack'
));

gulp.task('desktop',gulp.series(
  'build',
  'clean-dist',
  'desktop-pack'
));

gulp.task('responsive',gulp.series(
  'build',
  'clean-dist',
  'responsive-pack'
));

gulp.task('create-dist',gulp.series(
  'clean-dist',
  'mobile-pack',
  'desktop-pack',
  'responsive-pack'
));

gulp.task('dist',gulp.series(
  'build',
  'create-dist',
  'generate-dist-list',
  require(tasks + 'server')(libs,{open: op.open,server: dist.folder,notify: false})
))





gulp.task('data' ,gulp.series(
  'build',
  'create-dist',
  'data-parser-init',
  gulp.parallel(
    'data-watch',
    require(tasks + 'server')(libs,{open: op.open,server: parsData.server,notify: false})
  )
))






gulp.task('default', gulp.series(
  'build',
   gulp.parallel(
    'server',
    'watch'
  )
));


gulp.task('ftp', gulp.series(
  'create-dist',
  'generate-dist-list',
  'ftp-require'
))

