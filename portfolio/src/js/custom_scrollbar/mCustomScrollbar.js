(function($){
    $(window).on("load",function(){
    	if (document.body.clientWidth < 520) {
            console.log('scrollbar connected');
    	} else {
            console.log('scrollbar not connected');
	        $(".about__text").mCustomScrollbar({
	            axis:"yx",
	            theme:"dark"
	        });
    	}
    });
})(jQuery);