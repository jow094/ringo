function translate(e){
	
	const text = $(e).find('.message_content').text();
	const targetLang = 'ko';
	
	$.ajax({
		url: '/main/trs',
		method: 'GET',
		data: {
			text: text,
			targetLang: targetLang
		},
		dataType: 'text',
		success: function(response) {
			console.log(response);
			$(e).find('.message_content').append(response);
		},
		error: function() {
			console.log('trs failed');
		}
	});
	
}