const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const glob = require('glob');
const createFile = require('./create-file.js');
const base = new (require('./_base.js'));
const del = require('del');




// Модуль ищет фотографии с одинаковым именем и удяляем лишнее
module.exports = function (params,cb){
    glob(params.index + '**/*.html', (err,files) =>{
        files.forEach(item => {
            let totalPath = path.resolve(item);
            let html = fs.readFileSync(totalPath,'utf-8');
            let $ = cheerio.load(html,{ decodeEntities: false ,normalizeWhitespace: false});

            $('img').each( (index,elem) => {
                $this = $(elem);
                let src = $this.attr('src');
                let filePath = path.resolve(params.index,src);

               if(!fs.existsSync(filePath)){
                    $this.remove();
               }
            })

            createFile({
                path: totalPath,
                content: $.html(),
                replace: true
            });
        })
    })
	return cb();
}