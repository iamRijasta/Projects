jQuery(document).ready(function($) {
	if( jQuery( document ).scrollTop() > 200){
		jQuery( '.site-header' ).addClass( 'fixed' ).animate('top','-40px');			
	}
	// Add opacity class to site header

	jQuery( document ).on('scroll', function(){
		if ( jQuery( document ).scrollTop() > 200 ){
			jQuery( '.site-header' ).addClass( 'fixed' ).animate('top','0px'); 			
		} else {
			jQuery( '.site-header' ).removeClass( 'fixed' );			
		}
	});



  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });


});
