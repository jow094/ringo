function translate(e){
	
	const text = $(e).find('.message_content').text();
	const targetLang = 'en';
	
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
		    $(e).find('.message_content').append(data.text);
		},
		error: function() {
			console.log('trs failed');
		}
	});
	
}