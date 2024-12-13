let msg_posting_files = [];
let mr_code = "";
let msg_target = "";

function get_msg_room_list(){
	
	$.ajax({
        type: "GET",
        url: "/msg/roomList",
        dataType: "json",
        success: function(data) {
        	console.log('roomList:',data);
        	$('.messenger_rooms').empty();
        	for (const room of data) {
        		var place;
        		const result = `
    				<div class="messenger_room" data-mr_code="${room.mr_code}" onclick="enter_room('${room.mr_code}')">
	    				<div class="room_thumbnail">
	    				</div>
	    				<div class="room_body">
		    				<div class="room_name">${room.mr_name}</div>
		    				<div class="room_message">
			    				<div class="room_message_content">${room.mr_last_message.msg_content ? room.mr_last_message.msg_content : "첨부파일"}</div>
			    				<div class="room_message_time">${auto_format_date(room.mr_last_message.msg_time)}</div>
		    				</div>
		    			</div>
	    				${room.mr_alarm_count != 0 ? '<div class="room_unreadcount"><div class="badge">' + room.mr_alarm_count + '</div></div>' : ""}
					</div>
	    		`;
        		const $result = $(result);
        		
        		if(room.mr_thumbnail_path.includes(',')){
        			var imgs = room.mr_thumbnail_path.split(',');
        			imgs = imgs.slice(0, 4);
        			for(const img of imgs){
        				$result.find('.room_thumbnail').addClass('parted');
        				$result.find('.room_thumbnail').append(`
            				<img class="small_img" src="/files/user/profiles/${img}"/>
            			`);
        			}
        		}else if(isEmpty(room.mr_thumbnail_path)){
        			$result.find('.room_thumbnail').append(`
        					<i class="material-symbols-outlined na">person</i>
        				`);
        		}else{
        			$result.find('.room_thumbnail').append(`
        					<img class="small_img" src="/files/user/profiles/${room.mr_thumbnail_path}"/>
        				`);
        		}
        		if(room.mr_favorite){
        			place = 'favorite'
        		}else{
        			place = 'else'
        		}
        		$(`.messenger_rooms.${place}`).append($result);
        	}
        },
        error: function(xhr, status, error) {
        	console.log('roomList failed');
        }
	});
}

