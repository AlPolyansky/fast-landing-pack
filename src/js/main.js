var Module = (function(){
	var _plugins = function(){
		
	};

	
	// Переменные

	var setUpListener = function(){
		
	};


	//======= toform start =======

	$('.toform').click(function(e) {
		e.preventDefault();
		var a = $('.js_submit'),b = a.closest('form');
		if($('form#toform').length) a = $('#toform .js_submit'),b = a.closest('form#toform');
		if(b.length && a.is(':visible')){
		$("html,body").animate({scrollTop: b.offset().top}, 1000);
				}
		return false;
	});

	//======= toform end =======


	//====== scroll to section ========


	$('.nav__link').on('click',function(e){
			e.preventDefault();
			var $this = $(this);
			var attr = $this.attr('href').replace('#','');
			var section = $('#'+ attr +'');
			
			$("html,body").animate(
				{
					scrollTop: section.offset().top
				}, 1000)

	})




//======= recall slider start =======

	var slider = $('.slider');

	slider.slick({
		mobileFirst: true,
		dots: true,
		arrows: false,
		adaptiveHeight: true,
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



//======= recall slider end =======


//===========  Timer  ===========



var _timer = function(){
	var _currentDate = new Date();
	var count = 15; // 8 hours
	var _toDate = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), _currentDate.getDate(), _currentDate.getHours(), _currentDate.getMinutes() + count, 1);

	$('.timer').countdown(_toDate, function(event) {
		

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







//===========  Timer End ===========






	return {
		init : function(){
			setUpListener();
			_plugins();
			_timer();
		}
	};

})();


$(document).ready(function(){
	Module.init();
});
