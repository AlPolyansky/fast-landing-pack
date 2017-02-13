const gulp = require('gulp'); // gulp
const plugins = require('gulp-load-plugins')(); // Автоматическая подгрузка gulp плагинов
const op = require('./options-gulp.js');  // Файл с настройками
const fs = require('fs');     // Управление файлами
const ftp = require('./ftp.json'); // Json файл с натстройками ftp



// Объект с Node.JS плагинами
const libs = {
  del: require('del'), // плагин для удаления файлов или папок
  browserSync : require('browser-sync').create(), // Плагин для запуска сервера
}


const options = op.options;               // Объекс с натройками
const sourse = op.sourse;                 // Объект с путями исходников
const build = op.build;                   // Объект с путями скомпилированных файлов
const dist = op.dist;                     // Объект с путями файлов продакшена
const tasks = './' + sourse.tasks + '/';     // Путь к gulp таскам



// ================================  Таски  ====================================
// =============================================================================
// =============================================================================




gulp.task('png-sprite',function(cb){

// В разработке


  var spriteData = 
    gulp.src('./src/sprite/png/**/*.png')
      .pipe(plugins.spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss'
      }))
  spriteData.img.pipe(gulp.dest('src/img/icons/'));
  spriteData.css.pipe(gulp.dest('src/sass/core/'))
  cb();
});

// Функция для удаления оставления коментариев при удалении
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
/*2*/  gulp.task( 'clean-build' , require(tasks + 'clean')(build.folder, libs));
/*3*/  gulp.task( 'clean-dist' , require(tasks + 'clean')(dist.folder, libs));
/*4*/  gulp.task( 'server' , require(tasks + 'server')(libs, build.folder));
/*5*/  gulp.task( 'copy-imgs', require(tasks + 'copy')(gulp, sourse.folder + '/' + sourse.img + '/**/*', build.folder + '/' + build.img));
/*6*/  gulp.task( 'copy-fonts', require(tasks + 'copy')(gulp, sourse.folder + '/' + sourse.fonts + '**/*', build.folder + '/' + build.fonts));
/*7*/  gulp.task( 'script', require(tasks + 'script')(gulp, plugins, libs, op.jsCompile(), build.js_file,build.folder + '/' + build.js));

/*8*/  gulp.task( 'mobile-pack', gulp.series(

          require(tasks + 'remove-code')(gulp, plugins, {mobile: true} ,build.folder + '/index.html',dist.folder + '/'  + dist.sep +   '/' + dist.mobile),
          require(tasks + 'remove-code')(gulp, plugins, {mobile: true} ,build.folder + '/' +  build.js + '/**/*', dist.folder + '/' + dist.sep + '/' +dist.mobile + '/' + dist.js),
          require(tasks + 'remove-code')(gulp, plugins, {mobile: true} ,[build.folder + '/' + build.css + '/**/*','!' + build.folder + '/'+ build.css +'/media.css'],dist.folder + '/' +  dist.sep + '/' + dist.mobile + '/css'),
          require(tasks + 'copy')(gulp, [
            build.folder + '/' + build.img + '/**/*',
            '!' + build.folder + '/' + build.img + '/desktop',
            '!' + build.folder + '/' + build.img + '/desktop/**',
          ], dist.folder + '/' + dist.sep  + '/' + dist.mobile + '/' + dist.img),
          require(tasks + 'del-comment')(gulp,plugins,{},dist.folder + '/' + dist.sep + '/' + dist.mobile + '/index.html',dist.folder + '/' + dist.sep + '/' + dist.mobile + '/'),
          require(tasks + 'del-comment')(gulp,plugins,{},dist.folder + '/' + dist.sep + '/' + dist.mobile + '/**/*.js',dist.folder + '/' + dist.sep + '/' + dist.mobile + '/'),
          require(tasks + 'del-css-comment')(gulp,plugins,cssCommentNoDel('==='),dist.folder + '/' + dist.sep + '/' + dist.mobile + '/' + dist.css +'/**/*', dist.folder +  '/' + dist.sep + '/' + dist.mobile + '/' + dist.css)
       ));