function input_msg(msg,type){
	
	const body = $('.messenger_content');
	
	if(type == 'system'){
		body.append(`
			<div class="system_msg">
				<div>${msg.msg_content}</div>
			</div>
		`);
		return;
	}
	
	var box;
	if(type == 'send'){
		box = 
			`<div class="msg message_box_send" data-msg_code = ${msg.msg_code}>
				<span class="message_unread_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
				<div class="message_body">
					<div class="message_content selectable">
					</div>
					<div class="message_time" onclick="col_toggle($(this).next('.message_additional_container'),$(this).find('i'))">
						<div class="message_body_button">
							<i class="material-symbols-outlined">arrow_drop_down</i>
						</div>
						${auto_format_date(msg.msg_time)}
					</div>
					<div class="message_additional_container col_shrinked">
						<div class="message_body_menu" onclick="msg_comment(this)">
							<i class="material-symbols-outlined">reply</i>
							<span>답장</span>
						</div>
					</div>
				</div>
			</div>`;
	}else if(type == 'received'){
		box =
			`<div class="msg message_box_received" data-msg_code = ${msg.msg_code}>
				<div class="message_sender_thumbnail" onclick="visit('${msg.msg_sender.user_code}',this)">
					<img class="small_img" src="/files/user/profiles/${msg.msg_sender.user_thumbnail_path}"/>
				</div>
				<div class="message_info">	
					<div class="message_sender_nickname" onclick="visit('${msg.msg_sender.user_code}',this)">
						${msg.msg_sender.user_nickname}
					</div>
					<div class="message_body">
						<div class="message_content selectable"></div>
						<div class="message_time" onclick="col_toggle($(this).next('.message_additional_container'),$(this).find('i'))">
							<div class="message_body_button">
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							${auto_format_date(msg.msg_time)}
						</div>
						<div class="message_additional_container col_shrinked">
							<div class="message_body_menu" onclick="msg_comment(this)">
								<i class="material-symbols-outlined">reply</i>
								<span>답장</span>
							</div>
						</div>
					</div>
				</div>
				<span class="message_unreader_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
			</div>`;
	}
		
	const $box = $(box);
	
	const comment_section = `
		<div class="message_comment_section" onclick="scrollToMsg('${msg.msg_comment_target}')">
			<div><i class="material-symbols-outlined deg180 na">reply</i>${msg.msg_origin_sender_nickname} :</div>
			<div>${msg.msg_origin_content}</div>
			<div class="to_origin">원문 보기</div>
		</div>`;
	const $comment_section = $(comment_section);
	
	const trs = `
		<div class="message_body_menu">
			<i class="material-symbols-outlined" onclick="msg_translation(this)">translate</i>
			<span onclick="msg_translation(this)">번역</span>
			<select id="trs_target_lang" class="annotation_message">
				<optgroup label="학습중인 언어">
					<option value="en" selected>영어</option>
				</optgroup>
				<optgroup label="사용자 언어">
					<option value="ko">한국어</option>
				</optgroup>
				<optgroup label="기타 언어">
					<option value="fr">프랑스어</option>
				</optgroup>
			</select>
		</div>`;
	const $trs = $(trs);
	
	const tts = `
		<div class="message_body_menu" onclick="msg_textToSpeech(this)">
			<i class="material-symbols-outlined">headphones</i>
			<span>음성</span>
		</div>`;
	const $tts = $(tts);
	
	const stt = `
		<div class="message_body_menu" onclick="msg_speechToText(this)">
			<i class="material-symbols-outlined">notes</i>
			<span>대본</span>
		</div>`;
	const $stt = $(stt);
	
	const crt = `
		<div class="message_body_menu" onclick="msg_correct(this)">
			<i class="material-symbols-outlined">edit_note</i>
			<span>수정</span>
		</div>`;
	const $crt = $(crt);
	
	if(msg.msg_comment_target != null){
		$box.find('.message_body').prepend($comment_section);
	}
	
	if(msg.msg_content != null){
		$box.find('.message_content').append(msg.msg_content);
		$box.find('.message_additional_container').prepend($crt);
		$box.find('.message_additional_container').prepend($tts);
		$box.find('.message_additional_container').prepend($trs);
		body.append($box);
		
	}else if(msg.msg_image_path != null){
		
		var img_container = `
			<div class="image_container">
				<div class="image_main">
				</div>
			</div>`;
		var $img = $(img_container);
		
		if(msg.msg_image_path.includes(',')){
			const files = msg.msg_image_path.split(',');
			var main_src ;
			
			$img.find('.image_main').append(`
				<div class="image_button" onclick="prev_img(this)"><i class="material-symbols-outlined">arrow_left</i></div>
				<div class="image_button" onclick="next_img(this)"><i class="material-symbols-outlined">arrow_right</i></div>`);
			
			$img.append(`
					<div class="image_queue">
						<div class="image_queue_belt">
						</div>
					</div>`);
			
			for (const file of files) {
				if($img.find('.image_main').find('img').length==0){
					$img.find('.image_main').find('.image_button').first().after(`
					<img src="/files/messenger/img/${file}"/>`);
					main_src = file;
				}
				$img.find('.image_queue_belt').append(`
					<div class="image_waiting" onclick="select_img(this)">
						<img src="/files/messenger/img/${file}"/>
					</div>`);
			}
			$img.find(`.image_waiting`).has(`img[src="/files/messenger/img/${main_src}"]`).addClass('active');
			
			$box.find('.message_content').append($img);
			body.append($box);
		}else{
			$img.find('.image_main').append(`<img src="/files/messenger/img/${msg.msg_image_path}"/>`);
			$box.find('.message_content').append($img);
			body.append($box);
		}
		
	}else if(msg.msg_audio_path != null){
		const audio = `
			<div class="msg_audio_section">
				<audio src="/files/messenger/audio/${msg.msg_audio_path}" class="message_audio"></audio>
				<div class="msg_audio_bar">
					<input type="range" id="msg_audio_bar" value="0" min="0" max="100" step="1"/>
					<div class="record_time">
						<div class="msg_playing_time">0</div>
						<span>초</span>
						<span>/</span>
						<div class="msg_recording_time">${parseInt((msg.msg_audio_path.split("_")[2]),10)/10}</div>
						<span>초</span>
					</div>
				</div>
				<div class="buttons">
					<div class="sm_button msg_audio_play">
						<i class="fa-solid fa-play"></i>
					</div>
					<div class="sm_button msg_audio_pause">
						<i class="fa-solid fa-pause"></i>
					</div>
					<div class="sm_button msg_audio_stop">
						<i class="fa-solid fa-stop"></i>
					</div>
				</div>
			</div>`;
		const $audio = $(audio);
		$box.find('.message_content').append($audio);
		$box.find('.message_additional_container').prepend($stt);
		body.append($box);	
	}
}

