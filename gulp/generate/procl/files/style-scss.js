module.exports = params => {

const 
		mobileFirst = params.mobileFirst,
        mediaWidth = mobileFirst ? 'min' : 'max',
        mediaFix = mobileFirst ? '' : '- 1px';


let content = 
`
// Точка входа (корневой файл)

// libs (Кастомная библиотека)
@import 'libs/orb/_orb.scss';


// core
// Переменные
@import 'core/_vars.scss';
// Базовые стили
@import 'core/_base.scss';

// Подключаемые модули
@import 'modules/_classes.scss';
@import 'modules/_comment.scss';
@import 'modules/_button.scss';

// Основные стили 
@import 'styles/_${mobileFirst ? 'mobile' : 'desktop'}.scss';




.only{
    &-mobile{
        display: block;
    }
    &-desktop{
        display: none;
    }
}







@media only screen and (${mediaWidth}-width: $notebook ${mediaFix}){
    

    body,html{
        font-family: $fontBase;
    }





    .container{
        max-width: $container;
    }








// Основные стили для media
@import 'styles/_${mobileFirst ? 'desktop' : 'mobile'}.scss';

}

`;

	return content;
}