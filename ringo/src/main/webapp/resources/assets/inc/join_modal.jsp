<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div class="modal join_modal none">
    <div class="modal_content">
    	<div class="modal_head">
    		<div class="modal_title">
    			<div class="modal_icon">
	    			<i class="fa-solid fa-user-check"></i>
    			</div>
    			<div class="modal_name">
	    			회원 가입
    			</div>
    		</div>
    		<button class="modal_close_button" type="button" onclick="hiding('.modal'); toggle_card('.join_modal',1,0);">
    			<i class="fa-solid fa-xmark"></i>
    		</button>
        </div>
        <div class="modal_body">
        	<div class="cards_menu_container">	
				<div class="menu unfinished_column" data-targetindex="1" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>본인 확인</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="2" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>기본 정보</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="3" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>추가 정보</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="4" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>프로필 사진</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="5" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>기본 설정</span>
				</div>
			</div>
        	<div class="scroll_box" style="height:calc(100% - 20px); flex-direction: column;">
	        	<div class="cards_container">
	        		<div class="cards_container_button prev shrinked" onclick="toggle_card('.join_modal',0,-1)">
	        			<i class="fa-solid fa-chevron-left"></i>
	        		 </div>
	        		<div class="cards_container_content">
		        		<div class="cards card_1 unfinished_column">
		        			<div class="cards_inner_header">
		        				<i class="fa-solid fa-address-card"></i>
		        				<span>본인 확인</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
		        					<div class="terms_container with_checkbox unfinished_column">
		        						<div class="terms_head">
			        					[필수] 이용약관
			        					</div>
			        					<div class="terms_body">
			        					내용
			        					</div>
			        					<div class="terms_footer">
				        					<input type="checkbox" class="outform" id="terms_1_agree" name="checkbox" />
										    <label for="terms_1_agree">
										        <i class="fa-regular fa-square-check"></i> 동의
										    </label>
			        					</div>
		        					</div>
		        				</div>
		        				<div class="cards_inner_body_right">
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												이름
											</div>
											<div class="input_value">
												<input type="text" name="user_name" onblur="validate_name(this)" oninput="validate_name(this)"/>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 본명을 입력 해주세요.						
										</div>
		        					</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												생년월일
											</div>
											<div class="input_value">
												<input type="text" name="user_birth" onblur="validate_birth(this)" oninput="validate_birth(this)"/>
											</div>
										</div>
										<div class="input_hint annotation_message annotation_message">
											* 8자리로 입력 해주세요. 예시) 2000.01.01						
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell with_radio unfinished_row">
											<div class="input_name">
												성별
											</div>
											<div class="input_value">
												<input type="radio" id="user_gender_male" name="user_gender" value="남성"/>
											    <label class="radio_button" for="user_gender_male">
											        <i class="fa-regular fa-square-check"></i> <span class="radio_value">남성</span>
											    </label>
											
											    <input type="radio" id="user_gender_female" name="user_gender" value="여성"/>
											    <label class="radio_button" for="user_gender_female">
											        <i class="fa-regular fa-square-check"></i> <span class="radio_value">여성</span>
											    </label>
											</div>
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row with_select">
											<div class="input_name">
												국적
											</div>
											<div class="input_value">
												<select id="user_nation" name="user_nation" class="annotation_message">
													<option class="annotation_message" value="" selected disabled>* 국적을 선택하세요.</option>
													<option value="kor">한국</option>
													<option value="us">미국</option>
													<option value="japan">일본</option>
													<option value="china">중국</option>
												</select>
											</div>
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												전화번호
											</div>
											<div class="input_value_container">
												<div class="input_value">
													<input id="user_tel" type="text" name="user_tel" onblur="validate_tel(this)" oninput="validate_tel(this)" onkeydown="if(event.key === 'Enter'){ send_sms(this); }"/>
													<div class="input_cell_button" onclick="send_sms(this)">
														인증요청
													</div>
												</div>
												<div id="user_sms_authentication" class="input_value none">
													<input type="text" name="user_authentication" class="outform" placeholder="인증번호를 입력하세요."/>
													<div class="input_cell_button" onclick="check_code(this,'sms')">
														인증확인
													</div>
												</div>
											</div>
										</div>
										<div class="input_hint annotation_message annotation_message">
											* ' - ' 를 제외한 전화번호를 입력 해주세요. 예시) 01012345678							
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												이메일
											</div>
											<div class="input_value_container">
												<div class="input_value">
													<input id="user_email" type="text" name="user_email" onblur="validate_email(this)" oninput="validate_email(this)" onkeydown="if(event.key === 'Enter'){ send_email(this); }"/>
													<div class="input_cell_button" onclick="send_email(this);">
														인증요청
													</div>
												</div>
												<div id="user_email_authentication" class="input_value none">
													<input type="text" name="user_authentication" class="outform" placeholder="인증번호를 입력하세요."/>
													<div class="input_cell_button" onclick="check_code(this,'email')">
														인증확인
													</div>
												</div>
											</div>
										</div>
										<div class="input_hint annotation_message annotation_message">
											* id@domain.com 형식의 이메일을 입력 해주세요.						
										</div>
									</div>
									<div class="input_box">
										<div class="input_multi_cell unfinished_row">
											<div class="input_cells">
												<div class="input_name">
													주소
												</div>
												<div class="input_value">
													<input type="text" class="outform" id="search_address_input" onkeydown="if(event.key === 'Enter'){ search_address('.join_modal','#user_address_search_container'); }"/>
													<div class="input_cell_button" onclick="search_address('.join_modal','#user_address_search_container');">
														검색
													</div>
												</div>
											</div>
											<div id="user_address_search_container" class="added_input_cells none">
												<div class=scroll_box>
													<div class=scroll_box_inner style="padding:0px 5px; overflow-x:hidden;">
													</div>
												</div>
											</div>
											<div id="user_address_detail" class="added_input_cells column none">
												<div class="selected_address">
												</div>
												<div class="max_div row">
													<input type="text" class="outform" id="detail_address" onkeydown="if(event.key === 'Enter'){ submit_address(this); }"/>
													<div class="input_cell_button" onclick="submit_address('#detail_address');">
														확인
													</div>
												</div>
												<input type="hidden" id="user_address" name="user_address"/>
											</div>
										</div>
										<div class="for_address input_hint annotation_message">
											* 동 이하의 주소를 입력 해주세요.						
										</div>
									</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,1)">다음</button>
		        			</div>
		        		</div>
						<div class="cards card_2 unfinished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-file-invoice"></i>
		        				<span>기본 정보</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												아이디
											</div>
											<div class="input_value">
												<input type="text" name="user_id" onblur="validate_id(this)" oninput="validate_id(this)"/>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 4~20자리의 영문, 숫자, '_' 로 이루어진 아이디를 입력해 주세요.					
										</div>
		        					</div>
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												비밀번호
											</div>
											<div class="max_div column">
												<div class="input_value">
													<input type="password" name="user_pw" onblur="validate_pw(this)" oninput="validate_pw(this)"/>
												</div>
												<div id="check_pw" class="input_value none">
													<input type="password" class="outform" oninput="check_pw(this)"/>
												</div>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 8~20자리의 영문,숫자가 포함 된 비밀번호를 입력 해주세요.						
										</div>
		        					</div>
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												닉네임
											</div>
											<div class="input_value">
												<input type="text" name="user_nickname" onblur="validate_nickname(this)" oninput="validate_nickname(this)"/>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 4~10자리의 닉네임을 입력 해주세요.						
										</div>
		        					</div>
		        				</div>
		        				<div class="cards_inner_body_right">
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												모국어
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>모국어를 선택하세요.</option>
													<option value="kor">한국어</option>
													<option value="us">미국어</option>
													<option value="jp">일본어</option>
													<option value="ch">중국어</option>
												</select>
												<input type="hidden" name="user_native_lang"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container none">
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name" style="font-size:10px;">
												유창한 언어
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>유창한 언어를 선택하세요.</option>
													<option value="kor">한국어</option>
													<option value="us">미국어</option>
													<option value="jp">일본어</option>
													<option value="ch">중국어</option>
												</select>
												<input type="hidden" name="user_fluent_lang"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container none">
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												학습 언어
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>학습중인 언어를 선택하세요.</option>
													<option value="kor">한국어</option>
													<option value="us">미국어</option>
													<option value="jp">일본어</option>
													<option value="ch">중국어</option>
												</select>
												<input type="hidden" name="user_learning_lang"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container none">
									</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_3 unfinished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-circle-info"></i>
		        				<span>추가 정보</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												한줄 소개
											</div>
											<div class="input_value">
												<textarea name="user_intro" onblur="validate_text(this,'* 자신을 소개할 문구를 작성 해주세요.')" oninput="validate_text(this,'* 자신을 소개할 문구를 작성 해주세요.')"></textarea>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 자신을 소개할 문구를 작성 해주세요.			
										</div>
		        					</div>
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												학습 목표
											</div>
											<div class="input_value">
												<textarea name="user_objective" onblur="validate_text(this,'* 언어 학습 목적, 목표 수준에 대해 작성해주세요.')" oninput="validate_text(this,'* 언어 학습 목적, 목표 수준에 대해 작성해주세요.')"></textarea>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 언어 학습 목적, 목표 수준에 대해 작성해주세요.				
										</div>
		        					</div>
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												이상형
											</div>
											<div class="input_value">
												<textarea name="user_ideal_partner" onblur="validate_text(this,'* 만나고 싶은 대화 상대를 알려주세요.')" oninput="validate_text(this,'* 만나고 싶은 대화 상대를 알려주세요.')"></textarea>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 만나고 싶은 대화 상대를 알려주세요.
										</div>
		        					</div>
		        					<div class="input_box">
		        						<div class="input_cell unfinished_row">
											<div class="input_name">
												대화 주제
											</div>
											<div class="input_value">
												<textarea name="user_topic" onblur="validate_text(this,'* 원하는 대화 주제에 대해 알려주세요.')" oninput="validate_text(this,'* 원하는 대화 주제에 대해 알려주세요.')"></textarea>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 원하는 대화 주제에 대해 알려주세요.
										</div>
		        					</div>
		        				</div>
		        				<div class="cards_inner_body_right">
		        					<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												관심 분야
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>관심 있는 분야를 하나 이상 선택하세요.</option>
													<option value="music">음악</option>
													<option value="movie">영화</option>
													<option value="drama">드라마</option>
													<option value="soccer">축구</option>
													<option value="baseball">야구</option>
													<option value="basketball">농구</option>
												</select>
												<input type="hidden" name="user_interest"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container none">
									</div>
									
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name" style="font-size:10px;">
												주 이용시간
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>주로 접속하는 시간을 하나 이상 선택하세요.</option>
													<option value="d_0">평일 낮</option>
													<option value="d_1">평일 저녁</option>
													<option value="e_0">주말 낮</option>
													<option value="e_1">주말 저녁</option>
												</select>
												<input type="hidden" name="user_usually_time"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container none">
									</div>
									
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												소통 방식
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>원하는 소통 방식을 하나 이상 선택하세요.</option>
													<option value="meet">직접 만남</option>
													<option value="message">메세지 선호</option>
													<option value="call">전화 선호</option>
												</select>
												<input type="hidden" name="user_method"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container none">
									</div>
									
									<div class="input_box">
										<div class="input_cell unfinished_row with_select">
											<div class="input_name">
												교정 강도
											</div>
											<div class="input_value">
												<select id="user_correction_degree" name="user_correction_degree" class="annotation_message">
													<option class="annotation_message" value="" selected disabled>원하는 교정 강도를 선택하세요.</option>
													<option value="nomatter">상관 없음</option>
													<option value="forcritical">심한 오류가 있을때만 고쳐주세요.</option>
													<option value="forlittle">사소한 것도 고쳐주세요.</option>
												</select>
											</div>
										</div>
									</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_4 unfinished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-image"></i>
		        				<span>프로필 사진</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
			        				<div class="max_div column">
			        					<div class="picture_container max_div column thumbnail">
			        						<div class="picture_content">
		        							    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this);" multiple>
			        							<i class="fa-solid fa-plus"></i>
			        						</div>
			        						<div class="picture_name">
			        							대표 프로필 사진
			        						</div>
			        					</div>
			        					<div class="input_hint annotation_message">
											* 대표 프로필 사진은 필수입니다.				
										</div>
									</div>				
								</div>		
								<div class="cards_inner_body_right">		
									<div class="small_picture_container">
										<div class="picture_content">
	        							    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this)" multiple>
		        							<i class="fa-solid fa-plus"></i>
		        						</div>
		        					</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_5 unfinished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-gear"></i>
		        				<span>기본 설정</span>
		        			</div>
		        			<div class="cards_inner_body">
	        					<div class="input_box">
									<div class="input_cell unfinished_row with_select">
										<div class="input_name">
											로그인 공개
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" selected disabled>로그인 상태 공개 여부</option>
												<option value="1">공개</option>
												<option value="3">비공개</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 로그인 상태 공개 여부를 선택하세요. 접속장소, 마지막 접속시간이 제공됩니다.						
									</div>
								</div>
								<div class="input_box">
									<div class="input_cell unfinished_row with_select">
										<div class="input_name">
											팔로워 공개
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" selected disabled>팔로워 공개 여부</option>
												<option value="1">공개</option>
												<option value="5">비공개</option>
												<option value="7">상호 팔로워에게만 공개</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 팔로워 공개 여부를 선택하세요.					
									</div>
								</div>
								<div class="input_box">
									<div class="input_cell unfinished_row with_select">
										<div class="input_name">
											게시글 공개
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" selected disabled>게시글 공개 여부</option>
												<option value="1">공개</option>
												<option value="11">팔로워에게만 공개</option>
												<option value="13">전체 비공개</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 게시글 공개 여부를 선택하세요.					
									</div>
								</div>
								<div class="input_box">
									<div class="input_cell unfinished_row with_select">
										<div class="input_name">
											방문기록 공개
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" selected disabled>방문기록 공개 여부</option>
												<option value="1">공개</option>
												<option value="17">팔로워에게만 공개</option>
												<option value="19">전체 비공개</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 방문기록 공개 여부를 선택하세요.			
									</div>
								</div>
								<div class="input_box">
									<div class="input_cell unfinished_row with_select">
										<div class="input_name">
											매칭 허용
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" selected disabled>매칭 허용 여부</option>
												<option value="1">공개</option>
												<option value="23">소개받기 허용</option>
												<option value="29">소개되기 허용</option>
												<option value="31">모두 허용</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 매칭 허용 여부를 선택하세요.			
									</div>
								</div>
								<div class="input_box">
									<div class="input_cell unfinished_row with_select">
										<div class="input_name">
											풀 공개 허용
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" selected disabled>풀 공개 허용 여부</option>
												<option value="1">공개</option>
												<option value="37">비공개</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 풀 공개 허용 여부를 선택하세요.			
									</div>
								</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,-1)">이전</button>
		        			</div>
						</div>
					</div>
	        		<div class="cards_container_button next expanded" onclick="toggle_card('.join_modal',0,1)">
	        			<i class="fa-solid fa-chevron-right"></i>
	        		</div>
	        	</div>
        	</div>
        	<div class="cards_footer">	
        		<div class="submit_hint annotation_message">
					* 미 입력 된 항목이 있습니다.
				</div>
				<div class="cards_footer_button last_submit unfinished_row" onclick="check_submit('.join_modal')">
					<span>가입하기</span>
				</div>
				<div class="cards_footer_button" onclick="hiding('.modal'); toggle_card('.join_modal',1,0);">
					<span>닫기</span>
				</div>
			</div>
        </div>
    </div>
</div>