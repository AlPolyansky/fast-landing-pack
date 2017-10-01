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



// Записываем глобально данные о языке
let globData = _base.glob();
globData.langs.indexOf(op.lang) === -1 ? globData.langs.push(op.lang) : globData.langs;

if(globData.arrayVersionLang.length > 1){
  globData.arrayVersionLang.splice(0,1);
}
globData.arrayVersionLang.push(op.lang);
globData.beforeLang = globData.langs.length > 1 ?  globData.arrayVersionLang[0] : null;
globData.currentLang = op.lang; 
_base.changeGlob(globData);



let 
  htmlTemplate = 'html',
  stylePrepros = 'css';






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


gulp.task( 'css' ,tasks.css({                            
  files: `${sourse.folder}/${sourse.css}/**/*.css`,
  build:  `${build.folder}/${build.css}`,
  autoprefixer: op.prefix
}));


gulp.task('html' , tasks.copy({
  files: `${sourse.folder}/**/*.html`,
  dest: `${build.folder}`
}))


gulp.task('concat',function(callback){
  return gulp.src(op.path.jsCompile()).on('error', () => callback())
    .pipe(plugins.concat("main.js"))
    .pipe(gulp.dest(`./${build.folder}/${build.js}/`))
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
gulp.task( 'copy-font' ,tasks.copy({                        
  files:  `./${sourse.folder}/${sourse.fonts}/**/*`, 
  dest:  `./${build.folder}/${build.fonts}`
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



gulp.task('create-start-template',tasks[ 'generate-folders']({
  template: './gulp/generate/default/default.js',
  replace: false,
}));


//=========================  Таски для data-xd   =========================


gulp.task('data-pug',tasks['data-pug-parser']({
  root: `./${sourse.folder}/${sourse.pugRoot}/sections/`,
  origin: './gulp/origin/'
}));


gulp.task('data-html',tasks['data-parser-auto-init']({
  index: `./${sourse.folder}/index.html`,
  dataName: 'xd'
}));

gulp.task('lex',gulp.series([
  htmlTemplate = op.pug ? 'data-pug' : 'data-html'
]));




gulp.task( 'clean-src' ,tasks.clean({
  files: sourse.folder
}))

gulp.task('copy-src' , tasks.copy({
  files: `./gulp/translate/${op.lang}/**/*`,
  dest: `./${sourse.folder}`
}))


gulp.task('select-lang' , gulp.series([
  'clean-src',
  'copy-src',
]));


gulp.task('bung',function(cb){
  return cb();
})





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

  watch(`${sourse.folder}/${sourse.css}/**/*.css`,gulp.series([
    'css'
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

  watch(`./${sourse.folder}/**/*.html`, gulp.series([
    'html',
    reload
  ]))
  
})



// Вотчер в режиме data-xd
gulp.task('data-watch', function () {
  watch(`${sourse.folder}/**/*.${htmlTemplate = op.pug ? 'pug' : 'html'}`,gulp.series([
    htmlTemplate = op.pug ? 'pug' : 'html',
    'mobile-pack',
    'desktop-pack',
    'data-parser-init',
    reload
  ]))
});

// ================================ Порядок выполнения тасков ==================
// =============================================================================
// =============================================================================

let langFolder = op.lang;

if(globData.arrayVersionLang[0] !== globData.arrayVersionLang[1]){
  langFolder = globData.arrayVersionLang[0];
}



gulp.task('replace-src',gulp.series([
  tasks.clean({files: `./gulp/translate/${langFolder}`}),
  tasks.copy({                        
    files:  `./${sourse.folder}/**/*`, 
    dest:  `./gulp/translate/${langFolder}`
  })
]));
let replaceLang = '';
let selectLang = '';

gulp.task('build',gulp.series([
    replaceLang = globData.beforeLang ? 'replace-src' : 'bung',
    selectLang = globData.beforeLang ? 'select-lang' : 'bung',
    'clean-dist',
    'clean-build',
    'copy-image',
    'copy-font',
    'concat',
    'script-libs',
    htmlTemplate = op.pug ? 'pug' : 'html',
    stylePrepros = op.sass ? 'sass' : 'css',
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






gulp.task('translate',tasks['translate']({

}));