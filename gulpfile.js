const gulp = require('gulp'); // gulp
const _base = new (require('./gulp/base/_base.js'));
const plugins = require('gulp-load-plugins')(); // Автоматическая подгрузка gulp плагинов
const op = require('./options-gulp.js');  // Файл с настройками
const fs = require('fs');     // Управление файлами
const watch = plugins.watch;
const args = process.argv.slice(2);


const sourse = op.path.sourse;                 // Объект с путями исходников
const build = op.path.build;                   // Объект с путями скомпилированных файлов
const dist = op.path.dist;                     // Объект с путями файлов продакшена



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
  files:   `${sourse.folder}/js/**/*.js`, 
  build:  `${build.folder}/${build.js}`
}));



// - Выполняем таск sass (оберка нужня для исправления ошибки sublime text 3)

function sass(wathFile = ''){
  tasks.sass({                            
    files:   [
        `${sourse.folder}/${sourse.sass}/media.scss`,
        `${sourse.folder}/${sourse.sass}/style.scss`,
      ], 
    build:  `${build.folder}/${build.css}`,
    autoprefixer: op.prefix,
    wathFile: wathFile,
    errCb(){
      sass()
    },
    mobileFirst: op.mobileFirst
  })();
}


gulp.task('concat',function(callback){
    gulp.src('./src/js/main.js')
    .pipe(plugins.concat("main.js"))
    .pipe(gulp.dest('./build/js/'))

  callback();
})



// - Копируем изображения
const copyImageFilter = (params) => {
  // params - mobileFirst
  return params.mobileFirst 
    ? {
      files:  `${sourse.folder}/${params.folder}/**/*.+(jpg|png|gif|svg|tiff)`, 
      dest:  `${build.folder}/${build.img}`, 
    }
    : {
      files:  `${sourse.folder}/${params.folder}/**/*.+(jpg|png|gif|svg|tiff)`, 
      dest:  `${build.folder}/${build.img}/${params.dir}`,
    }

}

gulp.task( 'copy-image-mobile' ,tasks.copy(copyImageFilter({
  mobileFirst: op.mobileFirst,
  folder: sourse.imgMobile,
  dir: 'mobile'
})));

gulp.task( 'copy-image-desktop' ,tasks.copy(copyImageFilter({
  mobileFirst: !op.mobileFirst,
  folder: sourse.imgDesktop,
  dir: 'desktop'
})));


gulp.task( 'copy-image' , gulp.series([
  'copy-image-mobile',
  'copy-image-desktop',
]))







// - Копируем шрифты
gulp.task( 'copy-fonts' ,tasks.copy({                             
  files:  `${sourse.folder}/${sourse.fonts}/**/*`, 
  dest:  `${build.folder}/${build.fonts}`
}));

// - Компилируем Pug
gulp.task( 'pug' ,tasks.pug({                            
  files:  `./${sourse.folder}/${sourse.pugRoot}/${sourse.pug}/**/*.pug`, 
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


gulp.task('lex',tasks['lex']({
  root: './src/pug/sections/',
  origin: './gulp/origin/'
}));

gulp.task( 'ftp-require' ,tasks.ftp({
  files: './dist/**/*',
  config: _base.require('./ftp.json'),
}));


gulp.task('create-start-template',tasks[ 'generate-folders']({
  template: './gulp/generate/default.js',
}));



// - Определяем тип data парсера (редактируем мобильную версию или десктопную)
let dataServerPath = './dist/asia/mobile/';
let dataParserType = function(){
  let output;
  if(args[1] === '-d'){
    output = {
      firstIndex: './build/index.html',
      lastIndex: './dist/asia/index.html',
      dataName: 'xd'
    }
    dataServerPath = './dist/asia/'
  }else{
    output = {
      firstIndex: './build/index.html',
      lastIndex: './dist/asia/mobile/index.html',
      dataName: 'xd'
    }
  }

  return output;
}

// - Запускаем data парсер c нужными параметрами
gulp.task('data-parser-init',tasks[ 'data-parser-init'](dataParserType()));


// - Создаем сервер для data парсера 
gulp.task( 'data-server' ,tasks.server({
    open: false,
    server: dataServerPath,
    notify: false
}));



gulp.task( 'data-parser-auto', function(cb){
  if(args[1] === '-auto'){
    require('./gulp/base/data-parser-auto.js')({
      index: `./build/index.html`,
      dataName: 'xd'
    },cb);
  }else{
    cb();
  }
});




// ================================  Вотчер  ===================================
// =============================================================================
// =============================================================================
// Слежка за файлами

const reload = global._browserSync.reload;

gulp.task('watch', function () {

  

  gulp.watch(`${sourse.folder}/${sourse.sass}/**/*.scss`).on('change',(file) =>{
    gulp.series(function sassWatch(){
      sass(file);
    })();     
  });

  watch(`${sourse.folder}/**/*.pug`,gulp.series([
    'pug',
    reload
  ]))

  watch(`./${sourse.folder}/**/*.js`,gulp.series([
    'concat',
    reload
  ]))

  watch([
      `./${sourse.folder}/${sourse.imgMobile}/**/*.+(jpg|png|gif|svg|tiff)`,
      `./${sourse.folder}/${sourse.imgDesktop}/**/*.+(jpg|png|gif|svg|tiff)`, 
    ], gulp.series([
    tasks.clean({files: `./build/img`}),
    'copy-image',
    reload
  ]))

  watch(`./${sourse.folder}/fonts/**/*`, gulp.series([
    tasks.clean({files: `./build/fonts`}),
    'copy-fonts',
    reload
  ]))

  watch(`./${sourse.folder}/fonts/**/*`, gulp.series([
    tasks.clean({files: `./build/fonts`}),
    'copy-fonts',
    reload
  ]))
  
})




// gulp.task( 'png-sprite' ,tasks['png-sprite']({
//   spriteFolder: `./${sourse.folder}/sprites`,
//   userConfig: op,
// }));




gulp.task('data-watch', function () {
  watch(`${sourse.folder}/**/*.pug`,gulp.series([
    'pug',
    'mobile-pack',
    'desktop-pack',
    'data-parser-init',
    reload
  ]))
});






// ================================ Порядок выполнения тасков ==================
// =============================================================================
// =============================================================================





gulp.task('build',gulp.series([
    'clean-dist',
    'clean-build',
    'copy-image',
    'copy-fonts',
    'concat',
    function buildSass(cb){
      sass();
      cb();
    },
    'pug',
    //'png-sprite',
  ]));


gulp.task('create-dist',gulp.series([
  'clean-dist',
  'mobile-pack',
  'desktop-pack',
  'resp-pack'
]));

gulp.task('dist',gulp.series([
  'build',
  'data-parser-auto',
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

gulp.task('create', gulp.series(
  'create-start-template'
))



gulp.task('data' ,gulp.series([
  'build',
  'create-dist',
  'data-parser-init',
  gulp.parallel([
    'data-watch',
    'data-server'
  ])
]))


// - Генерируем структуру проекта
gulp.task('create',tasks[ 'generate-folders']({
  template: './gulp/generate/default.js',
}));