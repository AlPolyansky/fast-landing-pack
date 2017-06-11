// Инициализирует папку с тасками и возвращает объект
const fs = require('fs');
const tasksPath = require('../options-gulp.js').path.sourse.tasks;


let output = {};
fs.readdirSync(tasksPath).forEach(file => {
  
  output[file.replace('.js','')] = function(params,cb){
    return require(`../${tasksPath}/${file}`)(params,cb);
  };
})

module.exports = output;