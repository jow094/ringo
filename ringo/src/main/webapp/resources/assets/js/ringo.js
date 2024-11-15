$(document).ready(function() {
	login_check();
	main_circle('.article_container_menu_circle');
	
	window.onclick = function(e) {
	    if (!$(e.target).closest('.modal_content').length && !$(e.target).closest('.modal_button').length) {
	    	console.log('every modal close');
	    	hiding('.modal');
	    }
	}
	
	$(document).on('keydown', function(e) {
	    if(e.keyCode === 27){
	    	hiding('.modal');
	    	toggle_card('.cards_container',1,0);
	    }
	});
	
});

function login_check(){
	
	var currentURL = window.location.href;
	
	if (currentURL.includes('join') || currentURL.includes('login')) {
		$('.left_navbar').addClass('none');
        return;
    }else{
    	
    	$('.left_navbar').removeClass('none');
    	
    	$.ajax({
            type: "GET",
            url: "/main/loginCheck",
            success: function(data) {
            	if(data == null || data == ""){
            		if (!currentURL.includes('join') && !currentURL.includes('login')) {
            			alert("로그인 정보가 없습니다. 로그인 페이지로 이동합니다.");
            		}
                    window.location.href = "/main/login";
            	}
            },
            error: function(xhr, status, error) {
            }
        });
    }
}

function logout(){
	alert("로그아웃 되었습니다.");
}

function showing(e) {
	$(e).css('opacity','0');
	$(e).removeClass('none');
	
	setTimeout(function() {
        $(e).css('opacity','1');
    }, 1);
}

function hiding(e) {
	$(e).css('opacity','0');
	
	setTimeout(function() {
		$(e).addClass('none');
    }, 300);
}

function shrinking(e) {
	$(e).addClass('shrinking');
	$(e).find('*').addClass('none');
	$(e).removeClass('expanding');
}

function expanding(e) {
	$(e).addClass('expanding');
	$(e).find('*').removeClass('none');
	$(e).removeClass('none');
    
    setTimeout(function() {
    	$(e).removeClass('shrinking');
    }, 1);
}

function adjustCenter(px){
	console.log('center_container max-width :'+$('.center_container').css('max-width'))
	$('.center_container').css('max-width', function(_, currentWidth) {
	    return (parseInt(currentWidth, 10) + px) + 'px';
	});
	console.log('center_container max-width : ++'+px+' -> '+$('.center_container').css('max-width'))
}

function adjustCard(px){
	console.log('card max-width :'+$('.card').css('max-width'))
	$('.card').css('max-width', function(_, currentWidth) {
	    return (parseInt(currentWidth, 10) + px) + 'px';
	});
	console.log('card max-width : ++'+px+' -> '+$('.card').css('max-width'))
}

function main_circle(e) {
	$('.container_contents_body:not(.circle)').addClass('none');
	showing('.container_contents_body.main_circle');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('clicked');
    $(e).addClass('clicked');
}
function main_timeline(e) {
	$('.container_contents_body:not(.timeline)').addClass('none');
	showing('.container_contents_body.main_timeline');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('clicked');
    $(e).addClass('clicked');
}
function main_pool(e) {
	$('.container_contents_body:not(.pool)').addClass('none');
	showing('.container_contents_body.main_pool');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('clicked');
    $(e).addClass('clicked');
}
function main_link(e) {
	$('.container_contents_body:not(.link)').addClass('none');
	showing('.container_contents_body.main_link');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('clicked');
    $(e).addClass('clicked');
}
function main_messenger() {
    if ($('.article_container_menu_messenger').hasClass('clicked')) {
    	
    	if ($('.main_messenger_menu').hasClass('expanding')) {
    		shrinking('.main_messenger_menu');
        	$('.main_messenger').css('width','400');
        	adjustCard(220);
            $('.messenger_button').find('i').removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
        }
    	
    	$('.main_messenger').css('width','400');
    	$('.main_messenger').addClass('shrinking');
    	$('.main_messenger').find('*').addClass('none');
    	$('.main_messenger').removeClass('expanding');
    	adjustCard(420);
    	
    	$('.article_container_menu_messenger').removeClass('clicked');
    }else {
    	$('.main_messenger').addClass('expanding');
    	$('.main_messenger').removeClass('shrinking');
    	$('.main_messenger').find('*').not('.main_messenger_menu').removeClass('none');
    	adjustCard(-420);
    	
    	$('.article_container_menu_messenger').addClass('clicked');
    }
}
function main_messenger_menu(e){
	var icon = $(e).find('i');

    if (icon.hasClass('fa-chevron-circle-left')) {
    	expanding('.main_messenger_menu');
    	$('.main_messenger').css('width','630');
    	adjustCard(-220);
    	
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-right')) {
    	shrinking('.main_messenger_menu');
    	$('.main_messenger').css('width','400');
    	adjustCard(220);
        
        setTimeout(function() {
        	icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
        }, 300);
    }
}
function profile_favorite(e) {
	$(e).siblings().removeClass('clicked');
    $(e).addClass('clicked');
    $('.detail_profile_content:not(.profile_favorite)').addClass('none');
    showing('.detail_profile_content.favorite');
}
function profile_follower(e) {
	$(e).siblings().removeClass('clicked');
    $(e).addClass('clicked');
    $('.detail_profile_content:not(.profile_follower)').addClass('none');
    showing('.detail_profile_content.follower');
}
function profile_following(e) {
	$(e).siblings().removeClass('clicked');
    $(e).addClass('clicked');
    $('.detail_profile_content:not(.profile_following)').addClass('none');
    showing('.detail_profile_content.following')
}
function profile_history(e) {
	$(e).siblings().removeClass('clicked');
    $(e).addClass('clicked');
    $('.detail_profile_content:not(.profile_history)').addClass('none');
    showing('.detail_profile_content.history')
}
function profile_prohibit(e) {
	$(e).siblings().removeClass('clicked');
    $(e).addClass('clicked');
    $('.detail_profile_content:not(.profile_prohibit)').addClass('none');
    showing('.detail_profile_content.prohibit')
}

