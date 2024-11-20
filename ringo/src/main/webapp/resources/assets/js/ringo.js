$(document).ready(function() {
	login_check();
	main_show('.article_container_menu_around','around');
	get_coordinates();
	
	window.onclick = function(e) {
		if ($('.join_modal:not(.none)').length > 0) {
	        if (!$(e.target).closest('.modal_content').length && !$(e.target).closest('.modal_button').length) {
	            hiding('.join_modal');
	        }
	    }
	}
	
	$(document).on('keydown', function(e) {
	    if(e.keyCode === 27){
	    	if ($('.join_modal:not(.none)').length > 0) {
		    	hiding('.join_modal');
	    	}
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
	
	$('.with_select select').change(function() {
		var target = $(this).closest('.with_select');
		var currentClass = target.attr('class');
		
	    	if (currentClass.includes('finished_row') || currentClass.includes('unfinished_row')){
	    		set_finished(target,'row');
	    	}
	    	if (currentClass.includes('finished_column') || currentClass.includes('unfinished_column')){
	    		set_finished(target,'column');
	    	}
	});
	
	let draggedElement = null;

	$(document).on("dragstart", ".draggable", function (e) {
	    draggedElement = this;
	    e.originalEvent.dataTransfer.effectAllowed = "move";
	    
	    $(this).find(":not(img)").css("visibility", "hidden");
	});

	$(document).on("dragend", ".draggable", function () {
	    $(this).find(":not(img)").css("visibility", "visible");
	});

	$(document).on("dragover", ".draggable", function (e) {
	    e.preventDefault();
	    $(this).addClass("drag-over");
	});

	$(document).on("dragleave", ".draggable", function () {
	    $(this).removeClass("drag-over");
	});

	$(document).on("drop", ".draggable", function (e) {
	    e.preventDefault();
	    $(this).removeClass("drag-over");

	    if (draggedElement !== this) {
	        const draggedClone = $(draggedElement).clone(true);
	        const targetClone = $(this).clone(true);

	        $(draggedElement).replaceWith(targetClone);
	        $(this).replaceWith(draggedClone);
	    }

	});
	
	$(document).on('change', '.thumbnail input[type="file"]', function () {
	    check_thumbnail(this);
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
		if(!$(e).hasClass('none')){
			$(e).addClass('none');
		}
    }, 300);
}

function hide(e) {
	$(e).css('opacity','0');
	if(!$(e).hasClass('none')){
		$(e).addClass('none');
	}
}

function shrinking(e) {
	$(e).removeClass('expanding');
	if(!$(e).hasClass('shrinking')){
		$(e).addClass('shrinking');
	}
}

function col_toggle(e,target) {
	if(target.hasClass('col_shrinking'))
	$(target).removeClass('expanding');
	if(!$(target).hasClass('col_shrinking')){
		$(target).addClass('col_shrinking');
	}
	$(e).find('i').last().attr('class','fas fa-chevron-circle-down');
}

function expanding(e) {
	$(e).removeClass('shrinking');
	if(!$(e).hasClass('expanding')){
		$(e).addClass('expanding');
	}
}

function main_show(e,target) {
	console.log(target);
	$(`.main_card:not(.main_${target})`).addClass('none');
	showing(`.main_card.main_${target}`);
	$(e).siblings().not('.article_container_menu_messenger').removeClass('active');
    $(e).addClass('active');
}
function main_messenger() {
    if ($('.article_container_menu_messenger').hasClass('active')) {
    	
    	if ($('.main_messenger_menu').hasClass('expanding')) {
    		$('.main_messenger').css('width','400px');
    		shrinking('.main_messenger_menu');
            $('.messenger_button').find('i').removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
        }
		shrinking('.main_messenger');
    	
    	$('.article_container_menu_messenger').removeClass('active');
    }else {
    	expanding('.main_messenger');
    	
    	$('.article_container_menu_messenger').addClass('active');
    }
}
function main_messenger_menu(e){
	var icon = $(e).find('i');

    if (icon.hasClass('fa-chevron-circle-left')) {
    	$('.main_messenger').css('width','650px');
    	expanding('.main_messenger_menu');
    	
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-right')) {
    	$('.main_messenger').css('width','400px');
    	shrinking('.main_messenger_menu');
        
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
    	
    	setTimeout(function() {
	        icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-left')) {
    	shrinking('.detail_profile_container');
        
        setTimeout(function() {
        	icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
        }, 300);
    }
}

function alarm_container(e) {
    var icon = $(e).find('i');

    if (icon.hasClass('fa-chevron-circle-right')) {
    	shrinking('.alarm_container');
    	
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-left')) {
    	expanding('.alarm_container');
    	
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
	    
	    if(targetindex==1){
	    	shrinking($(container).find('.prev'));
	    	expanding($(container).find('.next'));
	    }
	    if(targetindex==$(container).find('.cards').length){
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

function send_sms(e){
	
	var input;
	
	if($(e).is('div')){
		input = $(e).siblings('input[name="user_tel"]');
	}
	
	if($(e).is('input[name="user_tel"]')){
		input = e;
	}
	
	const add_input = $(input).closest('.input_value_container').find('#user_sms_authentication');
	
	if(validate_tel(input)!='1'){
		set_failed(input, 'row');
        set_hint(input, '* 입력하신 전화번호를 다시 확인해주세요.', 'failed_message');
		return;
	};
	
	check_duple(input, function(response) {
	
		if (response==1) {
	        set_failed(input, 'row');
	        set_hint(input, '* 이미 사용중인 전화번호 입니다.', 'failed_message');
	        return;
	    }else{
	    	$(add_input).find('input[name="user_authentication"]').val('');
	    	set_hint(input,'* 전송받은 인증번호를 입력 해주세요.','annotation_message');
	    	showing(add_input);
	    	
	    	$.ajax({
	    		type: "GET",
	    		url: "/member/authentication/sms",
	    		data: {user_tel : input.val()},
	    		success: function(data) {
	    			$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
	    		},
	    		error: function(xhr, status, error) {
	    			set_hint(input,'* 인증번호 발송에 실패 하였습니다.','failed_message');
	    		}
	    	});
	    }
	});
}

function validate_tel(input) {
	
    const tel = $(input).val();
    const add_input = $(input).closest('.input_value_container').find('#user_sms_authentication');
    
    if (tel === '') {
        set_unfinished(input, 'row');
        set_hint(input, `* ' - ' 를 제외한 전화번호를 입력 해주세요. 예시) 01012345678`, 'annotation_message');
        hide(add_input);
    }
    else if (!/^\d+$/.test(tel)) {
        set_failed(input,'row');
        set_hint(input, '* 전화번호는 숫자로만 구성되어야 합니다.', 'failed_message');
        hide(add_input);
    } 
    else if (tel.length !== 11) {
        set_failed(input,'row');
        set_hint(input, '* 전화번호는 11자리 입니다.', 'failed_message');
        hide(add_input);
    } 
    else {
        set_unfinished(input, 'row');
        set_hint(input, '* 전화번호 형식이 올바릅니다.', 'annotation_message');
        hide(add_input);
        return '1';
    }
}

function send_email(e){
	var input;
	
	if($(e).is('div')){
		input = $(e).siblings('input[name="user_email"]');
	}
	
	if($(e).is('input[name="user_email"]')){
		input = e;
	}
	
	const add_input = $(input).closest('.input_value_container').find('#user_email_authentication');
	
	if(validate_email(input)!='1'){
		set_failed(input, 'row');
        set_hint(input, '* 입력하신 이메일을 다시 확인해주세요.', 'failed_message');
		return;
	};
	
	check_duple(input, function(response) {
	
		if (response==1) {
	        set_failed(input, 'row');
	        set_hint(input, '* 이미 사용중인 이메일입니다.', 'failed_message');
	        return;
	    }else{
	    	$(add_input).find('input[name="user_authentication"]').val('');
	    	set_hint(input,'* 전송받은 인증번호를 입력 해주세요.','annotation_message');
	    	showing(add_input);
	    	
	    	$.ajax({
	            type: "GET",
	            url: "/member/authentication/email",
	            data: {user_email : input.val()},
	            success: function(data) {
	            	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
	            },
	            error: function(xhr, status, error) {
	            	set_hint(input,'* 인증번호 발송에 실패 하였습니다.','failed_message');
	            }
	        });
	    }
	});
}

function validate_email(input) {
	
    const email = $(input).val();
    const add_input = $(input).closest('.input_value_container').find('#user_email_authentication');
    
    if (email === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* id@domain.com 형식의 이메일을 입력 해주세요.', 'annotation_message');
        hide(add_input);
    }
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        set_failed(input,'row');
        set_hint(input, '* id@domain.com 형식의 이메일을 입력 해주세요.', 'failed_message');
        hide(add_input);
    } 
    else {
        set_unfinished(input, 'row');
        set_hint(input, '* 이메일 형식이 올바릅니다.', 'annotation_message');
        hide(add_input);
        return '1';
    }
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
            			<input class="user_address_search_result outform" type="button" name="user_address" value="검색된 결과가 없습니다."/>
 	            `);
            	showing(search_result_container);
            	$('.for_address').text(`* 올바른 검색어를 입력해주세요.`)
            	$('.for_address').addClass('failed_message');
            }else{
            	for (let node of jusoNodes) {
            		$('#user_address_search_container').find('.scroll_box_inner').append(`
            			<div class="user_address_search_result" onclick="select_address(this)">
 	            			<input class="user_address_search_result_first outform" type="button" name="user_address" value="${node.getElementsByTagName('roadAddr')[0].textContent}"/>
 	            			<input class="user_address_search_result_second outform" type="button" name="user_address" value="${node.getElementsByTagName('jibunAddr')[0].textContent}"/>
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
            
            $('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
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
    
    if (name === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* 본명을 입력 해주세요.', 'annotation_message');
    } 
    else if (!/^[a-zA-Z가-힣]+$/.test(name)) {
        set_failed(input,'row');
        set_hint(input, '* 이름에는 공백이나 특수문자, 숫자가 포함될 수 없습니다.', 'failed_message');
    } 
    else if (!/^.{2,}$/.test(name)) {
        set_failed(input,'row');
        set_hint(input, '* 이름은 최소 2글자 이상이어야 합니다.', 'failed_message');
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
    
    if (value === '') {
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
        		return;
        	}else{
        		console.log('1111.');
                $(input).val($(input).val() + '.');  // yyyy 뒤에 . 추가
        	}
    	}
        if ($(input).val().replace(/\./g, '').length === 6 && ($(input).val().split('.').length - 1) === 1) {
        	if (event.keyCode === 8) {
        		return;
        	}else{
        		console.log('1111.11');
                $(input).val($(input).val() + '.');  // yyyy 뒤에 . 추가
        	}
    	}
    });
    
    const regexDate = /^[0-9]{4}[0-9]{2}[0-9]{2}$/;
    const year = parseInt(value.slice(0, 4));
    const month = parseInt(value.slice(4, 6));
    const day = parseInt(value.slice(6, 8));
    const daysInMonth = new Date(year, month, 0).getDate();
    
    if (/[^0-9]/.test(value)) {
        set_failed(input, 'row');
        set_hint(input, '* 생년월일은 숫자로만 입력 해야 합니다.', 'failed_message');
    }
    else if (!regexDate.test(value)) {
        set_failed(input, 'row');
        set_hint(input, '* 생년월일은 8자리 숫자로 입력해야 합니다.', 'failed_message');
    }
    else if (year < 1960) {
        set_failed(input, 'row');
        set_hint(input, '* 1960년 이전 출생자는 가입할 수 없습니다.', 'failed_message');
    }
    else if (month < 1 || month > 12) {
        set_failed(input, 'row');
        set_hint(input, '* 월은 01부터 12 사이의 숫자여야 합니다.', 'failed_message');
    }
    else if (day < 1 || day > daysInMonth) {
        set_failed(input, 'row');
        set_hint(input, `* 해당 월에는 ${daysInMonth}일까지 있습니다.`, 'failed_message');
    }
    else{
	    set_finished(input, 'row');
	    set_hint(input, '* 올바른 생년월일 입니다.', 'success_message');
    }
}

function validate_id(input) {
	
    const id = $(input).val();
    
    if (id === '') {
        set_unfinished(input, 'row');
        set_hint(input, `* 4~20자리의 영문, 숫자, '_' 로 이루어진 아이디를 입력해 주세요.`, 'annotation_message');
    } 
    else if (!/^[a-zA-Z0-9]/.test(id)) {
        set_failed(input, 'row');
        set_hint(input, '* 아이디는 영문 또는 숫자로 시작해야 합니다.', 'failed_message');
    }
    else if (!/^[a-zA-Z0-9_]+$/.test(id)) {
        set_failed(input, 'row');
        set_hint(input, `* 아이디는 영문, 숫자, '_' 만 포함할 수 있습니다.`, 'failed_message');
    }
    else if (id.length < 4 || id.length > 20) {
        set_failed(input, 'row');
        set_hint(input, '* 아이디는 4~20자리여야 합니다.', 'failed_message');
    }
    else {
    	check_duple(input, function(response) {
    		if (response==1) {
    	        set_failed(input, 'row');
    	        set_hint(input, '* 이미 사용중인 아이디입니다.', 'failed_message');
    	        return;
    	    }
	    	else {
	            set_finished(input, 'row');
	            set_hint(input, '* 사용할 수 있는 아이디입니다.', 'success_message');
	        }
    	});
    }
}

function validate_pw(input) {
    const pw = $(input).val();

    if (pw === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* * 8~20자리의 영문,숫자가 포함 된 비밀번호를 입력 해주세요.', 'annotation_message');
        hide('#check_pw');
    } 
    else if (pw.length < 8 || pw.length > 20) {
        set_failed(input, 'row');
        set_hint(input, '* 비밀번호는 8~20자리여야 합니다.', 'failed_message');
        hide('#check_pw');
    }
    else if (!/[a-zA-Z]/.test(pw) || !/\d/.test(pw)) {
        set_failed(input, 'row');
        set_hint(input, '* 비밀번호는 영문과 숫자를 모두 포함해야 합니다.', 'failed_message');
        hide('#check_pw');
    }
    else {
    	showing('#check_pw');
    	set_unfinished(input, 'row');
        set_hint(input, '* 사용할 수 있는 비밀번호입니다. 한번 더 입력 해주세요.', 'annotation_message');
    }
}

function check_pw(input) {
	const pw = $(input).closest('.input_box').find('input[name="user_pw"]').val();
    const second_pw = $(input).val();
    
    if (second_pw === '') {
    	set_unfinished(input, 'row');
    	set_hint(input, '* 사용할 수 있는 비밀번호입니다. 한번 더 입력 해주세요.', 'annotation_message');
    }
    else if (pw != second_pw) {
        set_failed(input, 'row');
        set_hint(input, '* 입력하신 비밀번호가 일치하지 않습니다.', 'failed_message');
    } 
    else {
        set_finished(input, 'row');
        set_hint(input, '* 비밀번호 입력이 완료 되었습니다.', 'success_message');
    }
}

function validate_nickname(input) {
	
	const nickname = $(input).val();
    const engPart = nickname.match(/[a-zA-Z]+/g)||[];
    const korPart = nickname.match(/[가-힣]+/g)||[];
    
    var korLength = 0;
    if(korPart[0]){
    	korPart.forEach(part => {
    		korLength += part.length;
    	});
    }
    var engLength = 0;
    if(engPart[0]){
    	engPart.forEach(part => {
    	    engLength += part.length;
    	});
    }
    
    if (nickname === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* 4~10자리의 닉네임을 입력 해주세요.', 'annotation_message');
    }
    else if (nickname.startsWith('_')) {
        set_failed(input, 'row');
        set_hint(input, `* 닉네임은 '_' 로 시작할 수 없습니다.`, 'failed_message');
    }
    else if (!/^[가-힣a-zA-Z0-9_]+$/.test(nickname)) {
        set_failed(input, 'row');
        set_hint(input, `* 닉네임은 한글, 영문, 숫자, '_' 만 포함할 수 있습니다.`, 'failed_message');
    }
    else if (korLength<2 && engLength<4) {
        set_failed(input, 'row');
        set_hint(input, '* 닉네임은 2자 이상의 한글이나 4자 이상의 영문을 포함해야 합니다.', 'failed_message');
    }
    else if (nickname.length < 2 || nickname.length > 10) {
        set_failed(input, 'row');
        set_hint(input, '* 닉네임은 2~10자리여야 합니다.', 'failed_message');
    }
    else {
    	check_duple(input, function(response) {
    		if (response==1) {
    	        set_failed(input, 'row');
    	        set_hint(input, '* 이미 사용중인 닉네임입니다.', 'failed_message');
    	        return;
    	    }
	    	else {
	            set_finished(input, 'row');
	            set_hint(input, '* 사용할 수 있는 닉네임입니다.', 'success_message');
	        }
    	});
    }
}

function validate_text(input,annotation_message) {
    const text = $(input).val();

    if (text === '') {
        set_unfinished(input, 'row');
        set_hint(input, annotation_message, 'annotation_message');
    } 
    else if (text.length < 10) {
        set_unfinished(input, 'row');
        set_hint(input, '* 10자 이상 작성해주세요.', 'failed_message');
    }
    else{
    	set_finished(input, 'row');
        set_hint(input, '* 입력이 완료되었습니다.', 'success_message');
    }
}

function set_finished(e, direction) {
	const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}, .failed_${direction}`);
	target.removeClass(`failed_${direction}`);
	if (!target.hasClass(`finished_${direction}`)) {
		target.removeClass(`unfinished_${direction}`).addClass(`finished_${direction}`);
	}
	const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
	const index = match ? match[1] : undefined;
	check_finished(index,'.join_modal');
}

function set_unfinished(e, direction) {
	const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}, .failed_${direction}`);
    target.removeClass(`failed_${direction}`);
    if (!target.hasClass(`unfinished_${direction}`)) {
        target.removeClass(`finished_${direction}`).addClass(`unfinished_${direction}`);
    }
    const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
    const index = match ? match[1] : undefined;
    check_finished(index,'.join_modal');
}

function set_failed(e, direction) {
	const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}, .failed_${direction}`);
    if (!target.hasClass(`failed_${direction}`)) {
    	target.removeClass(`finished_${direction}`).removeClass(`unfinished_${direction}`).addClass(`failed_${direction}`);
    }
    const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
    const index = match ? match[1] : undefined;
    check_finished(index,'.join_modal');
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
	
	var count = $(`.card_${index}`).find('.unfinished_row').length + $(`.card_${index}`).find('.unfinished_column').length
				+$(`.card_${index}`).find('.failed_row').length + $(`.card_${index}`).find('.failed_column').length;
    
    if(count === 0){
    	
    	if($(`.card_${index}`).attr('class').includes('row')){
    		$(`.card_${index}`).removeClass('unfinished_row');
    		$(`.card_${index}`).removeClass('failed_row');
    		if(!$(`.card_${index}`).hasClass('finished_row')){
    			$(`.card_${index}`).addClass('finished_row');
    		}
    	}
    	
    	if($(`.card_${index}`).attr('class').includes('column')){
    		$(`.card_${index}`).removeClass('unfinished_column');
    		$(`.card_${index}`).removeClass('failed_column');
    		if(!$(`.card_${index}`).hasClass('finished_column')){
    			$(`.card_${index}`).addClass('finished_column');
    		}
    	}
    	
    	$(container).find(`[data-targetindex="${index}"]`).removeClass('unfinished_column');
    	$(container).find(`[data-targetindex="${index}"]`).removeClass('failed_column');
    	
    	if(!$(container).find(`[data-targetindex="${index}"]`).hasClass('finished_column')){
    		$(container).find(`[data-targetindex="${index}"]`).addClass('finished_column');
		}
    }else{
    	
    	if($(`.card_${index}`).attr('class').includes('row')){
    		$(`.card_${index}`).removeClass('finished_row');
    		$(`.card_${index}`).removeClass('failed_row');
    		if(!$(`.card_${index}`).hasClass('unfinished_row')){
    			$(`.card_${index}`).addClass('unfinished_row');
    		}
    	}
    	
    	if($(`.card_${index}`).attr('class').includes('column')){
    		$(`.card_${index}`).removeClass('finished_column');
    		$(`.card_${index}`).removeClass('failed_column');
    		
    		if(!$(`.card_${index}`).hasClass('unfinished_column')){
    			$(`.card_${index}`).addClass('unfinished_column');
    		}
    	}
    	
    	$(container).find(`[data-targetindex="${index}"]`).removeClass('finished_column');
    	$(container).find(`[data-targetindex="${index}"]`).removeClass('failed_column');
    	
    	if(!$(container).find(`[data-targetindex="${index}"]`).hasClass('unfinished_column')){
    		$(container).find(`[data-targetindex="${index}"]`).addClass('unfinished_column');
		}
    }
    
    clear_card(container);
}

function select_card(e) {
	hide($(e).find('option:selected'));
	var value = $(e).find('option:selected').val();
	var text = $(e).find('option:selected').text();
	var hiddenInput = $(e).closest('.input_box').find('input[type="hidden"]');
	var currentValue = hiddenInput.val();
	
	if (!currentValue.includes(value)){
		
		if (currentValue) {
	        hiddenInput.val(currentValue + ',' + value);
	    } else {
	    	showing($(e).closest('.input_box').next('.selected_card_container'));
	    	set_finished(e,'row');
	        hiddenInput.val(value);
	    }
		
		$(e).closest('.input_box').next('.selected_card_container').append(`
				<div class="selected_card deletable none" data-value="${value}" onclick="delete_card(this)">
					<i class="fa-solid fa-circle-xmark"></i>
					${text}
				</div>
		`);
		
		setTimeout(() => {
			showing($('.selected_card.deletable.none').last());
		}, 1);
	}
	
	$(e).prop('selectedIndex', 0);
	
}

function delete_card(e) {
	
	var deleteValue = $(e).attr('data-value');
    var hiddenInput = $(e).closest('.selected_card_container').prev('.input_box').find('input[type="hidden"]');
    
    showing($(e).closest('.selected_card_container').prev('.input_box').find(`[value="${deleteValue}"]`));
    
    if (hiddenInput.val()) {
        let currentValue = hiddenInput.val();

        if (!currentValue.includes(',')) {
            // 쉼표가 없으면 deleteValue만 제거
            hiddenInput.val(currentValue.replace(deleteValue, ''));
        } else if (currentValue.includes(deleteValue + ',')) {
            // deleteValue 뒤에 쉼표가 있으면 'deleteValue,' 제거
            hiddenInput.val(currentValue.replace(deleteValue + ',', ''));
        } else {
            // deleteValue 뒤에 쉼표가 없으면 ',deleteValue' 제거
            hiddenInput.val(currentValue.replace(',' + deleteValue, ''));
        }
    }
	
    if (!$(e).siblings().length) {
        hide($(e).closest('.selected_card_container'));
        set_unfinished($(e).closest('.selected_card_container').prev('.input_box').find('select'),'row');
    }
    setTimeout(function() {
    	if($(e).hasClass('deletable')){
        	$(e).remove();
        }
    }, 1);
    
}

function add_image(input) {
    var file = input.files[0];  // 사용자가 선택한 첫 번째 파일
    
    if (file) {
        var reader = new FileReader();  // 파일을 읽을 FileReader 객체

        reader.onload = function(e) {
        	$(input).siblings('i').remove();
        	$(input).closest('.picture_content').addClass('have_img');
        	$(input).closest('.picture_content').addClass('on_top');
        	$(input).closest('.picture_content').addClass('draggable');
        	$(input).closest('.picture_content').attr("onmouseover", "mouse_over(this)");
        	$(input).closest('.picture_content').attr("onmouseleave", "mouse_leave(this)");
        	$(input).closest('.picture_content').attr("onclick", "delete_image(this)");
        	$(input).closest('.picture_content').attr("draggable", "true");
            $(input).after(`
                <img class="none" src="${e.target.result}"/>
            `);
            showing($(input).next('img'));
        };

        reader.readAsDataURL(file);
    }
    
    if($(input).closest('.small_picture_container').length>0){
    	$(input).closest('.picture_content').after(`
    			<div class="picture_content">
				    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this)" multiple>
					<i class="fa-solid fa-plus"></i>
				</div>
    	`);
    }
}

function delete_image(e) {
	setTimeout(function() {
		if($(e).closest('.small_picture_container').length>0){
			$(e).remove();
		}
		if($(e).closest('.thumbnail').length>0){
			
			const thumbnail = $(e).closest('.thumbnail');
			
			$(e).closest('.thumbnail').html(`
					<div class="picture_content">
						<input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this);" multiple>
						<i class="fa-solid fa-plus"></i>
					</div>
					<div class="picture_name">
						대표 프로필 사진
					</div>
			`);
			
			const match = $(thumbnail).closest('.cards').attr('class').match(/card_(\d+)/);
		    const index = match ? match[1] : undefined;
		    
			$(thumbnail).closest('.cards').removeClass('finished_column');
			if(!$(thumbnail).closest('.cards').hasClass('unfinished_column')){
				$(thumbnail).closest('.cards').addClass('unfinished_column');
			}
			
			$(thumbnail).closest('.modal').find(`[data-targetindex="${index}"]`).removeClass('finished_column');
			$(thumbnail).closest('.modal').find(`[data-targetindex="${index}"]`).removeClass('failed_column');
	    	
	    	if(!$(thumbnail).closest('.modal').find(`[data-targetindex="${index}"]`).hasClass('unfinished_column')){
	    		$(thumbnail).closest('.modal').find(`[data-targetindex="${index}"]`).addClass('unfinished_column');
			}
		}
    }, 1);
}

function check_thumbnail(e){
    const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
    const index = match ? match[1] : undefined;
    
	if($(e).closest('.thumbnail').find('input').val()==''){
		$(e).closest('.cards').removeClass('finished_column');
		if(!$(e).closest('.cards').hasClass('unfinished_column')){
			$(e).closest('.cards').addClass('unfinished_column');
		}
		
		$(e).closest('.modal').find(`[data-targetindex="${index}"]`).removeClass('finished_column');
		$(e).closest('.modal').find(`[data-targetindex="${index}"]`).removeClass('failed_column');
    	
    	if(!$(e).closest('.modal').find(`[data-targetindex="${index}"]`).hasClass('unfinished_column')){
    		$(e).closest('.modal').find(`[data-targetindex="${index}"]`).addClass('unfinished_column');
		}
		
	}
	
	if($(e).closest('.thumbnail').find('input').val()!=''){
		$(e).closest('.cards').removeClass('unfinished_column');
		if(!$(e).closest('.cards').hasClass('finished_column')){
			$(e).closest('.cards').addClass('finished_column');
		}
		
		$(e).closest('.modal').find(`[data-targetindex="${index}"]`).removeClass('unfinished_column');
		$(e).closest('.modal').find(`[data-targetindex="${index}"]`).removeClass('failed_column');
    	
    	if(!$(e).closest('.modal').find(`[data-targetindex="${index}"]`).hasClass('finished_column')){
    		$(e).closest('.modal').find(`[data-targetindex="${index}"]`).addClass('finished_column');
		}
	}
	
	clear_card($(e).closest('.modal'));
}

function mouse_over(e) {
	$(e).find('img').addClass('ready_to_delete');
	$(e).removeClass('have_img');
	$(e).addClass('to_gray');
	if ($(e).find('i').length === 0) {
		$(e).append(`<i class="fa-solid fa-xmark"></i>`);
		$(e).find('i').css('color', 'rgb(50,50,50)');
	}
	if ($(e).find('span').length === 0) {
		$(e).append(`<span>드래그 하여 이동</span>`);
	}
}

function mouse_leave(e) {
	$(e).find('img').removeClass('ready_to_delete');
	$(e).removeClass('to_gray');
	$(e).addClass('have_img');
	if ($(e).find('i').length != 0) {
		$(e).find('i').remove();
	}
	if ($(e).find('span').length != 0) {
		$(e).find('span').remove();
	}
}

function clear_card(container){
	var count = $(container).find('.cards').filter('.unfinished_column').length;
	var target = $(container).find('.last_submit');
	var hint = $(container).find('.submit_hint');
	
	if(count==0){
		target.removeClass(`unfinished_row`)
		if (!target.hasClass(`finished_row`)) {
			target.addClass(`finished_row`);
		}
		hint.removeClass('annotation_message');
		hint.removeClass('failed_message');
		if(!hint.hasClass('success_message')){
			hint.addClass('success_message');
		}
		hint.text('* 모든 정보를 입력하셨습니다.');
	}else{
		target.removeClass(`finished_row`)
		if (!target.hasClass(`unfinished_row`)) {
			target.addClass(`unfinished_row`);
		}
		hint.removeClass('success_message');
		hint.removeClass('failed_message');
		if(!hint.hasClass('annotation_message')){
			hint.addClass('annotation_message');
		}
		hint.text('* 미 입력 된 항목이 있습니다.');
	}
}

function check_submit(e){
	var button = $(e).find('.last_submit');
	var hint = $(e).find('.submit_hint');
	
	if(button.hasClass('finished_row')&&!button.hasClass('unfinished_row')){
		last_submit(e);
	}else{
		button.removeClass('finished_row').removeClass('unfinished_row');
		
		if (!button.hasClass('failed_row')&&!button.hasClass('shake')) {
			button.addClass('shake');
			button.addClass('failed_row');
		}
		
		hint.removeClass('success_message').removeClass('annotation_message');
			
		if (!hint.hasClass('failed_message')&&!hint.hasClass('shake')) {
			hint.addClass('shake');
			hint.addClass('failed_message');
		}
		
		setTimeout(function() {
			button.removeClass('finished_row').removeClass('failed_row').removeClass('shake');
			if (!button.hasClass('unfinished_row')) {
				button.addClass('unfinished_row');
			}
			hint.removeClass('success_message').removeClass('failed_message').removeClass('shake');
			if (!hint.hasClass('annotation_message')) {
				hint.addClass('annotation_message');
			}
	    }, 1000);
	}
}

function last_submit(e){
	var formData = new FormData();
	var isThumbnail = true;
	var user_private = 1;

    $(e).find(`input:not('.outform'), textarea:not('.outform'), select:not('.outform')`).each(function() {
        var name = $(this).attr('name');
        var value = $(this).val();       

        if (value) {
            if ($(this).is('select[name="user_private"]')) {
                user_private *= parseInt(value);
            } else if ($(this).is('input[name="user_profile"]')) {
                var files = $(this)[0].files;
                if (files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                    	if(isThumbnail){
                    		formData.append('user_thumbnail_file', files[i]);
                    		isThumbnail = false;
                    	}else{
                    		formData.append('user_profile_file', files[i]);
                    	}
                    }
                }
            } else if ($(this).is('input[type="radio"]:not(:checked)')) {
            	return;
            } else if ($(this).is('input[type="checkbox"]:not(:checked)')) {
            	return;
            } else if ($(this).is('input[name="user_birth"]')) {
                let dateParts = value.split('.');
                let isoDate = `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dateParts[2].padStart(2, '0')}`;
                formData.append('user_birth', isoDate);
            } else {
            	formData.append(name, value);
            }
        }
    });
    
    formData.append("user_private", user_private);
    
    console.log([...formData.entries()]);

    $.ajax({
    	type: 'POST',
        url: '/member/join',
        data: formData,
        processData: false, // FormData 사용 시 false로 설정
        contentType: false, // FormData 사용 시 false로 설정
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		alert('회원가입에 성공하였습니다.');
	    		window.location.href = '/member/login';
	    	}
	    	if(response==3){
	    		alert('입력하지 않은 항목이 있습니다.');
	    	}
	        console.log("데이터 전송 성공:", response);
	    },
	    error: function(error) {
	        console.log("데이터 전송 실패:", error);
	        alert('회원가입에 실패하였습니다.');
	    }
    });
}

function check_duple(input, callback){
	
	const inputValue = $(input).val();
	const target = $(input).attr('name');
	
	console.log('inputValue : ',inputValue);
	console.log('target : ',target);
	
	$.ajax({
    	type: 'GET',
        url: '/member/checkDuple',
        data: {target : target, data : inputValue},
        dataType: "json",
        success: function (response) {
	    	if(response>0){
	    		console.log(target,'duple!!!!');
	    		callback(response);
	    	}else{
	    		console.log(target,' is unique.');
	    		callback(response);
	    	}
	    },
	    error: function(error) {
	    	callback(null);
	    }
    });
}
