const socket = new SockJS('/chat');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function () {
	
	$.ajax({
		type: 'GET',
		url: '/msg/connect/',
		dataType: "json",
		success: function (data) {
			for (const connect_code of data) {
				stompClient.subscribe(`/msgGet/room/${connect_code}`, function (message) {
			        if (message.body) {
			            const param = JSON.parse(message.body);
			            
			            if(mr_code == param.msg_place){
			            	update_msg(param);
			            	console.log('update msg for',param.msg_place);
			            }else{
			            	get_msg_room_list();
			            	console.log('update msg room list');
			            }
			        }
			    });
				console.log('connect for',connect_code);
			}
		},
		error: function(error) {
		}
	});
	
	stompClient.subscribe(`/msgUpdate/${mr_code}`, function (message) {
		console.log('msgreadupdate',message.body);
    });
	
});
