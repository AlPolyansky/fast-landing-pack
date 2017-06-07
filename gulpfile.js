const gulp = require('gulp'); // gulp
const plugins = require('gulp-load-plugins')(); // Автоматическая подгрузка gulp плагинов
const op = require('./options-gulp.js');  // Файл с настройками
const fs = require('fs');     // Управление файлами
const ftp = require('./ftp.json'); // Json файл с натстройками ftp
const watch = plugins.watch;


const sourse = op.path.sourse;                 // Объект с путями исходников
const build = op.path.build;                   // Объект с путями скомпилированных файлов
const dist = op.path.dist;                     // Объект с путями файлов продакшена
const sprite = op.path.sprite();               // Объект с путями png спрайтов



const tasks = require('./gulp/tasks-init.js');  // Подключаем таски


// ================================  Таски  ====================================
// =============================================================================
// =============================================================================



// - Удаляем папку dist
gulp.task( 'clean-dist' ,tasks.clean({
  files: dist.folder
}));

// - Удаляем папку build
gulp.task( 'clean-build' ,tasks.clean({
  files: build.folder
}));

// - Создаем сервер для разработки 
gulp.task( 'build-server' ,tasks.server({
  open: op.open,
  server: build.folder,
  notify: false,
}));

// - Выполняем таск script
gulp.task( 'script' ,tasks.script({                           
  files:   `${sourse.folder}/js/main.js`, 
  build:  `${build.folder}/${build.js}`
}));

// - Выполняем таск sass
gulp.task( 'sass' ,tasks.sass({                              
  files:   `${sourse.folder}/${sourse.sass}/**/*.scss`, 
  build:  `${build.folder}/${build.css}`
}));

// - Копируем изображения

gulp.task( 'copy-image' ,tasks.copy({                             
  files:  `${sourse.folder}/${sourse.img}/**/*`, 
  dest:  `${build.folder}/${build.img}`
}));

// - Копируем шрифты
gulp.task( 'copy-fonts' ,tasks.copy({                             
  files:  `${sourse.folder}/${sourse.fonts}/**/*`, 
  dest:  `${build.folder}/${build.fonts}`
}));

// - Компилируем Pug
gulp.task( 'pug' ,tasks.pug({                            
  files:  `./${sourse.folder}/${sourse.pug}/**/*.pug`, 
  dest:  `${build.folder}/`
}));

// - Создаем мобильную версию
gulp.task( 'mobile-pack', tasks[ 'create-pack' ]({
  type: 'mobile'
}));

// - Создаем десктопную версию
gulp.task( 'desktop-pack', tasks[ 'create-pack' ]({
  type: 'desktop'
}));

// - Создаем адаптивную версию
gulp.task( 'resp-pack', tasks[ 'create-pack' ]({
  type: 'resp'
}));

// - Создаем файл со списком
gulp.task('generate-dist-list',tasks[ 'generate-folders']({
  template: './gulp/generate/dist.js',
}));

// - Создаем сервер для продакшена 
gulp.task( 'dist-server' ,tasks.server({
    open: op.open,
    server: dist.folder,
    notify: false
}));

gulp.task( 'ftp-require' ,tasks.ftp({
  files: './dist/**/*',
  config: require('./ftp.json'),
}));


// ================================  Вотчер  ===================================
// =============================================================================
// =============================================================================
// Слежка за файлами

gulp.task('watch', function () {

  const reload = global._browserSync.reload;

  watch(`${sourse.folder}/${sourse.sass}/**/*.scss`,gulp.series([
    'sass'
  ]))

  watch(`${sourse.folder}/**/*.pug`,gulp.series([
    'pug',
    reload
  ]))

  watch(`./src/**/*.js`,gulp.series([
    'script',
    reload
  ]))

  watch(`./src/img/**/*`, gulp.series([
    tasks.clean({files: `./build/img`}),
    'copy-image',
    reload
  ]))

  watch(`./src/fonts/**/*`, gulp.series([
    tasks.clean({files: `./build/fonts`}),
    'copy-fonts',
    reload
  ]))
  
})


// ================================ Порядок выполнения тасков ==================
// =============================================================================
// =============================================================================





gulp.task('build',gulp.series([
    'clean-dist',
    'clean-build',
    'copy-image',
    'copy-fonts',
    'script',
    'sass',
    'pug',
  ]));


gulp.task('create-dist',gulp.series([
  'clean-dist',
  'mobile-pack',
  'desktop-pack',
  'resp-pack'
]));

gulp.task('dist',gulp.series([
  'build',
  'create-dist',
  'generate-dist-list',
  'dist-server'
]))






gulp.task('default', gulp.series([
  'build',
   gulp.parallel([
     'build-server',
     'watch'
   ])
]));


gulp.task('ftp', gulp.series(
  'create-dist',
  'generate-dist-list',
  'ftp-require'
))







// png спрайт

// gulp.task('png-sprite',function(cb){
//   if(op.sass){

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


//     cb();
//   }else{
//     var spriteData = 
//       gulp.src(`./${sourse.folder}/${sprite.folder}/**/*.png`)
//         .pipe(plugins.spritesmith({
//           imgName: `${sprite.imgName}.png`,
//           cssName: `${sprite.fileName}.css`,
//           cssFormat: 'css',
//           imgPath: `../${sprite.img}/${sprite.imgName}.png`,
//           padding: sprite.padding,
//           cssOpts: {
//              cssSelector: function (item) {
//               return `.${sprite.prefix}` + item.name;
//             }
//           }
//       }))
//     spriteData.img.pipe(gulp.dest(`${build.folder}/${sprite.img}/`));
//     spriteData.css.pipe(gulp.dest(`${sourse.folder}/${sourse.css}/`))
//     cb();
//   }
// });


// const template = require(`./gulp/generate/${op.path.generate().template}.js`); 