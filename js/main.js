/*---------------------------------------------- 
				Sliding skill graph
------------------------------------------------*/
	function init_skills() {
	$('.block_levels .progress div').each(function() {
		var w = $(this).attr('data-level');
		$(this).animate({width : w + '%'}, 500);
	});
}
$(window).load(function() {
	init_skills();
});

function animate_navigation(){
    step++;
    var l = parseInt($('.navigation-button span').css('left'));
    if((dir_n>0 && l>-2160 || dir_n<0 && l<0) && step<100){
        $('.navigation-button span').stop().css({
            left: l - dir_n
        },100);
        setTimeout(function(){
            animate_navigation()
        }, 20);
    }
}

$(function(){
    $('.static-navigation-widget .arrow-right, .static-navigation-widget .arrow-right-empty').css('right','-100px');
    $('.static-navigation-widget .arrow-left, .static-navigation-widget .arrow-left-empty').css('left','-100px');
    //Arrow animation
    $('.navigation-text-left, .navigation-text-right').hide();
		
    $('.arrow-left').hover(function(){
        step=1;
        dir_l = 60;
        animate_arrow();
        $('.navigation-text-left').stop().animate({
            'margin-left':60,
            opacity:1
        },200).show();
    },
    function(){
        step=1;
        dir_l = -60;
        animate_arrow();
        $('.navigation-text-left').stop().animate({
            'margin-left':5,
            opacity:0
        },200);
    });

    $('.arrow-right').hover(function(){
        step=1;
        dir_r = 60;
        animate_arrow_right();
        $('.navigation-text-right').stop().animate({
            'margin-right':60,
            opacity:1
        },200).show();
    },
    function(){
        step=1;
        dir_r = -60;
        animate_arrow_right();
        $('.navigation-text-right').stop().animate({
            'margin-right':5,
            opacity:0
        },200);
    });

    //Navigation button animation
    $('.navigation-button').hover(function(){
        step=1;
        dir_n = 60;
        animate_navigation();
    },
    function(){
        step=1;
        dir_n = -60;
        animate_navigation();
    });

    //Portfolio element animation
    $('.portfolio-element a').hover(function(){
        $(this).parent().next('.portfolio-title').children('h5').stop().animate({
            'margin-top':-20,
            'padding-bottom':20
        },200);
        $(this).children('.portfolio-image').stop().animate({
            'left':-36
        },300).end().children('.portfolio-image-hover').stop().animate({
            opacity:1,
            'left':-36
        },300);
    },function(){
        var t = $(this);
        $(this).parent().next('.portfolio-title').children('h5').stop().animate({
            'margin-top':0,
            'padding-bottom':0
        },200);
        $(this).children('.portfolio-image').stop().animate({
            'left':-56
        },300).end().children('.portfolio-image-hover').stop().animate({
            opacity:0,
            'left':-56
        },300);
    });

    //Menu animation
    jQuery.each($('#top-menu li'), function(){
        $(this).children('a').append('<span>'+$(this).children('a').text()+'</span>');
    });
    $('#top-menu li a').hover(function(){
        $(this).stop().animate({
            'margin-top':-25,
            'padding-bottom':25
        },200);
    },function(){
        $(this).stop().animate({
            'margin-top':0,
            'padding-bottom':0
        },200);
    });
	
	jQuery.each($('nav li'), function(){
        $(this).children('a').append('<span>'+$(this).children('a').text()+'</span>');
    });
    $('nav li a').hover(function(){
        $(this).stop().animate({
            'margin-top':-25,
            'padding-bottom':25
        },200);
    },function(){
        $(this).stop().animate({
            'margin-top':0,
            'padding-bottom':0
        },200);
    });


    //Contact button animation
    $('#button-contact-bottom').hover(function(){
        $('#button-contact-top').stop().fadeOut(200)
    },
    function(){
        $('#button-contact-top').fadeIn(200)
    });

  
    //Scroll to top animation
    $('.scroll-top').click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    })

    //If there is no transitions, add rotate animation
    //    if(!Modernizr.csstransitions) { // Test if CSS transitions are supported
    $(function() {
        $('.portfolio-mask').hover(function(){
            $(this).stop().animate({
                cssrotate: 30
            }, {
                step: function(now,fx) {
                    $(this).cssrotate(now);
                }
            },250);
        }, function(){
            $(this).stop().animate({
                cssrotate: 0
            }, {
                step: function(now,fx) {
                    $(this).cssrotate(now);
                }
            },250);
        });
    });
    //}

		scroll_actions();
		
    //If browser doesn't support nth-child, add this with js
    if(!Modernizr.nthchild){
        $('.shop-featured-product-container:nth-child(4n+1),#portfolio-list div:first-child, #portfolio-list div:nth-child(4n+1),.button-shop-container:nth-child(2n+1)').css('margin-left',0);

    }
    if(!Modernizr.input.placeholder){
        $('input[placeholder], textarea[placeholder]').placeholder();
    }
});

$(window).bind("scroll", function () {
	scroll_actions();
});

