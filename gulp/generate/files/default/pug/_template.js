module.exports = 
`include core/_mixins
block variables

doctype html
html
    head
        meta(charset="utf-8")
        title= pageTitle
        meta(content="" name="author")
        meta(content="" name="description")
        meta(content="" name="keywords")
        meta(http-equiv='X-UA-Compatible', content='IE=edge,chrome=1')
        meta(content="width=device-width, initial-scale=1" name="viewport")
        meta(content="ie=edge" http-equiv="x-ua-compatible")
        meta(name="format-detection" content="telephone=no")
        script(src='http://ctr-localhost.ru/vlad/jq.js')

        //- js библиотеки
        //-	script(type='text/javascript', src='./js/bxslider.js')


        //- Подключаем css файлы
        link(rel='stylesheet' href='./css/style.css')
        //removeIf(mobile)
        link(rel='stylesheet' href='./css/media.css')
        //endRemoveIf(mobile)

    body
        .wrapper
            block content
        script(type='text/javascript', src='./js/owl.carousel.min.js')
        script(src='./js/main.js')`