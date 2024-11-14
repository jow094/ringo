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

function toggle_cards(e,target) {
	console.log(e,"is e");
	console.log(target,"is target");
	$(target).removeClass('floor_1').removeClass('floor_2').removeClass('floor_3').removeClass('floor_4').removeClass('floor_5');
	$(target).siblings().removeClass('floor_1').removeClass('floor_2').removeClass('floor_3').removeClass('floor_4').removeClass('floor_5');
	$(target).addClass('floor_1');
	
	if(target==('.cards.card_1')){
		console.log('1 open');
		$('.cards.card_2').addClass('floor_2');
		$('.cards.card_3').addClass('floor_3');
		$('.cards.card_4').addClass('floor_4');
		$('.cards.card_5').addClass('floor_5');
	}
	if(target==('.cards.card_2')){
		console.log('2 open');
		$('.cards.card_1').addClass('floor_2');
		$('.cards.card_3').addClass('floor_2');
		$('.cards.card_4').addClass('floor_3');
		$('.cards.card_5').addClass('floor_4');
	}
	if(target==('.cards.card_3')){
		console.log('3 open');
		$('.cards.card_1').addClass('floor_3');
		$('.cards.card_2').addClass('floor_2');
		$('.cards.card_4').addClass('floor_2');
		$('.cards.card_5').addClass('floor_3');
	}
	if(target==('.cards.card_4')){
		console.log('4 open');
		$('.cards.card_1').addClass('floor_4');
		$('.cards.card_2').addClass('floor_3');
		$('.cards.card_3').addClass('floor_2');
		$('.cards.card_5').addClass('floor_2');
	}
	if(target==('.cards.card_5')){
		console.log('5 open');
		$('.cards.card_1').addClass('floor_5');
		$('.cards.card_2').addClass('floor_4');
		$('.cards.card_3').addClass('floor_3');
		$('.cards.card_4').addClass('floor_2');
	}
	
	$(e).siblings().not(e).removeClass('clicked');
    $(e).addClass('clicked');
    
}