function get_msg(mr_code){
	
	if(mr_code==null || mr_code==""){
		return;
	}
	
	$.ajax({
        type: "GET",
        url: "/msg/inRoom",
        data: {mr_code : mr_code} ,
        dataType: "json",
        success: function(data) {
        	console.log('inRoom:',data);
        	console.log('cu :',current_user);
        	$('.messenger_navbar_nickname').text(data.room.mr_name);
        	$('.messenger_content').find('.msg').remove();
        	$('.messenger_content').find('.system_msg').remove();
        	$('.messenger_option').find('.inner_content').empty();
        	$('.main_messenger_body.in_room').attr('data-mr_code',mr_code);
        	
        	var mr_notifying;
        	var mr_favorite;
        	for (const member of data.room.mr_member) {
        		if(member.user_code == current_user){
        			mr_notifying = member.mr_notifying;
        			mr_favorite = member.mr_favorite;
        		}
        		
				if(member.user_code == data.room.mr_admin){
					$('.messenger_option').find('.inner_content').prepend(`
	        			<div class="person_card" onclick="visit('${member.user_code}',this)">
	        				<img src="/files/user/profiles/${member.user_thumbnail_path}"/>
	        				<span>${member.user_nickname}</span>
	        				<div class="card_button">
								<i class="material-symbols-outlined">shield_person</i>
							</div>
	        			</div>`);
				}else if(current_user == data.room.mr_admin){
					$('.messenger_option').find('.inner_content').append(`
						<div class="person_card">
	        				<img src="/files/user/profiles/${member.user_thumbnail_path}" onclick="visit('${member.user_code}',this)"/>
	        				<span onclick="visit('${member.user_code}',this)">${member.user_nickname}</span>
	        				<div class="card_button" onclick="get_out_mr('${member.user_code}')">
								<i class="material-symbols-outlined">person_remove</i>
							</div>
	        			</div>`);
				}else{
					$('.messenger_option').find('.inner_content').append(`
						<div class="person_card" onclick="visit('${member.user_code}',this)">
	        				<img src="/files/user/profiles/${member.user_thumbnail_path}"/>
	        				<span>${member.user_nickname}</span>
	        			</div>`);
				}
        	}
        	
        	if(mr_favorite){
        		hide('.messenger_buttons .add_favorite');
        		showing('.messenger_buttons .delete_favorite');
        	}else{
        		hide('.messenger_buttons .delete_favorite');
        		showing('.messenger_buttons .add_favorite');
        	}
        	
        	if(mr_notifying){
        		hide('.messenger_buttons .add_notifying');
        		showing('.messenger_buttons .delete_notifying');
        	}else{
        		hide('.messenger_buttons .delete_notifying');
        		showing('.messenger_buttons .add_notifying');
        	}
        	
        	for (const msg of data.msg) {
        		if(msg.msg_code == 'system'){
        				input_msg(msg,'system');
        		}else{
        			if(msg.msg_sender.user_code == current_user){
        				input_msg(msg,'send');
        			}else{
        				input_msg(msg,'received');
        			}
        		}
        	}
    		$('.messenger_content').scrollTop($('.messenger_content')[0].scrollHeight);
        },
        error: function(xhr, status, error) {
        	console.log('inRoom failed');
        }
	});
}

