module.exports = params => {

let content = 
	`
// libs
@import 'libs/orb/_orb.scss';


// core

@import 'core/_vars.scss';
@import 'core/_base.scss';

// Основные стили
@import 'styles/mobile/_modules.scss';
@import 'styles/mobile/_sections.scss';




.only{
    &-mobile{
        display: block;
    }
    &-desktop{
        display: none;
    }
}`;

	return content;
}