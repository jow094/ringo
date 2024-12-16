var profile_target = "";
var profile_length=1;
var unity = "";
let circle_posting_files = [];
let unity_posting_files = [];
var current_user = "";
var board_code = "";
var favorites = [];
var follows = [];
var modifying_post_code = "";
var modifying_files = {};
var deleting_files = [];


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
            dataType: "json",
            success: function(data) {
            	if(data == null || data.user_code == null || data.user_code == ""){
            		if (!currentURL.includes('join') && !currentURL.includes('login')) {
            			annotation_alert(`<span>로그인 정보가 없습니다. 로그인 페이지로 이동합니다.</span>`, function (result) {
        			        if (result) {
        			        	window.location.href = "/user/login";
        			        }else{
        			        	window.location.href = "/user/login";
        			        }
        			    });
            		}
            	}else{
            		get_coordinates();
            		current_user = data.user_code;
            		console.log('current_user is',current_user);
            		follows = data.follows;
            		favorites = data.favorites;
            		get_user_profile(data.user_code);
            	}
            },
            error: function(xhr, status, error) {
            	console.log('check failed');
            }
        });
    }
}

function logIn(){
	const user_id = $('.login_container').find(`[name=user_id]`).val();
	const user_pw = $('.login_container').find(`[name=user_pw]`).val();
	
	$.ajax({
		type: "POST",
		url: "/user/login",
		data: {user_id : user_id , user_pw : user_pw},
		dataType: "json",
		success: function(data) {
			if(data == 1){
				window.location.href = "/main/home";
			}else{
				annotation_alert(`<span>입력하신 정보를 다시 확인하세요.</span>`);
			}
		},
		error: function(xhr, status, error) {
			annotation_alert(`<span>입력하신 정보를 다시 확인하세요.</span>`);
		}
	});
}

function logOut(){
	annotation_alert(`<span>로그아웃 되었습니다.</span>`, function (result) {
		if (result) {
			$.ajax({
		        type: "POST",
		        url: "/user/logOut",
		        dataType: "json",
		        success: function(data) {
		        	window.location.href = "/user/login";
		        },
		        error: function(xhr, status, error) {
		        	window.location.href = "/user/login";
		        }
		    });
		}
	});
	
}

function send_sms(e){
	
	var input;
	var isModifying = false;
	
	if($(e).is('div')){
		input = $(e).siblings('input[name="user_tel"]');
	}
	
	if($(e).is('input[name="user_tel"]')){
		input = e;
	}
	
	if($(e).closest('#modify').length>0){
		input = $('#modify_tel');
		isModifying = true;
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

function check_code(e,target,update){
	
	const input_code = $(e).siblings('input').val();
	
	$.ajax({
        type: "POST",
        url: "/user/authentication/check",
        dataType: 'json',
        data: {input_code : input_code, target : target},
        success: function(data) {
        	console.log(data);
        	if(data==1){
        		console.log('success');
        		set_hint(e,'* 인증에 성공하였습니다.','success_message');
        		set_finished(e,'row');
        		if(update && target == 'sms'){
        			$('#modify').find(`[name='user_tel']:not(.outForm)`).val(update);
        		}
        		if(update && target == 'email'){
        			$('#modify').find(`[name='user_email']:not(.outForm)`).val(update);
        		}
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

function get_coordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            
            $.ajax({
        		type: "POST",
        		url: "/user/location",
        		data: {latitude:latitude, longitude:longitude},
        		dataType: "json",
        		success: function(data) {
        			get_algorithm();
        		},
        		error: function(error) {
        	    }
            });

        }, function(error) {
            console.error("위치 정보를 가져오지 못했습니다.", error);
        });
    } else {
        console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
}

function get_algorithm() {
	console.log('get Algorithm!!');
	
	$.ajax({
		type: "GET",
		url: "/algorithm/prev",
		dataType: "json",
		success: function(data) {
			console.log(data);
		},
		error: function(error) {
		}
	});
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
            			<input class="user_address_search_result outForm" type="button" name="user_address" value="검색된 결과가 없습니다."/>
 	            `);
            	showing(search_result_container);
            	$('.for_address').text(`* 올바른 검색어를 입력해주세요.`)
            	$('.for_address').addClass('failed_message');
            }else{
            	for (let node of jusoNodes) {
            		$('#user_address_search_container').find('.scroll_box_inner').append(`
            			<div class="user_address_search_result" onclick="select_address(this)">
 	            			<input class="user_address_search_result_first outForm" type="button" name="user_address" value="${node.getElementsByTagName('roadAddr')[0].textContent}"/>
 	            			<input class="user_address_search_result_second outForm" type="button" name="user_address" value="${node.getElementsByTagName('jibunAddr')[0].textContent}"/>
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

    $(e).find(`input:not('.outForm'), textarea:not('.outForm'), select:not('.outForm')`).each(function() {
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
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		annotation_alert(`<span>회원가입에 성공하였습니다.</span>`, function (result) {
			        if (result) {
			        	window.location.href = "/user/login";
			        }else{
			        	window.location.href = "/user/login";
			        }
			    });
	    	}
	    	if(response==3){
	    		annotation_alert(`<span>입력하지 않은 항목이 있습니다.</span>`);
	    	}
	    },
	    error: function(error) {
	    	annotation_alert(`<span>회원가입 중 오류가 발생하였습니다.</span>`);
	    }
    });
}

function create_unity(){
	var formData = new FormData();
	var unity_private = 1;

    $('.unity_create_container').find(`input:not('.outForm'), textarea:not('.outForm'), select:not('.outForm')`).each(function() {
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
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		annotation_alert(`<span>유니티 생성에 성공하였습니다.</span>`, function (result) {
			        if (result) {
			        	unity_home();
			        }
			    });
	    	}
	    	if(response==0){
	    		annotation_alert(`<span>유니티 생성 중 오류가 발생하였습니다.</span>`);
	    	}
	    	$('.unity_create_container').find('.selected_card_container').empty();
	    	$('.unity_create_container').find('textarea').val('');
	    	$('.unity_create_container').find('textarea').trigger('input');
	    	$('.unity_create_container').find('input').val('');
	    	$('.unity_create_container').find('input').trigger('input');
	    	delete_image($('.unity_create_container').find('.unity_thumbnail_preview'));
	    	delete_image($('.unity_create_container').find('.unity_banner_preview'));
	    	col_toggle($('.unity_create_container').find('.selected_card_container'));
	    	
	    	$('.unity_create_container').find('.finished_row').each(function() {
	    		set_unfinished($(this), 'row');
	    	});
	    	$('.unity_create_container').find('select').each(function() {
	    	    set_unfinished($(this), 'row');
	    	    set_hint($(this), '* 입력되지 않았습니다.', 'annotation_message');
	    	    $(this).prop('selectedIndex', 0);
	    	});
	    },
	    error: function(error) {
	    	annotation_alert(`<span>유니티 생성 중 오류가 발생하였습니다.</span>`);
	    }
    });
}