function get_new_msg(mr_code,msg_code){
	
	$.ajax({
        type: "GET",
        url: "/msg/msg",
        data: {mr_code:mr_code, msg_code : msg_code} ,
        dataType: "json",
        success: function(msg) {
        	
        	var isAtBottom = $('.messenger_content').scrollTop() + $('.messenger_content').innerHeight() >= $('.messenger_content')[0].scrollHeight - 5;
        	
        	if(msg.msg_code == 'system'){
					input_msg(msg,'system');
        	}else{
        		if(msg.msg_sender.user_code == current_user){
        			input_msg(msg,'send');
        		}else{
        			input_msg(msg,'received');
        		}
        		
        		if(isAtBottom){
        			$('.messenger_content').scrollTop($('.messenger_content')[0].scrollHeight);
        		}
        	}
        },
		error: function(error) {
		}
	});
	
}

function check_submit_msg(){
	if(msg_posting_files.length == 0 && $('.messenger_input').find('.upload_file').length == 0){
		submit_msg();
	}else{
		submit_img_msg();
	}
}

function submit_msg(){
	console.log("mr_code:",mr_code);
	
	var formData = new FormData();
	const content = $('#input_msg_content').val();
	
	if(content == ""){
		console.log('no content in msg, return');
		return;
	}
	
	formData.append('msg_content',$('#input_msg_content').val());
    
    if(msg_target != ""){
		open_personal_msg_room(msg_target,formData);
	}else{
		formData.append('msg_place',mr_code);
		
		
	const comment_target = $('.main_messenger_body.in_room').find('#msg_comment_target');
	if(comment_target.length>0 && comment_target.data('msg_comment_target') != "" && comment_target.data('msg_comment_target') != null){
		formData.append('msg_comment_target',comment_target.data('msg_comment_target'));
	}
		
		$.ajax({
			type: 'POST',
			url: '/msg/send/',
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			success: function (response) {
				if(response==1){
					console.log('일반 메세지 전송성공');
					$('#input_msg_content').val('');
					cancle_commentary();
				}
				$('.messenger_content').scrollTop($('.messenger_content')[0].scrollHeight);
			},
			error: function(error) {
			}
		});
	}
}

function submit_img_msg(){
	var formData = new FormData();
	
	if(msg_posting_files.length == 0){
		console.log('no file in msg, return');
		return;
	}
	
	if(msg_posting_files.length > 0 && msg_posting_files[0] !== ''){
		msg_posting_files.forEach(function(file) {
			formData.append('msg_file', file);
		});
	}
	
	formData.append('msg_place',mr_code);
	
	const comment_target = $('.main_messenger_body.in_room').find('#msg_comment_target');
	if(comment_target.length>0 && comment_target.data('msg_comment_target') != "" && comment_target.data('msg_comment_target') != null){
		formData.append('msg_comment_target',comment_target.data('msg_comment_target'));
	}
	
	$.ajax({
		type: 'POST',
		url: '/msg/image/',
		data: formData,
		processData: false,
		contentType: false,
		dataType: "json",
		success: function (response) {
			if(response==1){
				console.log('이미지 메세지 전송성공');
				msg_posting_files = [];
				$('.messenger_input').find('.upload_files').empty();
				if($('.messenger_input').find('.upload_files').hasClass('expanded')){
					col_toggle($('.messenger_input').find('.upload_files'));
				}
				cancle_commentary();
			}
			$('.messenger_content').scrollTop($('.messenger_content')[0].scrollHeight);
		},
		error: function(error) {
		}
	});
}

function get_personal_msg_room(user_code){
	
	if(user_code == null || user_code == ""){
		main_messenger();
		return;
	}
	
	$.ajax({
    	type: 'GET',
        url: '/msg/personal/',
        data: {user_code : user_code},
        dataType: "json",
        success: function (data) {
        	console.log('psn room is ',data);
        	
        	if($('.main_messenger').hasClass('shrinked')){
        		main_messenger();
        	}
        	if(data.mr_code){
        		enter_room(data.mr_code);
        	}else{
        		$('.messenger_content').empty();
        		hide('.out_of_room');
        		showing('.in_room');
        		$('.messenger_navbar_nickname').text(data.user_nickname);
        		msg_target = user_code;
        	}
	    },
	    error: function(error) {
	    }
    });
}

