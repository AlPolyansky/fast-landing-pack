module.exports = params => {


	let content = 
`section.s-comments
	h4.title.gutter-bottom Комментарии
	ul.comments
		li.comment
			.grid-M
				.part-M
					img(src="img/users/user.png", alt="")
				.part-M
					.comment__head
						.name.dis-i-block Thomas L. Glaser
						.date.dis-i-block
							script(type='text/javascript').
								dtime_nums(-8, true)
			.comment__part
				p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit necessitatibus aperiam, laudantium quo, cum, vero illo aliquam iusto, dicta eum quia placeat ipsam repellendus sit labore eligendi! Ab, aperiam, eligendi.
		li.comment
			.grid-M
				.part-M
					img(src="img/users/user.png", alt="")
				.part-M
					.comment__head
						.name.dis-i-block Thomas L. Glaser
						.date.dis-i-block
							script(type='text/javascript').
								dtime_nums(-7, true)
			.comment__part
				p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit necessitatibus aperiam, laudantium quo, cum, vero illo aliquam iusto, dicta eum quia placeat ipsam repellendus sit labore eligendi! Ab, aperiam, eligendi.
				
	//- Кнопка			
	.center-t.gutter
		.button
			a(href="").button__text Заказать
`;

	return content;
}