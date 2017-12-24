(function($){
    $(window).on("load",function(){
    	if (document.body.clientWidth < 520) {
    		console.log('Скрол не подключаем.');
    	} else {
    		console.log('Скрол подключен.');
	        $(".about__text").mCustomScrollbar({
	            axis:"yx",
	            theme:"dark"
	        });
    	}
    });
})(jQuery);