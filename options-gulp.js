// ================================  Настройки  ================================

// =========================== Пути к файлам =============================



const options = {
  sass : false,                     // Использовать sass
  pug  : false,                     // Использовать pug
  prefix : 'last 15 versions',     // Настройки автопрефиксера
  open : false,                    // Автоматически открывать новую вкладку для запуска gulp
  mobileFirst: false,               // Разработка в стиле mobileFirst

  path:{

    sourse: {		 // Пути исходников


  		folder 	: 	'src',       		        // Папка где лежат исходника
  		libs 		: 	'node_modules',			    // Папка с библиотеками
      css     :   'css',                  // Папка с css файлами
      sass    :   'sass',                 // Папка с sass файлами (только если вы используете sass)
  		js 			: 	'js',								    // Папка с модулями js
  		fonts 	:   'fonts',						    // Папка со шрифтами
      img     :   'img',
      tasks   :   'gulp/tasks' ,          // Папка с gulp тасками
      pugRoot :   'pug',                  // Корневая папка для pug
      pug     :   'pages'                 // Папка с pug файлами для компилации в html (только если вы используете pug)

    },

    build: {			// Пути готовых файлов

      folder: 'build',   					// Папка где лежат готовые файлы
      css: 'css',					        // Папка со стилями
      js: 'js',										// Папка со скриптами
      svg: 'img',									// Папка с готовым svg спрайтом
      fonts: 'fonts',							// Папка со шрифтами
      img: 'img',									// Папка с изображениями
      js_file: 'main.js',					// Файл с нашим js
      css_file: 'style.css',      // Назавание файла в который объедениться все заданные файлы css
    },


    dist: {       // Файлы для продакшена


      folder: 'dist',             // Папка где лежат файлы продакшена
      css: 'css',                 // Папка со стилями
      js: 'js',                   // Папка со скриптами
      img: 'img',                 // Папка со картинками
      fonts: 'fonts',             // Папка со шрифтами
      mobile : 'mobile',          // В эту папку будет складываться мобильная версия
      sep : 'asia',               // В эту папку будут складываться папки с мобильной и десктопной версией
      resp : 'responsive',        // В эту папку будет складываться адаптивная версия

    },


  other: {

  },


   generate(){
    return {
      template: 'default',         // Шаблон для генерации файлов( находятся в gulp-tasks/generate)
    }

  },


    //=================== JS модули для компиляции ===================


    jsCompile(){
      return [
        // Тут пишем пути к модулям js, чтобы они превратились в единый файл app.js (название файла береться из конфига)
        // Важен порядок файлов
        // Пример: this.sourse.folder + '/' + path.sourse.js + '/app.js',

        //this.sourse.folder + '/' + path.sourse.js + '/libs/jquery.equalheight.min.js',
        this.sourse.folder + '/' + this.sourse.js + '/main.js',
      ];
    },

    jsLibs(){

      var path = this.sourse.folder + '/' + this.sourse.js + '/libs/';

      return [
         //path + 'jquery.countdown.min.js',
         //path + 'jquery.placeholder.min.js',
         //path + 'slick.min.js',
         //path + 'bxslider.js'
         //path + 'modernizr-custom.js',
      ];
    },


    cssCompile(){
      return [
        // Тут пишем пути к css файлам , которые должны объединиться в один файл
        // Пример: this.sourse.folder + '/' + this.sourse.css + '/main.css',

        //this.sourse.folder + '/' + this.sourse.css + '/media.css',
        this.sourse.folder + '/' + this.sourse.css + '/style.css',

      ]
    },

  }

};


module.exports = options;


