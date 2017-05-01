const base = new (require('./base/_base.js'));
const createFile = require('./create-file.js');
const async = require('async');

module.exports = function (template,content = {},replace = false){

  template = arguments[0];
  content = arguments[1];

  return function(cb){

    // Если шаблон - это строка, значит это путь, создаем файл или папку
    if(typeof(template) === 'string'){
      createFile(template,content,replace,cb());
    }
    // Если шаблон - это массив, то это шаблон, бежим по шаблонку
    else if(Array.isArray(template)){

      // Если второй аргумент раван replace, то это флаг для замены.
      // (content уже вшит в массив шаблона)
      if(content === 'replace'){
        replace = 'replace';
      }

      // Синхронно бежим по шаблону
      async.eachSeries(template,(item,callback) => {
          // Если элемент шаблона строка, то это путь к папке или пустому файлу
          if(typeof(item) === 'string'){
            createFile(item,'',replace,() => callback());
          // Если элемент шаблона объект, то это файл с содержимым
          }else if(typeof(item) === 'object'){
            createFile(item.path,item.content,replace,() => callback());
          }
      },function(err){
          if(err) throw err;
          cb();
      });
    };
  };
};