function open_personal_msg_room(user_code,formData){
	
	$.ajax({
    	type: 'POST',
        url: '/msg/personal/',
        data: {user_code : user_code},
        dataType: "json",
        success: function (data) {
        	formData.append('msg_place',data.mr_code);
        	mr_code = data.mr_code;
        	console.log('mrcode 생성:',mr_code);
        	
        	$.ajax({
    			type: 'POST',
    			url: '/msg/send/',
    			data: formData,
    			processData: false,
    			contentType: false,
    			dataType: "json",
    			success: function (response) {
    				if(response==1){
    					console.log('개인 채팅방 생성, 메세지 전송성공');
    					console.log('생성된 개인채팅방:',mr_code);
    					msg_posting_files = [];
    					$('#input_msg_content').val('');
    					msg_target="";
    					connect_in_msg_room(mr_code);
    					connect_msg_room(mr_code);
    					get_msg(mr_code);
    					showing($('.main_messenger_menu').find('.card_person').find('.card_person_tools'));
    				}
    			},
    			error: function(error) {
    			}
    		});
	    },
	    error: function(error) {
	    }
    });
}

function msg_translation(e){
	
	const msg = $(e).closest('.msg');
	spin_start(msg.find('.message_body'));
	
	const text = msg.find('.message_content').text().trim();
	const targetLang = msg.find('#trs_target_lang option:selected').val();
	const targetLangName = msg.find('#trs_target_lang option:selected').text();
	
	$.ajax({
		url: '/msg/trs',
		method: 'GET',
		data: {
			text: text,
			targetLang: targetLang
		},
		dataType: 'json',
		success: function(data) {
			spin_end(msg.find('.message_body'));
			msg.find('.trs_msg').remove();
		    
		    msg.find('.message_time').before(`
		    <div class="extra_msg trs_msg inner_box inset">
		    	<div class="inner_title h20" onclick="inner_box_toggle(this)">
					<i class="material-symbols-outlined na">translate</i> ${targetLangName} 번역결과
					<i class="material-symbols-outlined col_tgb">arrow_drop_up</i>
				</div>
				<div class="inner_content expanded additional_message selectable">${data.text}</div>
			</div>
			`);
		},
		error: function() {
			spin_end(msg.find('.message_body'));
			console.log('trs failed');
		}
	});
}
function msg_textToSpeech(e){
	
	const msg = $(e).closest('.msg');
	spin_start(msg.find('.message_body'));
	const text = msg.find('.message_content').text();
	
	$.ajax({
		url: '/msg/tts',
		method: 'GET',
		data: {
			text: text,
			msg_code: msg.data('msg_code')
		},
		dataType: 'text',
		success: function(data) {
			spin_end(msg.find('.message_body'));
		    msg.find('.tts_msg').remove();
		    
		    msg.find('.message_time').before(`
		    <div class="extra_msg tts_msg inner_box inset">
		    	<div class="inner_title h20" onclick="inner_box_toggle(this)">
		    		<i class="material-symbols-outlined na">headphones</i>
		    		음성 전환
					<i class="material-symbols-outlined col_tgb">arrow_drop_up</i>
				</div>
				<div class="inner_content expanded msg_audio_section">
					<audio src="/files/audio/tts/${data}" class="message_audio"></audio>
					<div class="msg_audio_bar">
						<input type="range" id="msg_audio_bar" value="0" min="0" max="100" step="1"/>
						<div class="record_time">
							<div class="msg_playing_time">0</div>
							<span>초</span>
							<span>/</span>
							<div class="msg_recording_time">${parseInt((data.split("_")[2]),10)/10}</div>
						<span>초</span>
					</div>
					</div>
					<div class="buttons">
						<div class="sm_button msg_audio_play">
							<i class="fa-solid fa-play"></i>
						</div>
						<div class="sm_button msg_audio_pause">
							<i class="fa-solid fa-pause"></i>
						</div>
						<div class="sm_button msg_audio_stop">
							<i class="fa-solid fa-stop"></i>
						</div>
					</div>
				</div>
			</div>
			`);
		},
		error: function() {
			spin_end(msg.find('.message_body'));
			console.log('tts failed');
		}
	});
}

