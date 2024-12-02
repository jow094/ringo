const socket = new SockJS('/chat');
const stompClient = Stomp.over(socket);
let msg_posting_files = [];

stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);

    // 구독 경로
    stompClient.subscribe('/msgGet', function (message) {
        console.log("Received update: " + message.body);
        // 메시지를 기반으로 DOM 업데이트
        updateChatRoomList(JSON.parse(message.body));
    });
});

// 메시지를 서버로 전송
function triggerUpdate() {
    stompClient.send("/msgPost/post", {}, JSON.stringify({}));
}

// 채팅방 목록 업데이트 (예시)
function updateChatRoomList(data) {
    // 받은 데이터를 DOM에 반영
    console.log("Updating chat rooms:", data);
}

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
	    					<img class="small_img" src="${room.mr_thumbnail_path}"/>
	    				</div>
	    				<div class="room_body">
		    				<div class="room_name">${room.mr_name}</div>
		    				<div class="room_message">
			    				<div class="room_message_content">${room.mr_last_message.msg_content}</div>
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
        	$('.messenger_navbar_nickname').attr('data-mr_code',data.room.mr_code);
        	$('.messenger_navbar_nickname').attr('data-mr_admin',data.room.mr_admin);
        	
        	$('.messenger_content').empty();
        	
        	for (const msg of data.msg) {
        		if(msg.msg_sender.user_code == current_user){
        			$('.messenger_content').append(`
    					<div class="message_box_send" data-msg_code = ${msg.msg_code}>
        					<span class="message_unread_count">${msg.msg_unreader_count}</span>
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
    					<div class="message_box_received">
        					<div class="message_sender_thumbnail" onclick="">
	        					<img class="small_img" src="/img/user/profiles/${msg.msg_sender.user_thumbnail_path}"/>
        					</div>
        					<div class="message_info">	
	        					<div class="message_sender_nickname">
	        						${msg.msg_sender.user_nickname}
	        					</div>
	        					<div class="message_body">
	        						<div class="message_content">${msg.msg_content}</div>
	        						<div class="message_time">
	        						${auto_format_date(msg.msg_time)}
	        						</div>
	        					</div>
        					</div>
        					<span class="message_unreader_count">${msg.msg_unreader_count}</span>
    					</div>
        			`);
        		}
        	}
        },
        error: function(xhr, status, error) {
        	console.log('inRoom failed');
        }
	});
}

function submit_msg(){
	var formData = new FormData();
	const content = $('#input_msg_content').val();
	
	formData.append('msg_content',$('#input_msg_content').val());
	formData.append('msg_place',$('.messenger_input').data('mr_code'));
	
	if(msg_posting_files.length > 0 && circle_posting_files[0] !== ''){
		msg_posting_files.forEach(function(file) {
	        formData.append('msg_file', file);
	    });
	}
	
	console.log('ct:',$('#input_msg_content').val())
	console.log('fd:',formData)
	
    if(content == "" && msg_posting_files.length == 0){
    	console.log('return!');
		return;
	}
	
    $.ajax({
    	type: 'POST',
        url: '/msg/send/',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
        	console.log('resp : ',response);
	    	if(response==1){
	    		invalidate_write_container('circle');
	    		console.log('메세지 전송성공');
	    	}
	    },
	    error: function(error) {
	        console.log("데이터 전송 실패:", error);
	        alert('게시글 작성에 실패하였습니다.');
	    }
    });
}