function check_duple(input, callback){
	
	const inputValue = $(input).val();
	const target = $(input).attr('name');
	
	$.ajax({
    	type: 'GET',
        url: '/user/checkDuple',
        data: {target : target, data : inputValue},
        dataType: "json",
        success: function (response) {
	    	if(response>0){
	    		callback(response);
	    	}else{
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
		annotation_alert(`<span>게시글은 1자 이상이어야 합니다.</span>`);
		return;
	}
	
	if(modifying_post_code != null && modifying_post_code != ''){
		submit_modify_circle_post();
	}else{
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
		
		$.ajax({
			type: 'POST',
			url: '/circle/post/',
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
				annotation_alert(`<span>게시글 작성 중 오류가 발생하였습니다.</span>`);
			}
		});
	}
}

function submit_unity(e){
	if($('.unity_write').find('textarea').val().trim()==''){
		annotation_alert(`<span>게시글은 1자 이상이어야 합니다.</span>`);
		return;
	}
	if($('#unity_post_title').val().trim()==''){
		annotation_alert(`<span>제목은 1자 이상이어야 합니다.</span>`);
		return;
	}
	if($('#unity_post_place').val()==null || $('#unity_post_place').val()==""){
		annotation_alert(`<span>작성하실 게시판을 선택해주세요.</span>`);
		return;
	}
	
	var formData = new FormData();
	
	formData.append('post_place', $('#unity_post_place').val());
	
	formData.append('post_title', $('#unity_post_title').val());
	
	formData.append('post_content',$('.unity_write').find('textarea').val());
	
	if(unity_posting_files.length > 0 && unity_posting_files[0] !== ''){
		unity_posting_files.forEach(function(file) {
	        formData.append('posting_files', file);
	    });
	}

	var tags = "";
	
	$('.unity_write').find('.tag_card').each(function(index) {
        if (index > 0) {
            tags += ",";
        }
        tags += $(this).attr('data-tag');
    });
    
    if (tags !== "") {
        formData.append('post_tag', tags);
    }

    $.ajax({
    	type: 'POST',
        url: '/unity/post/',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
	    	if(response==1){
	    		enter_unity_board('return',$('#unity_post_place').val());
	    		invalidate_write_container('unity');
	    	}
	    },
	    error: function(error) {
	        annotation_alert(`<span>게시글 작성 중 오류가 발생하였습니다.</span>`);
	    }
    });
}

function submit_reple(e){
	if($(e).val().trim()==''){
		annotation_alert(`<span>댓글은 1자 이상이어야 합니다.</span>`);
		return;
	}
	const card = $(e).closest('.card');
	
	$.ajax({
        type: "POST",
        url: "/main/reple/",
        data: {reple_content:$(e).val(),
        		target_code:card.attr('data-post_code')},
        dataType: "json",
        success: function (response) {
        	$(e).val('');
        	get_reple(e);
	    },
	    error: function(error) {
	    	annotation_alert(`<span>댓글 작성 중 오류가 발생하였습니다.</span>`);
	    }
    });
}

function get_reple(e){
	
	$.ajax({
        type: "GET",
        url: "/main/reple/",
        data: {target_code: $(e).closest('.card').attr('data-post_code')},
        dataType: "json",
        success: function(data) {
        	
        	if (data != null && data.length>0) {
        		$(e).closest('.card').find('.reple_button_section').find('.cell').text(`댓글 ${data[0].assemble_count}개`);
        		
        		if($(e).closest('.unity_cards').length>0){
        			$('.post_list').find(`[data-post_code=${data[0].target_code}]`).find('.fa-comment-dots').next('span').text(data[0].assemble_count);
        		}
        		
        		
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
                    		var reple_card = `
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
	                					<div class="ff column">
			                    			<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
			                    			<div class="card_comment_content">${reple.reple_content}</div>
	                					</div>
		                				<div class="card_comment_time">
			                				<div class="ff row">
				                    			<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
				                    			<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
				                    			<span class="recomm_count">${reple.reple_recomm_count}</span>
			                				</div>
			                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
	            				</div>`;
                    		var $reple = $(reple_card);
                    		if(reple.reple_is_recommended){
                    			hide($reple.find('.add_recomm'));
                    		}else{
                    			hide($reple.find('.delete_recomm'));
                    		}
                    		$comment.find('.scroll_box_inner').append($reple);
                    	}
                    }
        			$(e).closest('.card').find('.card_foot_comment_input').after($comment);
        		}else{
        			$(e).closest('.card').find('.card_foot_comment').find('.scroll_box_inner').empty();
        			
        			for (const reple of data) {
                    	if(reple.reple_content!=null && reple.reple_content!=''){
                    		var reple_card = `
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
	                					<div class="ff column">
			                    			<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
			                    			<div class="card_comment_content">${reple.reple_content}</div>
	                					</div>
		                				<div class="card_comment_time">
			                				<div class="ff row">
				                    			<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
				                    			<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
				                    			<span class="recomm_count">${reple.reple_recomm_count}</span>
			                				</div>
			                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
	            				</div>`;
                    		var $reple = $(reple_card);
                    		if(reple.reple_is_recommended){
                    			hide($reple.find('.add_recomm'));
                    		}else{
                    			hide($reple.find('.delete_recomm'));
                    		}
                    		$(e).closest('.card').find('.card_foot_comment').find('.scroll_box_inner').append($reple);
                    	}
        			}
        		}
            }
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_circle_post(visit_code){
	
	$.ajax({
        type: "GET",
        url: "/circle/post/",
        data: {visit_code:visit_code},
        dataType: "json",
        success: function(data) {
        	var target;
        	
        	if(visit_code==null){
        		target = $('.circle_cards');
        	}else{
        		target = $('.visit_cards');
        	}
        	
        	target.empty();
        	
        	for (const postVO of data){
        		const post = `
	        		<div class="card" data-post_code="${postVO.post_code}">
						<div class="card_header">
							<div class="card_header_image" onclick="visit('${postVO.post_writer}',this)">
								<img class="small_img" src="/files/user/profiles/${postVO.writer_thumbnail_path}"/>
							</div>
							<div class="card_header_nickname" onclick="visit('${postVO.post_writer}',this)">
								${postVO.writer_nickname}
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
									<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
									<span class="recomm_count">${postVO.post_recomm_count}</span>
								</div>
								<div class="card_header_tool tool_buttons none">
									<div onclick="get_modify_circle_post(this)">
										<i class="material-symbols-outlined">edit_note</i>
										<span>수정</span>
									</div>
									<div class="alert_tb" onclick="confirm_delete(this)">
										<i class="material-symbols-outlined">delete</i>
										<span>삭제</span>
									</div>
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
							<div class="reple_button_section" onclick="col_toggle($(this).next('.reple_container'),$(this).find('.material-symbols-outlined'))">
								<span class="cell">댓글 ${postVO.post_reple_count}개</span>
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							<div class="reple_container col_shrinked">
								<div class="card_foot_comment_input">
									<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
									<button type="button" onclick="submit_reple($(this).prev())">
										<i class="material-symbols-outlined">send</i>
									</button>
								</div>
        					</div>
						</div>
					</div>
	        	`;
        		
        		
        		const $card = $(post);
        		
        		if(postVO.post_writer == current_user){
        			showing($card.find('.tool_buttons'));
        		}
                target.append($card);
        		
                if(postVO.post_is_recommended){
                	hide($card.find('.add_recomm'));
                }else{
                	hide($card.find('.delete_recomm'));
                }
                
                if (postVO.post_tag != null && postVO.post_tag != '') {
                    const tags = postVO.post_tag.split(',');
                    for (const tag_value of tags) {
                        $card.find('.card_body_tags').append(`
                            <div class="tag_card" data-tag="${tag_value}" onclick="search_tag(this)">#${tag_value}</div>
                        `);
                    }
                }
                
                if (postVO.post_file_path != null && postVO.post_file_path != '') {
                	var img_container = `
            			<div class="image_container">
            				<div class="image_main">
            				</div>
            			</div>`;
            		var $img = $(img_container);
            		
            		if(postVO.post_file_path.includes(',')){
            			const files = postVO.post_file_path.split(',');
            			
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
            					<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>`);
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting active" onclick="select_img(this)">
                						<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}else{
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting" onclick="select_img(this)">
                						<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}
            			}
            		}else{
            			$img.find('.image_main').append(`<img src="/files/circle/upload/${postVO.post_file_path}?v=${new Date().getTime()}"/>`);
            		}
            		$card.find('.card_body_content').find('.scroll_box_inner').prepend($img);
                }
                
                if (postVO.post_reple_count != 0) {
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
                    		var reple_card = `
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
	                					<div class="ff column">
			                    			<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
			                    			<div class="card_comment_content">${reple.reple_content}</div>
	                					</div>
		                				<div class="card_comment_time">
			                				<div class="ff row">
				                    			<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
				                    			<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
				                    			<span class="recomm_count">${reple.reple_recomm_count}</span>
			                				</div>
			                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
	            				</div>`;
                    		var $reple = $(reple_card);
                    		$comment.find('.scroll_box_inner').append($reple);
                    		if(reple.reple_is_recommended){
                    			hide($reple.find('.add_recomm'));
                    		}else{
                    			hide($reple.find('.delete_recomm'));
                    		}
                    	}
                    }
                	$card.find('.card_foot_comment_input').after($comment);
                }
        	}
        	target.scrollTop(0);
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_user_profile(user_code){
	
	console.log('uc:',user_code);
	console.log('cu:',current_user);
	
	if (user_code == null && profile_target == "") {
		if(!$('.unity_profile_container').hasClass('none')){
    		hide('.unity_profile_container');
    		showing('.user_profile_container');
    	}
		return;
	}
	
	if(user_code == null){
		profile_target = "";
	}else{
		profile_target = user_code;
	}
	
	$.ajax({
        type: "GET",
        url: "/user/profile",
        data: {user_code:user_code},
        dataType: "json",
        success: function(response) {
        	
        	console.log(response);
        	
        	const data = response.data;
        	const conn = response.conn;
        	var isFollow = false;
        	var isFavorite = false;
        	if(follows.includes(user_code)){
        		isFollow = true;
        	}
        	if(favorites.includes(user_code)){
        		isFavorite = true;
        	}
        	
        	unity = "";
        	var container = $('.user_profile_container');
        	
        	container.find('.tags').empty();
        	
        	container.find('.profile_container_head_basic').find('img').attr('src',`/files/user/profiles/${data.user_thumbnail_path}?v=${new Date().getTime()}`);
        	container.find('.profile_container_head_basic').attr('data-user_code',data.user_code);
        	$('.profile_container_head_basic_nickname').text(`${data.user_nickname}`);
        	$('.profile_container_head_basic_info').eq(0).html(`<img class="flags" src="https://flagcdn.com/w80/${data.user_nation}.png"/>${trs_nation(data.user_nation,'nation')}`);
        	$('.profile_container_head_basic_info').eq(1).text(`${format_date(data.user_birth,'yymmdd')} , ${data.user_gender}`);
        	$('.profile_container_head_basic_info').eq(2).text(`나와의 거리 : ${data.user_distance}km`);
        	if(user_code == null || user_code == current_user || data.user_code == current_user || data.user_distance == null){
        		hide($('.profile_container_head_basic_info').eq(2));
        	}else{
        		showing($('.profile_container_head_basic_info').eq(2));
        	}
        	$('.profile_container_head_basic_info').eq(3).text(`${is_private(data.user_private, data.user_logon != 0 ? '접속 중 : ' + data.user_logon : time_ago(data.user_log_time) + ', ' + data.user_log_location, 'login')}`);
        	
        	const tags = data.user_interest.split(',');
        	for(const tag of tags){
        		container.find('.my_tags').append(`<div class="tag_card">#${tag}</div>`);
        	}
        	if(data.user_native_lang.includes(',')){
        		const langs = data.user_native_lang.split(',');
        		for(const lang of langs){
        			container.find('.user_native_lang').append(`
        				<div class="nation">
	    					<img class="flags" src="https://flagcdn.com/w80/${lang}.png">
	    					<span>${trs_nation(lang,'lang')}</span>
    					</div>
        			`);
        		}
        	}else{
        		container.find('.user_native_lang').append(`
        				<div class="nation">
		        			<img class="flags" src="https://flagcdn.com/w80/${data.user_native_lang}.png">
							<span>${trs_nation(data.user_native_lang,'lang')}</span>
						</div>
        		`);
        	}
        	if(data.user_fluent_lang.includes(',')){
        		const langs = data.user_fluent_lang.split(',');
        		for(const lang of langs){
        			container.find('.user_fluent_lang').append(`
    					<div class="nation">
	    					<img class="flags" src="https://flagcdn.com/w80/${lang}.png">
	    					<span>${trs_nation(lang,'lang')}</span>
    					</div>
        			`);
        		}
        	}else{
        		container.find('.user_fluent_lang').append(`
        			<div class="nation">
	    				<img class="flags" src="https://flagcdn.com/w80/${data.user_fluent_lang}.png">
	    				<span>${trs_nation(data.user_fluent_lang,'lang')}</span>
	    			</div>
        		`);
        	}
        	if(data.user_learning_lang.includes(',')){
        		const langs = data.user_learning_lang.split(',');
        		for(const lang of langs){
        			container.find('.user_learning_lang').append(`
    					<div class="nation">
	    					<img class="flags" src="https://flagcdn.com/w80/${lang}.png">
	    					<span>${trs_nation(lang,'lang')}</span>
    					</div>
        			`);
        		}
        	}else{
        		container.find('.user_learning_lang').append(`
        			<div class="nation">
        				<img class="flags" src="https://flagcdn.com/w80/${data.user_learning_lang}.png">
        				<span>${trs_nation(data.user_learning_lang,'lang')}</span>
        			</div>
        		`);
        	}
        	container.find('.user_intro').find('span').text(data.user_intro);
        	container.find('.user_ideal_partner').find('span').text(data.user_ideal_partner);
        	container.find('.user_objective').find('span').text(data.user_objective);
        	container.find('.user_topic').find('span').text(data.user_topic);
        	
        	if(profile_target == current_user || profile_target==''){
        		showing(container.find('.open_modify_profile'));
        		hide(container.find('.add_follow'));
        		hide(container.find('.delete_follow'))
        		hide(container.find('.add_favorite'));
        		hide(container.find('.delete_favorite'))
        	}else{
        		hide(container.find('.open_modify_profile'));
        		if(isFollow){
            		hide(container.find('.add_follow'));
            		showing(container.find('.delete_follow'))
            	}else{
            		hide(container.find('.delete_follow'))
            		showing(container.find('.add_follow'));
            	}
            	if(isFavorite){
            		hide(container.find('.add_favorite'));
            		showing(container.find('.delete_favorite'))
            	}else{
            		hide(container.find('.delete_favorite'))
            		showing(container.find('.add_favorite'));
            	}
        	}
        	
        	$('.detail_profile_content').empty();
        	
        	function pc(userVO) {
        	    return `
        	        <div class="card_person ${userVO.user_logon != '0' ? 'finished_row' : ''}">
        	            <div class="card_person_thumbnail" onclick="shrink_profile();">
        	                <img class="small_img" src="/files/user/profiles/${userVO.user_thumbnail_path}"/>
        	            </div>
        	            <div class="card_person_info" onclick="shrink_profile(); visit('${userVO.user_code}', this)">
        	                <div class="card_person_info_nickname">${userVO.user_nickname}</div>
        	                <div class="card_person_info_comment">${userVO.user_logon != '0'? '온라인' : '오프라인'}</div>
        	                <div class="card_person_info_logon">${userVO.user_logon != '0'? userVO.user_logon : time_ago(userVO.user_log_time) + ', ' + userVO.user_log_location}</div>
        	            </div>
        	            <div class="card_person_tools">
        	                <div class="card_person_tool">
        	                    <i class="material-symbols-outlined" onclick="get_personal_msg_room('${userVO.user_code}')">sms</i>
        	                </div>
        	            </div>
        	        </div>`;
        	}
        	 
        	if(isEmpty(conn.user_favorite)){
        		$('.detail_profile_content.favorite').html(`
        			<div class="empty">즐겨찾기에 등록한 사용자가 없습니다.</div>
        		`);
        	}else{
        		for (const userVO of conn.user_favorite){
        			if(userVO.user_logon != '0'){
        				$('.detail_profile_content.favorite').prepend(pc(userVO));
        			}else{
        				$('.detail_profile_content.favorite').append(pc(userVO));
        			}
        		}
        	}
        	if(isEmpty(conn.user_follower)){
        		$('.detail_profile_content.follower').html(`
            			<div class="empty">팔로워가 없습니다.</div>
            		`);
        	}else{
        		for (const userVO of conn.user_follower){
        			if(userVO.user_logon != '0'){
        				$('.detail_profile_content.follower').prepend(pc(userVO));
        			}else{
        				$('.detail_profile_content.follower').append(pc(userVO));
        			}
        		}
        	}
        	if(isEmpty(conn.user_following)){
        		$('.detail_profile_content.following').html(`
            			<div class="empty">팔로우 중인 대상이 없습니다.</div>
            		`);
        	}else{
        		for (const userVO of conn.user_following){
        			if(userVO.user_logon != '0'){
        				$('.detail_profile_content.following').prepend(pc(userVO));
        			}else{
        				$('.detail_profile_content.following').append(pc(userVO));
        			}
        		}
        	}
        	
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
        	
        	if(current_user == user_code){
        		profile_target = "";
        	}
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
        				<div class="favorite_unity" data-unity_code="${unity.unity_code}" onclick="enter_unity_main('${unity.unity_code}')">
							<img src="/files/unity/thumbnail/${unity.unity_thumbnail_path}?v=${new Date().getTime()}"></img>
							<div>${unity.unity_name}</div>
						</div>
        			`);
        		}else{
        			var unity_card = `
        				<div class="unity_card" data-unity_code="${unity.unity_code}" onclick="enter_unity_main('${unity.unity_code}')">
							<div class="unity_card_thumbnail">
								<img class="small_img" src="/files/unity/thumbnail/${unity.unity_thumbnail_path}"></img>
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
	}else{
		profile_target = unity_code;
	}
	
	$.ajax({
		type: "GET",
		url: "/unity/profile",
		data: {unity_code:unity_code},
		dataType: "json",
		success: function(response) {
			var isFavorite = false;

			if(favorites.includes(unity_code)){
        		isFavorite = true;
        	}
			
			unity = unity_code;
			const container = $('.unity_profile_container');
			const isMember = response.isMember;
			const data = response.data;
			profile_target = unity_code;
			container.find('.tags').empty();
			container.find('.data').empty();
			container.find('img').attr('src','');
			
        	$('.profile_container').addClass('hidden');
        	
        	const tags = data.unity_tag.split(',');
        	for(const tag of tags){
        		container.find('.unity_tags').append(`<div class="tag_card">#${tag}</div>`);
        	}
        	
        	$('.unity_profile_container .profile_container_head_basic').attr('onclick',`enter_unity_main('${unity_code}')`);
        	$('.unity_profile_container .profile_container_head_basic').attr('data-unity_code',unity_code);
        	container.find('#unity_thumbnail_path').attr('src',`/files/unity/thumbnail/${data.unity_thumbnail_path}`);
        	container.find('#unity_name').text(data.unity_name);
        	container.find('#unity_intro').text(data.unity_intro);
        	container.find('#unity_grade').text(`등급 : ${data.unity_grade}`);
        	container.find('#unity_member_count').text(`회원 : ${data.unity_member_count}명`);
        	container.find('#unity_since').text(`창설일 : ${format_date(data.unity_since,'yymmdd')}`);
        	container.find('#unity_location').text(`주요 활동지역 : ${trs_nation(data.unity_location,'nation')}`);
        	const langs = data.unity_lang.split(',');
        	for(const lang of langs){
        		container.find('#unity_lang').append(`
        			<div class="nation">
    					<img class="flags" src="https://flagcdn.com/w80/${lang}.png">
    					<span>${trs_nation(lang,'lang')}</span>
					</div>
        		`);
        	}
        	
        	if(data.unity_admin == current_user){
        		if(isFavorite){
        			$('.unity_profile_container .profile_container_head_tools').html(`
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="enter_unity_main('${unity_code}')">
        					<i class="material-symbols-outlined">other_houses</i>
        					<span>메인</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="delete_favorite(this)">
        					<i class="material-symbols-outlined">bookmark_remove</i>
        					<span>즐겨찾기 취소</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="show_modify_unity('${unity_code}')">
        					<i class="material-symbols-outlined">contract_edit</i>
        					<span>관리</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="delete_unity('${unity_code}')">
        					<i class="material-symbols-outlined">delete</i>
        					<span>폐쇄</span>
    					</div>
        			`);
        		}else{
        			$('.unity_profile_container .profile_container_head_tools').html(`
        				<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="enter_unity_main('${unity_code}')">
        					<i class="material-symbols-outlined">other_houses</i>
        					<span>메인</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="add_favorite(this)">
        					<i class="material-symbols-outlined">bookmark_star</i>
        					<span>즐겨찾기</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="show_modify_unity('${unity_code}')">
        					<i class="material-symbols-outlined">contract_edit</i>
        					<span>관리</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="delete_unity('${unity_code}')">
        					<i class="material-symbols-outlined">delete</i>
        					<span>폐쇄</span>
    					</div>
        			`);
        		}
        	}else if(isMember == 1){
        		console.log('this is member');
        		if(isFavorite){
        			$('.unity_profile_container .profile_container_head_tools').html(`
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="enter_unity_main('${unity_code}')">
	    					<i class="material-symbols-outlined">other_houses</i>
	    					<span>메인</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="delete_favorite(this)">
	    					<i class="material-symbols-outlined">bookmark_remove</i>
	    					<span>즐겨찾기 취소</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="leave_unity('${unity_code}')">
	    					<i class="material-symbols-outlined">output_circle</i>
	    					<span>탈퇴</span>
    					</div>
        			`);
        		}else{
        			console.log('this is not favorite');
        			$('.unity_profile_container .profile_container_head_tools').html(`
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="enter_unity_main('${unity_code}')">
	    					<i class="material-symbols-outlined">other_houses</i>
	    					<span>메인</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="add_favorite(this)">
	    					<i class="material-symbols-outlined">bookmark_star</i>
	    					<span>즐겨찾기</span>
    					</div>
    					<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="leave_unity('${unity_code}')">
	    					<i class="material-symbols-outlined">output_circle</i>
	    					<span>탈퇴</span>
    					</div>
        			`);
        		}
        	}else{
        		$('.unity_profile_container .profile_container_head_tools').html(`
            			<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="enter_unity_main('${unity_code}')">
        	    			<i class="material-symbols-outlined">other_houses</i>
        	    			<span>메인</span>
            			</div>
            			<div class="profile_container_head_tool" data-unity_code="${unity_code}" onclick="join_unity('${unity_code}')">
                			<i class="material-symbols-outlined">input_circle</i>
                			<span>가입</span>
            			</div>
                	`);
        	}
        	
        	
        	
        	
        	var $boards = $('<div class="scroll_box_inner"></div>');
        	$('.unity_board_names .scroll_box').empty();
        	
        	if(isEmpty(data.unity_board)){
        		$('.unity_board_names .scroll_box').append(`
    				<div class="empty">
    					게시판 목록이 없습니다.
					</div>
        		`);
        	}else{
        		for (const boardData of data.unity_board) {
        			const category = boardData.ub_category_code;
        			const category_name = boardData.ub_category_name;
        			const board = boardData.ub_board_code;
        			const board_name = boardData.ub_board_name;
        			const select = $('.unity_write').find('#unity_post_place');
        			
        			var $categoryContainer = $boards.find(`[data-ub_category_code="${category}"]`);
        			
        			if ($categoryContainer.length === 0) {
        				
        				$categoryContainer = $('<div class="inner_box mw mgb"></div>')
        				.attr('data-ub_category_code', category)
        				.append(`
    						<div class="inner_title h20" onclick="inner_box_toggle(this)">
	    						${category_name}
	    						<i class="material-symbols-outlined col_tgb">arrow_drop_up</i>
    						</div>
    						<div class="inner_content expanded gap5">
    						</div>
        				`);
        				
        				$boards.append($categoryContainer);
        				
        				const $optgroup = $('<optgroup>', { 
        					label: category_name,
        					'data-ub_category_code': category
        				});
        				
        				select.append($optgroup);
        			}
        			
        			$categoryContainer.find('.inner_content').append(`
    					<div class="unity_board" data-ub_category_code="${category}" data-ub_board_code="${board}" onclick="enter_unity_board('board',this)"><span>${board_name}</span></div>
        			`);
        			
        			$(`optgroup[data-ub_category_code="${category}"]`).append(`
    					<option value="${board}">${boardData.ub_board_fullname}</option>
        			`);
        		}
        		$('.unity_profile_container .scroll_box').html($boards);
        	}
        	
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
        		<img src="/files/unity/banner/${data.unity_banner_path}?v=${new Date().getTime()}" style="${data.unity_banner_set}"/>
        	`);
        	
        	$('.in_unity_main .recent_post').empty();
        	$('.in_unity_main .hot_post').empty();
        	
        	for (const post of data.unity_post) {
        	    $(`.${post.post_type}`).append(`
        	    	<div class="post_card" data-post_place="${post.post_place}" data-post_code="${post.post_code}" onclick="enter_unity_post(this)">
						<div class="post_card_thumbnail">
							<img class="small_img" src="/files/user/profiles/${post.writer_thumbnail_path}"/>
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
        	
        	if($('.recent_post').find('.post_card').length==0){
        		$('.recent_post').append(`
    				<div class="empty">
    					표시할 게시글이 없습니다.
					</div>
            	`);
        	}
        	if($('.hot_post').find('.post_card').length==0){
        		$('.hot_post').append(`
        				<div class="empty">
        				표시할 게시글이 없습니다.
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

function get_unity_board_info(ub_board_code,upost_code){
	
	$.ajax({
        type: "GET",
        url: "/unity/boardInfo",
        data: {ub_board_code:ub_board_code,upost_code:upost_code},
        dataType: "json",
        success: function(data) {
        	
        	$('#unity_board_info').attr('data-ub_board_code',`${data.ub_board_code}`);
    		$('#unity_board_info').text(data.ub_board_fullname);
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_unity_board(ub_board_code,ub_page){
	
	$.ajax({
        type: "GET",
        url: "/unity/board",
        data: {ub_board_code:ub_board_code,ub_page:ub_page},
        dataType: "json",
        success: function(data) {
        	
        	$('.in_unity_post .post_list').empty();
        	
        	if (isEmpty(data)) {
        		$('.in_unity_post .post_list').append(`
        				<div class="empty">
        				게시글 목록이 없습니다.
        				</div>
        		`);
        		$('.added_page').empty();
        		$('.num').addClass('pressed');
        		$('.num').off('click')
        		return;
        	}
        	
        	for (const postVO of data.unity_post){
        		$('.in_unity_post .post_list').append(`
    				<div class="post_row" data-post_seq=${postVO.post_seq} data-post_place=${ub_board_code} data-post_code=${postVO.post_code} onclick="scrollToPost(this)">
						<div>${postVO.post_title}</div>
						<div>
							<i class="fa-regular fa-comment-dots"></i>
							<span>${postVO.post_reple_count}</span>
						</div>
						<div>
							<i class="fa-regular fa-heart"></i>
							<span>${postVO.post_recomm_count}</span>
						</div>
						<div>
							<i class="material-symbols-outlined sf">counter_5</i>
							<span>${postVO.writer_nickname}</span>
						</div>
						<div>
							<span>${auto_format_date(postVO.post_time)}</span>
						</div>
					</div>
        		`);
        	}
        	
            let totalPosts = data.ub_post_count;
            let totalPages = Math.ceil(totalPosts / 20);
            
            $('.added_page').empty();

            for (let i = 2; i <= Math.min(totalPages, 10); i++) {
                $('.added_page').append(`<div class="page num">${i}</div>`);
            }

            $('.num').off('click').on('click', function() {
                get_unity_board(ub_board_code, $(this).text());
            });
        	
            if(ub_page != null){
            	origin_page = ub_page;
            	$('.num').removeClass('pressed');
            	if(!$('.num').filter(`:contains('${ub_page}')`).hasClass('pressed')){
            		$('.num').filter(`:contains('${ub_page}')`).addClass('pressed');
            	}
            }
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_unity_post(ub_board_code,upost_code,unity_board_page){
	
	$.ajax({
        type: "GET",
        url: "/unity/post",
        data: {ub_board_code:ub_board_code,
	        	upost_code:upost_code,
	        	unity_board_page:unity_board_page},
        dataType: "json",
        success: function(data) {
        	
        	console.log(data);
        	
        	$('.unity_cards').empty();
        	
        	if (isEmpty(data)) {
        		$('.unity_cards').append(`
        				<div class="empty">
        					게시글 목록이 없습니다.
    					</div>
            		`);
                return;
            }
        	
        	for (const postVO of data){
        		
        		const post = `
	        		<div class="card" data-post_seq="${postVO.post_seq}" data-post_place=${ub_board_code} data-post_code="${postVO.post_code}">
						<div class="unity_card_header">
							<div class="uch_titles">
			        			<div class="uch_board">${postVO.post_place_name}</div>
			        			<div class="uch_title">${postVO.post_title}</div>
        					</div>
        					<div class="uch_writer onclick="visit('${postVO.post_writer}',this)"">
        						<div class="uch_writer_image">
        							<img class="small_img" src="/files/user/profiles/${postVO.writer_thumbnail_path}"/>
        						</div>
        						<div class="uch_writer_infos">
        							<div class="uch_writer_grade">${postVO.writer_unity_member_grade}</div>
        							<div class="uch_writer_nickname">${postVO.writer_nickname}</div>
        						</div>
        					</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
									<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
									<span class="recomm_count">${postVO.post_recomm_count}</span>
								</div>
								<div class="card_header_tool tool_buttons none">
									<div onclick="modify_post(this)">
										<i class="material-symbols-outlined">edit_note</i>
										<span>수정</span>
									</div>
									<div class="alert_tb" onclick="confirm_delete(this)">
										<i class="material-symbols-outlined">delete</i>
										<span>삭제</span>
									</div>
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
							<div class="reple_button_section" onclick="col_toggle($(this).next('.reple_container'),$(this).find('.material-symbols-outlined'))">
								<span class="cell">댓글 ${postVO.post_reple_count}개</span>
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							<div class="reple_container col_shrinked">
								<div class="card_foot_comment_input">
									<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
									<button type="button" onclick="submit_reple($(this).prev())">
										<i class="material-symbols-outlined">send</i>
									</button>
								</div>
        					</div>
						</div>
					</div>
	        	`;
        		
        		const $card = $(post);
        		
        		if(postVO.post_writer == current_user){
        			showing($card.find('.tool_buttons'));
        		}
        		
        		if(postVO.post_is_recommended){
        			hide($card.find('.add_recomm'));
        		}else{
        			hide($card.find('.delete_recomm'));
        		}
        		
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
                	var img_container = `
            			<div class="image_container">
            				<div class="image_main">
            				</div>
            			</div>`;
            		var $img = $(img_container);
            		
            		if(postVO.post_file_path.includes(',')){
            			const files = postVO.post_file_path.split(',');
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
            					<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>`);
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting active" onclick="select_img(this)">
                						<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}else{
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting" onclick="select_img(this)">
                						<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}
            				
            			}
            		}else{
            			$img.find('.image_main').append(`<img src="/files/unity/upload/${postVO.post_file_path}?v=${new Date().getTime()}"/>`);
            		}
            		$card.find('.card_body_content').find('.scroll_box_inner').prepend($img);
                }
                
                if (postVO.post_reple_count != 0) {
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
                			var reple_card = `
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
	                					<div class="ff column">
			                    			<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
			                    			<div class="card_comment_content">${reple.reple_content}</div>
	                					</div>
		                				<div class="card_comment_time">
			                				<div class="ff row">
				                    			<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
				                    			<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
				                    			<span class="recomm_count">${reple.reple_recomm_count}</span>
			                				</div>
			                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
	            				</div>`;
                    		var $reple = $(reple_card);
                    		$comment.find('.scroll_box_inner').append($reple);
                    		if(reple.reple_is_recommended){
                    			hide($reple.find('.add_recomm'));
                    		}else{
                    			hide($reple.find('.delete_recomm'));
                    		}
                    	}
                    }
                	$card.find('.card_foot_comment_input').after($comment);
                }
        	}
        	view_check();
        },
        error: function(xhr, status, error) {
        }
    });
}

