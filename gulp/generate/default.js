module.exports = function (){
let options = require('../../options-gulp.js');


let path = options.path.sourse;
let generate = options.path.generate();
let sourse = './' + path.folder;
let sprite = options.path.sprite();
let sass_file = generate.css_file;
let css_folder = path.css;

let spriteFile = sourse + '/' + css_folder + '/' + sprite.fileName + '.css';





if(options.sass){
  path.css = path.sass;
  sass_file = generate.css_file.replace('css','scss');
  spriteFile = sourse + '/' + path.sass + '/'  + sprite.sassPath + '/_' + sprite.fileName + '.scss';
}







let foldersArray = 
  [
  	// ============= Папки из конфига 
  	sourse,
  	sourse + '/' + path.fonts,
    sourse + '/' + path.css,
  	sourse + '/' + path.js,
  	sourse + '/' + path.img,
    sourse + '/' + sprite.folder,

  	// =============

    {
      path: spriteFile,
      content: '',
    },

    {
      path: sourse + '/' + path.css + '/' + sass_file,
      content : '',
    },

    {
      path: sourse + '/' + path.js + '/' + generate.js_file,
      content: ''
    },

     {

      // - Пример настройки генерации index.html
      // -  path: - директория куда сгенерируется файл
      // -  content: - конетент в файле, можно оставить пустую строку, тогда файл будет пустым

      //  - \t - знак табуяции
      //  - \n - перенос строки

      path: sourse + '/index.html',
      content: 
      '<!DOCTYPE html>\n' +
      '<html>\n' +
        '\t<head>\n'+
          '\t\t<meta charset="utf-8">\n' +
          '\t\t<title>Заголовок</title>\n' +
          '\t\t<meta content="width=device-width, initial-scale=1" name="viewport">\n' +
          '\t\t<meta content="ie=edge" http-equiv="x-ua-compatible">\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/jquery.min.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/placeholders.min.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/moment-with-locales.min.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/dr.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/dtime.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/js.cookie.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/validation.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/order_me.js"></script>\n'+
          '\t\t<script type="text/javascript" src="http://st.acstnst.com/content/!common_files/js/sender.js"></script>\n'+
          '\t\t<script src="http://ctr-localhost.ru/vlad/jq.js"></script>\n'+
          '\t\t<script>\n'+
            '\t\t\t$(document).ready(function() {\n'+
              '\t\t\t\tmoment.locale("en");\n'+
              '\t\t\t\t$(".day-before").text(moment().subtract(1, "day").format("D.MM.YYYY"));\n'+
              '\t\t\t\t$(".day-after").text(moment().add(1, "day").format("D.MM.YYYY"));\n'+
            '\t\t\t});\n'+
          '\t\t</script>\n'+
          '\t\t<link rel="stylesheet" href="./' + css_folder + '/' + generate.css_file + '">\n'+
        '\t</head>\n' +
        '\t<body>\n'+
          '\t\t<script src="./' + path.js + '/' + generate.js_file + '" defer></script>\n'+
        '\t</body>\n' +
      '</html>'
    },


  ];



  return foldersArray;

}