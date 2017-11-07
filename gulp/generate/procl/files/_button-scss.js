module.exports = params => {


	let content = 
`
//=========== Общие настройки =============//
$button--font-size: 20px;												// Размер шрифта
$button--fw: 700;																// Плотность шрифта
$button--border-radius: 130px;									// Скругление углов
$button--color: #fff;														// Цвет текста
$button--bg: red;																// Основной цвет
$button--gradient: none;												// градиент
$button--padding: 14px 35px;										// padding
$button--shadow: none;													// Тень
$button--text-style:	uppercase;								// Начертание теста
$button--border:	none;													// Border
$button--text-shadow: none;											// Тень текста
$button--transition : all .3s;									// transition
//=========== Общие настройки =============//






.button{
	max-width: 100%;
	display: inline-block;
	font-size: $button--font-size;
	color: $button--color;
	background: $button--bg;
	@if($button--gradient != none){
		background: $button--gradient;
	}
	@if($button--border != none){
		border: $button--border;
	}
	border-radius: $button--border-radius;
	font-weight: $button--fw;
	@if($button--text-shadow != none){
		text-shadow: $button--text-shadow;
	}
	@if($button--transition != none){
		transition: $button--transition;
	}
	@if($button--shadow != none){
		box-shadow: $button--shadow;
	}
	clear: both;
	position: relative;
	text-transform: $button--text-style;
	&:hover{
		transform: scale(1.05);
	}
	&__text{
		width: 100%;
		display: block;
		text-align: center;
		text-decoration: none;
		padding: $button--padding;
		font-size: inherit;
		color: inherit;
		background: none;
		border: none;
		border-radius: inherit;
		font-weight: inherit;
		text-shadow: inherit;
		font-family: inherit;
		outline: none;
		position: relative;
		cursor: pointer;
		text-transform: inherit;
	}
}



@media only screen and (min-width: $notebook ){
	.button{
		font-size: 24px;
	}
}`;

	return content;
}