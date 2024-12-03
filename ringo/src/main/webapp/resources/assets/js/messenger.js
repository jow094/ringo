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
		    				<div class="badge">${room.mr_alarm_count}</div>
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
    					<div class="message_box_send" data-msg_code = ${msg.msg_code}>
        					<span class="message_unread_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
        					<div class="message_body">
	        					<div class="message_content">${msg.msg_content}</div>
	        					<div class="message_time">
	        						${auto_format_date(msg.msg_time)}
	        					</div>
        					</div>
    					</div>
        			`);
        		}else{
        			$('.messenger_content').append(`
    					<div class="message_box_received" data-msg_code = ${msg.msg_code}>
        					<div class="message_sender_thumbnail" onclick="visit('${msg.msg_sender.user_code}',this)">
	        					<img class="small_img" src="/img/user/profiles/${msg.msg_sender.user_thumbnail_path}"/>
        					</div>
        					<div class="message_info">	
	        					<div class="message_sender_nickname" onclick="visit('${msg.msg_sender.user_code}',this)">
	        						${msg.msg_sender.user_nickname}
	        					</div>
	        					<div class="message_body">
	        						<div class="message_content">${msg.msg_content}</div>
	        						<div class="message_time">
	        						${auto_format_date(msg.msg_time)}
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

function update_msg(msg){
	
	var isAtBottom = $('.messenger_content').scrollTop() + $('.messenger_content').innerHeight() >= $('.messenger_content')[0].scrollHeight - 5;
	
	if(msg.msg_sender.user_code == current_user){
		$('.messenger_content').append(`
			<div class="message_box_send" data-msg_code = ${msg.msg_code}>
				<span class="message_unread_count">${msg.msg_unreader_count == 0 ? "" : msg.msg_unreader_count}</span>
				<div class="message_body">
					<div class="message_content">${msg.msg_content}</div>
					<div class="message_time">
						${auto_format_date(msg.msg_time)}
					</div>
				</div>
			</div>
		`);
	}else{
		$('.messenger_content').append(`
			<div class="message_box_received" data-msg_code = ${msg.msg_code}>
				<div class="message_sender_thumbnail" onclick="visit('${msg.msg_sender.user_code}',this)">
					<img class="small_img" src="/img/user/profiles/${msg.msg_sender.user_thumbnail_path}"/>
				</div>
				<div class="message_info">	
					<div class="message_sender_nickname" onclick="visit('${msg.msg_sender.user_code}',this)">
						${msg.msg_sender.user_nickname}
					</div>
					<div class="message_body">
						<div class="message_content">${msg.msg_content}</div>
						<div class="message_time">
						${auto_format_date(msg.msg_time)}
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
