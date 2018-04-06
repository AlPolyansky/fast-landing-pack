
 var random = function(min, max) {
 	return Math.floor(Math.random() * (max - min + 1)) + min;
}



$.fn.isOnScreen = function(shift){
		if(!shift){
			shift = 0;
		}
	  var viewport = {};
	  viewport.top = $(window).scrollTop();
	  viewport.bottom = viewport.top + $(window).height();
	  var bounds = {};
	  bounds.top = this.offset().top + shift;
	  bounds.bottom = bounds.top + this.outerHeight() - shift;
	  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};





var _countDown = function(elem){

	var timerTime = 5000;
	var minutes = 15; 


	var counter = $('.counter__num');

	var value = counter.text();

	var date = new Date();
 	date.setTime(date.getTime() + (minutes * 60 * 1000));


	if($.cookie('counter') == undefined){
		$.cookie('counter', (value),{ expires: date });
	}

	num = $.cookie('counter');

	if($.cookie('counter') == null){
		num = value;
	}

	counter.text(num);

	if(num < 8){
		counter.text(7);
	}


	var count = counter.text();
	var setTimer = setInterval(function(){

				if(num > 7){
					var rand = random(0,1);
					num = num - rand;
					counter.text(num);
					
				}
				$.cookie('counter', (num),{ expires: date });
				if(num < 8){
					clearInterval(setTimer);
					$.cookie('counter', (7),{ expires: date });
				}


			}, timerTime);
	}







//removeIf(desktop)
var _bxInnit = function(elem,opt){

	var breakPoint = 992;
	var init = {
		sliderActive : false,
	}


	//removeIf(mobile)
	var flag = false;
	//flag = false;
	//endRemoveIf(mobile)

	var slider;


	var sliderClone = $(elem).clone(true);


	// Объект с параметрами для слайдера
	var options = opt;

  // Создаем слайдер
	function createSlider() {
	  slider = $(elem).bxSlider(options);
	  CustomDots(slider.getSlideCount(),slider.getCurrentSlide(),slider);
    return true;
	}

	//removeIf(noMobile)
	//removeIf(mobile)
	if(flag){
	//endRemoveIf(mobile)
		createSlider();
		init.sliderActive = true;
	//removeIf(mobile)
	}
	//endRemoveIf(mobile)
	//endRemoveIf(noMobile)
	

	
	// Загрузка страницы
	//removeIf(mobile)
	if (window.innerWidth < breakPoint) {
	  createSlider();
	  init.sliderActive = true;
	}
	//endRemoveIf(mobile)

	//removeIf(mobile)

	// Отслеживаем события при ресайзе
	
	$(window).resize(function () {

		// Если окно больше или равено breakPoint
		// Вырубаем слайдер и ставим ФЛАГ в false
		// Вставляем начальный вариант html разметки (без лишнего кода от слайдера)
	  if (window.innerWidth >= breakPoint){
	   	if(init.sliderActive){
	   		slider.destroySlider();
	   		init.sliderActive = false;
	   		slider.replaceWith(sliderClone.clone(true));

	   	} 
	  }

	  // Если окно меньше breakPoint
		// Вырубаем слайдер и ставим ФЛАГ в true
	  if(window.innerWidth < breakPoint){
	  	if(!init.sliderActive){
	  		createSlider();

	  		init.sliderActive = true;
	  	}
		}
	});
	//endRemoveIf(mobile)

	var a,b;
	a = 1;
	b = 0;

	$(window).on('scroll',function(){
		if(init.sliderActive == true){
			if(slider.isOnScreen()){
				b = 1;
			}else{
				b = 0;
			}

			if(a == b){
					slider.startAuto();
			}
			else{
				slider.stopAuto();
			}
		}
		
	});
}


function CustomDots(numSlides,currentSlide,slider){
	var dotsParent = $('.review__dotts');

	var output = '';
	var activeClass = 'active';

	for(var i = 0; i < numSlides; i++){

		activeClass = i == 0 ? activeClass : '';

		output += '<li class="review__dotts-item"><a class="review__dotts-link ' + activeClass + '" data-slide-index="'+ i +'"></a></li>';
		dotsParent.html(output);
	}

	$('.review__dotts-item').each(function(){
		var $this = $(this);

		$this.index() === 0 ? $this.addClass('active') : null;
	})

	$('.review__dotts-item').on('click',function(){
		slider.goToSlide($(this).find('.review__dotts-link').attr('data-slide-index'));
	})
}





 

//endRemoveIf(desktop)


var sectionScroll = function(element){
	element.on('click',function(e){
		e.preventDefault();
		var $this = $(this);
		var attr = $this.attr('href').replace('#','');
		var section = $('#'+ attr +'');
		
		$("html,body").animate(
			{
				scrollTop: section.offset().top
			}, 1000)
	})
}


var toForm = function(){
	$('.toform').click(function(e) {
		e.preventDefault();
		var a = $('.js_submit'),b = a.closest('form');
		if($('form#toform').length) a = $('#toform .js_submit'),b = a.closest('form#toform');
		if(b.length && a.is(':visible')){
		$("html,body").animate({scrollTop: b.offset().top}, 1000);}
		return false;
	});
}



	var _videoInit = function(){
		var play = $('.play');
		var videoWrap = $('.tv');
		var video = document.getElementById("main_video");


		play.on('click',function(){
			video.play();
			videoWrap.addClass('tv--on');
		})

		video.addEventListener('ended',function(){
	    videoWrap.removeClass('tv--on');
	  }, false);
	}


$(function(){
	toForm();
	_countDown();
	_videoInit();
	sectionScroll($('.menu__part a'));
	//removeIf(desktop)
	$(window).on('load',function(){
		_bxInnit('.bxslider',{
		  adaptiveHeight: false,
		  swipeThreshold: 40,
		  controls: false,
		  pager: false,
		  auto: false,
		  pause: 7000,
		  autoHover: true,
		  slideSelector: '.reviews__item',
		  slideMargin: 5,
		  onSlideAfter: function($slideElement, oldIndex, newIndex){
		  	var parentsDots = $('.reviews__item');
		  	var dotsItem = parentsDots.find('.review__dotts-item');
		  	dotsItem.each(function(){
		  		var $this = $(this);
		  		if($this.index() == newIndex){
		  			$this.addClass('active').siblings().removeClass('active');
		  		}
		  	});
    	},
		});
	});
	//endRemoveIf(desktop)

});