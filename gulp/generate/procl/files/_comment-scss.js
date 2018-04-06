module.exports = params => {
const 
		mobileFirst = params.mobileFirst,
        mediaWidth = mobileFirst ? 'min' : 'max',
        mediaFix = mobileFirst ? '' : '- 1px';

	let content = 
`.comment{
	@extend %reset;
	.grid-M{
		margin-bottom: 10px;
	}
	.part-M{
		&:first-of-type{
			width: 64px;
		}
		&:last-of-type{
			padding-left: 20px;
			vertical-align: middle;
		}
	}
	.name{
		margin-right: 10px;
	}
}

@media only screen and (${mediaWidth}-width: $notebook ${mediaFix}){
	.comment{
		position: relative;
		padding-left: 80px;
		.part-M{
			&:first-of-type{
				position: absolute;
				top: 0;
				left: 0;
			}
			&:last-of-type{
				padding-left: 0;
			}
		}
	}

}`;

	return content;
}