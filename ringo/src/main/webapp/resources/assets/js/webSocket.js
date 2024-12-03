const socket = new SockJS('/chat');
const stompClient = Stomp.over(socket);
let conn_inMsgRoom = null;

stompClient.connect({}, function () {
	
	$.ajax({
		type: 'GET',
		url: '/msg/connect/',
		dataType: "json",
		success: function (data) {
			for (const connect_code of data) {
				stompClient.subscribe(`/msgGet/getMsg/${connect_code}`, function (message) {
			        if (message.body) {
			        	console.log(message.body);
			            const param = JSON.parse(message.body);
			            
			            console.log('param:',param);
			            
			            if(mr_code == param.mr_code){
			            	get_new_msg(param.mr_code,param.msg_code);
			            	console.log('update msg in '+param.mr_code+' new message is '+param.msg_code);
			            }else{
			            	get_msg_room_list();
			            	console.log('out of room. just update msg room list');
			            }
			        }
			    });
				console.log('connect for',connect_code);
			}
		},
		error: function(error) {
		}
	});
});


function connect_in_msg_room(mr_code) {
    
    if (conn_inMsgRoom) {
        stompClient.unsubscribe(conn_inMsgRoom.id);
    }

    conn_inMsgRoom = stompClient.subscribe(`/msgGet/updateMUC/${mr_code}`, function (message) {
    	console.log('someone read msg. update MUC');
        const param = JSON.parse(message.body);
        var i = 0;
        for (const data of param) {
        	const msg = $('.messenger_content').find(`[data-msg_code=${data.msg_code}]`)
        	if(msg.find('.message_unread_count').text() != data.msg_unreader_count){
        		if(data.msg_unreader_count == 0 && msg.find('.message_unread_count').text() != ''){
        			msg.find('.message_unread_count').text('');
        		}else{
        			msg.find('.message_unread_count').text(data.msg_unreader_count);
        		}
        		i++;
        	}
        }
        console.log(i,' info of msg updated');
    });
}

function disconnect_in_msg_room() {
	if (conn_inMsgRoom) {
		stompClient.unsubscribe(conn_inMsgRoom.id);
	}
	conn_inMsgRoom = null;
}
