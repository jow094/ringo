var unity = "";
var person = "";
var profile_type='person';
var profile_length=1;
let circle_posting_files = [];
var self_code = "";

function login_check(){
	
	var currentURL = window.location.href;
	
	if (currentURL.includes('join') || currentURL.includes('login')) {
		$('.left_navbar').addClass('none');
        return;
    }else{
    	$('.left_navbar').removeClass('none');
    	
    	$.ajax({
            type: "GET",
            url: "/user/loginCheck",
            dataType: "text",
            success: function(data) {
            	if(data == null || data == ""){
            		if (!currentURL.includes('join') && !currentURL.includes('login')) {
            			alert("로그인 정보가 없습니다. 로그인 페이지로 이동합니다.");
            		}
                    window.location.href = "/user/login";
            	}else{
            		self_code = data;
            	}
            },
            error: function(xhr, status, error) {
            	console.log('check failed');
            }
        });
    }
}

function logout(){
	alert("로그아웃 되었습니다.");
}

function send_sms(e){
	
	var input;
	
	if($(e).is('div')){
		input = $(e).siblings('input[name="user_tel"]');
	}
	
	if($(e).is('input[name="user_tel"]')){
		input = e;
	}
	
	const add_input = $(input).closest('.input_value_container').find('#user_sms_authentication');
	
	if(validate_tel(input)!='1'){
		set_failed(input, 'row');
        set_hint(input, '* 입력하신 전화번호를 다시 확인해주세요.', 'failed_message');
		return;
	};
	
	check_duple(input, function(response) {
	
		if (response==1) {
	        set_failed(input, 'row');
	        set_hint(input, '* 이미 사용중인 전화번호 입니다.', 'failed_message');
	        return;
	    }else{
	    	$(add_input).find('input[name="user_authentication"]').val('');
	    	set_hint(input,'* 전송받은 인증번호를 입력 해주세요.','annotation_message');
	    	showing(add_input);
	    	
	    	$.ajax({
	    		type: "GET",
	    		url: "/user/authentication/sms",
	    		data: {user_tel : input.val()},
	    		success: function(data) {
	    			$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
	    		},
	    		error: function(xhr, status, error) {
	    			set_hint(input,'* 인증번호 발송에 실패 하였습니다.','failed_message');
	    		}
	    	});
	    }
	});
}

function send_email(e){
	var input;
	
	if($(e).is('div')){
		input = $(e).siblings('input[name="user_email"]');
	}
	
	if($(e).is('input[name="user_email"]')){
		input = e;
	}
	
	const add_input = $(input).closest('.input_value_container').find('#user_email_authentication');
	
	if(validate_email(input)!='1'){
		set_failed(input, 'row');
        set_hint(input, '* 입력하신 이메일을 다시 확인해주세요.', 'failed_message');
		return;
	};
	
	check_duple(input, function(response) {
	
		if (response==1) {
	        set_failed(input, 'row');
	        set_hint(input, '* 이미 사용중인 이메일입니다.', 'failed_message');
	        return;
	    }else{
	    	$(add_input).find('input[name="user_authentication"]').val('');
	    	set_hint(input,'* 전송받은 인증번호를 입력 해주세요.','annotation_message');
	    	showing(add_input);
	    	
	    	$.ajax({
	            type: "GET",
	            url: "/user/authentication/email",
	            data: {user_email : input.val()},
	            success: function(data) {
	            	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
	            },
	            error: function(xhr, status, error) {
	            	set_hint(input,'* 인증번호 발송에 실패 하였습니다.','failed_message');
	            }
	        });
	    }
	});
}

function check_code(e,target){
	
	$.ajax({
        type: "POST",
        url: "/user/authentication/check",
        dataType: 'json',
        data: {input_code : $(e).siblings('input').val(), target : target},
        success: function(data) {
        	console.log(data);
        	if(data==1){
        		console.log('success');
        		set_hint(e,'* 인증에 성공하였습니다.','success_message');
        		set_finished(e,'row');
        	}
        	if(data==0){
        		console.log('failed');
        		set_hint(e,'* 인증에 실패하였습니다.','failed_message');
        		set_failed(e,'row');
        	}
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_realtime_address(latitude, longitude) {
    var apiKey = "fc78d7228a6d471a9c00539da3ab07d6";
    var apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (data) {
            if (data && data.results && data.results.length > 0) {
                var address = data.results[0].formatted;
                console.log("주소: " + address);
            } else {
                console.log("주소를 찾을 수 없습니다.");
            }
        },
        error: function (error) {
            console.error("주소 검색 실패", error);
        }
    });
}

function get_coordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);

            get_realtime_address(latitude, longitude);
        }, function(error) {
            console.error("위치 정보를 가져오지 못했습니다.", error);
        });
    } else {
        console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
}

