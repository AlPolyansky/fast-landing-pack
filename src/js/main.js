var Module = (function(){


$.fn.isOnScreen = function(){
  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top;
  bounds.bottom = bounds.top + this.outerHeight();
  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};


var toForm = function(form){
		var form = form || 'form'; 
		var a = $('.js_submit'),b = a.closest($(form));
		if($('form#toform').length) a = $('#toform .js_submit'),b = a.closest('form#toform');
		if(b.length && a.is(':visible')){
			$("html,body").animate({scrollTop: b.offset().top}, 1000);
		}
		return false;	
}

var originText = [];
var cutStr = function(){
	var review = $('.review');

	review.each(function(){
		var $this = $(this);
		var content = $this.find('.review__content');
		var par = content.find('.text');
		var text = par.text();
		var limit = 400;

		$this.attr('data-rew',review.index($this))

		originText.push({
			index: review.index($this),
			text: text
		})

		if($this.parent().hasClass('reviews__right')){
			limit = 1400;
			if(text.length > limit){
				par.text(text.substring(0,limit) + '...')
			}
		}else{
			if(text.length > limit){
				par.text(text.substring(0,limit) + '...')
			}
		}
	})	
};


var reviewPopUp = function(){
	var review = $('.review-on');

	review.on('click',function(e){
		var $this = $(this);
		e.stopPropagation()
		var reviewHtml = $this.html();
		var newPopUp = $(
			'<div class="review-popup">'
			+ '<div class="review-popup__inner"></div>'
			+'</div>')
		$('.wrapper').prepend(newPopUp);

		

		var input = $this.clone().removeClass('review-on').addClass('review-open');
		var close = input.find('.review__close').addClass('review__close-on');
		

		originText.forEach(function(elem){

			if(elem.index == $this.attr('data-rew')){
				input.find('.text').text(elem.text);
			}
		})

		newPopUp.find('.review-popup__inner').prepend(input);

		close.on('click',function(){
			newPopUp.remove();
		})

	})
}


var setUpListener = function(){
	$('.toform').on('click',function(e){
		e.preventDefault();
		toForm($('.scroll-form').last().closest('section'));
	});
	$('.toform-1').on('click',function(e){
		e.preventDefault();
		toForm($('.scroll-form').first().closest('section'));
	});
}
				
//removeIf(mobile)
var _bxInnit = function(){

	var breakPoint = 992;
	var init = {
		sliderActive : false,
	}


	//removeIf(mobile)
	var flag = false;


	var slider;


	var sliderClone = $('.bxslider').clone();


	// Объект с параметрами для слайдера
	var options = {
      adaptiveHeight: true,
      swipeThreshold: 40,
      controls: true,
      auto: false,
			pager: false,
      pause: 7000,
      autoHover: true,
      slideSelector: '.change',
      slideMargin: 20,
    }

  // Создаем слайдер
	function createSlider() {
	  slider = $('.bxslider').bxSlider(options);
    return true;
	}


	if(flag){
		createSlider();
		init.sliderActive = true;
	}
	

	
	// Загрузка страницы
	if (window.innerWidth >= breakPoint) {
	  createSlider();
	  init.sliderActive = true;
	}

	// Отслеживаем события при ресайзе
	//removeIf(desktop)
	$(window).resize(function () {

		// Если окно больше или равено breakPoint
		// Вырубаем слайдер и ставим ФЛАГ в false
		// Вставляем начальный вариант html разметки (без лишнего кода от слайдера)
	  if (window.innerWidth < breakPoint){
	   	if(init.sliderActive){
	   		slider.destroySlider();
	   		init.sliderActive = false;
	   		slider.replaceWith(sliderClone.clone());
	   	} 
	  }

	  // Если окно меньше breakPoint
		// Вырубаем слайдер и ставим ФЛАГ в true
	  if(window.innerWidth >= breakPoint){
	  	if(!init.sliderActive){
	  		createSlider();
	  		init.sliderActive = true;
	  	}
		}
	});
	//endRemovIf(desktop)
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

var showPopUp = function(){
	var active = 'popup--show';
	var button = $('.button-popup');
	var popup = $('.popup');

	button.on('click',function(){
		popup.toggleClass(active);
	});

	$('.close').on('click',function(){
		popup.removeClass(active);
	});
}

var arrowScroll = function(){
	$('.i-arrow').on('click',function(){
		var section = $(this).closest($('section'));
		$("html,body").animate({scrollTop: section.next().offset().top}, 1000);
	});
}
//endRemoveIf(mobile)

	return {
		init : function(){
			//removeIf(mobile)
			_bxInnit();
			arrowScroll();
			showPopUp();
			cutStr();
			reviewPopUp();
			//endRemoveIf(mobile)
			setUpListener();
			
		}
	}

})()

$(document).ready(function() {
	Module.init();
});

