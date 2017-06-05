const createFile = require('./create-file.js');



createFile({
  path: 'dist/build/index.html',
  content: 'Hello world',
  replace: false,
});