function scroll_actions(){
  $(window).scrollTop() >= 150 && !$('#menu-hidden').hasClass("show") ? $('#menu-hidden').addClass("show") : $(window).scrollTop() <= 150 && $('#menu-hidden').hasClass("show") && $('#menu-hidden').removeClass("show");
  if($('.static-navigation-widget').position()!=undefined){
		var top = $(document).scrollTop();
		var top2 = $('.navigation-widget-bottom').position().top - $(window).height() +12;
		if(!$('.navigation-widget').first().isOnScreen() && top2>=top){
			$('.static-navigation-widget').addClass('visible').show();
			$('.static-navigation-widget .arrow-right,.static-navigation-widget .arrow-right-empty').stop().animate({
					'right':'20px'
			},300);
			$('.static-navigation-widget .arrow-left,.static-navigation-widget .arrow-left-empty').stop().animate({
					'left':'20px'
			},300);	
		}else if($('.static-navigation-widget').hasClass('visible')){
			$('.static-navigation-widget .arrow-right,.static-navigation-widget .arrow-right-empty').stop().animate({
					'right':'-100px'
			},300,function() {
					$('.static-navigation-widget').removeClass('visible').hide();
			});
			$('.static-navigation-widget .arrow-left,.static-navigation-widget .arrow-left-empty').stop().animate({
					'left':'-100px'
			},300); 	
		}
	}
}

$.fn.isOnScreen = function(){
    
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    
};


/*---------------------------------------------- 
				prettyPhoto Plugin Settings 
------------------------------------------------*/	
		function prettyPhoto(){

			
			jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
				animation_speed: 'fast', // fast/slow/normal 
				opacity: 0.70, // Value between 0 and 1 
				show_title: true, // true/false 
				allow_resize: true, // Resize the photos bigger than viewport. true/false 
				default_width: 500,
				default_height: 344,
				theme: 'pp_default', // light_rounded / dark_rounded / light_square / dark_square / facebook 
				overlay_gallery: false, // If set to true, a gallery will overlay the fullscreen image on mouse over 
				deeplinking: false, // Allow prettyPhoto to update the url to enable deeplinking. 
				social_tools: false
			})
			return false;
		}
		
		prettyPhoto();
		
	
/*---------------------------------------------- 
				Scroll 
------------------------------------------------*/
$('#menu a, #logo, .scrol').click(function() {
	var elementClicked = $(this).attr("href");
	var destination = $(elementClicked).offset().top;
	$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-0}, 1000 );		   
	return false;
});	
		

	
var current_nav = 'home';

scroll_function = function(){
	
	$(".scrol-page,").each(function(index) {
		var h = $(this).offset().top;
		var y = $(window).scrollTop();
					
		if(y + 360 >= h && y < h + $(this).height() && $(this).attr('id') != current_nav) {
			
			current_nav = $(this).attr('id');
			
			$('#menu a').removeClass('current');
			$('.nav_' + current_nav).addClass('current').show("fast");	
				
		}
	});	
}
$(window).scroll(function(){
		scroll_function();
});	

/*---------------------------------------------- 
				Navigation 
------------------------------------------------*/
	$('#top-menu a, nav').click( function () {
	$('#top-menu a, nav').removeClass("active");
	$(this).addClass("active");
	}); 

	$('#logo').click( function () {
	$('#top-menu a, nav').removeClass("active");
	}); 


/*---------------------------------------------- 
				Form Validaton Javascript 
------------------------------------------------*/

$(document).ready(function() {
	$('form#contact_form').submit(function() {
		$('form#contact_form .error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if(jQuery.trim($(this).val()) == '') {
            	var labelText = $(this).prev('label').text();
            	$(this).parent().append('<span class="error">You forgot to enter your '+labelText+'.</span>');
            	$(this).addClass('inputError');
            	hasError = true;
            } else if($(this).hasClass('email')) {
            	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            	if(!emailReg.test(jQuery.trim($(this).val()))) {
            		var labelText = $(this).prev('label').text();
            		$(this).parent().append('<span class="error">You entered an invalid '+labelText+'.</span>');
            		$(this).addClass('inputError');
            		hasError = true;
            	}
            }
		});
		if(!hasError) {
			$('form#contact_form input.submit').fadeOut('normal', function() {
				$(this).parent().append('');
			});
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('form#contact_form').slideUp("fast", function() {
					$(this).before('<p class="success"><strong>Thanks!</strong> Your email was successfully sent. We will contact you as soon as possible.</p>');
				});
			});
		}

		return false;

	});
});

/*---------------------------------------------- 
				     Social icons hover
------------------------------------------------*/
jQuery(document).ready(function(){
	  $('.up').hover(function() {
	  $(this).animate({ opacity : 1 }, 100);
	}, function() {
	  $(this).animate({ opacity : 0.6 }, 100);
	})
	
	$(".up").click(function(event){
	  event.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 600);
	});
	

	$('.socialmedia .social li').hover(function() {
		$(this).find('a').clone().addClass('hover').appendTo($(this));
	  $(this).find('a:first-child').stop().animate({ marginTop: -25 }, 150);
	}, function() {
	  $(this).find('a:first-child').stop().animate({ marginTop: 0, opacity: 0.99 }, 150);
	  setTimeout(function() { $(this).find('a.hover').remove(); }, 150);
		});
});
