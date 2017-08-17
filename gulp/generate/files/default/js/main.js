function dtime_nums_custom(d) {
	var now = new Date();
	now.setDate(now.getDate() + d + 1);
  	
  	var dayNum = '';
  	if (now.getDate() < 10) {
      	dayNum = '0';
    }
  	dayNum += now.getDate();
  
  	var monthNum = '';
	if (now.getMonth() + 1 < 10) {
      	monthNum = '0';
    }
  	monthNum += now.getMonth() + 1;
  	
  	document.write(monthNum + "." + now.getFullYear());

}


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

			//removeIf(mobile)
			b = b.eq(1);
			//endRemoveIf(mobile)


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
_bxInnit('.bxslider',{
      adaptiveHeight: false,
      swipeThreshold: 40,
      controls: false,
      auto: false,
      pause: 7000,
      autoHover: true,
      slideSelector: '.reviews__item',
      slideMargin: 5,
   });
//endRemoveIf(desktop)







var _countDown = function(elem){

	var timerTime = 20000;
	var minutes = 15; 



	if(!elem){
		elem = $('.count-down');
	}else{
		elem;
	}


	var counter = elem;

	var value = counter.eq(1).text();

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

	if(num < 2){
		counter.text(1);
	}

  function Random(min, max) {
 			return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	var count = counter.text();
	var setTimer = setInterval(function(){

				if(num > 1){
					num = num - Random(0,1);
					counter.text(num);
				}
				$.cookie('counter', (num),{ expires: date });
				if(num < 2){
					clearInterval(setTimer);
					$.cookie('counter', (1),{ expires: date });
				}


			}, timerTime);
	}

toForm();
_countDown();


});