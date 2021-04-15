var globals = {
	'letters': [],
	'masks': []
};

// Animates a cursive section mask of the 'Relish' SVG
function animateSectionMask(index) {
	// If current section exists show it and animate mask
	if(index >= 0 && index < globals.masks.length) {

		$(globals.letters[index]).css({"opacity": 1});

		var pathLength = parseInt($(globals.masks[index]).css("stroke-dasharray"));

		$(globals.masks[index])
			.css({"opacity": 1})
			.velocity({
				"stroke-dashoffset": pathLength * 2
			}, {
				"duration": pathLength,
				// "duration": 2000,
				"easing": "linear",
			})
			.velocity({
				"opacity": 0
			}, {
				// "duration": 250,
				"duration": pathLength / 3,
				"delay": 50,
				"easing": "ease-in",
				"queue": false
			}
		);

		setTimeout(function() {
			animateSectionMask(index-1); // Animate next section
		}, pathLength / 4);
	}
	// If section does not exist finish by animating in tittle above the letter 'i' in 'Relish'
	else {
		$("#Tittle_Mask").velocity({
			"opacity": 0,
		}, {
			"duration": 600,
			"easing": "ease-in-out",
			"delay": 2500
		});
		$('#bulb').velocity({opacity: 1}, {duration: 1000});
		$('#idea').velocity('transition.bounceIn', {
			duration: 1000, 
			delay: 250,
			complete: function() {
				$('#lightDashes path').velocity('transition.shrinkIn', {
					duration: 500,
					stagger: 50,
					complete: function() {
							$('#arrow').velocity('callout.bounce', { duration: 2000, delay: 2000 });
					}
				});
			}
		});
	}
}

function initAnimation() {
	/* Store non-mask section paths (i.e. the letters themselves) */
	globals.letters = $('path:not([id$="_Mask"])');

	/* Store section mask paths and set stroke dash array to path length */
	globals.masks = $('path[id$="_Mask"]');

	/* Set stroke dash array length to path length */
	globals.masks.each(function(i, el) {
		var pathLength = el.getTotalLength();
		$(el).css({
			"stroke-dasharray": pathLength
		});
	});

	/* Trigger relish SVG animation */
	animateSectionMask(globals.masks.length - 1);
}

$(function() {

	initAnimation();
	setInterval(initAnimation, 10000); // Repeat every 10 seconds

});




// new 

jQuery(document).ready(function($){
	var gallery = $('.cd-gallery'),
		foldingPanel = $('.cd-folding-panel'),
		mainContent = $('.cd-main');
	/* open folding content */
	gallery.on('click', 'a', function(event){
		event.preventDefault();
		openItemInfo($(this).attr('href'));
	});

	/* close folding content */
	foldingPanel.on('click', '.cd-close', function(event){
		event.preventDefault();
		toggleContent('', false);
	});
	gallery.on('click', function(event){
		/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
		if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
	})

	function openItemInfo(url) {
		var mq = viewportSize();
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
			/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top
			}, 100, function(){ 
	           	toggleContent(url, true);
	        }); 
	    } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
			/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
			}, 100, function(){ 
	           	toggleContent(url, true);
	        });
		} else {
			toggleContent(url, true);
		}
	}

	function toggleContent(url, bool) {
		if( bool ) {
			/* load and show new content */
			var foldingContent = foldingPanel.find('.cd-fold-content');
            
            foldingContent.html(
                '<div class="cd-fold-content single-page" style="color:#000">'+
                '   <img src="http://lorempixel.com/1600/900/nature/5">'+
                '   <h2>Web Design</h2>'+
                '   <em>Build a Creative Website to Convert Visitors into Customers</em>'+
                '   <p>As the top web development company in India, we build SEO friendly, mobile responsive websites to your requirement. We provide best web design and development services to our clients worldwide. We have an experienced and expertise team using updated techniques to groom our client’s business in safest mode. We provide all round services in designing, developing and maintaining an effective web presence for your business.</p>'+
                '   <p>The team at ScriptYogi focuses on creating creative website design & developing custom web applications. Our web apps have rich UI/UX, normalized database, and robust frameworks to offer an optimum performance</p>'+
                '</div>');
                setTimeout(function(){
                    $('body').addClass('overflow-hidden');
                    foldingPanel.addClass('is-open');
                    mainContent.addClass('fold-is-open');
                }, 100);

                
            
			/*foldingContent.load(url+' .cd-fold-content > *', function(event){
				setTimeout(function(){
					$('body').addClass('overflow-hidden');
					foldingPanel.addClass('is-open');
					mainContent.addClass('fold-is-open');
				}, 100);
				
			});*/
		} else {
			/* close the folding panel */
			var mq = viewportSize();
			foldingPanel.removeClass('is-open');
			mainContent.removeClass('fold-is-open');
			
			(mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
				/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
				? $('body').removeClass('overflow-hidden')
				
				: mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body').removeClass('overflow-hidden');
					mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
		}
		
	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
});




/*---Menu---------*/ 
/*------https://codepen.io/ig_design/pen/pGKxpO------*/ 

(function($) { "use strict";
		
	//Page cursors

    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px", 
		t.style.top = n.clientY + "px", 
		e.style.left = n.clientX + "px", 
		e.style.top = n.clientY + "px", 
		i.style.left = n.clientX + "px", 
		i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }
	
	//Navigation

	var app = function () {
		var body = undefined;
		var menu = undefined;
		var menuItems = undefined;
		var init = function init() {
			body = document.querySelector('body');
			menu = document.querySelector('.menu-icon');
			menuItems = document.querySelectorAll('.nav__list-item');
			applyListeners();
		};
		var applyListeners = function applyListeners() {
			menu.addEventListener('click', function () {
				return toggleClass(body, 'nav-active');
			});
		};
		var toggleClass = function toggleClass(element, stringClass) {
			if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
		};
		init();
	}();

	
	         
              
})(jQuery); 

/*----Scroll------ */