function get_unity_board_post(post_place,post_code){
	
	$.ajax({
        type: "GET",
        url: "/unity/boardPost",
        data: {ub_board_code:post_place,upost_code:post_code},
        dataType: "json",
        success: function(data) {
        	
        	origin_page = data.page;
        	
        	$('.in_unity_post .post_list').empty();
        	
        	if (isEmpty(data.post)) {
        		$('.in_unity_post .post_list').append(`
    				<div class="empty">
        				게시글 목록이 없습니다.
    				</div>
        		`);
        		return;
        	}
        	
        	for (const postVO of data.board.unity_post){
        		$('.in_unity_post .post_list').append(`
    				<div class="post_row" data-post_seq=${postVO.post_seq} data-post_place=${postVO.post_place} data-post_code=${postVO.post_code} onclick="scrollToPost(this)">
						<div>${postVO.post_title}</div>
						<div><i class="fa-regular fa-comment-dots"></i><span>${postVO.post_reple_count}</span></div>
						<div><i class="fa-regular fa-heart"></i><span>${postVO.post_recomm_count}</span></div>
						<div><i class="material-symbols-outlined sf">counter_5</i><span>${postVO.writer_nickname}</span></div>
						<div><span>${auto_format_date(postVO.post_time)}</span></div>
					</div>
        		`);
        	}
        	
            let totalPosts = data.board.unity_board_post_count;
            let totalPages = Math.ceil(totalPosts / 20);

            $('.added_page').empty();

            for (let i = 2; i <= Math.min(totalPages, 10); i++) {
                $('.added_page').append(`<div class="page num">${i}</div>`);
            }

            $('.num').off('click').on('click', function() {
                get_unity_board(post_place, $(this).text());
            });
            
        	
            $('.unity_cards').empty();
        	
        	if (isEmpty(data.post)) {
        		$('.unity_cards').append(`
        				<div class="empty">
        					게시글 목록이 없습니다.
    					</div>
            		`);
                return;
            }
        	
        	for (const postVO of data.post){
        		
        		const post = `
	        		<div class="card" data-post_seq="${postVO.post_seq}" data-post_place=${postVO.post_place} data-post_code="${postVO.post_code}">
						<div class="unity_card_header">
							<div class="uch_titles">
			        			<div class="uch_board">${postVO.post_place_name}</div>
			        			<div class="uch_title">${postVO.post_title}</div>
        					</div>
        					<div class="uch_writer onclick="visit('${postVO.post_writer}',this)"">
        						<div class="uch_writer_image">
        							<img class="small_img" src="/files/user/profiles/${postVO.writer_thumbnail_path}"/>
        						</div>
        						<div class="uch_writer_infos">
        							<div class="uch_writer_grade">${postVO.writer_unity_member_grade}</div>
        							<div class="uch_writer_nickname">${postVO.writer_nickname}</div>
        						</div>
        					</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
									<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
									<span class="recomm_count">${postVO.post_recomm_count}</span>
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
							<div class="reple_button_section" onclick="col_toggle($(this).next('.reple_container'),$(this).find('.material-symbols-outlined'))">
								<span class="cell">댓글 ${postVO.post_reple_count}개</span>
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							<div class="reple_container col_shrinked">
								<div class="card_foot_comment_input">
									<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
									<button type="button" onclick="submit_reple($(this).prev())">
										<i class="material-symbols-outlined">send</i>
									</button>
								</div>
        					</div>
						</div>
					</div>
	        	`;
        		
        		const $card = $(post);
        		
        		if(postVO.post_is_recommended){
        			hide($card.find('.add_recomm'));
        		}else{
        			hide($card.find('.delete_recomm'));
        		}
        		
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
                	var img_container = `
            			<div class="image_container">
            				<div class="image_main">
            				</div>
            			</div>`;
            		var $img = $(img_container);
            		
            		if(postVO.post_file_path.includes(',')){
            			const files = postVO.post_file_path.split(',');
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
            					<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>`);
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting active" onclick="select_img(this)">
                						<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}else{
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting" onclick="select_img(this)">
                						<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}
            				
            			}
            		}else{
            			$img.find('.image_main').append(`<img src="/files/unity/upload/${postVO.post_file_path}?v=${new Date().getTime()}"/>`);
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
                    		var reple_card = `
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
	                					<div class="ff column">
			                    			<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
			                    			<div class="card_comment_content">${reple.reple_content}</div>
	                					</div>
		                				<div class="card_comment_time">
			                				<div class="ff row">
				                    			<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
				                    			<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
				                    			<span class="recomm_count">${reple.reple_recomm_count}</span>
			                				</div>
			                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
	            				</div>`;
                    		var $reple = $(reple_card);
                    		$comment.find('.scroll_box_inner').append($reple);
                    		if(reple.reple_is_recommended){
                    			hide($reple.find('.add_recomm'));
                    		}else{
                    			hide($reple.find('.delete_recomm'));
                    		}
                    	}
                    }
                	$card.find('.card_foot_comment_input').after($comment);
                }
        	}
        	
        	setTimeout(() => {
        		
        	    const post = $('.unity_cards').find(`[data-post_code="${post_code}"]`);
        	    const currentScroll = $('.unity_cards').scrollTop();
        	    const postTop = post.position().top;
        	    const postHeight = post.outerHeight();
        	    const offset = postTop - post.outerHeight();

    	        $('.unity_cards').animate({
    	            scrollTop: currentScroll + offset
    	        }, 500);
    	        
    	        setTimeout(function() {
    	        	view_check();
    	        }, 500);
        		
        	}, 100);
        },
        error: function(xhr, status, error) {
        }
    });
}

function add_unity_post(upost_code,ub_add_direction,is_finished){
	spin_start('#unity_posts');
	
	$.ajax({
        type: "GET",
        url: "/unity/addPost",
        data: {upost_code:upost_code,ub_add_direction:ub_add_direction},
        dataType: "json",
        success: function(data) {
        	spin_end('#unity_posts');
        	
        	if(data.length == 0 && is_finished){
        		$('#unity_posts').addClass('shake');
        		setTimeout(function() {
        			$('#unity_posts').removeClass('shake');
        	    }, 2000);
        		return;
        	}
        	
        	console.log('additional up',data);
        	
        	if(ub_add_direction == 'up'){
    			data.reverse();
    		}
        	
        	for (const postVO of data){
        		
        		const post = `
	        		<div class="card" data-post_seq="${postVO.post_seq}" data-post_place=${postVO.post_place} data-post_code="${postVO.post_code}">
						<div class="unity_card_header">
							<div class="uch_titles">
			        			<div class="uch_board">${postVO.post_place_name}</div>
			        			<div class="uch_title">${postVO.post_title}</div>
        					</div>
        					<div class="uch_writer onclick="visit('${postVO.post_writer}',this)"">
        						<div class="uch_writer_image">
        							<img class="small_img" src="/files/user/profiles/${postVO.writer_thumbnail_path}"/>
        						</div>
        						<div class="uch_writer_infos">
        							<div class="uch_writer_grade">${postVO.writer_unity_member_grade}</div>
        							<div class="uch_writer_nickname">${postVO.writer_nickname}</div>
        						</div>
        					</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
									<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
									<span class="recomm_count">${postVO.post_recomm_count}</span>
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
							<div class="reple_button_section" onclick="col_toggle($(this).next('.reple_container'),$(this).find('.material-symbols-outlined'))">
								<span class="cell">댓글 ${postVO.post_reple_count}개</span>
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							<div class="reple_container col_shrinked">
								<div class="card_foot_comment_input">
									<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
									<button type="button" onclick="submit_reple($(this).prev())">
										<i class="material-symbols-outlined">send</i>
									</button>
								</div>
        					</div>
						</div>
					</div>
	        	`;
        		
        		const $card = $(post);
        		
        		if(ub_add_direction == 'up'){
        			let currentScroll = $('.unity_cards').scrollTop();
        			$('.unity_cards').prepend($card);
        			$('.unity_cards').scrollTop(currentScroll + $card.outerHeight(true));
        		}else{
        			$('.unity_cards').append($card);
        		}
        		
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
                				<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
                    		`);
                    	}else if($img.find('.image_queue').length==0){
                    		$img.append(`
                				<div class="image_queue">
									<div class="image_queue_belt">
										<div class="image_waiting">
											<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
										</div>
									</div>
								</div>
                        	`);
                    	}else{
                    		$img.find('.image_queue_belt').append(`
                				<div class="image_waiting">
									<img src="/files/unity/upload/${file}?v=${new Date().getTime()}"/>
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
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
		                				<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
		                				<div class="card_comment_content">${reple.reple_content}</div>
		                				<div class="card_comment_time">
		                				<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
										<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
		                				<span class="recomm_count">${reple.reple_recomm_count}</span>
		                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
                				</div>
                    		`);
                    	}
                    }
                	$card.find('.card_foot_comment_input').after($comment);
                }
        	}
        	view_check();
        },
        error: function(xhr, status, error) {
        	spin_end('#unity_posts');
        }
    });
}

