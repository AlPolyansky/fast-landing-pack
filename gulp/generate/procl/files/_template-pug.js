module.exports = params => {

	const 
		mobileFirst = params.mobileFirst,
		delFlag = mobileFirst ? 'mobile' : 'desktop',
		jsPath = params.path.build.js + '/' + params.path.build.js_file;
		cssPath = params.path.build.css + '/' + params.path.build.css_file;;

	let content = 
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
        link(href='https://fonts.googleapis.com/css?family=Roboto:400,700', rel='stylesheet')
        link(rel='stylesheet' href='${cssPath}')
        script(src='http://ctr-localhost.ru/vlad/jq.js')

    body
        .wrapper
            block content`;

	return content;
}