global._browserSync = require('browser-sync').create(); // Плагин для запуска сервера


 // Создает сервер
 // params - объект с параметрами

module.exports = params => () => global._browserSync.init(params);