function get_modify_unity(unity_code){
	
	if(unity_code == null){
		unity_code = unity;
	}
	
	const container = $('.unity_modify_container');
	container.find('img').remove();
	container.find('.tags_container').empty();
	
	$.ajax({
		type: "GET",
		url: "/unity/profile",
		data: {unity_code:unity_code},
		dataType: "json",
		success: function(response) {
			var data = response.data;
			
			for (var [key, value] of Object.entries(data)) {
				const target = container.find(`[name='${key}']`);
				
				if(target.siblings('select').length == 1){
					if(typeof value === 'string' && value.includes(',')){
						var values = value.split(',');
							for (var val of values) {
								target.siblings('select').find(`[value='${val}']`).prop('selected',true);
								target.siblings('select').trigger('change');
							}
					}else{ 
						target.siblings('select').find(`[value='${value}']`).prop('selected',true);
						target.siblings('select').trigger('change');
					}
				}else if(target.is('select')){
					if(typeof value === 'string' && value.includes(',')){
						var values = value.split(',');
							for (var val of values) {
								target.find(`[value='${val}']`).prop('selected',true);
								target.trigger('change');
							}
					}else{
						target.find(`[value='${value}']`).prop('selected',true);
						target.trigger('change');
					}
					target.trigger('change');
				}else if(key == 'unity_thumbnail_file') {
					target.after(`
						<img src="/files/unity/thumbnail/${data.unity_thumbnail_path}?v=${new Date().getTime()}"/>`);
					target.siblings('i').remove();
		        	target.closest('.picture_content').addClass('have_img');
		        	target.closest('.picture_content').addClass('on_top');
		        	target.closest('.picture_content').attr("onmouseover", "mouse_over(this)");
		        	target.closest('.picture_content').attr("onmouseleave", "mouse_leave(this)");
		        	target.closest('.picture_content').attr("onclick", "delete_image(this)");
				}else if(key == 'unity_banner_file') {
					target.after(`
						<img src="/files/unity/banner/${data.unity_banner_path}?v=${new Date().getTime()}"/>`);
					target.siblings('i').remove();
		        	target.closest('.picture_content').addClass('have_img');
		        	target.closest('.picture_content').addClass('on_top');
		        	target.closest('.picture_content').attr("onmouseover", "mouse_over(this)");
		        	target.closest('.picture_content').attr("onmouseleave", "mouse_leave(this)");
		        	target.closest('.picture_content').attr("onclick", "delete_image(this)");
		        	setTimeout(function() {
		        		select_banner_setting('modify');
		        		target.closest('.picture_content').next('img').css('transition','object-position 0s');
		        	},10);
				}else if(key == 'unity_tag'){
					if(typeof value === 'string' && value.includes(',')){
						var tags = value.split(',');
							for (var tag of tags) {
								target.siblings(`input[name='unity_add_tag']`).val(tag);
								add_tag(target.siblings(`input[name='unity_add_tag']`))
							}
					}else{
						target.siblings(`input[name='unity_add_tag']`).val(tag);
						add_tag(target.siblings(`input[name='unity_add_tag']`))
					}
				}else if(key == 'unity_banner_set'){
					
					target.val(value);
					
					var color = value.match(/background-color:\s*([^;]*)/)[1];
					var objectPosition = value.match(/object-position:\s*([^;]*)/)[1];
					var [horizon, vertical] = objectPosition.split(' ');
					horizon = horizon.replace('%', '');
					vertical = vertical.replace('%', '');
					
					container.find('#banner_color_value').val(color);
					container.find('#banner_horizontal_value').val(horizon);
					container.find('#banner_vertical_value').val(vertical);
					
					select_banner_setting('modify');
				}else {
					target.val(value);
					target.trigger('input');
				}
        	}
			
			$('.modify_board_container').find('.modify_board').remove();
			const uniqueCategories = new Set(data.unity_board.map(item => item.ub_category_code));
			const category_num = uniqueCategories.size;
			
			var categories = [];
			for (let i = 0; i < category_num; i++) {
				categories[i] = `
					<div class="inner_box modify_board moveable" data-category="">
						<div class="inner_title h30">
							<input id="ub_category_name" class="modify" type="text" value="">
							<div class="tiny_button_section">
    							<i class="material-symbols-outlined" onclick="pull_up(this)">arrow_drop_up</i>
    							<i class="material-symbols-outlined" onclick="push_down(this)">arrow_drop_down</i>
    							<i class="material-symbols-outlined" onclick="add_board(this)">add</i>
    							<i class="material-symbols-outlined" onclick="remove_category(this)">remove</i>
    						</div>
						</div>
    					<div class="inner_content expanded gap5">
    					</div>
					</div>`;
			}
			
			const bc = $('.modify_board_container');
			var i = 0;
			for (const boardData of data.unity_board) {
    			const category = boardData.ub_category_code;
    			const category_name = boardData.ub_category_name;
    			const board = boardData.ub_board_code;
    			const board_name = boardData.ub_board_name;
    			
    			var $categoryContainer = bc.find(`[data-ub_category_code="${category}"]`);
    			
    			if ($categoryContainer.length == 0) {
    				console.log('new category!');
    				
    				$categoryContainer = $(categories[i])
    				.attr('data-ub_category_code', category);
    				$categoryContainer.find('input').val(category_name);
    				bc.append($categoryContainer);
    				i++;
    			}
    			
    			$categoryContainer.find('.inner_content').append(`
    				<div class="unity_board moveable" data-ub_board_code="${board}">
						<input id="ub_board_name" class="modify" type="text" value="${board_name}">
						<div class="tiny_button_section">
							<i class="material-symbols-outlined" onclick="pull_up(this)">arrow_drop_up</i>
							<i class="material-symbols-outlined" onclick="push_down(this)">arrow_drop_down</i>
							<i class="material-symbols-outlined" onclick="remove_board(this)">remove</i>
						</div>
					</div>
    			`);
    			console.log('board!');
    		}
			
			setTimeout(() => {
				clear_unity_create_container(container);
			}, 100);
		},
		error: function(xhr, status, error) {
		}
	});
}

