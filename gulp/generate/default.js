let path = require('../../options-gulp.js').path;

// Все пути запимываются от корня !

module.exports = function (){
let dist = path.dist;

  
  let foldersArray = [

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
    }

  ];


  let cloneArray = [
    {
      root: './gulp/generate/files/default',
      output: './test'
    }

  ]


  return {
    foldersArray,
    cloneArray,
  };
}