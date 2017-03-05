module.exports = function (libs,obj){

  // Данный таск сервер

  // libs - объект с Node.js настройками
  // Объект с настройками browserSync


  return function(){
    libs.browserSync.init(obj);
  }
};