function search_address(container,search_result_container) {
	const keyword = $('#search_address_input').val();
	
	const encodedKeyword = keyword.trim().replaceAll("[^a-zA-Z0-9가-힣 ]", "");
    const apiUrl = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDI0MTExNzEzNDIwMzExNTI0NDQ%3D&currentPage=1&countPerPage=10000&keyword=${encodedKeyword}&firstSort=road`;
    $('#user_address_search_container').find('.scroll_box_inner').text('');
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'text',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success: function(response) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/xml");

            const jusoNodes = xmlDoc.getElementsByTagName('juso');
            const totalCount = xmlDoc.getElementsByTagName('totalCount')[0].textContent
            
            if(totalCount==0){
            	$('#user_address_search_container').find('.scroll_box_inner').append(`
            			<input class="user_address_search_result outform" type="button" name="user_address" value="검색된 결과가 없습니다."/>
 	            `);
            	showing(search_result_container);
            	$('.for_address').text(`* 올바른 검색어를 입력해주세요.`)
            	$('.for_address').addClass('failed_message');
            }else{
            	for (let node of jusoNodes) {
            		$('#user_address_search_container').find('.scroll_box_inner').append(`
            			<div class="user_address_search_result" onclick="select_address(this)">
 	            			<input class="user_address_search_result_first outform" type="button" name="user_address" value="${node.getElementsByTagName('roadAddr')[0].textContent}"/>
 	            			<input class="user_address_search_result_second outform" type="button" name="user_address" value="${node.getElementsByTagName('jibunAddr')[0].textContent}"/>
            			</div>
		            `);
	            }
            	showing(search_result_container);
            	$('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
            }
            
            if(totalCount>1000){
            	$('.for_address').text(`* 1000개 이상의 검색결과가 있습니다. 더 상세하게 검색해주세요.`)
            	$('.for_address').addClass('failed_message');
            }
            
            $('.cards_inner_body_right').scrollTop($('.cards_inner_body_right')[0].scrollHeight);
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', error);
        }
    });
}

function last_submit(e){
	var formData = new FormData();
	var isThumbnail = true;
	var user_private = 1;

    $(e).find(`input:not('.outform'), textarea:not('.outform'), select:not('.outform')`).each(function() {
        var name = $(this).attr('name');
        var value = $(this).val();       

        if (value) {
            if ($(this).is('select[name="user_private"]')) {
                user_private *= parseInt(value);
            } else if ($(this).is('input[name="user_profile"]')) {
                var files = $(this)[0].files;
                if (files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                    	if(isThumbnail){
                    		formData.append('user_thumbnail_file', files[i]);
                    		isThumbnail = false;
                    	}else{
                    		formData.append('user_profile_file', files[i]);
                    	}
                    }
                }
            } else if ($(this).is('input[type="radio"]:not(:checked)')) {
            	return;
            } else if ($(this).is('input[type="checkbox"]:not(:checked)')) {
            	return;
            } else if ($(this).is('input[name="user_birth"]')) {
                let dateParts = value.split('.');
                let isoDate = `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dateParts[2].padStart(2, '0')}`;
                formData.append('user_birth', isoDate);
            } else {
            	formData.append(name, value);
            }
        }
    });
    
    formData.append("user_private", user_private);
    
    console.log([...formData.entries()]);

    $.ajax({
    	type: 'POST',
        url: '/user/join',
        data: formData,
        processData: false, // FormData 사용 시 false로 설정
        contentType: false, // FormData 사용 시 false로 설정
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		alert('회원가입에 성공하였습니다.');
	    		window.location.href = '/user/login';
	    	}
	    	if(response==3){
	    		alert('입력하지 않은 항목이 있습니다.');
	    	}
	        console.log("데이터 전송 성공:", response);
	    },
	    error: function(error) {
	        console.log("데이터 전송 실패:", error);
	        alert('회원가입에 실패하였습니다.');
	    }
    });
}

function create_unity(){
	var formData = new FormData();
	var unity_private = 1;

    $('.unity_create_container').find(`input:not('.outform'), textarea:not('.outform'), select:not('.outform')`).each(function() {
        var name = $(this).attr('name');
        var value = $(this).val();       

        if (value) {
            if ($(this).is('select[name="unity_private"]')) {
                unity_private *= parseInt(value);
            } else if ($(this).is('input[type="radio"]:not(:checked)')) {
            	return;
            } else if ($(this).is('input[type="checkbox"]:not(:checked)')) {
            	return;
            } else if ($(this).is('input[type="file"]')) {
                var files = $(this).prop('files');
                if (files.length > 0) {
                    formData.append(name, files[0]);
                }
            } else {
            	formData.append(name, value);
            }
        }
    });
    
    var tags = "";
	
    $('.unity_create_container').find('.tag_card').each(function(index) {
        if (index > 0) {
            tags += ",";
        }
        tags += $(this).attr('data-tag');
    });
    
    if (tags !== "") {
        formData.append('unity_tag', tags);
    }
    
    formData.append("unity_private", unity_private);
    
    console.log([...formData.entries()]);
    
    $.ajax({
    	type: 'POST',
        url: '/unity/create',
        data: formData,
        processData: false, // FormData 사용 시 false로 설정
        contentType: false, // FormData 사용 시 false로 설정
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		alert('유니티 생성에 성공하였습니다.');
	    		/*window.location.href = '/unity/main';*/
	    	}
	    	if(response==0){
	    		alert('유니티 생성에 실패하였습니다.');
	    	}
	        console.log("데이터 전송 성공:", response);
	    },
	    error: function(error) {
	        console.log("데이터 전송 실패:", error);
	        alert('유니티 생성에 실패하였습니다.');
	    }
    });
}

function check_duple(input, callback){
	
	const inputValue = $(input).val();
	const target = $(input).attr('name');
	
	console.log('inputValue : ',inputValue);
	console.log('target : ',target);
	
	$.ajax({
    	type: 'GET',
        url: '/user/checkDuple',
        data: {target : target, data : inputValue},
        dataType: "json",
        success: function (response) {
	    	if(response>0){
	    		console.log(target,'duple!!!!');
	    		callback(response);
	    	}else{
	    		console.log(target,' is unique.');
	    		callback(response);
	    	}
	    },
	    error: function(error) {
	    	callback(null);
	    }
    });
}

function submit_circle(e){
	if($(e).closest('.write_container').find('textarea').val().trim()==''){
		alert('게시글은 1자 이상이어야 합니다.');
		return;
	}
	
	var formData = new FormData();
	
	formData.append('post_content',$(e).closest('.write_container').find('textarea').val());
	if(circle_posting_files.length > 0 && circle_posting_files[0] !== ''){
		circle_posting_files.forEach(function(file) {
	        formData.append('posting_files', file);
	    });
	}

	var tags = "";
	
    $(e).closest('.write_container').find('.tag_card').each(function(index) {
        if (index > 0) {
            tags += ",";
        }
        tags += $(this).attr('data-tag');
    });
    
    if (tags !== "") {
        formData.append('post_tag', tags);
    }
    
    console.log([...formData.entries()]);

    $.ajax({
    	type: 'POST',
        url: '/main/circle/',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		get_circle_post();
	    		invalidate_write_container('circle');
	    	}
	    },
	    error: function(error) {
	        console.log("데이터 전송 실패:", error);
	        alert('게시글 작성에 실패하였습니다.');
	    }
    });
}

function submit_reple(e){
	if($(e).val().trim()==''){
		alert('댓글은 1자 이상이어야 합니다.');
		return;
	}
	const card = $(e).closest('.card');
	
	$.ajax({
        type: "POST",
        url: "/main/reple/",
        data: {reple_content:$(e).val(),
        		reple_target:card.attr('data-post_code')},
        dataType: "json",
        success: function (response) {
        	$(e).val('');
        	get_reple(e);
	    },
	    error: function(error) {
	        alert('댓글 작성에 실패하였습니다.');
	    }
    });
}

function get_reple(e){
	
	$.ajax({
        type: "GET",
        url: "/main/reple/",
        data: {reple_target: $(e).closest('.card').attr('data-post_code')},
        dataType: "json",
        success: function(data) {
        	console.log(data);
        	
        	if (data != null && data.length>0) {
        		
        		if($(e).closest('.card').find('.card_foot_comment').length==0){
        			var reple_container= `
        				<div class="card_foot_comment">
	        				<div class="scroll_box">
		        				<div class="scroll_box_inner">
		        				</div>
	        				</div>
        				</div>
        			`;
        			var $comment = $(reple_container);
        			
        			for (const reple of data) {
                    	if(reple.reple_content!=null && reple.reple_content!=''){
                    		
                    		$comment.find('.scroll_box_inner').prepend(`
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
                    				<div class="card_comment_thumbnail" onclick="visit(${reple.reple_writer},this)">
    	                				<img class="small_img" src="/img/user/profiles/${reple.writer_thumbnail_path}"/>
                    				</div>
                    				<div class="card_comment_body">
    	                				<div class="card_comment_nickname" onclick="visit(${reple.reple_writer},this)">${reple.writer_nickname}</div>
    	                				<div class="card_comment_content">${reple.reple_content}</div>
    	                				<div class="card_comment_time">
    	                				<i class="material-symbols-outlined">favorite</i>${reple.reple_recomm_count}
    	                				<span>${auto_format_date(reple.reple_time)}</span>
    	                				</div>
                    				</div>
                				</div>
                    		`);
                    	}
                    }
        			$(e).closest('.card').find('.card_foot').append($comment);
        		}else{
        			$(e).closest('.card').find('.card_foot_comment').find('.scroll_box_inner').empty();
        			
        			for (const reple of data) {
                    	if(reple.reple_content!=null && reple.reple_content!=''){
                    		
		        			$(e).closest('.card').find('.card_foot_comment').find('.scroll_box_inner').append(`
		            				<div class="card_comment" data-reple_code="${reple.reple_code}">
		            				<div class="card_comment_thumbnail" onclick="visit(${reple.reple_writer},this)">
		                				<img class="small_img" src="/img/user/profiles/${reple.writer_thumbnail_path}"/>
		            				</div>
		            				<div class="card_comment_body">
		                				<div class="card_comment_nickname" onclick="visit(${reple.reple_writer},this)">${reple.writer_nickname}</div>
		                				<div class="card_comment_content">${reple.reple_content}</div>
		                				<div class="card_comment_time">
		                				<i class="material-symbols-outlined">favorite</i>${reple.reple_recomm_count}
		                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
		            				</div>
		        				</div>
		            		`);
                    	}
        			}
        		}
            }
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_circle_post(user_code){
	
	$.ajax({
        type: "GET",
        url: "/main/circle/",
        data: {user_code:user_code},
        dataType: "json",
        success: function(data) {
        	var target;
        	
        	if(user_code==null){
        		target = $('.circle_cards');
        	}else{
        		target = $('.visit_cards');
        	}
        	
        	target.empty();
        	
        	for (const postVO of data){
        		const post = `
	        		<div class="card" data-post_code="${postVO.post_code}">
						<div class="card_header">
							<div class="card_header_image" onclick="visit(${postVO.post_writer},this)">
								<img class="small_img" src="/img/user/profiles/${postVO.writer_thumbnail_path}"/>
							</div>
							<div class="card_header_nickname" onclick="visit(${postVO.post_writer},this)">
								${postVO.writer_nickname}
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="material-symbols-outlined">favorite</i>
									<span>${postVO.post_recomm_count}</span>
								</div>
								<div class="card_header_tool">
									<i class="fa-solid fa-bars" style="font-size: 20px;"></i>
								</div>
							</div>
						</div>
						<div class="card_body">
							<div class="card_body_content">
								<div class="scroll_box">
									<div class="scroll_box_inner">${postVO.post_content}</div>
								</div>
							</div>
							<div class="card_body_tags">
								#태그
							</div>
						</div>
						<div class="card_foot">
							<div class="card_foot_comment_input">
								<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
								<button type="button" onclick="submit_reple($(this).prev())">
									<i class="material-symbols-outlined">send</i>
								</button>
							</div>
						</div>
					</div>
	        	`;
        		
        		const $card = $(post);
                target.append($card);
        		
                if (postVO.post_tag != null && postVO.post_tag != '') {
                    const tags = postVO.post_tag.split(',');
                    for (const tag_value of tags) {
                        $card.find('.card_body_tags').append(`
                            <div class="tag_card" data-tag="${tag_value}" onclick="search_tag(this)">#${tag_value}</div>
                        `);
                    }
                }
                
                if (postVO.post_file_path != null && postVO.post_file_path != '') {
                	
                    const files = postVO.post_file_path.split(',');
                    var img_container = `
            			<div class="image_container">
							<div class="image_main">
							</div>
						</div>`;
                    var $img = $(img_container);
                    for (const file of files) {
                    	if($img.find('.image_main').find('img').length==0){
                    		$img.find('.image_main').append(`
                				<img src="/img/circle/upload/${file}"/>
                    		`);
                    	}else if($img.find('.image_queue').length==0){
                    		$img.append(`
                				<div class="image_queue">
									<div class="image_queue_belt">
										<div class="image_waiting">
											<img src="/img/circle/upload/${file}"/>
										</div>
									</div>
								</div>
                        	`);
                    	}else{
                    		$img.find('.image_queue_belt').append(`
                				<div class="image_waiting">
									<img src="/img/circle/upload/${file}"/>
								</div>
                    		`);
                    	}
                    }
                    $card.find('.card_body_content').find('.scroll_box_inner').prepend($img);
                }
                
                if (postVO.reples != null && postVO.reples.length>0) {
                	var reple_container= `
                		<div class="card_foot_comment">
	                		<div class="scroll_box">
		                		<div class="scroll_box_inner">
		                		</div>
	                		</div>
                		</div>
                		`;
                	var $comment = $(reple_container);
                	for (const reple of postVO.reples) {
                    	if(reple.reple_content!=null && reple.reple_content!=''){
                    		
                    		$comment.find('.scroll_box_inner').append(`
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit(${reple.reple_writer},this)">
		                				<img class="small_img" src="/img/user/profiles/${reple.writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
		                				<div class="card_comment_nickname" onclick="visit(${reple.reple_writer},this)">${reple.writer_nickname}</div>
		                				<div class="card_comment_content">${reple.reple_content}</div>
		                				<div class="card_comment_time">
		                				<i class="material-symbols-outlined">favorite</i>${reple.reple_recomm_count}
		                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
                				</div>
                    		`);
                    	}
                    }
                	$card.find('.card_foot').append($comment);
                }
        	}
        	target.scrollTop(0);
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_person_profile(user_code){
	
	if(person == self && user_code == null){
		return;
	}
	
	$.ajax({
        type: "GET",
        url: "/user/profile",
        data: {user_code:user_code},
        dataType: "json",
        success: function(data) {
        	$('.profile_container').addClass('hidden');
        	
        	if(user_code != null && person != user_code){
        		if($('.profile_container').hasClass('shrinked')){
            		expand_profile();
            	}
            	if($('.detail_profile_container').hasClass('expanded')){
            		shrink_profile();
            	}
        	}
        	
        	profile_length=1;
        	
        	if(user_code==null){
        		person = self;
        	}else{
        		person = user_code;
        	}
        	
        	profile_type='person';
        	
        	$('.user_profile_container .profile_container_head_basic').html(`
        		<img class="black" src="/img/user/profiles/${data.user_thumbnail_path}"/>
				<div class="profile_container_head_basic_nickname">
					${data.user_nickname}
				</div>
				<div class="profile_container_head_basic_info">
        			국적 : ${data.user_nation}
				</div>
				<div class="profile_container_head_basic_info">
        			출생 : ${format_date(data.user_birth,'yymmdd')}
				</div>
				<div class="profile_container_head_basic_info">
        			성별 : ${data.user_gender}
				</div>
				<div class="profile_container_head_basic_info">
        			접속 정보 : ${data.user_logon}
				</div>
        	`);
        	$('.user_profile_container .profile_container_head_tools').html(`
        		<div class="profile_container_head_tool">
					<i class="material-symbols-outlined">sms</i>
					메세지
				</div>
				<div class="profile_container_head_tool">
					<i class="material-symbols-outlined">for_you</i>
					팔로우
				</div>
				<div class="profile_container_head_tool">
					<i class="material-symbols-outlined">bookmark_star</i>
					즐겨찾기
				</div>
				<div class="profile_container_head_tool">
					<i class="material-symbols-outlined">block</i>
					차단
				</div>
				<div class="profile_container_head_tool">
					<i class="material-symbols-outlined">partner_reports</i>
					신고
				</div>
    			<div class="profile_container_head_tool">
	    			<i class="material-symbols-outlined">contract_edit</i>
	    			수정
    			</div>
        	`);
        	$('.user_profile_container .profile_container_body .scroll_box_inner').html(`
        		<div class="inner_box mw p5 mgb">
					<div class="inner_title">모국어</div>
					<div class="scroll_box row">
						<img src="https://flagcdn.com/w80/kr.png" class="flags">
						${data.user_native_lang}
        			</div>
				</div>
				<div class="inner_box mw p5 mgb">
					<div class="inner_title">유창한 언어</div>
					<div class="scroll_box row">
						<img src="https://flagcdn.com/w80/kr.png" class="flags">
						${data.user_fluent_lang}
        			</div>
				</div>
				<div class="inner_box mw p5 mgb">
					<div class="inner_title">학습중인 언어</div>
					<div class="scroll_box row">
						<img src="https://flagcdn.com/w80/kr.png" class="flags">
						${data.user_learning_lang}
        			</div>
				</div>
        	`);
        	setTimeout(function() {
        		$('.profile_container').removeClass('hidden');
        		
        		const container = $('.user_profile_container').outerHeight();
        		const header = $('.user_profile_container .profile_container_head').outerHeight();
        		const max_height = container - header;
        		$('.profile_container_body').css('max-height',max_height);
        		
            }, 10);
        	
        	if(!$('.unity_profile_container').hasClass('none')){
        		hide('.unity_profile_container');
        		showing('.user_profile_container');
        	}
        	
        	check_profile_button();
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_unities(){
	
	$.ajax({
        type: "GET",
        url: "/unity/home",
        dataType: "json",
        success: function(data) {
        	$('.favorite_unities').empty();
        	$('.unities').empty();
        	
        	for (const unity of data){
        		if(unity.unity_type == 'favorite'){
        			$('.favorite_unities').prepend(`
        				<div class="favorite_unity" data-unity_code="${unity.unity_code}" onclick="enter_unity($(this).attr('data-unity_code'))">
							<img src="/img/unity/thumbnail/${unity.unity_thumbnail_path}"></img>
							<div>${unity.unity_name}</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
        			`);
        		}else{
        			var unity_card = `
        				<div class="unity_card" data-unity_code="${unity.unity_code}" onclick="enter_unity($(this).attr('data-unity_code'))">
							<div class="unity_card_thumbnail">
								<img class="small_img" src="/img/unity/thumbnail/${unity.unity_thumbnail_path}"></img>
							</div>
							<div class="unity_card_body">
								<div class="unity_card_name">${unity.unity_name}</div>
								<div class="unity_card_message">${unity.unity_intro}</div>
								<div class="unity_card_tags">
								</div>
							</div>
						</div>
	        			`;
        			
        			var $card = $(unity_card);
        			
        			if(unity.unity_tag!=null){
        				
        				const tags = unity.unity_tag.split(",").map(item => item.trim());;
        				
        				for (const tag of tags){
        					$card.find('.unity_card_tags').prepend(`<div class="tag_card" data-value="${tag}">#${tag}</div>`);
        				}
        			}
        			
        			$(`.${unity.unity_type}_unities`).prepend($card);
        		}
        	}
        	
        	setTimeout(function() {
        		if($('.favorite_unities').find('.favorite_unity').length==0){
        			$('.favorite_unities').append(`<div class="annotation_message max_div">즐겨찾는 유니티가 없습니다.</div>`);
        		}
        		if($('.unities.joined_unities').find('.unity_card').length==0){
        			$('.unities.joined_unities').append(`<div class="annotation_message max_div">가입한 유니티가 없습니다.</div>`);
        		}
        		if($('.unities.recomm_unities').find('.unity_card').length==0){
        			$('.unities.unities.recomm_unities').append(`<div class="annotation_message max_div">추천 대상 유니티가 없습니다.</div>`);
        		}
        		if($('.unities.near_unities').find('.unity_card').length==0){
        			$('.unities.near_unities').append(`<div class="annotation_message max_div">근처의 유니티가 없습니다.</div>`);
        		}
        	}, 1);
        	
        },
        error: function(xhr, status, error) {
        }
    });
	
	
}

