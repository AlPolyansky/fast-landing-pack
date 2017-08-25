const params = require('../../../options-gulp.js');

// Все пути запимываются от корня !

module.exports = function (){
  //------  Пользовательская логика



  // Содержимое файлов

  const 
    path = params.path,
    src  = path.sourse,
    build  = path.build,
    dist = path.dist,
    imgType = params.mobileFirst ? 'desktop' : 'mobile',
    style = params.sass ? src.sass : src.css;

  let
    template = {path: ''},
    pagesPug = {path: ''},
    headerPug = {path: ''},
    mixinsPug = {path: ''},
    styleFile = {path: ''},
    mediaFile = {path: ''},
    baseFile = {path : ''},
    varsFile = {path : ''},
    modulesScss = {path : ''},
    sectionsScss = {path : ''},
    mediaModulesScss = {path : ''},
    mediaSectionsScss = {path : ''};



  // Объекты клонирования

  let scssLibs = {root : '',output: ''}

    if(params.pug){
      const pugTemplate = require('./files/_template-pug.js')(params);
      const pugIndex = require('./files/index-pug.js')();
      const pugMixins = require('./files/_mixins-pug.js')();


      template = {path: `./${src.folder}/${src.pugRoot}/_template.pug`,content: pugTemplate};
      pagesPug = {path: `./${src.folder}/${src.pugRoot}/${src.pug}/index.pug`, content: pugIndex};
      headerPug = {path: `./${src.folder}/${src.pugRoot}/sections/_header.pug`, content: 
        `header.header
          .container
            h1 Привет! Я готов к верстке!`
      };
      mixinsPug = {path: `./${src.folder}/${src.pugRoot}/core/_mixins.pug`, content: pugMixins};
    }else{
      const htmlFile = require('./files/index-html.js')(params);
      template = {path: `./${src.folder}/index.html`,content: htmlFile};
    }


    if(params.sass){
      const scssContent = require('./files/style-scss.js')(params);
      const mediaContent = require('./files/media-scss.js')(params);
      const baseContent = require('./files/_base-scss.js')(params);
      const varsContent = require('./files/_var-scss.js')(params);

      styleFile = {path: `./${src.folder}/${src.sass}/style.scss`,content: scssContent};
      mediaFile = {path: `./${src.folder}/${src.sass}/media.scss`,content: mediaContent};
      baseFile = {path: `./${src.folder}/${src.sass}/core/_base.scss`,content: baseContent};
      varsFile = {path: `./${src.folder}/${src.sass}/core/_vars.scss`,content: varsContent};

      
      let folderTypeMobile = params.mobileFirst ? 'mobile' : 'desktop';
      let folderTypeDesktop = params.mobileFirst ? 'desktop' : 'mobile';

      modulesScss = {path: `./${src.folder}/${src.sass}/styles/${folderTypeMobile}/_modules.scss`};
      sectionsScss = {path: `./${src.folder}/${src.sass}/styles/${folderTypeMobile}/_sections.scss`};
      mediaModulesScss = {path: `./${src.folder}/${src.sass}/styles/${folderTypeDesktop}/_m--modules.scss`};
      mediaSectionsScss = {path: `./${src.folder}/${src.sass}/styles/${folderTypeDesktop}/_m--sections.scss`};

      // Клонировние

      scssLibs = {
        root: './gulp/generate/default/libs/scss',
        output: `./${src.folder}/${src.sass}/libs/`
      }
    }

  //------  Пользовательская логика

  
  // Массив с генерируемыми файлами
  // объект - файл,папка
  const foldersArray = [

    // ftp.json
    {
      path: `./ftp.json`,
      content: 
      '{\n' +
        '\t"host": "your_host",\n' +
        '\t"user": "your_login",\n' +
        '\t"pass": "ftp_pass",\n' +
        '\t"remotePath" : "/yourPath/"\n' +
      '}'
    },

    // Каталоги
    {path: `./${src.folder}`},
    // - img
    {path: `./${src.folder}/${src.img}`},
    {path: `./${src.folder}/${src.img}/${imgType}`},
    // - css
    {path: `./${src.folder}/${style}`},
    // - js
    {path: `./${src.folder}/${src.js}`},
    // - fonts
    {path: `./${src.folder}/${src.fonts}`},
    // - html (pug)
    template,
    pagesPug,
    headerPug,
    mixinsPug,
    // - css (scss)
    styleFile,
    mediaFile,
    baseFile,
    varsFile,
    modulesScss,
    sectionsScss,
    mediaModulesScss,
    mediaSectionsScss,
    // - js
    {path: `./${src.folder}/${src.js}/${build.js_file}`},


  ];


  // Массив с файлами, которые будут клонированы
  // объект - директория (клонируется вся директория с поддиректориями)
  const cloneArray = [
    scssLibs
  ]




  return {
    foldersArray,
    cloneArray,
  };
}