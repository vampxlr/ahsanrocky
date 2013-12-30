$(document).ready(function(){

	if ($.browser.msie) {
		$('input[placeholder], textarea[placeholder]').placeholder();
	};

	if ($.browser.msie && $.browser.version < 9) {
		
		$('.white').removeClass('white');
		$('#navigation a').live('click', function(){
			var postid = $(this).attr('href').replace('#/', '#');
			var getpost= $(postid).position().top;
			$('html,body').animate({scrollTop: getpost });
			return false;
		});  
		
	} else {
		
		$('body').removeClass('no-js');
		var meny = Meny.create({
			menuElement: document.querySelector('#navigation'),
			contentsElement: document.querySelector('.container'),
			position: Meny.getQuery().p || 'bottom',
			height: 100,
			threshold: 30
		});
		
		$('#navigation a').live('click', function(){ meny.close(); });  
		
		if (readCookie('intruction') == 'true') { } else {
			$('.notes').fadeIn(400);
			$('.notes').delay(4000).fadeOut(800);
			$.cookie('intruction', 'true', { expires: 1 });
		};
	
		meny.addEventListener( 'open', function() {
			$('.notes').fadeOut(800);
		}); 
		
		Reveal.initialize({
			controls: true,
			progress: false,
			history: true,
			overview: false,
			dependencies: [
				{ src: 'js/libs/classList.js', condition: function() { return !document.body.classList; } },
				{ src: 'js/libs/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: 'js/libs/data-markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: 'js/libs/highlight.js', async: true, callback: function() { } }
			]
		});
			
	};

	$('.entry-holder').jScrollPane({
		autoReinitialise: true
	});
	
	$(window).load(function(){
		$('.slider-container').each(function(index, element) {
			var container = $(this);
			var nextBtn = container.find('.slider-slides li');
			var thumbs = container.find('.thumbs ul');
			$(this).find('.slider-slides').cycle({ 
				fx:     'fade', 
				speed:   500, 
				timeout: 0, 
				next:   nextBtn, 
				pager:  thumbs, 
				pagerAnchorBuilder: function(idx) { 
					var thumbsItem = container.find('.thumbs ul li:eq(' + idx + ') img');
					return thumbsItem; 
				} 
			});
		});
		$('#sendEmail').submit(function(){
			var str = $(this).serialize();
			$.ajax({
			type: 'POST',
			url: 'contact/contact.php',
			data: str,
			success: function(msg){
				$('#note').ajaxComplete(function(event, request, settings){
					if(msg == 'OK'){
						result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
						$('#sendEmail input, #sendEmail textarea').hide();
					}else{
						result = msg;
					}
					$(this).html(result);
				});
			}
			});
			return false;
		});
	});
});