function submit_modify_unity_info(e){
	
	if($(e).hasClass('unfinished_row')){
		return;
	}
	
	var formData = new FormData();
	var unity_private = 1;

    $('.unity_modify_container').find(`input:not('.outForm'), textarea:not('.outForm'), select:not('.outForm')`).each(function() {
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
	
    $('.unity_modify_container').find('.tag_card').each(function(index) {
        if (index > 0) {
            tags += ",";
        }
        tags += $(this).attr('data-tag');
    });
    
    if (tags !== "") {
        formData.append('unity_tag', tags);
    }
    
    formData.append("unity_private", unity_private);
    formData.append("unity_code", unity);
    
    console.log([...formData.entries()]);
    
    $.ajax({
    	type: 'POST',
        url: '/unity/modifyInfo',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
        	submit_modify_unity_board();
	    },
	    error: function(error) {
	    }
    });
	
	
}
function submit_modify_unity_board() {
    const result = [];
    const container = $('.modify_board_container');
    const categories = container.find('.modify_board:not(.deleted)').toArray();

    var i = 1;
    for (const category of categories) {
        const param = {};
        const boards = $(category).find('.unity_board:not(.deleted)').toArray();
        const ub_board_list = [];
        var j = 1;
        for (const board of boards) {
            const ub_board = {
                ub_board_code: $(board).data('ub_board_code'),
                ub_board_name: $(board).find('#ub_board_name').val(),
                ub_board_order: j
            };
            ub_board_list.push(ub_board);
            j++;
        }
        param.ub_board_list = ub_board_list;
        param.ub_category_code = $(category).data('ub_category_code');
        param.ub_category_name = $(category).find('#ub_category_name').val();
        param.ub_category_order = i;
        i++;
        result.push(param);
    }

    console.log(result);

    $.ajax({
        url: '/unity/modifyBoard',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(result),
        success: function (response) {
        	annotation_alert(`<span>유니티 정보 수정에 성공하였습니다.</span>`, function (result) {
		        if (result) {
		        	enter_unity_main(unity);
		        	get_unity_profile(unity);
		        }else{
		        	enter_unity_main(unity);
		        	get_unity_profile(unity);
		        }
		    });        	
        },
        error: function (error) {
            console.error('에러 발생:', error);
        }
    });
}

function join_unity(unity_code) {
	$.ajax({
        url: '/unity/join',
        type: 'POST',
        dataType: 'json',
        data: {unity_code:unity_code},
        success: function (response) {
        	console.log(response);
        	if(response == 1){
        		annotation_alert(`<span>유니티 가입에 성공하였습니다.</span>`, function (result) {
    		        if (result) {
    		        	enter_unity_main(unity_code);
    	        		get_unity_profile(unity_code);
    		        }else{
    		        	enter_unity_main(unity_code);
    	        		get_unity_profile(unity_code);
    		        }
    		    });     
        	}else{
        		annotation_alert(`<span>유니티 가입 중 오류가 발생하였습니다.</span>`);
        	}
        },
        error: function (error) {
            console.error('에러 발생:', error);
        }
    });
}
function leave_unity(unity_code) {
	$.ajax({
		url: '/unity/leave',
		type: 'POST',
		dataType: 'json',
		data: {unity_code:unity_code},
		success: function (response) {
			console.log(response);
			if(response == 1){
				annotation_alert(`<span>유니티에서 탈퇴하였습니다.</span>`, function (result) {
			        if (result) {
			        	enter_unity_main(unity_code);
						get_unity_profile(unity_code);
			        }else{
			        	enter_unity_main(unity_code);
						get_unity_profile(unity_code);
			        }
			    });     
			}else{
				annotation_alert(`<span>유니티에서 탈퇴하는 중 오류가 발생하였습니다.</span>`);
        	}
		},
		error: function (error) {
			console.error('에러 발생:', error);
		}
	});
}
function delete_unity(unity_code) {
	setTimeout(() => {
		warning_alert(`<span>폐쇄한 유니티는 복구할 수 없습니다.</span><span>유니티를 폐쇄하시겠습니까?</span>`, function(result){
			if(result){
				
				$.ajax({
					url: '/unity/delete',
					type: 'POST',
					dataType: 'json',
					data: {unity_code:unity_code},
					success: function (response) {
						console.log(response);
						if(response == 1){
							annotation_alert(`<span>유니티가 폐쇄되었습니다.</span>`, function (result) {
								if (result) {
									unity_home();
								}else{
									unity_home();
								}
							});     
							
						}else{
							annotation_alert(`<span>유니티 폐쇄 중 오류가 발생하였습니다.</span>`);
						}
					},
					error: function (error) {
						console.error('에러 발생:', error);
					}
				});
			}
		});
	}, 100);
}

function add_favorite(e) {
	var place;
	var target_code;
	if($(e).closest('.main_messenger_body.in_room').length>0){
		target_code = mr_code;
		place='messenger';
	}
	if($(e).closest('.user_profile_container').length>0){
		target_code = profile_target;
		place='user';
	}
	if($(e).closest('.unity_profile_container').length>0){
		target_code = unity;
		place='unity';
	}
	
	$.ajax({
		url: '/main/favorite',
		method: 'POST',
		data: {target_code: target_code},
		dataType: 'json',
		success: function(data) {
			if(place=='messenger'){
				hide($('.messenger_buttons').find('.add_favorite'));
				showing($('.messenger_buttons').find('.delete_favorite'));
				get_msg_room_list();
			}
			if(place=='user'){
				additional_user_check(() => get_user_profile(profile_target));
			}
			if(place=='unity'){
				additional_user_check(() => get_unity_profile(unity));
			}
		},
		error: function() {
		}
	});
}
function delete_favorite(e) {
	var place;
	var target_code;
	if($(e).closest('.main_messenger_body.in_room').length>0){
		target_code = mr_code;
		place='messenger';
	}
	if($(e).closest('.user_profile_container').length>0){
		target_code = profile_target;
		place='user';
	}
	if($(e).closest('.unity_profile_container').length>0){
		target_code = unity;
		place='unity';
	}
	
	$.ajax({
		url: '/main/favorite?target_code=' + target_code,
		method: 'DELETE',
		dataType: 'json',
		success: function(data) {
			if(place=='messenger'){
				hide($('.messenger_buttons').find('.delete_favorite'));
				showing($('.messenger_buttons').find('.add_favorite'));
			}
			if(place=='user'){
				additional_user_check(() => get_user_profile(profile_target));
			}
			if(place=='unity'){
				additional_user_check(() => get_unity_profile(unity));
			}
		},
		error: function() {
		}
	});
}

function add_follow() {
	
	$.ajax({
		url: '/main/follow',
		method: 'POST',
		data: {target_code: profile_target},
		dataType: 'json',
		success: function(data) {
			additional_user_check(() => get_user_profile(profile_target));
		},
		error: function() {
		}
	});
}
function delete_follow() {
	
	$.ajax({
		url: '/main/follow?target_code=' + profile_target,
		method: 'DELETE',
		dataType: 'json',
		success: function(data) {
			additional_user_check(() => get_user_profile(profile_target));
		},
		error: function() {
		}
	});
}
function add_recomm(e) {
	var place;
	var target_code;
	
	if($(e).closest('.card_header_tool').length>0){
		place = 'post';
		target_code = $(e).closest('.card').data('post_code');
	}
	if($(e).closest('.card_comment').length>0){
		place = 'reple';
		target_code = $(e).closest('.card_comment').data('reple_code');
	}
	
	$.ajax({
		url: '/main/recomm',
		method: 'POST',
		data: {target_code: target_code},
		dataType: 'json',
		success: function(data) {
			renew_recomm(e);
		},
		error: function() {
		}
	});
}
function delete_recomm(e) {
	var place;
	var target_code;
	
	if($(e).closest('.card_header_tool').length>0){
		place = 'post';
		target_code = $(e).closest('.card').data('post_code');
	}
	if($(e).closest('.card_comment').length>0){
		place = 'reple';
		target_code = $(e).closest('.card_comment').data('reple_code');
	}
	
	$.ajax({
		url: '/main/recomm?target_code=' + target_code,
		method: 'DELETE',
		dataType: 'json',
		success: function(data) {
			renew_recomm(e);
		},
		error: function() {
		}
	});
}

function additional_user_check(objective) {
	
	$.ajax({
        type: "GET",
        url: "/user/loginCheck",
        dataType: "json",
        success: function(data) {
        	if(data == null || data.user_code == null || data.user_code == ""){
        		annotation_alert(`<span>로그인 정보가 없습니다. 로그인 페이지로 이동합니다.</span>`, function (result) {
			        if (result) {
			        	window.location.href = "/user/login";
			        }else{
			        	window.location.href = "/user/login";
			        }
			    });   
        	}else{
        		follows = data.follows;
        		favorites = data.favorites;
        		objective();
        	}
        },
        error: function(xhr, status, error) {
        	console.log('check failed');
        }
    });
}

function renew_recomm(e){
	var place;
	var target_code;
	if($(e).closest('.card_comment').length>0){
		place = 'reple';
		target_code = $(e).closest('.card_comment').data('reple_code');
	}else if($(e).closest('.card').length>0){
		place = 'post';
		target_code = $(e).closest('.card').data('post_code');
	}
	$.ajax({
        type: "GET",
        url: "/main/recomm",
        data: {target_code:target_code},
        dataType: "json",
        success: function(data) {
        	if(place == 'post'){
        		const container = $(e).closest('.card_header_tool');
        		container.find('.recomm_count').text(data.recomm_count);
        		if(data.is_recommended){
        			hide(container.find('.add_recomm'));
        			showing(container.find('.delete_recomm'));
        		}else{
        			hide(container.find('.delete_recomm'));
        			showing(container.find('.add_recomm'));
        		}
        	}
        	if(place == 'reple'){
        		const container = $(e).closest('.card_comment');
        		container.find('.recomm_count').text(data.recomm_count);
        		if(data.is_recommended){
        			hide(container.find('.add_recomm'));
        			showing(container.find('.delete_recomm'));
        		}else{
        			hide(container.find('.delete_recomm'));
        			showing(container.find('.add_recomm'));
        		}
        	}
        },
        error: function(xhr, status, error) {
        	console.log('check failed');
        }
    });
}

function delete_post(post_code){
	$.ajax({
		type: "DELETE",
		url: "/main/post?post_code="+post_code,
		dataType: "json",
		success: function(data) {
			$(`[data-post_code="${post_code}"]`).remove();
			if(post_code.startsWith('up_')){
				const ub_board_code = post_code.split('-')[1];
				const ub_page = $('.numbers').find('.pressed').text();
				get_unity_board(ub_board_code,ub_page);
			}
			setTimeout(() => {
				annotation_alert(`<span>게시글이 삭제되었습니다.</span>`);
			}, 500);
		},
		error: function(xhr, status, error) {
		}
	});
}

function get_modify_circle_post(e){
	invalidate_write_container('circle');
	if(!$('.circle_write').hasClass('expanded')){
		col_toggle('.circle_write');
	}
	
	const post_code = $(e).closest('.card').data('post_code');
	
	$.ajax({
		type: "GET",
		url: "/circle/modifyPost",
		data: {post_code : post_code},
		dataType: "json",
		success: function(data) {
			console.log('data to modify',data);
			const container = $('.circle_write');
			
			modifying_post_code = post_code;
			container.find('textarea').val(data.post_content);
			if(data.post_tag){
				var tags = data.post_tag.split(',');
				for(const tag of tags){
					container.find('.tag_input').val(tag);
					add_tag(container.find('.tag_input'));
				}
			}
			if(data.post_file_path){
				col_toggle(container.find('.upload_files'));
				var files = data.post_file_path.split(',');
				for(const file of files){
					var index = file.split('img')[1].replace(/\D/g, '');
					container.find('.upload_files').append(
						`<div class="upload_file draggable existing" data-file_index="${index}" onclick="modifying_delete_file(this)" onmouseleave="mouse_leave(this)" onmouseover="mouse_over(this)">
							<div class="preview_image">
								<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"></img>
							</div>
							<div class="preview_file_name">
								${file}
							</div>
						</div>`);
				}
			}
		},
		error: function(xhr, status, error) {
		}
	});
}

function submit_modify_circle_post(){
	
	if($('.circle_write').find('textarea').val().trim()==''){
		annotation_alert(`<span>게시글은 1자 이상이어야 합니다.</span>`);
		return;
	}
	const post_code = modifying_post_code;
	var formData = new FormData();
	
	formData.append('post_code',modifying_post_code);
	formData.append('post_content',$('.circle_write').find('textarea').val());
	
	$('.circle_write').find('.existing').each(function(index) {
		const name = $(this).find('.preview_file_name').text().trim();
	    const file_index = $(this).data('file_index');
	    modifying_files[file_index] = name;
    });
	
	formData.append('modifying_files', JSON.stringify(modifying_files)); 
	formData.append('deleting_files', deleting_files); 
	
	if(circle_posting_files.length > 0 && circle_posting_files[0] !== ''){
		circle_posting_files.forEach(function(file) {
	        formData.append('posting_files', file);
	    });
	}

	var tags = "";
	
	$('.circle_write').find('.tag_card').each(function(index) {
        if (index > 0) {
            tags += ",";
        }
        tags += $(this).attr('data-tag');
    });
    
    if (tags !== "") {
        formData.append('post_tag', tags);
    }
	
	$.ajax({
		type: 'POST',
        url: '/circle/modifyPost/',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
		success: function(data) {
			annotation_alert(`<span>게시물 수정이 완료되였습니다.</span>`, function (result) {
				invalidate_write_container('circle');
				if($('.circle_write').hasClass('expanded')){
					col_toggle('.circle_write');
				}
				modifying_post_code='';
				modifying_files = {};
				deleting_files = [];
				get_circle_post();
		    });   
		},
		error: function(xhr, status, error) {
		}
	});
}

function get_modify_user(e){
	
	modifying_files = {};
    deleting_files = [];
	
	$.ajax({
		type: "GET",
		url: "/user/modify",
		dataType: "json",
		success: function(data) {
			console.log('user_info :',data);
			const container = $('#modify');
			
			for (var [key, value] of Object.entries(data)) {
				
				if(value == null || value == ''){
					continue;
				}
				
				const target = container.find(`[name='${key}']:not(.outForm)`);
				
				if(target.siblings('select').length == 1){
					if(typeof value === 'string' && value.includes(',')){
						var values = value.split(',');
							for (var val of values) {
								target.siblings('select').find(`[value='${val}']`).prop('selected',true);
								target.siblings('select').trigger('change');
							}
					}else{ 
						target.siblings('select').find(`[value='${value}']`).prop('selected',true);
						target.siblings('select').trigger('change');
					}
				}else if(target.is('select')){
					if(typeof value === 'string' && value.includes(',')){
						var values = value.split(',');
							for (var val of values) {
								target.find(`[value='${val}']`).prop('selected',true);
								target.trigger('change');
							}
					}else{
						target.find(`[value='${value}']`).prop('selected',true);
						target.trigger('change');
					}
					target.trigger('change');
				}else if(key == 'user_thumbnail_path') {
					const input = container.find('.picture_content').first().find('input');
					input.closest('.picture_content').addClass('existing');
					input.siblings('i').remove();
		        	input.closest('.picture_content').addClass('have_img');
		        	input.closest('.picture_content').addClass('on_top');
		        	input.closest('.picture_content').addClass('draggable');
		        	input.closest('.picture_content').attr("onmouseover", "mouse_over(this)");
		        	input.closest('.picture_content').attr("onmouseleave", "mouse_leave(this)");
		        	input.closest('.picture_content').attr("onclick", "modifying_delete_file(this)");
		        	input.closest('.picture_content').attr("draggable", "true");
		            input.after(`
		                <img src="/files/user/profiles/${value}?v=${new Date().getTime()}"/>
		            `);
				}else if(key == 'user_profile_path') {
					const paths = value.split(',');
					for (const path of paths){
						const input = container.find('.picture_content').filter(function() {
							return $(this).find('img').length === 0;
						}).find('input');
						input.closest('.picture_content').addClass('existing');
						input.siblings('i').remove();
						input.closest('.picture_content').addClass('have_img');
						input.closest('.picture_content').addClass('on_top');
						input.closest('.picture_content').addClass('draggable');
						input.closest('.picture_content').attr("onmouseover", "mouse_over(this)");
						input.closest('.picture_content').attr("onmouseleave", "mouse_leave(this)");
						input.closest('.picture_content').attr("onclick", "modifying_delete_file(this)");
						input.closest('.picture_content').attr("draggable", "true");
						input.after(`
								<img src="/files/user/profiles/${path}?v=${new Date().getTime()}"/>
						`);
						input.closest('.picture_content').after(`
								<div class="picture_content">
									<input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this)">
									<i class="material-symbols-outlined">add</i>
								</div>
						`);
					}
				}else{
					target.val(value);
				}
				
			}
			
			const factors = get_private(data.user_private);
			
			for(const factor of factors){
				container.find(`[name=user_private]`).find(`[value='${factor}']`).prop('selected',true);
			}
			
			check_file_index('join');
			
			$('#modify').find('.unfinished_row').each(function() {
				set_finished($('#modify').find('.thumbnail'),'row');
			});
			$('#modify').find('.unfinished_col').each(function() {
				set_finished($('#modify').find('.thumbnail'),'column');
			});
			
			showing('#modify'); 
			toggle_card('#modify',1,0);
		},
		error: function(xhr, status, error) {
		}
	});
}


function submit_modify_user(){
	var formData = new FormData();
	var user_private = 1;

    $('#modify').find(`input:not('.outForm'), textarea:not('.outForm'), select:not('.outForm')`).each(function() {
        var name = $(this).attr('name');
        var value = $(this).val();       

        if (value) {
            if ($(this).is('select[name="user_private"]')) {
                user_private *= parseInt(value);
            }else if ($(this).is('input[name="user_profile"]')) {
                var files = $(this)[0].files;
                if (files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                    	formData.append('user_profile_file', files[i]);
                    }
                }
            }else {
            	formData.append(name, value);
            }
        }
    });
    
    $('#modify').find('.existing').each(function(index) {
		const name = $(this).find('img').attr('src').split('profiles/')[1].split('?')[0];
	    const file_index = $(this).data('file_index');
	    modifying_files[file_index] = name;
    });
	
	formData.append('modifying_files', JSON.stringify(modifying_files)); 
	formData.append('deleting_files', deleting_files); 
	
    formData.append("user_private", user_private);
    
    console.log([...formData.entries()]);
    
    $.ajax({
    	type: 'POST',
        url: '/user/modify',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
	    	if(response==1){
				modifying_files = {};
				deleting_files = [];
				
				annotation_alert(`<span>정보수정에 성공하였습니다.</span>`, function (result) {
			        if (result) {
			        	location.reload();
			        }
			    });
				
	    	}
	    	if(response==3){
	    		annotation_alert(`<span>입력하지 않은 항목이 있습니다.</span>`);
	    	}
	    },
	    error: function(error) {
	    	annotation_alert(`<span>정보수정 중 오류가 발생하였습니다.</span>`);
	    }
    });
}

