


// ================================  Настройки  ================================
// =============================================================================
// =============================================================================


// =========================== Настройки генерации =============================



// =========================== Пути к файлам =============================



const options = {

  sass : true,                      // Использовать sass
  pug  : true,                      // Использовать pug
  prefix : 'last 15 versions',      // Настройки автопрефиксера
  open : false,                     // Автоматически открывать новую вкладку для запуска gulp



  path:{

    sourse: {		 // Пути исходников


  		folder 	: 	'src',       		        // Папка где лежат исходника
  		libs 		: 	'node_modules',			    // Папка с библиотеками
      css     :   'css',                  // Папка с css файлами
      sass    :   'sass',                 // Папка с sass файлами (только если вы используете sass)
  		js 			: 	'js',								    // Папка с модулями js
  		fonts 	:   'fonts',						    // Папка со шрифтами
  		img 		:   'img',						      // Папка с изображениями
      tasks   :   'gulp' ,                // Папка с gulp тасками
      pug     :   'pug/pages'             // Папка с pug файлами для компилации в html (только если вы используете pug)

    },

    build: {			// Пути готовых файлов

      folder: 'build',   					// Папка где лежат готовые файлы
      css: 'css',					        // Папка со стилями
      js: 'js',										// Папка со скриптами
      svg: 'img',									// Папка с готовым svg спрайтом
      fonts: 'fonts',							// Папка со шрифтами
      img: 'img',									// Папка с изображениями
      js_file: 'main.js',					// Файл с нашим js
      css_file: 'style.css',       // Назавание файла в который объедениться все заданные файлы css
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



   generate(){
    return {
      template: 'default',                   // Шаблон для генерации файлов( находятся в gulp-tasks/generate)
      css_file: 'main.css',                 // Файл css который сгенерируется (Если включен sass , файл будет находится в директории sass , с резрешение .scss)
      js_file: 'main.js',                   // Файл js который сгенерируется
    }

  },

  sprite(){     // Настройки png спрайтов

      let imgPath =  this.build.img;
      let cssPath =  this.build.css;




      return {
        folder          : 'sprites',                     // Папка для хранения png файлов для будущего спрайта
        imgName         : 'sprite',                     // Название готового файла с иконками 
        fileName        : 'sprite',                     // Название готового css/scss файла со стилями спрайта
        img             : imgPath + '/',                // Путь где будет лежать готовый png спрайт
        padding         : 20,                           // Расстояние между картинками в спрайте
        prefix          : 'i-',                         // Префикс классов для иконок 
        sassPath        : 'sprites',                       // В это папку сгенерируется scss файл со спрайтом (папка лежит в папке с sass файлами)      
      }
    },




    // структура dist сборки

    // --- dist
    // ----- responsive
    // ------- html,js css ....
    // ----- asia
    // ------ mobile
    // -------- html,js css ....
    // ------ html,js css ....



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

      // js библиотеки, которые буду скопированный в проект

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

        //this.sourse.folder + '/' + this.sourse.css + '/sprite.css',
        this.sourse.folder + '/' + this.sourse.css + '/style.css',

      ]
    },














  }

};


module.exports = options;