function get_unity_profile(unity_code){
	
	if(unity_code == null){
		return;
	}
	
	$.ajax({
		type: "GET",
		url: "/unity/profile",
		data: {unity_code:unity_code},
		dataType: "json",
		success: function(data) {
			
        	$('.profile_container').addClass('hidden');
        	
    		if($('.profile_container').hasClass('shrinked')){
        		expand_profile();
        	}
        	if($('.detail_profile_container').hasClass('expanded')){
        		shrink_profile();
        	}
        	
        	profile_length=1;
        	unity = unity_code;
        	profile_type='unity';
        	
        	$('.unity_profile_container .profile_container_head_basic').attr('data-unity_code',unity_code);
        	$('.unity_profile_container .profile_container_head_basic').attr('onclick',`enter_unity('${unity_code}')`);
        	$('.unity_profile_container .profile_container_head_basic').html(`
        		<img class="black" src="/img/unity/thumbnail/${data.unity_thumbnail_path}"/>
				<div class="profile_container_head_basic_unity_name">
					${data.unity_name}
				</div>
    			<div class="profile_container_head_intro">
        			${data.unity_intro}
    			</div>
				<div class="profile_container_head_basic_info">
        			등급 : ${data.unity_grade}
				</div>
				<div class="profile_container_head_basic_info">
        			회원 수 : ${data.unity_member_count}명
				</div>
				<div class="profile_container_head_basic_info">
        			생성일 : ${format_date(data.unity_since,'yymmdd')}
				</div>
    			<div class="profile_container_head_basic_info">
        			태그 : ${data.unity_tag}
    			</div>
    			<div class="profile_container_head_basic_info">
        			활동지역 : ${data.unity_location}
    			</div>
    			<div class="profile_container_head_basic_info">
        			주 사용언어 : ${data.unity_lang}
    			</div>
        	`);
        	$('.unity_profile_container .profile_container_head_tools').html(`
    			<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="enter_unity($(this).attr('data-unity_code'))">
	    			<i class="material-symbols-outlined">other_houses</i>
	    			메인
    			</div>
    			<div class="profile_container_head_tool" data-unity_code="${unity_code}">
        			<i class="material-symbols-outlined">input_circle</i>
        			가입
    			</div>
				<div class="profile_container_head_tool" data-unity_code="${unity_code}">
					<i class="material-symbols-outlined">bookmark_star</i>
					즐겨찾기
				</div>
				<div class="profile_container_head_tool" data-unity_code="${unity_code}">
					<i class="material-symbols-outlined">block</i>
					차단
				</div>
				<div class="profile_container_head_tool" data-unity_code="${unity_code}">
					<i class="material-symbols-outlined">partner_reports</i>
					신고
				</div>
    			<div class="profile_container_head_tool" data-unity_code="${unity_code}">
	    			<i class="material-symbols-outlined">contract_edit</i>
	    			수정
    			</div>
        	`);
        	
        	var $boards = $('<div class="scroll_box_inner"></div>');
        	
        	for (const boardData of data.unity_board) {
        	    const category = boardData.unity_board_code.split("_")[2];
        	    const board = boardData.unity_board_code.split("_")[2];
        	    const untCodeCategory = boardData.unity_board_code.split("_").slice(0, 3).join("_");

        	    var $categoryContainer = $boards.find(`[data-category="${untCodeCategory}"]`);

        	    if ($categoryContainer.length === 0) {

        	        $categoryContainer = $('<div class="inner_box mw p5 mgb"></div>')
        	            .attr('data-category', untCodeCategory)
        	            .append(`
        	                <div class="inner_title">
        	                    ${boardData.unity_board_category}
        	                    <i class="material-symbols-outlined col_tgb" onclick="inner_box_toggle(this)">expand_circle_up</i>
        	                </div>
        	                <div class="inner_content expanded gap5 back">
        	                </div>
        	            `);

        	        $boards.append($categoryContainer);
        	    }

        	    $categoryContainer.find('.inner_content').append(`
        	        <div class="unity_board sf" data-unity_board_code="${board}">${boardData.unity_board_name}</div>
        	    `);
        	}

        	$('.unity_profile_container .scroll_box').html($boards);
        	
        	setTimeout(function() {
        		$('.profile_container').removeClass('hidden');
        		
        		const container = $('.unity_profile_container').outerHeight();
        		const header = $('.unity_profile_container .profile_container_head').outerHeight();
        		const max_height = container - header;
        		$('.profile_container_body').css('max-height',max_height);
        		
            }, 1);
        	
        	if(!$('.user_profile_container').hasClass('none')){
        		hide('.user_profile_container');
        		showing('.unity_profile_container');
        	}
        	
        	$('#title_unity_name').text(`${data.unity_name}`);
        	
        	check_profile_button();
        },
        error: function(xhr, status, error) {
        }
    });
}




