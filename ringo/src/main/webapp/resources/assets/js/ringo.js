$(document).ready(function() {
	login_check();
	main_circle('.article_container_menu_circle');
	get_coordinates();
	
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
	
	$('input[type="checkbox"]').change(function() {
		var target = $(this).closest('.with_checkbox');
		var currentClass = target.attr('class'); 
		
	    if ($(this).is(':checked')) {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
	    	}
	    } else {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_unfinished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_unfinished(target,'column');
	    	}
	    }
	});
	
	$('input[type="radio"]').change(function() {
		var target = $(this).closest('.with_radio');
		var currentClass = target.attr('class');
		
	    if ($(this).is(':checked')) {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
	    	}
	    } else {
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_unfinished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_unfinished(target,'column');
	    	}
	    }
	});
	
	$('select').change(function() {
		var target = $(this).closest('.with_select');
		var currentClass = target.attr('class');
		
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
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
            url: "/member/loginCheck",
            success: function(data) {
            	if(data == null || data == ""){
            		if (!currentURL.includes('join') && !currentURL.includes('login')) {
            			alert("로그인 정보가 없습니다. 로그인 페이지로 이동합니다.");
            		}
                    window.location.href = "/member/login";
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

function hide(e) {
	$(e).css('opacity','0');
	$(e).addClass('none');
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
	$(e).siblings().not('.article_container_menu_messenger').removeClass('active');
    $(e).addClass('active');
}
function main_timeline(e) {
	$('.container_contents_body:not(.timeline)').addClass('none');
	showing('.container_contents_body.main_timeline');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('active');
    $(e).addClass('active');
}
function main_pool(e) {
	$('.container_contents_body:not(.pool)').addClass('none');
	showing('.container_contents_body.main_pool');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('active');
    $(e).addClass('active');
}
function main_link(e) {
	$('.container_contents_body:not(.link)').addClass('none');
	showing('.container_contents_body.main_link');
	$(e).siblings().not('.article_container_menu_messenger').removeClass('active');
    $(e).addClass('active');
}
function main_messenger() {
    if ($('.article_container_menu_messenger').hasClass('active')) {
    	
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
    	
    	$('.article_container_menu_messenger').removeClass('active');
    }else {
    	$('.main_messenger').addClass('expanding');
    	$('.main_messenger').removeClass('shrinking');
    	$('.main_messenger').find('*').not('.main_messenger_menu').removeClass('none');
    	adjustCard(-420);
    	
    	$('.article_container_menu_messenger').addClass('active');
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
	$(e).siblings().removeClass('active');
    $(e).addClass('active');
    $('.detail_profile_content:not(.profile_favorite)').addClass('none');
    showing('.detail_profile_content.favorite');
}
function profile_follower(e) {
	$(e).siblings().removeClass('active');
    $(e).addClass('active');
    $('.detail_profile_content:not(.profile_follower)').addClass('none');
    showing('.detail_profile_content.follower');
}
function profile_following(e) {
	$(e).siblings().removeClass('active');
    $(e).addClass('active');
    $('.detail_profile_content:not(.profile_following)').addClass('none');
    showing('.detail_profile_content.following')
}
function profile_history(e) {
	$(e).siblings().removeClass('active');
    $(e).addClass('active');
    $('.detail_profile_content:not(.profile_history)').addClass('none');
    showing('.detail_profile_content.history')
}
function profile_prohibit(e) {
	$(e).siblings().removeClass('active');
    $(e).addClass('active');
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

function toggle_card(container,targetindex,direction){
	
	if(targetindex!=0 && direction===0){
		$(container).find('.active').removeClass('active');
		
		const target = $(container).find(`.cards.card_${targetindex}`);
		
		$(target).siblings().addBack().removeClass(function (index, className) {
		        return (className.match(/floor_\d+/g) || []).join(' ');
	    });
		
		showing($(target).find('.cards_inner_header').children());
		showing($(target).find('.cards_inner_body').children());
		showing($(target).find('.cards_inner_footer').children());
		$(target).addClass('floor_1');
		
		$(container).find(`[data-targetindex="${targetindex}"]`).addClass('active');
		
	    $(target).siblings().each(function () {
	        const siblingIndex = $(this).index()+1;
	        const distance = Math.abs(targetindex-siblingIndex);

	        hide($(this).find('.cards_inner_header').children());
	        hide($(this).find('.cards_inner_body').children());
	        hide($(this).find('.cards_inner_footer').children());
	        
	        $(this).addClass(`floor_${distance + 1}`);
	    });
	    
	    if(targetindex===1){
	    	shrinking($(container).find('.prev'));
	    	expanding($(container).find('.next'));
	    }
	    if(targetindex===$(container).find('.cards').length){
	    	expanding($(container).find('.prev'));
	    	shrinking($(container).find('.next'));
	    }
	    if(targetindex!=1 && targetindex!=$(container).find('.cards').length){
	    	expanding($(container).find('.prev'));
	    	expanding($(container).find('.next'));
	    }
	}
	
	if(targetindex===0 && direction!=0){
		$(container).find('.active').removeClass('active');
		
		const currentIndex = parseInt($(container).find('.floor_1').attr('class').split("_")[1]);
	    const totalCards = $(container).find('.cards').length;
	    console.log(container,'container');
	    console.log(totalCards,'totalcards');
	    
	    if(direction===-1){
	    	expanding($(container).find('.next'));
	    	if (currentIndex === 2) {
	        	shrinking($(container).find('.prev'));
	        }
	    	if (currentIndex === 1) {
	    		$(container).find(`[data-targetindex="${1}"]`).addClass('active');
	        }
	    }
	    
	    if(direction===1){
	    	expanding($(container).find('.prev'));
	    	if (currentIndex === totalCards-1) {
	        	shrinking($(container).find('.next'));
	        }
	    	if (currentIndex === totalCards) {
	    		$(container).find(`[data-targetindex="${totalCards}"]`).addClass('active');
	        }
	    }
	    
	    const target = $(container).find(`.cards.card_${currentIndex+direction}`);
	    
	    $(container).find(`[data-targetindex="${currentIndex+direction}"]`).addClass('active');
		
		$(target).siblings().addBack().removeClass(function (index, className) {
		        return (className.match(/floor_\d+/g) || []).join(' ');
	    });
		
		showing($(target).find('.cards_inner_header').children());
		showing($(target).find('.cards_inner_body').children());
		showing($(target).find('.cards_inner_footer').children());
		$(target).addClass('floor_1');

	    $(target).siblings().each(function () {
	        const siblingIndex = $(this).index()+1;
	        const distance = Math.abs(currentIndex+direction-siblingIndex);
	        
	        hide($(this).find('.cards_inner_header').children());
	        hide($(this).find('.cards_inner_body').children());
	        hide($(this).find('.cards_inner_footer').children());
	        
	        $(this).addClass(`floor_${distance + 1}`);
	    });
	}
}

function send_sms(container,input_container){
	$(input_container).find('input').val('');
	$(input_container).find('input').attr('placeholder','');
	$(input_container).find('input').removeClass('failed_message');
	showing(input_container);
	
	$.ajax({
        type: "GET",
        url: "/member/authentication/sms",
        data: {user_tel : $(container).find('#user_tel').val()},
        success: function(data) {
        	$(input_container).find('input').attr('placeholder','* 인증번호를 입력하세요.');
        	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
        },
        error: function(xhr, status, error) {
        	$(input_container).find('input').addClass('failed_message');
        	$(input_container).find('input').attr('placeholder','* 인증번호 발송에 실패하였습니다.');
        }
    });
}

function send_email(container,input_container){
	$(input_container).find('input').val('');
	$(input_container).find('input').attr('placeholder','');
	$(input_container).find('input').removeClass('failed_message');
	showing(input_container);
	
	$.ajax({
        type: "GET",
        url: "/member/authentication/email",
        data: {user_email : $(container).find('#user_email').val()},
        success: function(data) {
        	$(input_container).find('input').attr('placeholder','* 인증번호를 입력하세요.');
        	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
        },
        error: function(xhr, status, error) {
        	$(input_container).find('input').addClass('failed_message');
        	$(input_container).find('input').attr('placeholder','* 인증번호 발송에 실패하였습니다.');
        }
    });
}

function check_code(e,target){
	
	$.ajax({
        type: "POST",
        url: "/member/authentication/check",
        dataType: 'json',
        data: {user_code : $(e).siblings('input').val(), target : target},
        success: function(data) {
        	console.log(data);
        	if(data==1){
        		console.log('success');
        		set_hint(e,'* 인증에 성공하였습니다.','success_message');
        		set_finished(e,'row');
        	}
        	if(data==0){
        		console.log('failed');
        		set_hint(e,'* 인증에 실패하였습니다.','failed_message');
        		set_failed(e,'row');
        	}
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_realtime_address(latitude, longitude) {
    var apiKey = "fc78d7228a6d471a9c00539da3ab07d6";
    var apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (data) {
            if (data && data.results && data.results.length > 0) {
                var address = data.results[0].formatted;
                console.log("주소: " + address);
            } else {
                console.log("주소를 찾을 수 없습니다.");
            }
        },
        error: function (error) {
            console.error("주소 검색 실패", error);
        }
    });
}

function get_coordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);

            get_realtime_address(latitude, longitude);
        }, function(error) {
            console.error("위치 정보를 가져오지 못했습니다.", error);
        });
    } else {
        console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
}

function search_address(container,search_result_container) {
	const keyword = $('#search_address_input').val();
	
	const encodedKeyword = keyword.trim().replaceAll("[^a-zA-Z0-9가-힣 ]", "");
    const apiUrl = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDI0MTExNzEzNDIwMzExNTI0NDQ%3D&currentPage=1&countPerPage=10000&keyword=${encodedKeyword}&firstSort=road`;
    $('#user_address_search_container').find('.scroll_box_inner').text('');
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'text',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success: function(response) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/xml");

            const jusoNodes = xmlDoc.getElementsByTagName('juso');
            const totalCount = xmlDoc.getElementsByTagName('totalCount')[0].textContent
            
            if(totalCount==0){
            	$('#user_address_search_container').find('.scroll_box_inner').append(`
            			<input class="user_address_search_result" type="button" name="user_address" value="검색된 결과가 없습니다."/>
 	            `);
            	showing(search_result_container);
            	$('.for_address').text(`* 올바른 검색어를 입력해주세요.`)
            	$('.for_address').addClass('failed_message');
            }else{
            	for (let node of jusoNodes) {
            		$('#user_address_search_container').find('.scroll_box_inner').append(`
            			<div class="user_address_search_result" onclick="select_address(this)">
 	            			<input class="user_address_search_result_first" type="button" name="user_address" value="${node.getElementsByTagName('roadAddr')[0].textContent}"/>
 	            			<input class="user_address_search_result_second" type="button" name="user_address" value="${node.getElementsByTagName('jibunAddr')[0].textContent}"/>
            			</div>
		            `);
	            }
            	showing(search_result_container);
            	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
            }
            
            if(totalCount>1000){
            	$('.for_address').text(`* 1000개 이상의 검색결과가 있습니다. 더 상세하게 검색해주세요.`)
            	$('.for_address').addClass('failed_message');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', error);
        }
    });
}

function select_address(e){
	console.log('e:',e)
	$('#user_address_search_container').find('.scroll_box_inner').find('.selected').removeClass('selected');
	$(e).addClass('selected');
	set_hint(e,'* 상세 주소를 입력해주세요.','annotation_message');
	$('.selected_address').text($(e).find('.user_address_search_result_first').val());
	showing('#user_address_detail');
	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
}

function submit_address(e){
	console.log($('.selected_address').text() + ', ' + $(e).val());
	$('#user_address').val($('.selected_address').text() + ', ' + $(e).val());
	set_hint(e,'* 주소 입력이 완료되었습니다.','success_message');
	set_finished(e, 'row');
}

function validate_name(input) {
	
    const name = $(input).val();
    
    if (name.trim() === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* 본명을 입력 해주세요.', 'annotation_message');
    } 
    else if (!/^.{2,}$/.test(name)) {
        set_failed(input,'row');
        set_hint(input, '* 이름은 최소 2글자 이상이어야 합니다.', 'failed_message');
    } 
    else if (!/^[a-zA-Z가-힣]+$/.test(name)) {
        set_failed(input,'row');
        set_hint(input, '* 이름에는 공백이나 특수문자, 숫자가 포함될 수 없습니다.', 'failed_message');
    } 
    else if (/[\u3131-\uD79D]/.test(name) && /[A-Za-z]/.test(name)) {
        set_failed(input,'row');
        set_hint(input, '* 이름에는 한글과 영어가 함께 포함될 수 없습니다.', 'failed_message');
    } 
    else {
        set_finished(input, 'row');
        set_hint(input, '* 이름 형식이 올바릅니다.', 'success_message');
    }
}

function validate_birth(input) {
	const realValue= $(input).val();
    const value = $(input).val().replace(/\./g, '');
    
    if (value.trim() === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* 생년월일을 입력해주세요.', 'annotation_message');
        return;
    }
    
    console.log('value :',value);
    console.log('realValue :',realValue);
    console.log('value length :',value.length);
    
    $(input).on('keydown', function(event) {
        if ($(input).val().replace(/\./g, '').length === 4 && !$(input).val().includes('.')) {
        	if (event.keyCode === 8) {
        		console.log('bsp');
        		return;
        	}else{
        		console.log('1111.');
                $(input).val($(input).val() + '.');  // yyyy 뒤에 . 추가
        	}
    	}
        if ($(input).val().replace(/\./g, '').length === 6 && ($(input).val().split('.').length - 1) === 1) {
        	if (event.keyCode === 8) {
        		console.log('bsp');
        		return;
        	}else{
        		console.log('1111.11');
                $(input).val($(input).val() + '.');  // yyyy 뒤에 . 추가
        	}
    	}
    });
    
    const regexDate = /^[0-9]{4}[0-9]{2}[0-9]{2}$/;
    if (!regexDate.test(value)) {
        set_failed(input, 'row');
        set_hint(input, '* 생년월일은 8자리 숫자로 입력해야 합니다.', 'failed_message');
        return;
    }

    const year = parseInt(value.slice(0, 4));
    const month = parseInt(value.slice(4, 6));
    const day = parseInt(value.slice(6, 8));

    if (year < 1960) {
        set_failed(input, 'row');
        set_hint(input, '* 1960년 이전 출생자는 가입할 수 없습니다.', 'failed_message');
        return;
    }

    if (month < 1 || month > 12) {
        set_failed(input, 'row');
        set_hint(input, '* 월은 01부터 12 사이의 숫자여야 합니다.', 'failed_message');
        return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        set_failed(input, 'row');
        set_hint(input, `* 해당 월에는 ${daysInMonth}일까지 있습니다.`, 'failed_message');
        return;
    }

    set_finished(input, 'row');
    set_hint(input, '* 올바른 생년월일 입니다.', 'success_message');
    
}

function set_unfinished(e, direction) {
    const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}`);
    target.removeClass(`failed_${direction}`);
    if (!target.hasClass(`unfinished_${direction}`)) {
        target.removeClass(`finished_${direction}`).addClass(`unfinished_${direction}`);
    }
}

function set_finished(e, direction) {
    const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}`);
    target.removeClass(`failed_${direction}`);
    if (!target.hasClass(`finished_${direction}`)) {
        target.removeClass(`unfinished_${direction}`).addClass(`finished_${direction}`);
    }
    if ($(e).closest('.card_1').length > 0) {
    	console.log('this is included by card_1');
    	check_finished('1','.join_modal');
    }
}

function set_failed(e, direction) {
    const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}`);
    if (!target.hasClass(`failed_${direction}`)) {
        target.addClass(`failed_${direction}`);
    }
}

function set_hint(e,msg,className){
	const target = $(e).closest('.input_box').find('.input_hint');
	
	if(className==='failed_message'){
		target.removeClass('success_message');
		target.removeClass('annotation_message');
	}
	
	if(className==='success_message'){
		target.removeClass('failed_message');
		target.removeClass('annotation_message');
	}
	
	if(className==='annotation_message'){
		target.removeClass('success_message');
		target.removeClass('failed_message');
	}
	
	if(!target.hasClass(className)){
		target.addClass(className);
	}
	
	target.text(msg);
}

function check_finished(index,container) {
	
	console.log($(`.card_${index}`).attr('class'));
	
	var count = $(`.card_${index}`).find('.unfinished_row').length + $(`.card_${index}`).find('.unfinished_column').length;
	
	console.log($(`.card_${index}`).attr('class')+'still have unfinished '+count);
    
    if($(`.card_${index}`).find('.unfinished_row').length === 0 && $(`.card_${index}`).find('.unfinished_column').length === 0){
    	
    	if($(`.card_${index}`).attr('class').includes('row')){
    		$(`.card_${index}`).removeClass('unfinished_row');
    		$(`.card_${index}`).addClass('finished_row');
    	}
    	
    	if($(`.card_${index}`).attr('class').includes('column')){
    		$(`.card_${index}`).removeClass('unfinished_column');
    		$(`.card_${index}`).addClass('finished_column');
    	}
    	
    	$(container).find(`[data-targetindex="${index}"]`).removeClass('unfinished_column');
    	$(container).find(`[data-targetindex="${index}"]`).addClass('finished_column');
    }
}
