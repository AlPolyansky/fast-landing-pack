const base = new (require('../base/_base.js'));
const createFile = require('../base/create-file.js');
const async = require('async');



// Создает структуру файлов по шаблону из generate/

//  params            - объект с параметрами
//  params.template   - имя шаблона (string)
//  params.content    - контент (object)
//  params.replace    - заменять файл если он уже есть (bool)

module.exports = function (params){

  //template,content = {},replace = false

  
  params.template = params.template || 'blank';
  params.content = params.content || {};
  if(!params.replace) params.replace = false;

  return function(cb){

    // Если шаблон - это строка, значит это путь, создаем файл или папку
    if(typeof(params.template) === 'string'){
      createFile(params.template,params.content,params.replace,cb());
    }
    // Если шаблон - это массив, то это шаблон, бежим по шаблонку
    else if(Array.isArray(params.template)){

      // Если второй аргумент раван replace, то это флаг для замены.
      // (content уже вшит в массив шаблона)
      // if(content === 'replace'){
      //   replace = 'replace';
      // }

      // Синхронно бежим по шаблону
      async.eachSeries(params.template,(item,callback) => {
          // Если элемент шаблона строка, то это путь к папке или пустому файлу
          if(typeof(item) === 'string'){
            createFile(item,'',params.replace,() => callback());
          // Если элемент шаблона объект, то это файл с содержимым
          }else if(typeof(item) === 'object'){
            createFile(item.path,item.content,params.replace,() => callback());
          }
      },function(err){
          if(err) throw err;
          cb();
      });
    };
  };
};