function get_user_picture(e){
	const container= $('#image_modal');
	container.find('.image_modal_content').empty();
	
	var user_code = $(e).data('user_code');
	if(user_code == null){
		user_code = $(e).attr("src").split('profiles/')[1].split('_thumbnail')[0];
	}
	
	$.ajax({
		type: "GET",
		url: "/user/picture",
		data: {user_code:user_code},
		dataType: "json",
		success: function(data) {
			console.log('picture:',data)
			
                	var img_container = `
            			<div class="image_container">
            				<div class="image_main">
            				</div>
            			</div>`;
            		var $img = $(img_container);
            		
					$img.find('.image_main').append(`
					<img src="/files/user/profiles/${data.user_thumbnail_path}?v=${new Date().getTime()}"/>`);
            		
            		if(data.user_profile_path){
            			const files = data.user_profile_path.split(',');
            			
            			$img.find('.image_main').append(`
            				<div class="image_button left" onclick="prev_img(this)"><i class="material-symbols-outlined">arrow_left</i></div>
            				<div class="image_button right" onclick="next_img(this)"><i class="material-symbols-outlined">arrow_right</i></div>`);
            			
            			$img.append(`
            					<div class="image_queue">
            						<div class="image_queue_belt">
            						</div>
            					</div>`);
            			
            			$img.find('.image_queue_belt').append(`
            					<div class="image_waiting active" onclick="select_img(this)">
            						<img src="/files/user/profiles/${data.user_thumbnail_path}?v=${new Date().getTime()}"/>
            					</div>`);
            			
            			for (const file of files) {
            				$img.find('.image_queue_belt').append(`
            					<div class="image_waiting" onclick="select_img(this)">
            						<img src="/files/user/profiles/${file}?v=${new Date().getTime()}"/>
            					</div>`);
            			}
            		}
            		
            		container.find('.image_modal_content').append($img);
                
			
			
			showing('#image_modal');
		},
		error: function(error) {
	    }
    });
}

