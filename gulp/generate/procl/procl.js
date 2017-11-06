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
    style = params.sass ? src.sass : src.css;

  let
    template = {path: ''},
    pagesPug = {path: ''},
    sectionsPug = {path: ''},
    mixinsPug = {path: ''},
    styleFile = {path: ''},
    mediaFile = {path: ''},
    baseFile = {path : ''},
    varsFile = {path : ''},
    modulesScss = {path : ''},
    classesScssFile = {path : ''};
    mediaModulesScss = {path : ''},
    cssFile = {path : ''};



  // Объекты клонирования

  let scssLibs = {};
  let jsLibs = {};

    if(params.pug){
      const pugTemplate = require('./files/_template-pug.js')(params);
      const pugIndex = require('./files/index-pug.js')();
      const pugMixins = require('./files/_mixins-pug.js')();


      template = {path: `./${src.folder}/${src.pugRoot}/_template.pug`,content: pugTemplate};
      pagesPug = {path: `./${src.folder}/${src.pugRoot}/${src.pug}/index.pug`, content: pugIndex};
      mixinsPug = {path: `./${src.folder}/${src.pugRoot}/core/_mixins.pug`, content: pugMixins};
      sectionsPug = [
        {
          path: `./${src.folder}/${src.pugRoot}/sections/_header.pug`,
          content: 
`header.header
  .container
    p Шапка проклы
`
        },
        {
          path: `./${src.folder}/${src.pugRoot}/sections/_content.pug`,
          content: 
`h1.title Заголовок`
        },
        
        {path: `./${src.folder}/${src.pugRoot}/sections/_sidebar-left.pug`},
        {
          path: `./${src.folder}/${src.pugRoot}/sections/_sidebar-right.pug`,
          content: 
`aside.sidebar
  p Сайдбар`
        },
        {
          path: `./${src.folder}/${src.pugRoot}/sections/_comments.pug`,
          content: 
`section.s-comments
  h4.title Комментарии
  ul.comments
    li.comment
      p 1
    li.comment
      p 2
    li.comment
      p 3
    li.comment
      p 4
    li.comment
      p 5
    li.comment
      p 6
`
        },
        {
          path: `./${src.folder}/${src.pugRoot}/sections/_footer.pug`,
          content : 
`footer.footer
  .container
    .copy Copyright, #[span.ryear]`
          }
      ];
    }else{
      const htmlFile = require('./files/index-html.js')(params);
      template = {path: `./${src.folder}/index.html`,content: htmlFile};
    }


    if(params.sass){
      const scssContent = require('./files/style-scss.js')(params);
      const baseContent = require('./files/_base-scss.js')(params);
      const varsContent = require('./files/_var-scss.js')(params);
      const classesContent = require('./files/_сlasses-scss.js')(params);

      styleFile = {path: `./${src.folder}/${src.sass}/style.scss`,content: scssContent};
      baseFile = {path: `./${src.folder}/${src.sass}/core/_base.scss`,content: baseContent};
      varsFile = {path: `./${src.folder}/${src.sass}/core/_vars.scss`,content: varsContent};
      classesFile = {path: `./${src.folder}/${src.sass}/modules/_classes.scss`,content: classesContent};

      
      let folderTypeMobile = params.mobileFirst ? 'mobile' : 'desktop';
      let folderTypeDesktop = params.mobileFirst ? 'desktop' : 'mobile';

      modulesScss = {
        path: `./${src.folder}/${src.sass}/styles/_${folderTypeMobile}.scss`,
        content:
`%grid{
  display: table;
  table-layout: fixed;
  width: 100%;
}

%part{
  display: table-cell;
  vertical-align: top;
  &:first-of-type{
  
  }
  &:last-of-type{
    
  }
}

@mixin grid(){
  @extend %grid;
}

@mixin part(){
  @extend %part;
}

p{
  margin-top: 0;
  margin-bottom: 20px;
}

a{
  color: $colorBase;
  font-weight: 700;
  &:hover{
    text-decoration: none;
  }

}

.title{
  @extend %reset;
  font-weight: 700;
  font-size: 22px;
}


.comments{
  @extend %reset;
  text-align: left;
  .comment{
    margin-bottom: 10px;
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  .comment{
    display: none;
  }

  .comment:nth-last-of-type(-n + 5) {
    display: block;
  }
}

.comment{
  @extend %reset;
}

// Сетка
.main__part--last{
  display: none;
}
`
      };
      mediaModulesScss = {
        path: `./${src.folder}/${src.sass}/styles/_${folderTypeDesktop}.scss`, 
        content: 
`%grid-m{
  display: table;
  table-layout: fixed;
  width: 100%;
}

%part-m{
  display: table-cell;
  vertical-align: top;
  &:first-of-type{
  
  }
  &:last-of-type{
    
  }
}

@mixin grid(){
  @extend %grid-m;
}

@mixin part(){
  @extend %part-m;
}

.comments{
  .comment{
    display: block;
  }
}

.title{
  font-size: 26px;
}

// Сетка
.main__grid{
  @include grid();
}

.main__part{
  @include part();
  &--first{
    padding-right: 10px;
  }
  &--last{
    width: 300px;
  }
}
`
      };

      // Клонировние

      scssLibs = {
        root: './gulp/generate/default/libs/scss',
        output: `./${src.folder}/${src.sass}/libs/`
      }
    }else{
      const cssContent = require('./files/style-css.js')(params);
      cssFile = {path: `./${src.folder}/${src.css}/style.css`, content: cssContent};
    }

    jsLibs = {
      root: './gulp/generate/default/libs/js',
      output: `./${src.folder}/${src.js}/`
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
    // - css
    {path: `./${src.folder}/${style}`},
    // - js
    {path: `./${src.folder}/${src.js}`},
    // - fonts
    {path: `./${src.folder}/${src.fonts}`},
    // - html (pug)
    {path: `./makets`},
    template,
    pagesPug,
    mixinsPug,
    ...sectionsPug,

    // - scss
    styleFile,
    mediaFile,
    baseFile,
    varsFile,
    classesFile,
    modulesScss,
    mediaModulesScss,
    // - css
    cssFile,
    // - js
    {path: `./${src.folder}/${src.js}/${build.js_file}`},


  ];


  // Массив с файлами, которые будут клонированы
  // объект - директория (клонируется вся директория с поддиректориями)
  const cloneArray = [
    scssLibs,
    jsLibs
  ]




  return {
    foldersArray,
    cloneArray,
  };
}