/*9*/  gulp.task( 'desktop-pack', gulp.series(

          require(tasks + 'remove-code')(gulp, plugins, {desktop: true} ,build.folder + '/index.html', dist.folder + '/'  + dist.sep),
          require(tasks + 'remove-code')(gulp, plugins, {desktop: true} ,build.folder + '/' +  build.js + '/**/*', dist.folder + '/' + dist.sep + '/' +  dist.js),
          require(tasks + 'remove-code')(gulp, plugins, {desktop: true} ,build.folder +  '/' + build.css + '/**/*', dist.folder + '/' + dist.sep + '/' + dist.css),
          require(tasks + 'copy')(gulp, [
            build.folder + '/' + build.img + '/**/*',
            '!' + build.folder + '/' + build.img + '/mobile',
            '!' + build.folder + '/' + build.img + '/mobile/**',
          ], dist.folder + '/' + dist.sep + '/' + dist.img),
          require(tasks + 'del-comment')(gulp,plugins,{},dist.folder + '/' + dist.sep + '/index.html',dist.folder + '/' + dist.sep + '/'),
          require(tasks + 'del-comment')(gulp,plugins,{},dist.folder + '/' + dist.sep + '/**/*.js',dist.folder + '/' + dist.sep + '/'),
          require(tasks + 'del-css-comment')(gulp,plugins,cssCommentNoDel('==='),dist.folder + '/' + dist.sep + '/' + dist.css +'/**/*', dist.folder +  '/' + dist.sep + '/' + dist.css)
       ));

      

/*10*/ gulp.task( 'responsive-pack' , gulp.series(

        require(tasks + 'copy')(gulp,build.folder + '/**/*','./dist/responsive'),
        require(tasks + 'del-comment')(gulp,plugins,{},dist.folder + '/' + dist.resp + '/index.html',dist.folder + '/' + dist.resp + '/'),
        require(tasks + 'del-comment')(gulp,plugins,{},dist.folder + '/' + dist.resp + '/**/*.js',dist.folder + '/' + dist.resp + '/'),
        require(tasks + 'del-css-comment')(gulp,plugins,cssCommentNoDel('==='),dist.folder + '/' + dist.resp + '/' + dist.css +'/**/*', dist.folder +  '/' + dist.resp + '/' + dist.css)
      ));
  






// ================================  Таски для вотчера =========================
// =============================================================================
// =============================================================================
// Эти таски находятся в этом файле, только для ускорее работы gulp




// Style 
// Таск работает с css файлами (sass)

gulp.task('style', function(){
  return gulp.src(op.sassCompile())
    .pipe(plugins.sourcemaps.init())

    // Создаем sass переменные на основе json
    .pipe(plugins.jsonToSass({
      jsonPath: `./${sourse.folder}/${sourse.json}/${sourse.jsonVars}`,
      scssPath: `${sourse.folder}/${sourse.sass}/core/_var.scss`
    }))
    .pipe(plugins.sass({
      outputStyle: 'expanded',
      errLogToConsole: true,
      //includePaths: ['src/sass']   ???!
    })).on('error', plugins.notify.onError({title: 'Style'}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(build.folder + '/' + build.css))
    .pipe(libs.browserSync.stream())
});


// Pug
// Таск работает с Pug файлами

gulp.task('pug', function(){

  let langPath = './' + sourse.folder + '/' + sourse.json + '/' + sourse.lang + '/' +  options.lang + '.json';

  return gulp.src(op.pugFolders())

    .pipe(plugins.data(function(file){
        return JSON.parse(fs.readFileSync(langPath));
      })).on('error', plugins.notify.onError({title: 'Json'}))

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
    .pipe(gulp.dest(build.folder))
    .pipe(libs.browserSync.reload({stream:true}));
});






// ================================  Вотчер  ===================================
// =============================================================================
// =============================================================================
// Слежка за файлами

gulp.task('watch', function () {

  // Слежка за sass файлами
  gulp.watch([
    sourse.folder + '/**/*.scss',
    '!' + sourse.folder + '/**/_var.scss',
  ], gulp.series('style'));

  // слежка за pug файлами
  gulp.watch(sourse.folder + '/' + sourse.pug + '/**/*.pug', gulp.series('pug'));

  // слежка за js файлами
  gulp.watch([
   sourse.folder + '/'+ sourse.js +'/**/*.js',
    ], gulp.series('script'));

})





// ================================ Порядок выполнения тасков ==================
// =============================================================================
// =============================================================================


gulp.task('build',gulp.series(
  'clean-build',
  'clean-dist',
  'style',
  'pug',
  'script',
  'copy-imgs',
  'copy-fonts'
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
  'build',
  'mobile-pack',
  'desktop-pack',
  'responsive-pack',
  'clean-build'
));

gulp.task('dist',gulp.series(
  'create-dist',
  require(tasks + 'server')(libs, dist.folder)
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
  'ftp-require'
))

