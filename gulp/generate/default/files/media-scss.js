module.exports = params => {

	const 
		mobileFirst = params.mobileFirst,
		delFlag = mobileFirst ? 'mobile' : 'desktop',
        container = mobileFirst ? '980px' : '320px',
        imgPath = mobileFirst ? '../img/desktop' : '../img/mobile',
        removeMediaFlag = mobileFirst ? 'desktop' : 'mobile',
        styleFolder = mobileFirst ? 'desktop' : 'mobile',
        minWidth = mobileFirst ? 
        `/* removeIf(mobile) */
        min-width: 975px;
        /* endRemoveIf(mobile) */`
        :
        '',
        mediaWidth = mobileFirst ? 'min' : 'max',
        mediaFix = mobileFirst ? '' : '- 1px',
        onlyMobile = mobileFirst ? 'display: none' : 'display: block',
        onlyDesktop = mobileFirst ? 'display: block' : 'display: none';

	let content = 
`@import 'core/_vars.scss';




$container: ${container};
$gutter: 15px;



$imgPath : '${imgPath}';



/* removeIf(${removeMediaFlag}) */
@media only screen and (${mediaWidth}-width: $notebook ${mediaFix}){
/* endRemoveIf(${removeMediaFlag}) */

    @import 'libs/orb/_orb.scss';
    @import 'libs/modules/_classes--m.scss';

    body,html{
        font-family: $fontBase;
        ${minWidth}
    }





    .container{
        max-width: $container;
    }









@import 'styles/${styleFolder}/_m--modules.scss';
@import 'styles/${styleFolder}/_m--sections.scss';



    .only{
        &-mobile{
            ${onlyMobile};
        }
        &-desktop{
            ${onlyDesktop};
        }
    }




/* removeIf(${removeMediaFlag}) */
}
/* endRemoveIf(${removeMediaFlag}) */
`;

	return content;
}