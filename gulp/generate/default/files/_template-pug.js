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
        
        link(rel='stylesheet' href='${cssPath}')
        //removeIf(${delFlag})
        link(rel='stylesheet' href='css/media.css')
        //endRemoveIf(${delFlag})
        script(src='http://ctr-localhost.ru/vlad/jq.js')
        script(src='${jsPath}')

    body
        .wrapper
            block content`;

	return content;
}