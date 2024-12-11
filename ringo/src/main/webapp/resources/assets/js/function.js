function format_date(stringDate,degree){
    if (!stringDate) return '';
    
    const date = new Date(stringDate);
    const realyear = String(date.getFullYear());
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    if(degree=='year'){
    	return `${year}.${month}.${day}  ${hours}:${minutes}`;
    }else if(degree=='day'){
    	return `${month}.${day}  ${hours}:${minutes}`;
    }else if(degree=='time'){
    	return `${hours}:${minutes}`;
    }else if(degree=='yymmdd'){
    	return `${realyear}년 ${month}월 ${day}일`;
    }
}

function auto_format_date(stringDate) {
    if (!stringDate) return '';
    
    const date = new Date(stringDate);
    const today = new Date();
    
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    
    if (date.getFullYear() === todayYear && date.getMonth() === todayMonth && date.getDate() === todayDate) {
        return `${hours}:${minutes}`;
    } else if (date.getFullYear() === todayYear) {
        return `${month}.${day} ${hours}:${minutes}`;
    } else {
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }
}

const spinner = `<div class="spinner"></div>
				<div class="overlay"></div>`;

function spin_start(e) {
    $(e).addClass('loading');
    $(e).append(spinner);
}

function spin_end(e) {
    $(e).removeClass('loading');
    $(e).find('.spinner').remove();
    $(e).find('.overlay').remove();
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

function remove_element(e){
	setTimeout(function() {
        $(e).remove();
    }, 1);
}

function row_toggle(target,e) {
	
	if($(target).hasClass('expanded')){
		$(target).removeClass('expanded');
		if(!$(target).hasClass('shrinked')){
			$(target).addClass('shrinked');
		}
	}else if($(target).hasClass('shrinked')){
		$(target).removeClass('shrinked');
		if(!$(target).hasClass('expanded')){
			$(target).addClass('expanded');
		}
	}
	if(e){
		const icon = $(e).find('i');
		if(icon.attr('class') == 'fas fa-chevron-circle-left'){
			icon.attr('class','fas fa-chevron-circle-right');
		}else if(icon.attr('class') == 'fas fa-chevron-circle-right'){
			icon.attr('class','fas fa-chevron-circle-left');
		}
	}
	if(e){
		const icon = $(e).find('i');
		if(icon.text() == 'arrow_right'){
			icon.text('arrow_left');
		}else if(icon.text() == 'arrow_left'){
			icon.text('arrow_right');
		}
	}
}

function rr_toggle(target,e) {
	
	if($(target).hasClass('expanded')){
		$(target).removeClass('expanded');
		if(!$(target).hasClass('rr_shrinked')){
			$(target).addClass('rr_shrinked');
		}
	}else if($(target).hasClass('rr_shrinked')){
		$(target).removeClass('rr_shrinked');
		if(!$(target).hasClass('expanded')){
			$(target).addClass('expanded');
		}
	}
}

function col_toggle(target,e) {
	
	if($(target).hasClass('expanded')){
		$(target).removeClass('expanded');
		if(!$(target).hasClass('col_shrinked')){
			$(target).addClass('col_shrinked');
		}
	}else if($(target).hasClass('col_shrinked')){
		$(target).removeClass('col_shrinked');
		if(!$(target).hasClass('expanded')){
			$(target).addClass('expanded');
		}
	}
	
	if($(e).hasClass('material-symbols-outlined')){
		if($(e).text()=='arrow_drop_down'){
			$(e).text('arrow_drop_up');
		}else if($(e).text()=='arrow_drop_up'){
			$(e).text('arrow_drop_down');
		}
	}else if(e){
		const icon = $(e).find('i');
		if(icon.attr('class') == 'fas fa-chevron-circle-down'){
			icon.attr('class','fas fa-chevron-circle-up');
		}else if(icon.attr('class') == 'fas fa-chevron-circle-up'){
			icon.attr('class','fas fa-chevron-circle-down');
		}
	}
}

function main_show(target) {
	$(`.main_card:not(.none)`).addClass('none');
	showing(`.main_card.main_${target}`);
	
	$(`.article_container_menu > :not(.article_container_menu_messenger):not([data-target="${target}"])`).removeClass('active');
	$(`.article_container_menu > [data-target="${target}"]`).addClass('active');
	
    if(target!='visit'){
    	$('.article_container_menu_added').find('.active').removeClass('active');
    	if(target!='unity'){
    		get_user_profile();
    	}
    }
    if(target=='visit'){
    	$('.article_container_menu').find('.active:not(.article_container_menu_messenger)').removeClass('active');
    }
    if(target=='unity' && unity==""){
    	unity_home();
    }
    if(target=='unity' && unity!=""){
    	get_unity_profile(unity);
    }
    if(target=='circle'){
    	if ($(".main_circle .main_card_body .scroll_box_inner").scrollTop() == 0 || $(".main_circle .main_card_body .scroll_box_inner").children().length ==0) {
    	    get_circle_post();
    	}
    }
}
function main_messenger() {
    if ($('.article_container_menu_messenger').hasClass('active')) {
    	if ($('.main_messenger_menu').hasClass('expanded')) {
    		$('.main_messenger').css('width','400px');
    		row_toggle('.main_messenger_menu');
            $('.messenger_button').find('i').removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
        }
    	row_toggle('.main_messenger');
    	
    	$('.article_container_menu_messenger').removeClass('active');
    }else {
    	row_toggle('.main_messenger');
    	
    	$('.article_container_menu_messenger').addClass('active');
    }
    
}
function main_messenger_menu(e){
	var icon = $(e).find('i');
    if (icon.text() == ('arrow_left')) {
    	get_messenger_menu();
    	$('.main_messenger').css('width','650px');
    	row_toggle('.main_messenger_menu');
    	
    	setTimeout(function() {
    		icon.text('arrow_right');
    	}, 300);
    }
    else if (icon.text() == ('arrow_right')) {
    	$('.main_messenger').css('width','400px');
    	row_toggle('.main_messenger_menu');
        
        setTimeout(function() {
        	icon.text('arrow_left');
        }, 300);
    }
    
    /*if(mr_code != null && mr_code != ""){
    	console.log('gogo');
    	console.log($('.mm_container'));
    	console.log($('.mm_container').find('.messenger_menu_content').find('.card_person'));
    	
    	$('.mm_container').find('.card_person_tools').each(function() {
    		console.log('gotit');
    		$(this).append(`
    			<div class="card_person_tool">
	                <i class="material-symbols-outlined" onclick="invite_mr($(this).closest('.card_person').data('user_code'))">person_add</i>
	            </div>`);
        });
    	
    	
    	
    	
    }*/
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
	row_toggle('.detail_profile_container');

    if (icon.hasClass('fa-chevron-circle-right')) {
    	profile_favorite('.detail_profile_container_menu.favorite');
    	
    	setTimeout(function() {
	        icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-left')) {
        setTimeout(function() {
        	icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
        }, 300);
    }
}

function alarm_container(e) {
    var icon = $(e).find('i');
    row_toggle('.alarm_container');

    if (icon.hasClass('fa-chevron-circle-right')) {
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
    	}, 300);
    }
    else if (icon.hasClass('fa-chevron-circle-left')) {
    	setTimeout(function() {
    		icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
    	}, 300);
    }
}

function toggle_card(container,targetindex,direction){
	const prev = $(container).find('.prev');
	const next = $(container).find('.next');
	
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
	    	if(prev.hasClass('expanded')){
	    		row_toggle(prev);
	    	}
	    	if(next.hasClass('shrinked')){
	    		row_toggle(next);
	    	}
	    }
	    if(targetindex==$(container).find('.cards').length){
	    	if(prev.hasClass('shrinked')){
	    		row_toggle(prev);
	    	}
	    	if(next.hasClass('expanded')){
	    		row_toggle(next);
	    	}
	    }
	    if(targetindex!=1 && targetindex!=$(container).find('.cards').length){
	    	if(prev.hasClass('shrinked')){
	    		row_toggle(prev);
	    	}
	    	if(next.hasClass('shrinked')){
	    		row_toggle(next);
	    	}
	    }
	}
	
	if(targetindex===0 && direction!=0){
		$(container).find('.active').removeClass('active');
		
		const currentIndex = parseInt($(container).find('.floor_1').attr('class').split("_")[1]);
	    const totalCards = $(container).find('.cards').length;
	    
	    if(direction===-1){
	    	if(next.hasClass('shrinked')){
	    		row_toggle(next);
	    	}
	    	if (currentIndex === 2) {
	    		if(prev.hasClass('expanded')){
		    		row_toggle(prev);
		    	}
	        }
	    	if (currentIndex === 1) {
	    		$(container).find(`[data-targetindex="${1}"]`).addClass('active');
	        }
	    }
	    
	    if(direction===1){
	    	if(prev.hasClass('shrinked')){
	    		row_toggle(prev);
	    	}
	    	if (currentIndex === totalCards-1) {
	    		if(next.hasClass('expanded')){
		    		row_toggle(next);
		    	}
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

function validate_unity_name(input,update) {
	
	const unity_name = $(input).val();
    
    if (unity_name === '') {
        set_unfinished(input, 'row');
        set_hint(input, '* 4~30자리의 유니티 이름을 입력 해주세요.', 'annotation_message');
    }
    else if (unity_name.startsWith('_')) {
        set_failed(input, 'row');
        set_hint(input, `* 유니티 이름은 '_' 로 시작할 수 없습니다.`, 'failed_message');
    }
    else if (!/^[가-힣a-zA-Z0-9_\-\[\]:=\+\*\^&% .,]+$/.test(unity_name)) {
        set_failed(input, 'row');
        set_hint(input, '* 사용할 수 없는 문자가 포함되어 있습니다.', 'failed_message');
    }
    else if (unity_name.length < 4 || unity_name.length > 30) {
        set_failed(input, 'row');
        set_hint(input, '* 유니티 이름은 4~30자리여야 합니다.', 'failed_message');
    }
    else{
    	check_duple(input, function(response) {
    		if (response==1 && update != 'update') {
    	        set_failed(input, 'row');
    	        set_hint(input, '* 이미 사용중인 유니티 이름입니다.', 'failed_message');
    	        return;
    	    }
	    	else {
	            set_finished(input, 'row');
	            set_hint(input, '* 사용할 수 있는 유니티 이름입니다.', 'success_message');
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
	if($(e).closest('.join_modal').length>0){
		const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
		const index = match ? match[1] : undefined;
		check_finished(index,'.join_modal');
	}
	
	if($(e).closest('.unity_create_container').length>0){
		clear_unity_create_container(e);
	}
	if($(e).closest('.unity_modify_container').length>0){
		clear_unity_create_container($('.unity_modify_container'));
	}
}

function set_unfinished(e, direction) {
	const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}, .failed_${direction}`);
    target.removeClass(`failed_${direction}`);
    if (!target.hasClass(`unfinished_${direction}`)) {
        target.removeClass(`finished_${direction}`).addClass(`unfinished_${direction}`);
    }
    if($(e).closest('.join_modal').length>0){
	    const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
	    const index = match ? match[1] : undefined;
	    check_finished(index,'.join_modal');
    }
    
    if($(e).closest('.unity_create_container').length>0){
		clear_unity_create_container(e);
	}
	if($(e).closest('.unity_modify_container').length>0){
		clear_unity_create_container($('.unity_modify_container'));
	}
}

function set_failed(e, direction) {
	const target = $(e).closest(`.finished_${direction}, .unfinished_${direction}, .failed_${direction}`);
    if (!target.hasClass(`failed_${direction}`)) {
    	target.removeClass(`finished_${direction}`).removeClass(`unfinished_${direction}`).addClass(`failed_${direction}`);
    }
    if($(e).closest('.join_modal').length>0){
	    const match = $(e).closest('.cards').attr('class').match(/card_(\d+)/);
	    const index = match ? match[1] : undefined;
	    check_finished(index,'.join_modal');
    }
    
    if($(e).closest('.unity_create_container').length>0){
		clear_unity_create_container(e);
	}
	if($(e).closest('.unity_modify_container').length>0){
		clear_unity_create_container($('.unity_modify_container'));
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
	    	if($(e).closest('.input_box').next('.selected_card_container').hasClass('col_shrinked')){
	    		col_toggle($(e).closest('.input_box').next('.selected_card_container'));
	    	}
	    	set_finished(e,'row');
	        hiddenInput.val(value);
	    }
		
		$(e).closest('.input_box').next('.selected_card_container').append(`
			<div class="selected_card expanded" data-value="${value}" onclick="delete_card(this)">
				<i class="fa-solid fa-circle-xmark"></i>
				${text}
			</div>
		`);
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
            hiddenInput.val(currentValue.replace(deleteValue, ''));
        } else if (currentValue.includes(deleteValue + ',')) {
            hiddenInput.val(currentValue.replace(deleteValue + ',', ''));
        } else {
            hiddenInput.val(currentValue.replace(',' + deleteValue, ''));
        }
    }
	
    if (!$(e).siblings().length) {
    	if($(e).closest('.selected_card_container').hasClass('expanded')){
    		col_toggle($(e).closest('.selected_card_container'));
    	}
        set_unfinished($(e).closest('.selected_card_container').prev('.input_box').find('select'),'row');
    }
    setTimeout(function() {
        $(e).remove();
    }, 1);
    
}

function add_image(input) {
    var file = input.files[0];
    
    if (file) {
        var reader = new FileReader();

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
            hide(input);
            showing($(input).next('img'));
        };

        reader.readAsDataURL(file);
    }
    
    if($(input).closest('.small_picture_container').length>0){
    	$(input).closest('.picture_content').after(`
			<div class="picture_content">
			    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this)" multiple>
				<i class="material-symbols-outlined">add</i>
			</div>
    	`);
    }
    
    if($(input).closest('.unity_banner').length>0){
    	setTimeout(function() {
    		
    		if($(input).closest('.unity_modify_container').length>0){
    			select_banner_setting('modify');
    			clear_unity_create_container($('.unity_modify_container'));
    		}else{
    			select_banner_setting('create');
    			clear_unity_create_container(input);
    		}
    		$(input).closest('.picture_content').next('img').css('transition','object-position 0s');
    	},10);
    }
}

function delete_image(e) {
	
	setTimeout(function() {
		if($(e).closest('.small_picture_container').length>0){
			$(e).remove();
		}
		if($(e).closest('.thumbnail').length>0){
			
			const thumbnail = $(e).closest('.thumbnail');
			
			thumbnail.html(`
				<div class="picture_content">
					<input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this);" multiple>
					<i class="material-symbols-outlined">add</i>
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
		
		if($(e).closest('.unity_thumbnail').length>0){
			console.log('ut');
			
			const unity_thumbnail = $(e).closest('.unity_thumbnail');
			
			unity_thumbnail.html(`
				<div class="picture_content unity_thumbnail_preview">
				    <input type="file" name="unity_thumbnail_file" class="picture_input" accept="image/*" onchange="add_image(this); clear_unity_create_container(this);">
					<i class="material-symbols-outlined">add</i>
				</div>
				<div class="picture_name">유니티 썸네일</div>
			`);
			if($(e).closest('.unity_modify_container').length>0){
				console.log('umc!!');
				clear_unity_create_container($('.unity_modify_container'));
			}
		}
		
		if($(e).closest('.unity_banner').length>0){
			const isUMC = $(e).closest('.unity_modify_container').length;
			
			const unity_banner = $(e).closest('.unity_banner');
			$(e).remove();
			unity_banner.prepend(`
				<div class="picture_content unity_banner_preview">
				    <input type="file" name="unity_banner_file" class="picture_input" accept="image/*" onchange="add_image(this); clear_unity_create_container(this);">
					<i class="material-symbols-outlined">add</i>
				</div>
			`);
			if(isUMC>0){
				clear_unity_create_container($('.unity_modify_container'));
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
	if($(e).closest('.join_modal').length>0){
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
	
	if($(e).hasClass('upload_file')){
		$(e).find('img').addClass('ready_to_delete');
		if ($(e).find('i').length === 0) {
			$(e).find('.preview_image').append(`<i class="fa-solid fa-xmark"></i>`);
			$(e).find('i').css('color', 'rgb(50,50,50)');
		}
	}
	
	if($(e).hasClass('unity_thumbnail_preview')||$(e).hasClass('unity_banner_preview')){
		$(e).find('img').addClass('ready_to_delete');
		if ($(e).find('i').length === 0) {
			$(e).removeClass('have_img');
			$(e).addClass('to_gray');
			$(e).append(`<i class="fa-solid fa-xmark"></i>`);
			$(e).find('i').css('color', 'rgb(50,50,50)');
		}
	}
}

function mouse_leave(e) {
	if($(e).closest('.join_modal').length>0){
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
	
	if($(e).hasClass('upload_file')){
		$(e).find('img').removeClass('ready_to_delete');
		setTimeout(function() {
			$(e).find('i').remove();
		}, 1);
	}
	
	if($(e).hasClass('unity_thumbnail_preview')||$(e).hasClass('unity_banner_preview')){
		$(e).find('img').removeClass('ready_to_delete');
		$(e).removeClass('to_gray');
		$(e).addClass('have_img');
		if ($(e).find('i').length != 0) {
			$(e).find('i').remove();
		}
	}
}

function clear_card(container){
	
	var count = $(container).find('.cards').filter('.unfinished_column').length + $(container).find('.cards').filter('.failed_column').length;
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

function clear_unity_create_container(e){
	
	var container;
	var count;
	var target;
	var hint;
	var thumbnail;
	var banner;
	
	if($(e).hasClass('unity_modify_container')){
		container = $(e);
	}else{
		container = $(e).closest('.unity_create_container');
	}
	
	if(container && container.hasClass('unity_create_container')){
		count = container.find(':not(.last_submit)').filter('.unfinished_row').length + container.find(':not(.last_submit)').filter('.failed_row').length;
		target = container.find('.last_submit');
		hint = container.find('.submit_hint');
		thumbnail = container.find('input[name="unity_thumbnail_file"]').val();
		banner = container.find('input[name="unity_banner_file"]').val();
		
	}else if(container && container.hasClass('unity_modify_container')){
		count = container.find(':not(.last_submit)').filter('.unfinished_row').length + container.find(':not(.last_submit)').filter('.failed_row').length;
		hint = $('.in_unity_modify_container').find('.submit_hint');
		target = $('.unity_modify_container_buttons').find('.last_submit');
		thumbnail = container.find('.unity_thumbnail_preview').find('img').length;
		banner = container.find('.unity_banner_preview').find('img').length;
	}
	
	if(thumbnail != null && banner != null){
		if(thumbnail != 0 && banner != 0 && count==0){
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
}

function check_submit(e){
	var button = $(e).find('.last_submit');
	var hint = $(e).find('.submit_hint');
	
	if(button.hasClass('finished_row')&&!button.hasClass('unfinished_row')){
		if(e=='.unity_create_container'){
			create_unity();
		}
		if(e=='.join_modal'){
			last_submit(e);
		}
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

function unity_home(){
	if($('.unity_write').hasClass('expanded')){
		col_toggle('.unity_write');
	}
	
	get_user_profile();
	
	hide('.in_unity');
	showing('.unity_home');
	
	hide('.unity_create_container');
	showing('.unity_main_container');
	
	hide('.unity_main_title');
	showing('.unity_home_title');
	
	get_unities();
}
function show_modify_unity(unity_code){
	if($('.unity_write').hasClass('expanded')){
		col_toggle('.unity_write');
	}
	hide('.in_unity_post');
	hide('.unity_home_title');
	hide('.unity_home');
	hide('.in_unity_modify');
	hide('.unity_create_container');
	hide('.in_unity_main');
	showing('.in_unity_modify');
	
	get_modify_unity(unity_code);
}
function enter_unity_main(e){
	if(e == null){
		e = unity;
	}
	
	if($('.unity_write').hasClass('expanded')){
		col_toggle('.unity_write');
	}
	hide('.in_unity_modify');
	hide('.unity_create_container');
	showing('.unity_main_container');
	
	hide('.unity_home');
	showing('.in_unity');
	
	hide('.unity_home_title');
	showing('.unity_main_title');
	
	hide('.in_unity_post');
	showing('.in_unity_main');
	
	get_unity_main(e);
	
	if(profile_target != e){
		get_unity_profile(e);
	}
}

function enter_room(data){
	hide('.out_of_room');
	showing('.in_room');
	$('.messenger_navbar_nickname').text('');
	$('.messenger_navbar_nickname').removeAttr('data-user_code');
	mr_code = data;
	msg_target = "";
	get_msg(data);
	$('#input_msg_content').val();
	msg_posting_files = [];
	connect_in_msg_room(data);
	init_recorder();
	pauseMsgCode = [];
	if($('.messenger_option').hasClass('expanded')){
		rr_toggle('.messenger_option');
	}
}

function exit_room(e){
	hide('.in_room');
	showing('.out_of_room');
	$('.messenger_navbar_nickname').text('');
	$('.messenger_navbar_nickname').removeAttr('data-user_code');
	mr_code = "";
	get_msg_room_list();
	$('#input_msg_content').val();
	msg_posting_files = [];
	disconnect_in_msg_room();
	init_recorder();
	pauseMsgCode = [];
	if($('.messenger_option').hasClass('expanded')){
		rr_toggle('.messenger_option');
	}
}

function check_profile_button(){
	const top=$('.profile_button_container .container_side_button_section.top');
	const bottom=$('.profile_button_container .container_side_button_section.bottom');
	const left=$('.profile_button_container .container_side_button_section.left');
	const right=$('.profile_button_container .container_side_button_section.right');
	
	if(profile_type=='person'){
		if(profile_length==0){
			if(!left.hasClass('none')){
				left.addClass('none');
			}
			if(right.hasClass('none')){
				right.removeClass('none');
			}
			if(!top.hasClass('none')){
				top.addClass('none');
			}
			if(!bottom.hasClass('none')){
				bottom.addClass('none');
			}
		}else if(profile_length==1){
			if(!left.hasClass('none')){
				left.addClass('none');
			}
			if(!right.hasClass('none')){
				right.addClass('none');
			}
			if(top.hasClass('none')){
				top.removeClass('none');
			}
			if(bottom.hasClass('none')){
				bottom.removeClass('none');
			}
		}else if(profile_length==2){
			if(left.hasClass('none')){
				left.removeClass('none');
			}
			if(!right.hasClass('none')){
				right.addClass('none');
			}
			if(!top.hasClass('none')){
				top.addClass('none');
			}
			if(!bottom.hasClass('none')){
				bottom.addClass('none');
			}
		}
	}else if(profile_type=='unity'){
		if(profile_length==0){
			if(!left.hasClass('none')){
				left.addClass('none');
			}
			if(right.hasClass('none')){
				right.removeClass('none');
			}
			if(!top.hasClass('none')){
				top.addClass('none');
			}
			if(!bottom.hasClass('none')){
				bottom.addClass('none');
			}
		}else if(profile_length==1){
			if(left.hasClass('none')){
				left.removeClass('none');
			}
			if(!right.hasClass('none')){
				right.addClass('none');
			}
			if(!top.hasClass('none')){
				top.addClass('none');
			}
			if(!bottom.hasClass('none')){
				bottom.addClass('none');
			}
		}else if(profile_length==2){
			if(left.hasClass('none')){
				left.removeClass('none');
			}
			if(!right.hasClass('none')){
				right.addClass('none');
			}
			if(!top.hasClass('none')){
				top.addClass('none');
			}
			if(!bottom.hasClass('none')){
				bottom.addClass('none');
			}
			if($('.detail_profile_container').hasClass('expanded')){
				shrink_profile();
			}
		}
		
	}
}

function expand_profile(){
	if(profile_length==0){
		row_toggle('.profile_container');
		profile_length=1;
	}else if(profile_length==1){
		row_toggle('.detail_profile_container');
		profile_length=2;
	}
}

function shrink_profile(){
	if(profile_length==2){
		row_toggle('.detail_profile_container');
		profile_length=1;
	}else if(profile_length==1){
		row_toggle('.profile_container');
		profile_length=0;
	}
}

function prev_link_card(e){
	const current_card = $('.link_card_container_footer').find('.small_link_card.active');
	toggle_link_card(current_card.prev());
}

function next_link_card(e){
	const current_card = $('.link_card_container_footer').find('.small_link_card.active');
	toggle_link_card(current_card.next());
}

function toggle_link_card(e){
	const user_code =$(e).attr('data-user_code');
	const prev = $('.link_card_container').find('.prev');
	const next = $('.link_card_container').find('.next');
	
	$(e).siblings().removeClass('active');
	$(e).addClass('active');
	
	setTimeout(function() {
		const target_index = $('.link_card_container_footer').find('.small_link_card.active').index();
		const last_index = $('.link_card_container_footer').find('.small_link_card').length;
		
		if(!target_index==0 && target_index!=(last_index-1)){
			console.log('center');
			if(next.hasClass('shrinked')){
				row_toggle(next);
			}
			if(prev.hasClass('shrinked')){
				row_toggle(prev);
			}
		}else if(target_index==0){
			if(next.hasClass('shrinked')){
				row_toggle(next);
			}
			if(prev.hasClass('expanded')){
				row_toggle(prev);
			}
		} else if(target_index==(last_index-1)){
			if(next.hasClass('expanded')){
				row_toggle(next);
			}
			if(prev.hasClass('shrinked')){
				row_toggle(prev);
			}
		} 
	}, 1);
	
	hide('.link_card');
	
	$(`.link_card`).html(`
		<div class="card_body">
			<div class="card_body_content">
				<div class="image_container">
					<div class="image_main">
						<img src="/files/profiles/"/>
					</div>
					<div class="image_queue">
						<div class="image_queue_belt">
							<div class="image_waiting">
								<img src="/files/profiles/"/>
							</div>
						</div>
					</div>
				</div>
				<div class="link_info">
					<div class="scroll_x">
						${user_code}
					</div>
				</div>
			</div>
			<div class="card_body_tags">
				#자주 사용하는 태그
				<div class="tag_card">#asd</div>
			</div>
			<div class="card_body_buttons">
				<div class="button">
					<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
				</div>
				<div class="button">
					<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
				</div>
				<div class="button">
					<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
				</div>
				<div class="button">
					<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
				</div>
			</div>
		</div>
	`);
	setTimeout(function() {
        showing('.link_card');
    }, 100);
}

function open_itf(e){
	const fileInput = $(e).find('input[type="file"]');
    if (fileInput.length > 0) {
        fileInput[0].click(); // JavaScript 기본 메서드로 이벤트 트리거
    }
}

function upload_file(e) {
	
    const files = e.files;
    var container;
    
    if($(e).closest('.messenger_input').length>0){
    	container = $(e).closest('.messenger_input').find('.upload_files');
    }else{
    	container = $(e).closest('.card').find('.upload_files');
    }
    
    if($(e).closest('.circle_write').length>0){
    	
    	if (files.length > 0) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onload = function (event) {
                    container.append(`
                    	<div class="upload_file" data-file_index="${circle_posting_files.length}" onclick="delete_file(this)" onmouseleave="mouse_leave(this)" onmouseover="mouse_over(this)">
    						<div class="preview_image">
    							<img src="${event.target.result}"/>
    						</div>
    						<div class="preview_file_name">
    							${file.name}
    						</div>
    					</div>
                    `);
                    circle_posting_files.push(file);
                };
                
                reader.readAsDataURL(file);
            });
        }
    }
    if($(e).closest('.unity_write').length>0){
    	
    	if (files.length > 0) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onload = function (event) {
                    container.append(`
                    	<div class="upload_file" data-file_index="${unity_posting_files.length}" onclick="delete_file(this)" onmouseleave="mouse_leave(this)" onmouseover="mouse_over(this)">
    						<div class="preview_image">
    							<img src="${event.target.result}"/>
    						</div>
    						<div class="preview_file_name">
    							${file.name}
    						</div>
    					</div>
                    `);
                    unity_posting_files.push(file);
                };
                
                reader.readAsDataURL(file);
            });
        }
    }
    
    if($(e).closest('.messenger_input').length>0){
    	if (files.length > 0) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onload = function (event) {
                    container.append(`
                    	<div class="upload_file" data-file_index="${msg_posting_files.length}" onclick="delete_file(this)" onmouseleave="mouse_leave(this)" onmouseover="mouse_over(this)">
    						<div class="preview_image">
    							<img src="${event.target.result}"/>
    						</div>
    						<div class="preview_file_name">
    							${file.name}
    						</div>
    					</div>
                    `);
                    msg_posting_files.push(file);
                };
                
                reader.readAsDataURL(file);
            });
        }
    }
    
	if(container.hasClass('col_shrinked')){
		col_toggle(container);
	}
}

function delete_file(e) {
	
	const index = $(e).attr('data-file_index');
	
	var container;
    
    if($(e).closest('.messenger_input').length>0){
    	container = $(e).closest('.messenger_input').find('.upload_files');
    }else{
    	container = $(e).closest('.card').find('.upload_files');
    }
	
	if($(e).closest('.circle_write').length>0){
		
		circle_posting_files.splice(index, 1);
		
		setTimeout(function() {
	        $(e).remove();
	        
	        const files = container.find('.upload_file');
	        files.each(function(new_index) {
	        	$(this).attr('data-file_index', new_index);
	        });
	        
	        if(circle_posting_files.length == 0 && container.hasClass('expanded')){
	        	col_toggle(container);
	        }
	    }, 1);
		
	}
	
	if($(e).closest('.unity_write').length>0){
		
		unity_posting_files.splice(index, 1);
		
		setTimeout(function() {
	        $(e).remove();
	        
	        const files = container.find('.upload_file');
	        files.each(function(new_index) {
	        	$(this).attr('data-file_index', new_index);
	        });
	        
	        if(unity_posting_files.length == 0 && container.hasClass('expanded')){
	        	col_toggle(container);
	        }
	    }, 1);
		
	}
	
	if($(e).closest('.messenger_input').length>0){
		
		msg_posting_files.splice(index, 1);
		
		setTimeout(function() {
			$(e).remove();
			
			const files = container.find('.upload_file');
			files.each(function(new_index) {
				$(this).attr('data-file_index', new_index);
			});
			
			if(msg_posting_files.length == 0 && container.hasClass('expanded')){
				col_toggle(container);
			}
		}, 1);
	}
}

function add_tag(e){
	
	if($(e).val()==''){
		return;
	}
	
	if($(e).closest('.card_body_tags').length>0){
		$(e).after(`
			<div class="tag_card expanded" data-tag="${$(e).val()}" onclick='delete_tag(this)'>#${$(e).val()}</div>
		`);
		$(e).val('');
		
		return;
	}else{
		$(e).closest('.input_box').next('.selected_card_container').append(`
			<div class="tag_card expanded" data-tag="${$(e).val()}" onclick='delete_tag(this)'>#${$(e).val()}</div>
		`);
		$(e).val('');
		
		if($(e).closest('.input_box').next('.selected_card_container').hasClass('col_shrinked')){
			col_toggle($(e).closest('.input_box').next('.selected_card_container'));
		}
		
		set_hint(e,'* 입력이 완료되었습니다.','success_message');
		set_finished(e, 'row');
		
		return;
	}
}

function delete_tag(e){
	const container = $(e).closest('.selected_card_container');
	
	setTimeout(function() {
		$(e).remove();
		
		if(container.closest('.unity_infos').length>0 && container.find('.tag_card').length==0){
			
			set_hint(container.prev('.input_box').find('input'),'* 유니티를 표현하는 태그를 입력해주세요.','annotation_message');
			set_unfinished(container.prev('.input_box').find('input'), 'row');
			
			if(container.hasClass('expanded')){
				col_toggle(container);
			}
		}else if(container.closest('.unity_modify_container').length>0 && container.find('.tag_card').length==0){
			
			set_hint(container.prev('.input_box').find('input'),'* 유니티를 표현하는 태그를 입력해주세요.','annotation_message');
			set_unfinished(container.prev('.input_box').find('input'), 'row');
			
			if(container.hasClass('expanded')){
				col_toggle(container);
			}
		}
	
    }, 1);
}

function invalidate_write_container(target){
	const container = $(`.main_${target}`).find('.write_container');
	
	if(target=='circle'){
		circle_posting_files = [];
	}
	if(target=='unity'){
		unity_posting_files = [];
	}
		
	container.find('.tag_card').remove();
	container.find('.upload_files').empty();
	container.find('textarea').val('');
	container.find('input').val('');
	
	if($(`.${target}_write`).find('.upload_files').hasClass('expanded')){
		col_toggle(container.find('.upload_files'));
	}
	if($(`.${target}_write`).hasClass('expanded')){
		col_toggle(`.${target}_write`);
	}
}

function visit(user_code,e){
	
	if(user_code == current_user){
		main_show('circle');
		return;
	}
	
	var thumbnail;
	var nickname;
	
	if($(e).closest('.card_comment').length>0){
		const container = $(e).closest('.card_comment');
		thumbnail = container.find('.card_comment_thumbnail img').attr('src');
		nickname = container.find('.card_comment_nickname').text();
	}else if($(e).closest('.card').length>0){
		const container = $(e).closest('.card');
		thumbnail = container.find('.card_header_image img').attr('src');
		nickname = container.find('.card_header_nickname').text();
	}else if($(e).closest('.person_card').length>0){
		const container = $(e).closest('.person_card');
		thumbnail = container.find('img').attr('src');
		nickname = container.find('span').text();
	}else if($(e).closest('.message_box_received').length>0){
		const container = $(e).closest('.message_box_received');
		thumbnail = container.find('img').attr('src');
		nickname = container.find('.message_sender_nickname').text();
	}else if($(e).closest('.card_person').length>0){
		const container = $(e).closest('.card_person');
		thumbnail = container.find('img').attr('src');
		nickname = container.find('.card_person_info_nickname').text();
	}
	
	$('.added_menu_inner').find('.person_card.active').removeClass('active');
	
	if($('.added_menu_inner').find(`[data-user_code="${user_code}"]`).length == 0){
		$('.added_menu_inner').prepend(`
			<div class="person_card shrinked active" data-user_code="${user_code}" onclick="visit('${user_code}',this);">
				<img class="small_img" src="${thumbnail}"/>
				<span>${nickname}</span>
				<i class="fa-solid fa-circle-xmark" onclick="delete_person_card(event)"></i>
			</div>`
		);
	}else if(!$(`.added_menu_inner > [data-user_code="${user_code}"]`).is(':first-child')){
		$('.added_menu_inner > [data-user_code="${user_code}"]').remove();
		$('.added_menu_inner').prepend(`
			<div class="person_card shrinked active" data-user_code="${user_code}" onclick="visit('${user_code}',this);">
				<img src="${thumbnail}"/>
				<span>${nickname}</span>
				<i class="fa-solid fa-circle-xmark" onclick="delete_person_card(event)"></i>
			</div>`
		);
	}else{
		$(`.added_menu_inner > [data-user_code="${user_code}"]`).addClass('active');
	}
	
	setTimeout(function() {
		if($('.added_menu_inner').find(`[data-user_code="${user_code}"]`).hasClass('shrinked')){
			row_toggle($('.added_menu_inner').find(`[data-user_code="${user_code}"]`));
		}
		if($('.article_container_menu_added').hasClass('col_shrinked')){
			col_toggle('.article_container_menu_added');
		}
    }, 1);
	
	$('.visit_target').text(nickname);
	get_user_profile(user_code);
	get_circle_post(user_code);
	main_show('visit');
}

function delete_person_card(event) {
    event.stopPropagation();
    $(event.target).closest('.person_card').remove();
    if($('.added_menu_inner').find('.person_card').length==0 && $('.article_container_menu_added').hasClass('expanded')){
    	col_toggle('.article_container_menu_added');
    }
}

function select_banner_setting(e) {
	
	var container;
	
	if(e == 'create'){
		container = $('.unity_create_container');
	}else if(e == 'modify'){
		container = $('.unity_modify_container');
	}
	
	if(container){
		const horizon = container.find('#banner_horizontal_value').val();
		const vertical = container.find('#banner_vertical_value').val();
		const color = container.find('#banner_color_value').val();
		
		const banner_setting = `background-color: ${color}; object-position: ${horizon}% ${vertical}%;`;
		container.find('input[name="unity_banner_set"]').val(banner_setting);
		
		const img = container.find('.unity_banner_preview').find('img')[0];
		
		if(img!=null){
			img.style.cssText = banner_setting;
		}
	}
}

function expand_create_unity(){
	if($('.unity_create_container').hasClass('none')){
		showing('.unity_create_container');
		if(!$('.unity_main_container').hasClass('none')){
			hide('.unity_main_container');
		}
	}else{
		hide('.unity_create_container');
		if($('.unity_main_container').hasClass('none')){
			showing('.unity_main_container');
		}
	}
}

function inner_box_toggle(e){
	if($(e).next('.inner_content').hasClass('expanded')){
		$(e).find('i').last().text('arrow_drop_down');
		col_toggle($(e).next('.inner_content'));
		$(e).closest('.inner_box').css('max-height','30px');
	}else {
		$(e).find('i').last().text('arrow_drop_up');
		col_toggle($(e).next('.inner_content'));
		$(e).closest('.inner_box').css('max-height','1000px');
	}
}

function enter_unity_board(method,e){
	
	origin_page = 1;
	current_page = 1;
	showingCard = [];
	
	$('.unity_board_names').find('.rounding').removeClass('rounding');
	
	hide('.in_unity_modify');
	hide('.unity_create_container');
	showing('.unity_main_container');
	
	hide('.unity_home');
	showing('.in_unity');
	
	hide('.unity_home_title');
	showing('.unity_main_title');
	
	hide('.in_unity_main');
	showing('.in_unity_post');
	
	var post_place = "";
	var unity_code = "";
	
	if(method=='return'){
		post_place = e;
		ub_code = e;
		$('#unity_board_info').attr('data-ub_board_code',e);
		setTimeout(() => {
			$('.unity_cards').animate({
	            scrollTop: 0
	        }, 500);
		}, 100);
	}
	if(method=='board'){
		post_place = $(e).attr('data-ub_board_code');
		ub_code = $(e).attr('data-ub_board_code');
		$('#unity_board_info').attr('data-ub_board_code',$(e).attr('data-ub_board_code'));
	}
	
	unity_code = post_place.split('_').slice(0, 2).join('_');
	
	unity = unity_code;
	
	get_unity_board_info(post_place);
	get_unity_board(post_place,1);
	get_unity_post(post_place,null,1);
	
	setTimeout(() => {
		view_check();
	}, 1000);
	
	if(profile_target != unity_code){
		get_unity_profile(unity_code);
	}
	
	$('.unity_board_names').find(`[data-ub_board_code=${post_place}]`).addClass('rounding');
	$('#unity_post_place').find(`option[value="${post_place}"]`).prop('selected', true);
}

function enter_unity_post(e){
	showingCard = [];
	
	ub_code = $(e).attr('data-post_place');
	$('#unity_board_info').attr('data-ub_board_code',$(e).attr('data-ub_board_code'));
	$('.unity_board_names').find('.rounding').removeClass('rounding');
	
	hide('.unity_create_container');
	showing('.unity_main_container');
	
	hide('.unity_home');
	showing('.in_unity');
	
	hide('.unity_home_title');
	showing('.unity_main_title');
	
	hide('.in_unity_main');
	showing('.in_unity_post');
	
	var post_place = $(e).data('post_place');
	var post_code = $(e).data('post_code');
	var unity_code = post_place.split('_').slice(0, 2).join('_');
	
	unity = unity_code;
	
	get_unity_board_info(post_place);
	get_unity_board_post(post_place,post_code);
	
	if(profile_target != unity_code){
		get_unity_profile(unity_code);
	}
	
	$('.unity_board_names').find(`[data-ub_board_code=${post_place}]`).addClass('rounding');
	$('#unity_post_place').find(`option[value="${post_place}"]`).prop('selected', true);
}



var ub_code = "";
var showingCard = [];
var origin_page = "";
var current_page = "";
function view_check() {
	showingCard = [];
	$('.post_row').removeClass('looking');
	
	const $unityPosts = $('.unity_cards');
    const scrollTop = $unityPosts.scrollTop();
    const scrollBottom = scrollTop + $unityPosts.outerHeight();
    var new_page = "";
    
    $unityPosts.find(".card").each(function () {
        const $card = $(this);
        const cardOffsetTop = $card.offset().top - $unityPosts.offset().top + scrollTop;
        const cardOffsetBottom = cardOffsetTop + $card.outerHeight();

        if (cardOffsetBottom > scrollTop && cardOffsetTop < scrollBottom) {
        	
            const postCode = $card.data("post_code");
            showingCard.push($card.data("post_seq"));
            	
            if(showingCard.every(num => Math.ceil(num / 20) === Math.ceil(showingCard[0] / 20))){
            	current_page = Math.ceil(showingCard[0] / 20);
            }
            
            $('.post_row').each(function () {
                const $listItem = $(this);
                if ($listItem.data("post_code") == postCode) {
                    $listItem.addClass("looking");
                }
            });
        } else {
            const postCode = $card.data("post_code");
            $('.post_row').each(function () {
                const $listItem = $(this);
                if ($listItem.data("post_code") === postCode) {
                    $listItem.removeClass("looking");
                }
            });
        }
    });
    
	$('.page').removeClass('pressed');
	if(!$('.page').filter(`:contains('${current_page}')`).hasClass('pressed')){
		$('.page').filter(`:contains('${current_page}')`).addClass('pressed');
	}
    
    if(origin_page!==current_page){
    	get_unity_board(ub_code,current_page);
    	origin_page = current_page;
    	console.log('page change to',current_page);
    }
    
    $('.post_row').css('margin', '0px');
    $('.looking').first().css('margin-top', '5px');
    $('.looking').last().css('margin-bottom', '5px');
    
    if(!$('.page').filter(`:contains('${current_page}')`).hasClass('pressed')){
    	$('.page').removeClass('pressed');
    	$('.page').filter(`:contains('${current_page}')`).addClass('pressed');
    }
    
}

function get_unity_prev_post(finish){
	var first_code = $('.unity_cards').find('.card').first().data('post_code');
	
	if ($('.unity_cards .card').slice(0,10).is(`[data-post_seq="${showingCard[2]}"]`)) {
	    console.log('in first 5 cards');
    	add_unity_post(first_code,'up',finish);
	}
}

function get_unity_next_post(finish){
	var last_code = $('.unity_cards').find('.card').last().data('post_code');
	
	if ($('.unity_cards .card').slice(-10).is(`[data-post_seq="${showingCard[0]}"]`)) {
	    console.log('in last 5 cards');
    	add_unity_post(last_code,'down',finish);
	}
}

function isEmpty(obj) {
    if (obj == null) return true;
    if (Array.isArray(obj) && obj.length == 0) return true;
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] != null && obj[key] !== "") {
            return false;
        }
    }
    return true;
}

function scrollToPost(e) {
    
    const post_code = $(e).data('post_code');
	const container = $('.unity_cards');
    const post = container.find(`[data-post_code="${post_code}"]`);
    
    if (post.length) {
        const postOffsetTop = post.offset().top; 
        const containerOffsetTop = container.offset().top; 
        const scrollOffset = postOffsetTop - containerOffsetTop + container.scrollTop();

        container.animate({
            scrollTop: scrollOffset
        }, 500);

        setTimeout(function() {
        	post.addClass('shake');

            setTimeout(function() {
            	post.removeClass('shake');
            }, 1000);

            view_check();
        }, 500);
    } else {
    	enter_unity_post(e);
    }
}

function select_img(e){
	const main = $(e).closest('.image_container').find('.image_main').find('img');
	const subs = $(e).closest('.image_container').find('.image_queue_belt');
	const current = subs.find('.active');
	const target = $(e);
	current.removeClass('active');
	target.addClass('active');
	main.attr('src',target.find('img').attr('src'));
}
function prev_img(e){
	const main = $(e).closest('.image_container').find('.image_main').find('img');
	const subs = $(e).closest('.image_container').find('.image_queue_belt');
	const current = subs.find('.active');
	var prev = current.prev('.image_waiting');
	if(prev.length == 0){
		prev = subs.find('.image_waiting').last();
	}
	current.removeClass('active');
	prev.addClass('active');
	main.attr('src',prev.find('img').attr('src'));
}
function next_img(e){
	const main = $(e).closest('.image_container').find('.image_main').find('img');
	const subs = $(e).closest('.image_container').find('.image_queue_belt');
	const current = subs.find('.active');
	var next = current.next('.image_waiting');
	if(next.length == 0){
		next = subs.find('.image_waiting').first();
	}
	current.removeClass('active');
	next.addClass('active');
	main.attr('src',next.find('img').attr('src'));
}
function add_category(){
	const new_code = get_new_category_code();
	const new_board_code = new_code + '_' + 1;
	$('.new_category').after(`
		<div class="inner_box modify_board expanded moveable" data-ub_category_code="${new_code}">
			<div class="inner_title h30">
				<input id="ub_category_name" class="modify" type="text" value="새 카테고리">
				<div class="tiny_button_section">
					<i class="material-symbols-outlined" onclick="pull_up(this)">arrow_drop_up</i>
					<i class="material-symbols-outlined" onclick="push_down(this)">arrow_drop_down</i>
					<i class="material-symbols-outlined" onclick="add_board(this)">add</i>
					<i class="material-symbols-outlined" onclick="remove_category(this)">remove</i>
				</div>
			</div>
			<div class="inner_content expanded gap5">
				<div class="unity_board moveable" data-ub_board_code="${new_board_code}">
					<input id="ub_board_name" class="modify" type="text" value="새 게시판">
					<div class="tiny_button_section">
						<i class="material-symbols-outlined" onclick="pull_up(this)">arrow_drop_up</i>
						<i class="material-symbols-outlined" onclick="push_down(this)">arrow_drop_down</i>
						<i class="material-symbols-outlined" onclick="remove_board(this)">remove</i>
					</div>
				</div>
			</div>
		</div>`);
}
function remove_category(e){
	$(e).closest('.modify_board').addClass('deleted');
	$(e).closest('.modify_board').prepend(`
		<div class="overlay" onclick="cancle_remove(this)">
			<i class="material-symbols-outlined restore">refresh</i>
		</div>
	`);
}
function cancle_remove(e){
	$(e).closest('.deleted').find('.overlay').first().remove();
	$(e).closest('.deleted').first().removeClass('deleted');
}
function add_board(e){
	const new_code = get_new_board_code(e);
	$(e).closest('.modify_board').find('.unity_board').last().after(`
		<div class="unity_board moveable" data-ub_board_code="${new_code}">
			<input id="ub_board_name" class="modify" type="text" value="새 게시판">
			<div class="tiny_button_section">
				<i class="material-symbols-outlined" onclick="pull_up(this)">arrow_drop_up</i>
				<i class="material-symbols-outlined" onclick="push_down(this)">arrow_drop_down</i>
				<i class="material-symbols-outlined" onclick="remove_board(this)">remove</i>
			</div>
		</div>`);
}
function remove_board(e){
	$(e).closest('.unity_board').addClass('deleted');
	$(e).closest('.unity_board').prepend(`
		<div class="overlay" onclick="cancle_remove(this)">
			<i class="material-symbols-outlined restore">refresh</i>
		</div>
	`);
}
function pull_up(e){
	const target = $(e).closest('.moveable');
	const targetClass = target.attr('class').split(' ').join('.');
	const prev = target.prevAll(`.${targetClass}`).first();
    prev.before(target);
}
function push_down(e){
	const target = $(e).closest('.moveable');
	const targetClass = target.attr('class').split(' ').join('.');
	const next = target.nextAll(`.${targetClass}`).first();
    next.after(target);
}

function get_new_category_code(){
	const bc = $('.modify_board_container');
	const codes = [];
	bc.find('.modify_board').each(function() {
	    const code = $(this).data('ub_category_code');
	    codes.push(parseInt(code.split("_")[2], 10));
	});
	const new_code = (Math.max(...codes) + 1).toString();
    return unity+'_'+new_code;
}

function get_new_board_code(e){
	const bc = $(e).closest('.modify_board');
	const category_code = bc.data('ub_category_code')
	const codes = [];
	bc.find('.unity_board').each(function() {
	    const code = $(this).data('ub_board_code');
	    codes.push(parseInt(code.split("_")[3], 10));
	});
	const new_code = (Math.max(...codes) + 1).toString();
	
	console.log(codes);
    return category_code+'_'+new_code;
}
