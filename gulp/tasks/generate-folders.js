const base = new (require('../base/_base.js'));
const createFile = require('../base/create-file.js');
const path = require('path');
const async = require('async');



// Создает структуру файлов по шаблону из generate/

//  params            - объект с параметрами
//  params.template   - имя шаблона (string)
//  params.content    - контент (object)
//  params.replace    - заменять файл если он уже есть (bool)

module.exports = function (params) {


 //---- Инициализируем парметры
  const defaultParams = {
    template: './gulp/generate/blank.js',
    replace: false,
  }

  let finalParams = defaultParams;

 
  for (let key in params) {
        if (params.hasOwnProperty(key)) {
            if (params[key] !== undefined) {
                finalParams[key] = params[key];
            }
        }
  }
  
  const template = finalParams.template;
  const replace = finalParams.replace;



  //---- Инициализируем парметры

  
  let objPath = require(path.resolve(template))().foldersArray;
  let objClone = require(path.resolve(template))().cloneArray;


  return function generate(cb){


    async.series([

      // I. Первая функция - генерирует файлы

      callback_1 => {
          async.eachSeries(objPath,(item,callback) => {
          // Если элемент шаблона строка, то это путь к папке или пустому файлу
          if(typeof(item) === 'string'){
              createFile({
                path: item.path
              },() => callback());
            // Если элемент шаблона объект, то это файл с содержимым
          }else if(typeof(item) === 'object'){
            createFile({
                path: item.path,
                content: item.content || '',
                //FIX
                replace: replace
              },() => callback());
            }
        },function(err){
            if(err) throw err;
            return callback_1();
        });
      },

      // II. Вторая функция - копирует директорию

      callback_2 => {
        async.eachSeries(objClone,(item,callback) => {
          if(!Object.keys(item).length){
            return callback();
          }
          base.deepClone(
            path.resolve(item.root),
            path.resolve(item.output),
            callback
          );
        }, err => {
          if(err) throw err;
          return callback_2();
        })
      }


    ],
     // III. Возвращаем результат работы функции
    err => {
      if(err) throw err;
      return cb();
    })
  };
};