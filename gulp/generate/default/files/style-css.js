module.exports = params => {

const 
		mobileFirst = params.mobileFirst,
        delFlag = mobileFirst ? 'mobile' : 'desktop',
        container = mobileFirst ? '320px' : '980px',
        mediaContainer = mobileFirst ? '980px' : '320px',
        mediaWidht =  mobileFirst ? 'min' : 'max',
        breakPoint = mobileFirst ? '992px' : '991px';
        desktopMinWidth = 
        `/*removeIf(noDesktop)*/
        body {
            min-width: 975px;
            /*removeIf(desktop)*/
            min-width: 100%;
            /*endRemoveIf(desktop)*/
    }
    /*endRemoveIf(noDesktop)*/`,
        desktopFlag = mobileFirst ? 'desktop' : 'mobile',
        mobileFlag = mobileFirst ? 'mobile' : 'desktop';


let content = 
	`*, *:after, *:before {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  word-wrap: break-word;
}

img, video {
  max-width: 100%;
  display: block;
}

figure {
  margin: 0;
  padding: 0;
}

svg {
  height: 100%;
  width: 100%;
  fill: currentColor;
}

body, html {
  height: 100%;
  font-size: 100%;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: "Roboto", sans-serif;
  color: #3e3e3e;
}



.wrapper {
  width: 100%;
  overflow: hidden;
  line-height: 1;
}

.container {
  width: 100%;
  display: block;
  max-width: ${container};
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

::-moz-selection {
  color: #fff;
  background: #8cbe25;
}

::selection {
  color: #fff;
  background: #8cbe25;
}

.t--light {
  font-weight: 300;
}

.t--bold {
  font-weight: 700;
}

.t--italic {
  font-style: italic;
}

.t--medium {
  font-weight: 500;
}

.t--ttu {
  text-transform: uppercase;
}

.t--ttl {
  text-transform: lowercase;
}

.t--imp {
  color: #8cbe25;
}

.t--ex {
  color: #e0a8ce;
}

.t--block {
  display: block;
}

.only-mobile {
  display: block;
}

.only-desktop {
  display: none;
}


/*Тут пишем ваши стили*/


/* removeIf(${mobileFlag}) */

/* removeIf(${desktopFlag}) */
@media only screen and (${mediaWidht}-width: ${breakPoint}) {
/* endRemoveIf(${desktopFlag}) */

  body, html {
    font-family: "Roboto", sans-serif;
  }


  ${desktopMinWidth}

  .container {
    max-width: ${mediaContainer};
  }
  .only-mobile {
    display: block;
  }
  .only-desktop {
    display: none;
  }

  /*Тут пишем ваши media стили*/

/* removeIf(${desktopFlag}) */
}
/* endRemoveIf(${desktopFlag}) */


/* endRemoveIf(${mobileFlag}) */
`;

	return content;
}