function msg_speechToText(e){
	
	const msg = $(e).closest('.msg');
	spin_start(msg.find('.message_body'));
	const file_name = $(e).closest('.msg').find('audio').attr('src').split('/').pop();
	
	$.ajax({
		url: '/msg/stt',
		method: 'GET',
		data: {
			file_name: file_name
		},
		dataType: 'json',
		success: function(data) {
			spin_end(msg.find('.message_body'));
			msg.find('.stt_msg').remove();
			msg.find('.message_time').before(`
				<div class="extra_msg stt_msg inner_box inset">
					<div class="inner_title h20" onclick="inner_box_toggle(this)">
						<i class="material-symbols-outlined na">note</i>
						대본 전환
						<i class="material-symbols-outlined col_tgb">arrow_drop_up</i>
					</div>
					<div class="inner_content expanded additional_message selectable">${data.text}</div>
				</div>
			`);
		},
		error: function() {
			spin_end(msg.find('.message_body'));
			console.log('stt failed');
		}
	});
}

function msg_comment(e){
	
	if($('.messenger_audio').hasClass('expanded')){
		col_toggle('.messenger_audio');
	}
	
	const msg = $(e).closest('.msg');
	const msg_sender_nickname = msg.find('.message_sender_nickname').text();
	const msg_code = msg.data('msg_code');
	const container = $('.about_comment');
	var msg_content = msg.find('.message_content');
	
	if(msg_content.find('img').length==0 && msg_content.find('audio').length==0){
		msg_content = msg_content.text();
	}else{
		msg_content = "[첨부 파일]";
	}
	
	if(!container.hasClass('expanded')){
		col_toggle(container);
	}
	container.empty();
	container.append(`
		<div id="msg_comment_target" data-msg_comment_target=${msg_code} class="commentary" onclick="cancle_commentary()">
			<div class="comment_to">
				<i class="material-symbols-outlined deg180 na">reply</i>
				${msg_sender_nickname != "" ? '<span>' + msg_sender_nickname + '님에게 답장 중</span>' : '<span>나의 메세지에 답장 중</span>'}
				<i class="material-symbols-outlined">close</i>
			</div>
			<div class="comment_origin">
				${msg_content}
			</div>
		</div>
	`);
}

function cancle_commentary(){
	
	$('.about_comment').empty();
	if($('.about_comment').hasClass('expanded')){
		col_toggle($('.about_comment'));
	}
}

function scrollToMsg(e) {
	const msg_code = e;
	const container = $('.messenger_content');
    const msg = container.find(`[data-msg_code="${e}"]`);
    
    if (msg.length) {
        const msgOffsetTop = msg.offset().top; 
        const containerOffsetTop = container.offset().top; 
        const scrollOffset = msgOffsetTop - containerOffsetTop + container.scrollTop();

        container.animate({
            scrollTop: scrollOffset
        }, 500);

        setTimeout(function() {
            msg.addClass('shake');

            setTimeout(function() {
                msg.removeClass('shake');
            }, 1000);

        }, 500);
    } else {
        console.log('Message not found, load more messages if needed.');
    }
}

function invite_mr(mr_guest) {
	$.ajax({
		url: '/msg/invite',
		method: 'POST',
		data: {mr_code: mr_code, mr_guest:mr_guest},
		dataType: 'text',
		success: function(data) {
			mr_code = data;
			console.log('invite success,',mr_code);
			msg_posting_files = [];
			$('#input_msg_content').val('');
			msg_target="";
			connect_in_msg_room(mr_code);
			connect_msg_room(mr_code);
			get_msg(mr_code);
		},
		error: function() {
			console.log('invite fail');
		}
	});
}
function get_out_mr(user_code) {
	
	console.log('mrc',mr_code);
	console.log('uc',user_code);
	
	$.ajax({
		url: '/msg/getOut?mr_code='+mr_code+'&user_code='+user_code,
		method: 'DELETE',
		dataType: 'json',
		success: function(data) {
			if(user_code == null){
				exit_room();
			}else{
				get_msg(mr_code);
			}
			
		},
		error: function() {
		}
	});
}
function add_notifying(e) {
	if($(e).closest('.main_messenger_body.in_room').length>0){
		$.ajax({
			url: '/msg/notifying',
			method: 'POST',
			data: {mr_code: $('.main_messenger_body.in_room').data('mr_code'), update : '1'},
			dataType: 'json',
			success: function(data) {
				hide($('.messenger_buttons').find('.add_notifying'));
				showing($('.messenger_buttons').find('.delete_notifying'));
			},
			error: function() {
			}
		});
	}
}
function delete_notifying(e) {
	if($(e).closest('.main_messenger_body.in_room').length>0){
		$.ajax({
			url: '/msg/notifying',
			method: 'POST',
			data: {mr_code: $('.main_messenger_body.in_room').data('mr_code'), update : '0'},
			dataType: 'json',
			success: function(data) {
				hide($('.messenger_buttons').find('.delete_notifying'));
				showing($('.messenger_buttons').find('.add_notifying'));
			},
			error: function() {
			}
		});
	}
}

