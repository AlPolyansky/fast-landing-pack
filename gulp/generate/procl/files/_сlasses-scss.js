module.exports = params => {
    mobileFirst = params.mobileFirst,
    mediaWidth = mobileFirst ? 'min' : 'max',
    mediaFix = mobileFirst ? '' : '- 1px';

	let content = 
`// Классы стилизации


// text style
.ttu,
.ttu-M{
    text-transform: uppercase;
}

.regular,
.regular-M{
    font-weight: 400;
}

.medium,
.medium-M{
    font-weight: 500;
}

.bold,
.bold-M{
    font-weight: 700;
}

.italic,
.italic-M{
    font-style: italic;
}


// text color
.color-base,
.color-base-M{
    color: $colorBase;
}

.color-ex,
.color-ex-M{
    color: $colorExtra;
}

// text font

.font-base,
.font-base-M{
    font-family: $fontBase;
}

.font-extra
,.font-extra-M{
    font-family: $fontExtra;
}


.only-desktop{
    display: none;
}

.only-mobile{
    display: block;
}

// display

.dis-i,
.dis-i-M{
    display: inline;
}

.dis-i-block,
.dis-i-block-M{
    display: inline-block;
}

.dis-block,
.dis-block-M{
    display: block;
}

.dis-table,
.dis-table-M{
    display: table;
}

.dis-table-cell,
.dis-table-cell-M{
    display: table-cell;
}

.dis-table-caption,
.dis-table-caption-M{
    display: table-caption;
}




// gutter


.gutter,
.gutter-M{
    margin-top: 20px;
    margin-bottom: 20px;
}


.gutter-top,
.gutter-top-M{
    margin-top: 20px;
}

.gutter-bottom,
.gutter-bottom-M{
    margin-bottom: 20px;
}

.gutter-right,
.gutter-right-M{
    margin-right: 20px;
}

.gutter-left,
.gutter-left-M{
    margin-left: 20px;
}


// reset

.reset,
.reset-M{
    margin: 0;
    padding: 0;
}

.reset-margin,
.reset-margin-M{
    margin: 0;
}

.reset-padding,
.reset-padding-M{
    padding: 0;
}



.reset-all{
    @extend %reset;
}


// center

.center,
.center-M{
    margin: 0 auto;
}

.center-t,
.center-t-M{
    text-align: center;
}


// float

.float-left,
.float-left-M{
    float: left;
    margin: 6px 10px 10px 0;
}

.float-right,
.float-right-M{
    float: right;
    margin: 6px 0 10px 10px;
}

.clear{
    @include clear();
}


// grid

.grid,
.grid-M{
    display: table;
    table-layout: fixed;
    width: 100%;
}

.part,
.part-M{
    display: table-cell;
    vertical-align: top;
}









@media only screen and (${mediaWidth}-width: $notebook ${mediaFix}){

    // text style

    .ttu-D{
        text-transform: uppercase;
    }

    .ttu-M{
        text-transform: none;
    }

    .regular-D{
        font-weight: 400;
    }

    .regular-M{
        font-weight: inherit;
    }

    .medium-D{
        font-weight: 500;
    }

    .medium-M{
        font-weight: inherit;
    }

    .bold-D{
        font-weight: 700;
    }

    .bold-M{
        font-weight: inherit;
    }


    .italic-D{
        font-style: italic;
    }

    .italic-M{
        font-style: normal;
    }


    // text color

    .color-base-D{
        color: $colorBase;
    }


    .color-base-M{
        color: inherit;
    }


    .color-ex-D{
        color: $colorExtra;
    }


    .color-ex-M{
        color: inherit;
    }

    // text font

    .font-base-D{
        font-family: $fontBase;
    }

    .font-base-M{
        font-family: inherit;
    }


    .font-ex-D{
        font-family: $fontExtra;
    }

    .font-ex-M{
        font-family: inherit;
    }


    // display
    .only-desktop{
        display: block;
    }

    .only-mobile{
        display: none;
    }


    .dis-i-D{
        display: inline;
    }

    .dis-i-M{
        display: inherit;
    }


    .dis-i-block-D{
        display: inline-block;
    }

    .dis-i-block-M{
        display: inherit;
    }


    .dis-block-D{
        display: block;
    }

    .dis-block-M{
        display: inherit;
    }


    .dis-table-D{
        display: table;
    }

    .dis-table-M{
        display: inherit;
    }

    .dis-table-cell-D{
        display: table-cell;
    }

    .dis-table-cell-M{
        display: inherit;
    }

    .dis-table-caption-D{
        display: table-caption;
    }

    .dis-table-caption-M{
        display: inherit;
    }


    // gutter

    .gutter-D{
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .gutter-M{
        margin-top: 0;
        margin-bottom: 0;
    }

    .gutter-top-D{
        margin-top: 20px;
    }

    .gutter-top-M{
        margin-top: 0;
    }

    .gutter-bottom-D{
        margin-bottom: 20px;
    }

    .gutter-bottom-M{
        margin-bottom: 0;
    }

    .gutter-right-D{
        margin-right: 20px;
    }

    .gutter-right-M{
        margin-right: 0;
    }

    .gutter-left-D{
        margin-left: 20px;
    }

    .gutter-left-M{
        margin-left: 0;
    }


    // center

    .center-D{
        margin: 0 auto;
    }

    .center-M{
        margin: 0;
    }

    .center-t-D{
        text-align: center;
    }

    .center-t-M{
        text-align: left;
    }


    // float

    .float-left-D{
        float: right;
        margin: 6px 10px 10px 0;
    }

    .float-left-M{
        float: none;
        margin-bottom: 0;
        margin-right: 0;
    }



    .float-right-D{
        float: right;
        margin: 6px 0 10px 10px;
    }

    .float-right-M{
        float: none;
        margin: 0;
    }

    // grid

.grid-D{
    display: table;
    table-layout: fixed;
    width: 100%;
}

.grid-M{
    display: inherit;
    table-layout: auto;
    width: auto;
}

.part-D{
    display: table-cell;
    vertical-align: top;
}

.part-M{
    display: inherit;
    vertical-align: baseline;
}





}
`;

	return content;
}