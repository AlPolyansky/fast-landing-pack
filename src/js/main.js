$('document').ready(function(){
	
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


var toForm = function(){
	$('.toform').click(function(e) {

		e.preventDefault();
		var a = $('.js_submit'),b = a.closest('form');
		if($('form#toform').length) a = $('#toform .js_submit'),b = a.closest('form#toform');
		if(b.length && a.is(':visible')){

		$("html,body").animate({scrollTop: b.offset().top}, 1000);
				}
		return false;
	});
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


	var sliderClone = $(elem).clone();


	// Объект с параметрами для слайдера
	var options = opt;

  // Создаем слайдер
	function createSlider() {
	  slider = $(elem).bxSlider(options);
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
	   		slider.replaceWith(sliderClone.clone());
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
//endRemoveIf(desktop)


//removeIf(desktop)
_bxInnit('.s-doc__slider',{
      adaptiveHeight: false,
      swipeThreshold: 40,
      controls: false,
      auto: false,
      pause: 7000,
      autoHover: true,
      slideSelector: '.s-doc__item',
      slideMargin: 5,
   });

_bxInnit('.review__slider',{
      adaptiveHeight: false,
      swipeThreshold: 40,
      controls: false,
      auto: false,
      pause: 7000,
      autoHover: true,
      slideSelector: '.s-review__item',
      slideMargin: 5,
   });
//endRemoveIf(desktop)


toForm();


});