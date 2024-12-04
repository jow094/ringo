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
        		$('.messenger_rooms.favorite').append(`
    				<div class="messenger_room" data-mr_code="${room.mr_code}" onclick="enter_room('${room.mr_code}')">
	    				<div class="room_thumbnail">
	    					<img class="small_img" src="/img/user/profiles/${room.mr_thumbnail_path}"/>
	    				</div>
	    				<div class="room_body">
		    				<div class="room_name">${room.mr_name}</div>
		    				<div class="room_message">
			    				<div class="room_message_content">${room.mr_last_message.msg_content ? room.mr_last_message.msg_content : ""}</div>
			    				<div class="room_message_time">${auto_format_date(room.mr_last_message.msg_time)}</div>
		    				</div>
		    			</div>
		    			<div class="room_unreadcount">
		    				${room.mr_alarm_count != 0 ? '<div class="badge">' + room.mr_alarm_count + '</div>' : ""}
	    				</div>
    				</div>
        		`);
        	}
        },
        error: function(xhr, status, error) {
        	console.log('roomList failed');
        }
	});
}

function get_msg(mr_code){
	
	$.ajax({
        type: "GET",
        url: "/msg/inRoom",
        data: {mr_code : mr_code} ,
        dataType: "json",
        success: function(data) {
        	console.log('inRoom:',data);
        	console.log('cu :',current_user);
        	$('.messenger_navbar_nickname').text(data.room.mr_name);
        	$('.messenger_content').empty();
        	
        	
        	for (const msg of data.msg) {
        		if(msg.msg_sender.user_code == current_user){
        			$('.messenger_content').append(`
    					<div class="msg message_box_send" data-msg_code = ${msg.msg_code}>
        					<span class="message_unread_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
        					<div class="message_body">
	        					<div class="message_content">${msg.msg_content}</div>
	        					<div class="message_time" onclick="col_toggle($(this).next('.message_additional_container'),$(this).find('i'))">
	        						<div class="message_body_button">
	        							<i class="material-symbols-outlined">arrow_drop_down</i>
	        						</div>
	        						${auto_format_date(msg.msg_time)}
	        					</div>
	        					<div class="message_additional_container col_shrinked">
		        					<div class="message_body_menu">
		        						<i class="material-symbols-outlined" onclick="translation(this)">translate</i>
		        						<span onclick="translation(this)">번역</span>
		        						<select id="target_lang" class="annotation_message">
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
		        					</div>
		        					<div class="message_body_menu">
	        							<i class="material-symbols-outlined">headphones</i>
		        						음성
	        							<select class="annotation_message">
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
	        						</div>
		        					<div class="message_body_menu">
		        						<i class="material-symbols-outlined">contract_edit</i>
	        							수정
		        					</div>
		        					<div class="message_body_menu">
		        						<i class="material-symbols-outlined">reply</i>
		        						답장
		        					</div>
	        					</div>
        					</div>
    					</div>
        			`);
        		}else{
        			$('.messenger_content').append(`
    					<div class="msg message_box_received" data-msg_code = ${msg.msg_code}>
        					<div class="message_sender_thumbnail" onclick="visit('${msg.msg_sender.user_code}',this)">
	        					<img class="small_img" src="/img/user/profiles/${msg.msg_sender.user_thumbnail_path}"/>
        					</div>
        					<div class="message_info">	
	        					<div class="message_sender_nickname" onclick="visit('${msg.msg_sender.user_code}',this)">
	        						${msg.msg_sender.user_nickname}
	        					</div>
	        					<div class="message_body">
	        						<div class="message_content">${msg.msg_content}</div>
	        						<div class="message_time" onclick="col_toggle($(this).next('.message_additional_container'),$(this).find('i'))">
		        						<div class="message_body_button">
		        							<i class="material-symbols-outlined">arrow_drop_down</i>
		        						</div>
		        						${auto_format_date(msg.msg_time)}
	        						</div>
		        					<div class="message_additional_container col_shrinked">
		        						<div class="message_body_menu"><i class="material-symbols-outlined">contract_edit</i>수정</div>
			        					<div class="message_body_menu"><i class="material-symbols-outlined">translate</i>번역</div>
			        					<div class="message_body_menu"><i class="material-symbols-outlined">headphones</i>음성</div>
			        					<div class="message_body_menu"><i class="material-symbols-outlined">reply</i>답장</div>
		        					</div>
	        					</div>
        					</div>
        					<span class="message_unreader_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
    					</div>
        			`);
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
        	
        	if(msg.msg_sender.user_code == current_user){
        		$('.messenger_content').append(`
    				<div class="msg message_box_send" data-msg_code = ${msg.msg_code}>
        				<span class="message_unread_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
        				<div class="message_body">
        					<div class="message_content">${msg.msg_content}</div>
	        				<div class="message_time" onclick="col_toggle($(this).next('.message_additional_container'),$(this).find('i'))">
	        					<div class="message_body_button">
	    							<i class="material-symbols-outlined">arrow_drop_down</i>
	    						</div>
	        				${auto_format_date(msg.msg_time)}
	        				</div>
        					<div class="message_additional_container col_shrinked">
        						<div class="message_body_menu"><i class="material-symbols-outlined">contract_edit</i>수정</div>
	        					<div class="message_body_menu"><i class="material-symbols-outlined">translate</i>번역</div>
	        					<div class="message_body_menu"><i class="material-symbols-outlined">headphones</i>음성</div>
	        					<div class="message_body_menu"><i class="material-symbols-outlined">reply</i>답장</div>
        					</div>
        				</div>
    				</div>
        		`);
        	}else{
        		$('.messenger_content').append(`
    				<div class="msg message_box_received" data-msg_code = ${msg.msg_code}>
        				<div class="message_sender_thumbnail" onclick="visit('${msg.msg_sender.user_code}',this)">
        					<img class="small_img" src="/img/user/profiles/${msg.msg_sender.user_thumbnail_path}"/>
        				</div>
        				<div class="message_info">	
	        				<div class="message_sender_nickname" onclick="visit('${msg.msg_sender.user_code}',this)">
	        					${msg.msg_sender.user_nickname}
	        				</div>
	        				<div class="message_body">
	        					<div class="message_content">${msg.msg_content}</div>
		        				<div class="message_time" onclick="col_toggle($(this).next('.message_additional_container'),$(this).find('i'))">
		        					<div class="message_body_button">
		    							<i class="material-symbols-outlined">arrow_drop_down</i>
        				
		    						</div>
		        					${auto_format_date(msg.msg_time)}
		        				</div>
		        				<div class="message_additional_container col_shrinked">
	        						<div class="message_body_menu"><i class="material-symbols-outlined">contract_edit</i>수정</div>
		        					<div class="message_body_menu"><i class="material-symbols-outlined">translate</i>번역</div>
		        					<div class="message_body_menu"><i class="material-symbols-outlined">headphones</i>음성</div>
		        					<div class="message_body_menu"><i class="material-symbols-outlined">reply</i>답장</div>
	        					</div>
	        				</div>
        				</div>
        				<span class="message_unreader_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
    				</div>
        		`);
        	}
        	
        	if(isAtBottom){
        		$('.messenger_content').scrollTop($('.messenger_content')[0].scrollHeight);
        	}
        	
        },
		error: function(error) {
		}
	});
	
}

function submit_msg(){
	console.log("mr_code:",mr_code);
	
	var formData = new FormData();
	const content = $('#input_msg_content').val();
	
	if(content == "" && msg_posting_files.length == 0){
		return;
	}
	
	formData.append('msg_content',$('#input_msg_content').val());
	
	if(msg_posting_files.length > 0 && circle_posting_files[0] !== ''){
		msg_posting_files.forEach(function(file) {
			formData.append('msg_file', file);
		});
	}
    
    if(msg_target != ""){
		open_personal_msg_room(msg_target,formData);
	}else{
		formData.append('msg_place',mr_code);
		
		$.ajax({
			type: 'POST',
			url: '/msg/send/',
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			success: function (response) {
				if(response==1){
					console.log('메세지 전송성공');
					msg_posting_files = [];
					$('#input_msg_content').val('');
				}
				$('.messenger_content').scrollTop($('.messenger_content')[0].scrollHeight);
			},
			error: function(error) {
			}
		});
	}
}

function get_personal_msg_room(user_code){
	
	$.ajax({
    	type: 'GET',
        url: '/msg/personal/',
        data: {user_code : user_code},
        dataType: "json",
        success: function (data) {
        	console.log(data);
        	
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

function translation(e){
	
	const msg = $(e).closest('.msg');
	
	const text = msg.find('.message_content').text();
	const targetLang = msg.find('#target_lang option:selected').val();
	const targetLangName = msg.find('#target_lang option:selected').text();
	
	$.ajax({
		url: '/main/trs',
		method: 'GET',
		data: {
			text: text,
			targetLang: targetLang
		},
		dataType: 'json',
		success: function(data) {
		    console.log(data.text);
		    msg.find('.translated_msg').remove();
		    
		    msg.find('.message_content').after(`
		    <div class="translated_msg inner_box inset colmg5">
		    	<div class="inner_title h20" onclick="inner_box_toggle(this)">
					${targetLangName} 번역결과
					<i class="material-symbols-outlined col_tgb">arrow_drop_up</i>
				</div>
				<div class="inner_content expanded additional_message">${data.text}</div>
			</div>
			`);
		},
		error: function() {
			console.log('trs failed');
		}
	});
}
