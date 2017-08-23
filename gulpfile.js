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




// - Выполняем таск script
gulp.task( 'sass' ,tasks.sass({                            
    files:   [
        `${sourse.folder}/${sourse.sass}/media.scss`,
        `${sourse.folder}/${sourse.sass}/style.scss`,
      ], 
    build:  `${build.folder}/${build.css}`,
    autoprefixer: op.prefix
  }));






gulp.task('concat',function(callback){
    gulp.src('./src/js/main.js')
    .pipe(plugins.concat("main.js"))
    .pipe(gulp.dest('./build/js/'))

  callback();
})


gulp.task('copy-image' , tasks.copy({
  files: `${sourse.folder}/${sourse.img}/**/*.+(jpg|png|gif|svg|tiff)`,
  dest: `${build.folder}/${build.img}/`
}))



gulp.task( 'script-libs' ,tasks.copy({                           
  files:   op.path.jsLibs(), 
  dest:  `${build.folder}/${build.js}`
}));






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


// gulp.task( 'ftp-require' ,tasks.ftp({
//   files: './dist/**/*',
//   config: _base.require('./ftp.json'),
// }));



//=========================  Таски для data-xd   =========================


gulp.task('lex',tasks['data-pug-parser']({
  root: './src/pug/sections/',
  origin: './gulp/origin/'
}));



gulp.task('create-start-template',tasks[ 'generate-folders']({
  template: './gulp/generate/default/default.js',
  replace: true,
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


// Классический вотчер для build
gulp.task('watch', function () {
  watch(`${sourse.folder}/${sourse.sass}/**/*.scss`,gulp.series([
    'sass'
  ]))

  watch(`${sourse.folder}/**/*.pug`,gulp.series([
    'pug',
    reload
  ]))

  watch(`./${sourse.folder}/**/*.js`,gulp.series([
    'concat',
    reload
  ]))

  watch([
      `./${sourse.folder}/${sourse.img}/**/*.+(jpg|png|gif|svg|tiff)`,
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



// Вотчер в режиме data-xd
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
    //'script-libs',
    'sass',
    'pug'
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


// gulp.task('ftp', gulp.series(
//   'create-dist',
//   'generate-dist-list',
//   'ftp-require'
// ))




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
gulp.task('create', gulp.series(
  'create-start-template'
))