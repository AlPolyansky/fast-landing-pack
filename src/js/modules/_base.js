// Этот файл содержит наиболие частые js функции



// Функция добавляет класс если скролл доходит до начала элемента и удаляет класс, если скролл выше элемента
// element  		=  jq елемент
// fixedClass 	=  добавляемый класс

var fixedElement = function(element,fixedClass){
	var $nav,$h=0;
    $(window).load(function () {
        $nav = element
        $h = $nav.offset().top;
        $(window).scroll(function(){
            if ( $(window).scrollTop() > $h) {
                $nav.addClass(fixedClass);
            }else{
                $nav.removeClass(fixedClass);
            }
        });
    });
}



// Стандартная функция для проличтывания к форме
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


// Аналог scroll to id
// element - jq елемент , у которого будут искать # в атрибуте href

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


// Функция для таймера (требует countDown)
// timer - jq элемент 
// Функция отсчитывает 15 минут и не сбрасывает значение при обновлении страницы

var _timer = function(timer){
	var _currentDate = new Date();
	var count = 15;
	var _toDate = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), _currentDate.getDate(), _currentDate.getHours(), _currentDate.getMinutes() + count, 1);

	timer.countdown(_toDate, function(event) {
		

	      var $this = $(this).html(event.strftime(''
			+ '<div class="timer__item-wrap">'																				
			+ 	'<div class="timer__item">'
			+   	'<div class="timer__number-cover">'
			+ 			'<span class="timer__number-top"></span>'
			+ 			'<span class="timer__number-bottom"></span>'
			+ 		'</div>'
			+   	'<div class="timer__number-cover">'
			+ 			'<span class="timer__number-top"></span>'
			+ 			'<span class="timer__number-bottom"></span>'
			+ 		'</div>'
			+ 		'<span class="timer__number">%H</span>'
			+ 	'</div>'
			+	'</div>'
			+ '<div class="timer__item-wrap">'																				
			+ 	'<div class="timer__item">'
			+   	'<div class="timer__number-cover">'
			+ 			'<span class="timer__number-top"></span>'
			+ 			'<span class="timer__number-bottom"></span>'
			+ 		'</div>'
			+   	'<div class="timer__number-cover">'
			+ 			'<span class="timer__number-top"></span>'
			+ 			'<span class="timer__number-bottom"></span>'
			+ 		'</div>'
			+ 		'<span class="timer__number">%M</span>'
			+ 	'</div>'
			+	'</div>'
			+ '<div class="timer__item-wrap">'																				
			+ 	'<div class="timer__item">'
			+   	'<div class="timer__number-cover">'
			+ 			'<span class="timer__number-top"></span>'
			+ 			'<span class="timer__number-bottom"></span>'
			+ 		'</div>'
			+   	'<div class="timer__number-cover">'
			+ 			'<span class="timer__number-top"></span>'
			+ 			'<span class="timer__number-bottom"></span>'
			+ 		'</div>'
			+ 		'<span class="timer__number">%S</span>'
			+ 	'</div>'
			+	'</div>'
			));
		
		
		
	  });
}



// Хак для отключения, включения slick слайдера при ресайзе

$(window).resize(function() {
  slider.slick('resize');
});

$(window).on('orientationchange', function() {
	 slider.slick('resize');
});


// Подключение jq placeholder

$('input, textarea').placeholder();


// Пример Инициализации видео 
var _videoInit = function(){
	var play = $('.play');
	var videoWrap = $('.s-video__video');
	var video = document.getElementById("main_video");
	var poster = $('.s-video__poster');


	play.on('click',function(){
		video.play();
		play.addClass('play--hide');
		poster.addClass('s-video__poster--hide');
		videoWrap.addClass('s-video__video--after');
	})

	video.addEventListener('ended',function(){
    play.removeClass('play--hide');
    videoWrap.removeClass('s-video__video--after');
    poster.removeClass('s-video__poster--hide');
  }, false);
}


// Метод расширяет jq, проверяет виден ли элемент в области экрана
// Возвращает true или false
$.fn.isOnScreen = function(){
  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top;
  bounds.bottom = bounds.top + this.outerHeight();
  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};


// Выполняем что-то при скроле только один раз

$(window).scroll(function(){
 
 	
 	var flag = true;
 		// ести верхушка скролла больше чего то 
    if($(this).scrollTop() > 150 ) {
    	if(flag){
    		// если flag = true
    		// делаем что-то и ставим flag = false
    		flag = false;
    	}
    } else {
    	flag = true;
    	// если flag = false
    	// делаем что-то и ставим flag = true
      
    }
});



// Пример слайдера(нужна функция isOnScreen)


	var _recallSlider = function(){
		var slider = $('.slider');
		slider.slick({
			mobileFirst: true,
			dots: true,
			arrows: false,
			adaptiveHeight: true,
			//autoplay: true,
			autoplaySpeed: 5000,
			appendDots: $('.slider__dots'),
			//removeIf(mobile)
				responsive: [
		    {
		      breakpoint: 991,
		      settings: 'unslick'
		    },
		 	]
		 	//endRemoveIf(mobile)
		})

		//removeIf(mobile)
		$(window).resize(function() {
		  slider.slick('resize');
		});

		$(window).on('orientationchange', function() {
			 slider.slick('resize');
		});

		//endRemoveIf(mobile)
		

		$(document).on('scroll',function(){
			var a = 0;
			var b = 1;
			slider.slick('slickPause');

			if(slider.isOnScreen()){
				a = 1;
			}else{
				a = 0;
			}


			if(a == b){
					slider.slick('slickPlay');
			}
		})


}