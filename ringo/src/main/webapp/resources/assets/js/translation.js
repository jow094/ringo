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
		success: function(response) {
			console.log(response);
			const data = decodeURIComponent(response);
			console.log(data);
			$(e).find('.message_content').append(data);
		},
		error: function() {
			console.log('trs failed');
		}
	});
	
}