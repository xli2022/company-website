( function( $ ) {



	// Toggle mobile menu icon on click
	$('.navbar-toggler').click(function() {
	$('.hamburger-open').toggleClass('hidden');
	$('.hamburger-close').toggleClass('hidden');  
	if ($('.mobile-fb').hasClass('fb-hide')) {
		$('.mobile-fb').removeClass('fb-hide');
		$('.mobile-fb').hide();
	} else {
		$('.mobile-fb').delay(300).fadeIn(1);
		$('.mobile-fb').addClass('fb-hide');
	}
	  
	});



	
if ($('body').is('.home')) {
	// Heroes click toggle information
	const lightbox = GLightbox({
	  'selector': 'glightbox',
	 // 'skin': 'box-css',
	  'moreLength':  0,
	  onOpen: function(){
	  					window.scrollTo(0, $('.heroes').offset().top);
	  				},
	  onClose: function(){
	  					window.scrollTo(0, $('.heroes').offset().top);
	  				}
	});
};









} )( jQuery ); //end