function get_messenger_menu(e) {
	$.ajax({
		url: '/user/connected',
		method: 'GET',
		dataType: 'json',
		success: function(data) {
			
			$('.messenger_menu_content').empty();
        	
			function pc(userVO) {
				const body = `
	        	        <div class="card_person ${userVO.user_logon != '0' ? 'finished_row' : ''}">
	    	            <div class="card_person_thumbnail" onclick="visit('${userVO.user_code}',this);">
	    	                <img class="small_img" src="/files/user/profiles/${userVO.user_thumbnail_path}"/>
	    	            </div>
	    	            <div class="card_person_info" onclick="get_personal_msg_room('${userVO.user_code}')">
	    	                <div class="card_person_info_nickname">${userVO.user_nickname}</div>
	    	                <div class="card_person_info_comment">${userVO.user_logon != '0'? '온라인' : '오프라인'}</div>
	    	                <div class="card_person_info_logon">${userVO.user_logon != '0'? userVO.user_logon : time_ago(userVO.user_log_time) + ', ' + userVO.user_log_location}</div>
	    	            </div>
	    	            <div class="card_person_tools none">
	    	                <div class="card_person_tool">
	    	                    <i class="material-symbols-outlined" onclick="invite_mr('${userVO.user_code}')">person_add</i>
	    	                </div>
	    	            </div>
	    	        </div>`;
				const $body = $(body);
				
				if(mr_code != null && mr_code != ""){
					$body.find('.card_person_tools').removeClass('none');
				}
				return $body;
        	}
        	
        	if(isEmpty(data.user_favorite)){
        		$('.messenger_menu_content.favorite').html(`
        			<div class="empty">즐겨찾기에 등록한 사용자가 없습니다.</div>
        		`);
        	}else{
        		for (const userVO of data.user_favorite){
        			if(userVO.user_logon != '0'){
        				$('.messenger_menu_content.favorite').prepend(pc(userVO));
        			}else{
        				$('.messenger_menu_content.favorite').append(pc(userVO));
        			}
        		}
        	}
        	if(isEmpty(data.user_follower)){
        		$('.messenger_menu_content.follower').html(`
            			<div class="empty">팔로워가 없습니다.</div>
            		`);
        	}else{
        		for (const userVO of data.user_follower){
        			if(userVO.user_logon != '0'){
        				$('.messenger_menu_content.follower').prepend(pc(userVO));
        			}else{
        				$('.messenger_menu_content.follower').append(pc(userVO));
        			}
        		}
        	}
        	if(isEmpty(data.user_following)){
        		$('.messenger_menu_content.following').html(`
            			<div class="empty">팔로우 중인 대상이 없습니다.</div>
            		`);
        	}else{
        		for (const userVO of data.user_following){
        			if(userVO.user_logon != '0'){
        				$('.messenger_menu_content.following').prepend(pc(userVO));
        			}else{
        				$('.messenger_menu_content.following').append(pc(userVO));
        			}
        		}
        	}
		},
		error: function() {
		}
	});
}

function mm_toggle(e,target) {
	$(e).siblings().removeClass('active');
    $(e).addClass('active');
    $(`.messenger_menu_content:not(.${target})`).addClass('none');
    showing(`.messenger_menu_content.${target}`);
}
