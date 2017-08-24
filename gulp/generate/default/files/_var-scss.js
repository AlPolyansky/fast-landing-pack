module.exports = params => {

	const 
		mobileFirst = params.mobileFirst,
        imgPath = params.path.sourse.img,
        container = mobileFirst ? '320px' : '980px';


	let content = 
`$desktop: 1200px;
$notebook: 992px;
$tablet: 768px;
$phone: 320px;


// container
$container : ${container};
$gutter: 20px;


// шрифт
$fontBase: 'Roboto', sans-serif;


// img
$imgPath : '../${imgPath}';


// Цвета

$colorBase:  #8cbe25;
$colorExtra: #e0a8ce;
$colorDark: #000;
$colorLight: #fff;
`;

	return content;
}