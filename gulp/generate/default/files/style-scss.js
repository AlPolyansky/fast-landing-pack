module.exports = params => {

const 
		mobileFirst = params.mobileFirst,
		styleFolder = mobileFirst ? 'mobile' : 'desktop';


let content = 
	`
// libs
@import 'libs/orb/_orb.scss';


// core

@import 'core/_vars.scss';
@import 'core/_base.scss';

// Основные стили
@import 'libs/modules/_classes.scss';
@import 'styles/${styleFolder}/_modules.scss';
@import 'styles/${styleFolder}/_sections.scss';





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