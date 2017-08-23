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
    mixinsPug = {path: ''};

    if(params.pug){
      const pugTemplate = require('./files/_template-pug.js')(params);
      const pugIndex = require('./files/index-pug.js')();
      const pugMixins = require('./files/_mixins-pug.js')();


      template = {path: `./${src.folder}/${src.pugRoot}/_template.pug`,content: pugTemplate};
      pagesPug = {path: `./${src.folder}/${src.pugRoot}/${src.pug}/index.pug`, content: pugIndex};
      headerPug = {path: `./${src.folder}/${src.pugRoot}/sections/_header.pug`, content: `h1 Привет! Я готов к верстке!`};
      mixinsPug = {path: `./${src.folder}/${src.pugRoot}/core/_mixins.pug`, content: pugMixins};
    }else{
      const htmlFile = require('./files/index-html.js')(params);
      template = {path: `./${src.folder}/index.html`,content: htmlFile};
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
    mixinsPug

  ];


  // Массив с файлами, которые будут клонированы
  // объект - директория (клонируется вся директория с поддиректориями)
  const cloneArray = [
    // {
    //   root: './gulp/generate/files/default',
    //   output: './test'
    // }

  ]




  return {
    foldersArray,
    cloneArray,
  };
}