function get_around() {
	console.log('get around!');
	
	$.ajax({
        url: '/algorithm/around',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
        	
        	var target = $('.around_cards');
        	target.empty();
        	
        	let data = [...response.nearPost, ...response.tagsPost];
        	
        	var code_list=[];
        	
        	for (const postVO of data){
        		const code = postVO.post_code;
        		if(code_list.includes(code)){
        			continue;
        		}else{
        			code_list.push(code);
        		}
        		
        		const post = `
	        		<div class="card" data-post_code="${postVO.post_code}">
						<div class="card_header">
							<div class="card_header_image" onclick="visit('${postVO.post_writer}',this)">
								<img class="small_img" src="/files/user/profiles/${postVO.writer_thumbnail_path}"/>
							</div>
							<div class="card_header_nickname" onclick="visit('${postVO.post_writer}',this)">
								${postVO.writer_nickname}
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
									<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
									<span class="recomm_count">${postVO.post_recomm_count}</span>
								</div>
								<div class="card_header_tool tool_buttons none">
									<div onclick="get_modify_circle_post(this)">
										<i class="material-symbols-outlined">edit_note</i>
										<span>수정</span>
									</div>
									<div class="alert_tb" onclick="confirm_delete(this)">
										<i class="material-symbols-outlined">delete</i>
										<span>삭제</span>
									</div>
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
							<div class="reple_button_section" onclick="col_toggle($(this).next('.reple_container'),$(this).find('.material-symbols-outlined'))">
								<span class="cell">댓글 ${postVO.post_reple_count}개</span>
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							<div class="reple_container col_shrinked">
								<div class="card_foot_comment_input">
									<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
									<button type="button" onclick="submit_reple($(this).prev())">
										<i class="material-symbols-outlined">send</i>
									</button>
								</div>
        					</div>
						</div>
					</div>
	        	`;
        		
        		
        		const $card = $(post);
        		
        		if(postVO.post_writer == current_user){
        			showing($card.find('.tool_buttons'));
        		}
                target.append($card);
        		
                if(postVO.post_is_recommended){
                	hide($card.find('.add_recomm'));
                }else{
                	hide($card.find('.delete_recomm'));
                }
                
                if (postVO.post_tag != null && postVO.post_tag != '') {
                    const tags = postVO.post_tag.split(',');
                    for (const tag_value of tags) {
                        $card.find('.card_body_tags').append(`
                            <div class="tag_card" data-tag="${tag_value}" onclick="search_tag(this)">#${tag_value}</div>
                        `);
                    }
                }
                
                if (postVO.post_file_path != null && postVO.post_file_path != '') {
                	var img_container = `
            			<div class="image_container">
            				<div class="image_main">
            				</div>
            			</div>`;
            		var $img = $(img_container);
            		
            		if(postVO.post_file_path.includes(',')){
            			const files = postVO.post_file_path.split(',');
            			
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
            					<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>`);
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting active" onclick="select_img(this)">
                						<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}else{
            					$img.find('.image_queue_belt').append(`
                					<div class="image_waiting" onclick="select_img(this)">
                						<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>
                					</div>`);
            				}
            			}
            		}else{
            			$img.find('.image_main').append(`<img src="/files/circle/upload/${postVO.post_file_path}?v=${new Date().getTime()}"/>`);
            		}
            		$card.find('.card_body_content').find('.scroll_box_inner').prepend($img);
                }
                
                if (postVO.post_reple_count != 0) {
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
                    		var reple_card = `
                				<div class="card_comment" data-reple_code="${reple.reple_code}">
	                				<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
		                				<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
	                				</div>
	                				<div class="card_comment_body">
	                					<div class="ff column">
			                    			<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
			                    			<div class="card_comment_content">${reple.reple_content}</div>
	                					</div>
		                				<div class="card_comment_time">
			                				<div class="ff row">
				                    			<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
				                    			<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
				                    			<span class="recomm_count">${reple.reple_recomm_count}</span>
			                				</div>
			                				<span>${auto_format_date(reple.reple_time)}</span>
		                				</div>
	                				</div>
	            				</div>`;
                    		var $reple = $(reple_card);
                    		$comment.find('.scroll_box_inner').append($reple);
                    		if(reple.reple_is_recommended){
                    			hide($reple.find('.add_recomm'));
                    		}else{
                    			hide($reple.find('.delete_recomm'));
                    		}
                    	}
                    }
                	$card.find('.card_foot_comment_input').after($comment);
                }
        	}
        	target.scrollTop(0);
        },
        error: function (error) {
            console.error('에러 발생:', error);
        }
    });
}

function get_timeline() {
	console.log('get timeline!');
	
	$.ajax({
		url: '/algorithm/timeline',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			
			var target = $('.timeline_cards');
			target.empty();
			
			if(data == null){
				target.append(`<div class="empty()">연결된 사용자가 없습니다. 조금 더 활동해보세요!</div>`);
			}
			
			var code_list=[];
			
			for (const postVO of data){
				const code = postVO.post_code;
				if(code_list.includes(code)){
					continue;
				}else{
					code_list.push(code);
				}
				
				const post = `
					<div class="card" data-post_code="${postVO.post_code}">
						<div class="card_header">
							<div class="card_header_image" onclick="visit('${postVO.post_writer}',this)">
								<img class="small_img" src="/files/user/profiles/${postVO.writer_thumbnail_path}"/>
							</div>
							<div class="card_header_nickname" onclick="visit('${postVO.post_writer}',this)">
								${postVO.writer_nickname}
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
									<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
									<span class="recomm_count">${postVO.post_recomm_count}</span>
								</div>
								<div class="card_header_tool tool_buttons none">
									<div onclick="get_modify_circle_post(this)">
										<i class="material-symbols-outlined">edit_note</i>
										<span>수정</span>
									</div>
									<div class="alert_tb" onclick="confirm_delete(this)">
										<i class="material-symbols-outlined">delete</i>
										<span>삭제</span>
									</div>
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
							<div class="reple_button_section" onclick="col_toggle($(this).next('.reple_container'),$(this).find('.material-symbols-outlined'))">
								<span class="cell">댓글 ${postVO.post_reple_count}개</span>
								<i class="material-symbols-outlined">arrow_drop_down</i>
							</div>
							<div class="reple_container col_shrinked">
								<div class="card_foot_comment_input">
									<textarea onkeydown="if(event.key === 'Enter'){event.preventDefault(); submit_reple(this)}"></textarea>
									<button type="button" onclick="submit_reple($(this).prev())">
										<i class="material-symbols-outlined">send</i>
									</button>
								</div>
        					</div>
						</div>
					</div>
					`;
				
				
				const $card = $(post);
				
				if(postVO.post_writer == current_user){
					showing($card.find('.tool_buttons'));
				}
				target.append($card);
				
				if(postVO.post_is_recommended){
					hide($card.find('.add_recomm'));
				}else{
					hide($card.find('.delete_recomm'));
				}
				
				if (postVO.post_tag != null && postVO.post_tag != '') {
					const tags = postVO.post_tag.split(',');
					for (const tag_value of tags) {
						$card.find('.card_body_tags').append(`
								<div class="tag_card" data-tag="${tag_value}" onclick="search_tag(this)">#${tag_value}</div>
						`);
					}
				}
				
				if (postVO.post_file_path != null && postVO.post_file_path != '') {
					var img_container = `
						<div class="image_container">
							<div class="image_main">
							</div>
						</div>`;
					var $img = $(img_container);
					
					if(postVO.post_file_path.includes(',')){
						const files = postVO.post_file_path.split(',');
						
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
									<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>`);
								$img.find('.image_queue_belt').append(`
									<div class="image_waiting active" onclick="select_img(this)">
										<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>
									</div>`);
							}else{
								$img.find('.image_queue_belt').append(`
									<div class="image_waiting" onclick="select_img(this)">
										<img src="/files/circle/upload/${file}?v=${new Date().getTime()}"/>
									</div>`);
							}
						}
					}else{
						$img.find('.image_main').append(`<img src="/files/circle/upload/${postVO.post_file_path}?v=${new Date().getTime()}"/>`);
					}
					$card.find('.card_body_content').find('.scroll_box_inner').prepend($img);
				}
				
				if (postVO.post_reple_count != 0) {
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
							var reple_card = `
								<div class="card_comment" data-reple_code="${reple.reple_code}">
									<div class="card_comment_thumbnail" onclick="visit('${reple.reple_writer}',this)">
										<img class="small_img" src="/files/user/profiles/${reple.r_writer_thumbnail_path}"/>
									</div>
									<div class="card_comment_body">
										<div class="ff column">
											<div class="card_comment_nickname" onclick="visit('${reple.reple_writer}',this)">${reple.r_writer_nickname}</div>
												<div class="card_comment_content">${reple.reple_content}</div>
											</div>
										<div class="card_comment_time">
											<div class="ff row">
												<i class="fa-regular fa-heart add_recomm unrecommended" onclick="add_recomm(this)"></i>
												<i class="fa-solid fa-heart delete_recomm recommended" onclick="delete_recomm(this)"></i>
												<span class="recomm_count">${reple.reple_recomm_count}</span>
											</div>
											<span>${auto_format_date(reple.reple_time)}</span>
										</div>
									</div>
								</div>`;
							var $reple = $(reple_card);
							$comment.find('.scroll_box_inner').append($reple);
							if(reple.reple_is_recommended){
								hide($reple.find('.add_recomm'));
							}else{
								hide($reple.find('.delete_recomm'));
							}
						}
					}
					$card.find('.card_foot_comment_input').after($comment);
				}
			}
			target.scrollTop(0);
		},
		error: function (error) {
			var target = $('.timeline_cards');
			target.empty();
			target.append(`<div class="empty">연결된 사용자가 없습니다. 조금 더 활동해보세요!</div>`);
		}
	});
}

