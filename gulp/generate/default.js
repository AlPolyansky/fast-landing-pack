const params = require('../../options-gulp.js');

// Все пути запимываются от корня !

module.exports = function (){
  //------  Пользовательская логика

  const 
    path = params.path,
    src  = path.sourse,
    build  = path.build,
    dist = path.dist,
    imgType = params.mobileFirst ? 'desktop' : 'mobile',
    style = params.sass ? src.sass : src.css;

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

  ];


  // Массив с файлами, которые будут клонированы
  // объект - директория (клонируется вся директория с поддиректориями)
  const cloneArray = [
    {
      root: './gulp/generate/files/default',
      output: './test'
    }

  ]




  return {
    foldersArray,
    cloneArray,
  };
}