function detail_profile_container(e) {
	var icon = $(e).find('i');

    if (icon.hasClass('fa-chevron-circle-right')) {
    	expanding('.detail_profile_container');
    	profile_favorite('.detail_profile_container_menu.favorite');
    	adjustCard(-300);
    	adjustCenter(-300);
    	
    	setTimeout(function() {
	        icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-left')) {
    	shrinking('.detail_profile_container');
    	adjustCard(300);
    	adjustCenter(300);
        
        setTimeout(function() {
        	icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
        }, 300);
    }
}

function alarm_container(e) {
    var icon = $(e).find('i');

    if (icon.hasClass('fa-chevron-circle-right')) {
    	shrinking('.alarm_container');
    	adjustCard(300);
    	adjustCenter(300);
    	
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-left')) {
    	expanding('.alarm_container');
    	adjustCard(-300);
    	adjustCenter(-300);
    	
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
    	}, 300);
    }
}

function toggle_card(container,targetIndex,direction){
	
	if(targetIndex!=0 && direction===0){
		const target = $(container).find(`.cards.card_${targetIndex}`);
		
		$(target).siblings().addBack().removeClass(function (index, className) {
		        return (className.match(/floor_\d+/g) || []).join(' ');
	    });
		
		$(target).addClass('floor_1');

	    $(target).siblings().each(function () {
	        const siblingIndex = $(this).index()+1;
	        const distance = Math.abs(targetIndex-siblingIndex);

	        $(this).addClass(`floor_${distance + 1}`);
	    });
	    
	    if(targetIndex===1){
	    	shrinking($(container).find('.prev'));
	    	expanding($(container).find('.next'));
	    }
	    if(targetIndex===$(container).find('.cards').length){
	    	expanding($(container).find('.prev'));
	    	shrinking($(container).find('.next'));
	    }
	    if(targetIndex!=1 && targetIndex!=$(container).find('.cards').length){
	    	expanding($(container).find('.prev'));
	    	expanding($(container).find('.next'));
	    }
	}
	
	if(targetIndex===0 && direction!=0){
		const currentIndex = parseInt($(container).find('.floor_1').attr('class').split("_")[1]);
	    const totalCards = $(container).find('.cards').length;
	    
	    if(direction===-1){
	    	expanding($(container).find('.next'));
	    	if (currentIndex === 2) {
	        	shrinking($(container).find('.prev'));
	        }
	    }
	    
	    if(direction===1){
	    	expanding($(container).find('.prev'));
	    	if (currentIndex === totalCards-1) {
	        	shrinking($(container).find('.next'));
	        }
	    }
	    
	    const target = $(container).find(`.cards.card_${currentIndex+direction}`);
		
		$(target).siblings().addBack().removeClass(function (index, className) {
		        return (className.match(/floor_\d+/g) || []).join(' ');
	    });
		
		$(target).addClass('floor_1');

	    $(target).siblings().each(function () {
	        const siblingIndex = $(this).index()+1;
	        const distance = Math.abs(currentIndex+direction-siblingIndex);

	        $(this).addClass(`floor_${distance + 1}`);
	    });
	}
}
