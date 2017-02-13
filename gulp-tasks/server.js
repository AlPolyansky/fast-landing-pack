module.exports = function (libs,path){

  // Данный таск сервер

  // libs - объект с Node.js настройками
  // path - строка с путем, откуда запускать сервер


  return function(){
    libs.browserSync.init({
      open: false,
      server: path,
      notify: false
    });
  }
};