function get_unity_main(unity_code){
	
	if(unity_code == null){
		return;
	}
	
	$.ajax({
		type: "GET",
		url: "/unity/main",
		data: {unity_code:unity_code},
		dataType: "json",
		success: function(data) {
			
        	unity = unity_code;
        	
        	$('.in_unity_banner').html(`
        		<img src="/img/unity/banner/${data.unity_banner_path}" style="${data.unity_banner_set}"/>
        	`);
        	
        	$('.in_unity_main .recent_post').empty();
        	$('.in_unity_main .hot_post').empty();
        	
        	for (const post of data.unity_post) {
        	    $(`.${post.post_type}`).append(`
        	    	<div class="post_card" data-post_code="${post.post_code}" data-post_place="${post.post_place}" onclick="enter_unity_post($(this).attr('data-post_code'))">
						<div class="post_card_thumbnail">
							<img class="small_img" src="/img/user/profiles/${post.writer_thumbnail_path}"/>
						</div>
						<div class="post_card_body">
							<div class="post_card_title">${post.writer_nickname} 님의 게시물</div>
							<div class="post_card_info">${post.post_place_name}</div>
							<div class="post_card_info">${post.post_title}</div>
						</div>
						<div class="post_card_footer">
							<div class="post_card_info">
								<i class="fa-regular fa-heart"></i><span>${post.post_recomm_count}</span>
							</div>
							<div class="post_card_info">
								<i class="fa-regular fa-comment-dots"></i><span>${post.post_reple_count}</span>
							</div>
							<div class="post_card_info">${auto_format_date(post.post_time)}</div>
						</div>
					</div>
        	    `);
        	}
        	
        	for (var [key, value] of Object.entries(data.unity_member)) {
        		
        		if(key=="unity_member_since"){
        			value = format_date(value,'yymmdd');
        		}
        		if (key.endsWith("_count")) {
        		    value = `${value}개`;
        		}
        		if (key.endsWith("_times")) {
        		    value = `${value}회`;
        		}
        	    $(`.in_unity_main #${key} .cell`).text(`${value}`);
        	    
        	}
        	
    		$('#unity_member_grade_icon').text('counter_5');
        	
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_unity_post(post_code){
	
	$.ajax({
        type: "GET",
        url: "/unity/post",
        data: {post_code:post_code},
        dataType: "json",
        success: function(data) {
        	var target;
        	
        	for (const postVO of data){
        		const post = `
	        		<div class="card" data-post_code="${postVO.post_code}">
						<div class="card_header">
							<div class="card_header_image" onclick="visit(${postVO.post_writer},this)">
								<img class="small_img" src="/img/user/profiles/${postVO.writer_thumbnail_path}"/>
							</div>
							<div class="card_header_nickname" onclick="visit(${postVO.post_writer},this)">
								${postVO.writer_nickname}
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="material-symbols-outlined">favorite</i>
									<span>${postVO.post_recomm_count}</span>
								</div>
								<div class="card_header_tool">
									<i class="fa-solid fa-bars" style="font-size: 20px;"></i>
								</div>
							</div>
						</div>
						<div class="card_body">
							<div class="card_body_content">
								<div class="scroll_box">
									<div class="scroll_box_inner">${postVO.post_content}</div>
								</div>
							</div>
							<div class="card_body_tags">
								#태그
							</div>
						</div>
						<div class="card_foot">
							<div class="card_foot_comment_input">
								<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
								<button type="button" onclick="submit_reple($(this).prev())">
									<i class="material-symbols-outlined">send</i>
								</button>
							</div>
						</div>
					</div>
	        	`;
        		
        		const $card = $(post);
                $('.unity_cards').append($card);
        		
                if (postVO.post_tag != null && postVO.post_tag != '') {
                    const tags = postVO.post_tag.split(',');
                    for (const tag_value of tags) {
                        $card.find('.card_body_tags').append(`
                            <div class="tag_card" data-tag="${tag_value}" onclick="search_tag(this)">#${tag_value}</div>
                        `);
                    }
                }
                
                if (postVO.post_file_path != null && postVO.post_file_path != '') {
                	
                    const files = postVO.post_file_path.split(',');
                    var img_container = `
            			<div class="image_container">
							<div class="image_main">
							</div>
						</div>`;
                    var $img = $(img_container);
                    for (const file of files) {
                    	if($img.find('.image_main').find('img').length==0){
                    		$img.find('.image_main').append(`
                				<img src="/img/circle/upload/${file}"/>
                    		`);
                    	}else if($img.find('.image_queue').length==0){
                    		$img.append(`
                				<div class="image_queue">
									<div class="image_queue_belt">
										<div class="image_waiting">
											<img src="/img/circle/upload/${file}"/>
										</div>
									</div>
								</div>
                        	`);
                    	}else{
                    		$img.find('.image_queue_belt').append(`
                				<div class="image_waiting">
									<img src="/img/circle/upload/${file}"/>
								</div>
                    		`);
                    	}
                    }
                    $card.find('.card_body_content').find('.scroll_box_inner').prepend($img);
                }
                
                if (postVO.reples != null && postVO.reples.length>0) {
                	var reple_container= `
                		<div class="card_foot_comment">
	                		<div class="scroll_box">
		                		<div class="scroll_box_inner">
		                		</div>
	                		</div>
                		</div>
                		`;
                	var $comment = $(reple_container);
                	for (const reple of postVO.reples) {
                    	if(reple.reple_content!=null && reple.reple_content!=''){
                    		
                    		$comment.find('.scroll_box_inner').append(`
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit(${reple.reple_writer},this)">
		                				<img class="small_img" src="/img/user/profiles/${reple.writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
		                				<div class="card_comment_nickname" onclick="visit(${reple.reple_writer},this)">${reple.writer_nickname}</div>
		                				<div class="card_comment_content">${reple.reple_content}</div>
		                				<div class="card_comment_time">
		                				<i class="material-symbols-outlined">favorite</i>${reple.reple_recomm_count}
		                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
                				</div>
                    		`);
                    	}
                    }
                	$card.find('.card_foot').append($comment);
                }
        	}
        	$('.unity_cards').scrollTop(0);
        },
        error: function(xhr, status, error) {
        }
    });
}
