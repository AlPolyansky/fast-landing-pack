module.exports = params => {

const 
		mobileFirst = params.mobileFirst,
        mediaWidth = mobileFirst ? 'min' : 'max',
        mediaFix = mobileFirst ? '' : '- 1px';


let content = 
	`
// libs
@import 'libs/orb/_orb.scss';


// core

@import 'core/_vars.scss';
@import 'core/_base.scss';

// Основные стили
@import 'styles/${mobileFirst ? 'mobile' : 'desktop'}/_modules.scss';
@import 'styles/${mobileFirst ? 'mobile' : 'desktop'}/_sections.scss';




.only{
    &-mobile{
        display: block;
    }
    &-desktop{
        display: none;
    }
}







@media only screen and (${mediaWidth}-width: $notebook ${mediaFix}){
    


    @import 'libs/orb/_orb.scss';

    body,html{
        font-family: $fontBase;
    }





    .container{
        max-width: $container;
    }









@import 'styles/${mobileFirst ? 'desktop' : 'mobile'}/_m--modules.scss';
@import 'styles/${mobileFirst ? 'desktop' : 'mobile'}/_m--sections.scss';


}

`;

	return content;
}