function get_link(){
	$.ajax({
    	type: 'GET',
        url: '/algorithm/link/',
        dataType: "json",
        success: function (data) {
        	console.log('link:',data);
        	
        	if(data.length==0){
        		$('.link_cards').empty();
        		$('.link_cards').append(`<div class="empty">적합한 사용자가 없습니다. 조금 더 활동해보세요!</div>`);
        		return;
        	}
        	$('.link_card_container_footer').empty();
        	const target = $('.link_cards');
        	target.find('.link_card_container_footer').empty();
        	target.find('.data').empty();
        	target.find('img').attr('src','');
        	const main = data[0];
        	const files = main.user_profile_path.split(',');
        	target.find('.link_visit').attr('data-user_code',main.user_code);
        	target.find('#user_tags').prepend(`<span>#관심 태그</span>`);
        	for (var [key, value] of Object.entries(main)) {
        		if(key == 'user_thumbnail_path'){
        			target.find('#user_thumbnail_path').attr('src',`/files/user/profiles/${value}`);
        			target.find('.image_queue_belt').append(`
						<div class="image_waiting active" onclick="select_img(this)">
							<img src="/files/user/profiles/${value}?v=${new Date().getTime()}"/>
						</div>
    				`);
        		}else if(key == 'user_birth'){
        			target.find('#user_birth').append(get_age(value));
        		}else if(key == 'user_nation'){
        			target.find('#user_nation').append(`<img class="flags" src="https://flagcdn.com/w80/${value}.png"/>${trs_nation(value,'nation')}`);
        		}else if(key == 'user_interest'){
        			if(value != null && value.includes(',')){
        				values = value.split(',');
        				for(const tag of values){
        					target.find('#user_tags').append(`<div class="tag_card">#${tag}</div>`)
        				}
        			}else if(value != null){
    					target.find('#user_tags').append(`<div class="tag_card">#${value}</div>`)
        			}
        		}else if(key == 'user_distance'){
        			target.find('#user_distance').append(`${value}km`)
        		}else if(key == 'user_profile_path'){
        			values = value.split(',');
        			showing(target.find('.none'));
        			for(const path of values){
        				target.find('.image_queue_belt').append(`
    						<div class="image_waiting" onclick="select_img(this)">
    							<img src="/files/user/profiles/${path}?v=${new Date().getTime()}"/>
    						</div>
        				`);
        			}
        		}else{
        			if(target.find('.link_card').find(`#${key}`).hasClass('lang')){
        				if(value.includes(',')){
        					const langs = value.split(',')
        					for(const lang of langs){
        						target.find('.link_card').find(`#${key}`).append(`<img class="flags" src="https://flagcdn.com/w80/${lang}.png"><span>${trs_nation(lang,'lang')}</span>`);
        					}
        				}else{
        					target.find('.link_card').find(`#${key}`).append(`<img class="flags" src="https://flagcdn.com/w80/${value}.png"><span>${trs_nation(value,'lang')}</span>`);
        				}
        			}else{
        				target.find('.link_card').find(`#${key}`).append(value);
        			}
        		}
        	}
        	var first = 'active';
        	for(const userVO of data){
        		target.next('.link_card_container_footer').append(`
    				<div class="small_link_card ${first}" data-user_code="${userVO.user_code}" onclick="toggle_link_card(this);">
	    				<div class="small_link_card_thumbnail">
	        				<img src="/files/user/profiles/${userVO.user_thumbnail_path}"/>
	    				</div>
	    				<div class="small_link_card_info">
	    					${userVO.user_nickname}
	    				</div>
	    				<div class="small_link_card_info">
	    					${trs_nation(userVO.user_nation,'nation')}, ${userVO.user_gender}, ${get_age(userVO.user_birth)}, ${userVO.user_distance}km
	    				</div>
    				</div>
        		`);
        		first = '';
        	}
	    },
	    error: function(error) {
	    }
    });
}

function get_link_user(user_code){
	$.ajax({
		type: 'GET',
		url: '/algorithm/codeLink/',
		data: {user_code : user_code},
		dataType: "json",
		success: function (data) {
			console.log(data);
			
			const target = $('.link_cards');
        	target.find('.data').empty();
        	target.find('img').attr('src','');
        	target.find('#user_tags').prepend(`<span>#관심 태그</span>`);
        	target.find('.link_visit').attr('data-user_code',data.user_code);
        	
        	for (var [key, value] of Object.entries(data)) {
        		if(key == 'user_thumbnail_path'){
        			target.find('#user_thumbnail_path').attr('src',`/files/user/profiles/${value}`);
        			target.find('.image_queue_belt').append(`
						<div class="image_waiting active" onclick="select_img(this)">
							<img src="/files/user/profiles/${value}?v=${new Date().getTime()}"/>
						</div>
    				`);
        		}else if(key == 'user_birth'){
        			target.find('#user_birth').append(get_age(value));
        		}else if(key == 'user_nation'){
        			target.find('#user_nation').append(`<img class="flags" src="https://flagcdn.com/w80/${value}.png"/>${trs_nation(value,'nation')}`);
        		}else if(key == 'user_interest'){
        			if(value != null && value.includes(',')){
        				values = value.split(',');
        				for(const tag of values){
        					target.find('#user_tags').append(`<div class="tag_card">#${tag}</div>`)
        				}
        			}else if(value != null){
    					target.find('#user_tags').append(`<div class="tag_card">#${value}</div>`)
        			}
        		}else if(key == 'user_distance'){
        			target.find('#user_distance').append(`${value}km`)
        		}else if(key == 'user_profile_path'){
        			console.log('profile');
        			values = value.split(',');
        			showing(target.find('.none'));
        			for(const path of values){
        				target.find('.image_queue_belt').append(`
    						<div class="image_waiting" onclick="select_img(this)">
    							<img src="/files/user/profiles/${path}?v=${new Date().getTime()}"/>
    						</div>
        				`);
        			}
        		}else{
        			if(target.find('.link_card').find(`#${key}`).hasClass('lang')){
        				if(value.includes(',')){
        					const langs = value.split(',')
        					for(const lang of langs){
        						target.find('.link_card').find(`#${key}`).append(`<img class="flags" src="https://flagcdn.com/w80/${lang}.png"><span>${trs_nation(lang,'lang')}</span>`);
        					}
        				}else{
        					target.find('.link_card').find(`#${key}`).append(`<img class="flags" src="https://flagcdn.com/w80/${value}.png"><span>${trs_nation(value,'lang')}</span>`);
        				}
        			}else{
        				target.find('.link_card').find(`#${key}`).append(value);
        			}
        		}
        	}
		},
		error: function(error) {
		}
	});
}

