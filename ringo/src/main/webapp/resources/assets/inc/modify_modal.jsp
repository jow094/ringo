<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="modify" class="modal join_modal none">
    <div class="modal_content">
    	<div class="modal_head">
    		<div class="modal_title">
    			<div class="modal_icon">
	    			<i class="fa-solid fa-user-check"></i>
    			</div>
    			<div class="modal_name">
	    			정보 수정
    			</div>
    		</div>
    		<button class="modal_close_button" type="button" onclick="hiding('.modal'); toggle_card('#modify',1,0);">
    			<i class="fa-solid fa-xmark"></i>
    		</button>
        </div>
        <div class="modal_body">
        	<div class="cards_menu_container">	
				<div class="menu finished_column" data-targetindex="1" onclick="toggle_card('#modify',this.dataset.targetindex,0)">
					<span>필수 정보</span>
				</div>
				<div class="menu finished_column" data-targetindex="2" onclick="toggle_card('#modify',this.dataset.targetindex,0)">
					<span>기본 정보</span>
				</div>
				<div class="menu finished_column" data-targetindex="3" onclick="toggle_card('#modify',this.dataset.targetindex,0)">
					<span>추가 정보</span>
				</div>
				<div class="menu finished_column" data-targetindex="4" onclick="toggle_card('#modify',this.dataset.targetindex,0)">
					<span>프로필 사진</span>
				</div>
				<div class="menu finished_column" data-targetindex="5" onclick="toggle_card('#modify',this.dataset.targetindex,0)">
					<span>기본 설정</span>
				</div>
			</div>
        	<div class="scroll_box" style="height:calc(100% - 20px); flex-direction: column;">
	        	<div class="cards_container">
	        		<div class="cards_container_button prev shrinked" onclick="toggle_card('#modify',0,-1)">
	        			<i class="fa-solid fa-chevron-left"></i>
	        		 </div>
	        		<div class="cards_container_content">
		        		<div class="cards card_1 finished_column">
		        			<div class="cards_inner_header">
		        				<i class="fa-solid fa-address-card"></i>
		        				<span>필수 정보</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
		        					<div class="terms_container with_checkbox finished_column">
		        						<div class="terms_head">
			        					[필수] 이용약관
			        					</div>
			        					<div class="terms_body">
			        					내용
			        					</div>
			        					<div class="terms_footer">
				        					<input type="checkbox" class="outForm" id="terms_1_agree" name="checkbox" checked/>
										    <label for="terms_1_agree">
										        <i class="fa-regular fa-square-check"></i> 동의
										    </label>
			        					</div>
		        					</div>
		        				</div>
		        				<div class="cards_inner_body_right">
									<div class="input_box">
										<div class="input_cell finished_row">
											<div class="input_name">
												전화번호
											</div>
											<div class="input_value">
												<input type="text" name="user_tel" disabled/>
											</div>
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell">
											<div class="input_name">
												변경 전화번호
											</div>
											<div class="input_value_container">
												<div class="input_value">
													<input class="outForm" id="modify_tel" name="user_tel" type="text" onblur="validate_tel(this)" oninput="validate_tel(this)" onkeydown="if(event.key === 'Enter'){ send_sms(this); }"/>
													<div class="input_cell_button" onclick="send_sms(this)">
														인증요청
													</div>
												</div>
												<div id="user_sms_authentication" class="input_value none">
													<input type="text" name="user_authentication" class="outForm" placeholder="인증번호를 입력하세요."/>
													<div class="input_cell_button" onclick="check_code(this,'sms',$('#modify_tel').val())">
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
										<div class="input_cell finished_row">
											<div class="input_name">
												이메일
											</div>
											<div class="input_value">
												<input type="text" name="user_email" disabled/>
											</div>
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell">
											<div class="input_name">
												변경 이메일
											</div>
											<div class="input_value_container">
												<div class="input_value">
													<input class="outForm" id="modify_email" name="user_email" type="text" onblur="validate_email(this)" oninput="validate_email(this)" onkeydown="if(event.key === 'Enter'){ send_email(this); }"/>
													<div class="input_cell_button" onclick="send_email(this);">
														인증요청
													</div>
												</div>
												<div id="user_email_authentication" class="input_value none">
													<input type="text" name="user_authentication" class="outForm" placeholder="인증번호를 입력하세요."/>
													<div class="input_cell_button" onclick="check_code(this,'email',$('#modify_email').val())">
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
										<div class="input_cell finished_row">
											<div class="input_name">
												주소
											</div>
											<div class="input_value">
												<input id="user_address" type="text" name="user_address" disabled/>
											</div>
										</div>
									</div>
									<div class="input_box">
										<div class="input_multi_cell">
											<div class="input_cells">
												<div class="input_name">
													변경 주소
												</div>
												<div class="input_value">
													<input type="text" class="outForm" id="search_address_input" onkeydown="if(event.key === 'Enter'){ search_address('#modify','#user_address_search_container'); }"/>
													<div class="input_cell_button" onclick="search_address('#modify','#user_address_search_container');">
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
													<input type="text" class="outForm" id="detail_address" onkeydown="if(event.key === 'Enter'){ submit_address(this,true); }"/>
													<div class="input_cell_button" onclick="submit_address('#detail_address',true);">
														확인
													</div>
												</div>
											</div>
										</div>
										<div class="for_address input_hint annotation_message">
											* 동 이하의 주소를 입력 해주세요.						
										</div>
									</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,1)">다음</button>
		        			</div>
		        		</div>
						<div class="cards card_2 finished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-file-invoice"></i>
		        				<span>기본 정보</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
		        					<div class="input_box">
		        						<div class="input_cell finished_row">
											<div class="input_name">
												비밀번호
											</div>
											<div class="max_div column">
												<div class="input_value">
													<input type="password" name="user_pw" onblur="validate_pw(this)" oninput="validate_pw(this)"/>
												</div>
												<div id="check_pw" class="input_value none">
													<input type="password" class="outForm" oninput="check_pw(this)"/>
												</div>
											</div>
										</div>
										<div class="input_hint annotation_message">
											* 8~20자리의 영문,숫자가 포함 된 비밀번호를 입력 해주세요.						
										</div>
		        					</div>
		        					<div class="input_box">
		        						<div class="input_cell finished_row">
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
													<option value="kr">한국어</option>
													<option value="us">영어</option>
													<option value="jp">일본어</option>
													<option value="cn">중국어</option>
													<option value="de">독일어</option>
													<option value="fr">프랑스어</option>
													<option value="it">이탈리아어</option>
													<option value="es">스페인어</option>
													<option value="ru">러시아어</option>
												</select>
												<input type="hidden" name="user_native_lang"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container col_shrinked">
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name" style="font-size:10px;">
												유창한 언어
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>유창한 언어를 선택하세요.</option>
													<option value="kr">한국어</option>
													<option value="us">영어</option>
													<option value="jp">일본어</option>
													<option value="cn">중국어</option>
													<option value="de">독일어</option>
													<option value="fr">프랑스어</option>
													<option value="it">이탈리아어</option>
													<option value="es">스페인어</option>
													<option value="ru">러시아어</option>
												</select>
												<input type="hidden" name="user_fluent_lang"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container col_shrinked">
									</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												학습 언어
											</div>
											<div class="input_value">
												<select class="annotation_message" onchange="select_card(this)">
													<option class="annotation_message" value="" selected disabled>학습중인 언어를 선택하세요.</option>
													<option value="kr">한국어</option>
													<option value="us">영어</option>
													<option value="jp">일본어</option>
													<option value="cn">중국어</option>
													<option value="de">독일어</option>
													<option value="fr">프랑스어</option>
													<option value="it">이탈리아어</option>
													<option value="es">스페인어</option>
													<option value="ru">러시아어</option>
												</select>
												<input type="hidden" name="user_learning_lang"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container col_shrinked">
									</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_3 finished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-circle-info"></i>
		        				<span>추가 정보</span>
		        			</div>
		        			<div class="cards_inner_body half_row">
		        				<div class="cards_inner_body_left">
		        					<div class="input_box">
		        						<div class="input_cell finished_row">
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
		        						<div class="input_cell finished_row">
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
		        						<div class="input_cell finished_row">
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
		        						<div class="input_cell finished_row">
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
													<optgroup label="문화">
												        <option value="music">음악</option>
												        <option value="movie">영화</option>
												        <option value="drama">드라마</option>
												        <option value="painting">미술</option>
												        <option value="photography">사진</option>
												        <option value="literature">문학</option>
												        <option value="dance">춤</option>
												        <option value="theater">연극</option>
												        <option value="musical">뮤지컬</option>
												    </optgroup>
												    <optgroup label="스포츠">
												        <option value="soccer">축구</option>
												        <option value="baseball">야구</option>
												        <option value="basketball">농구</option>
												        <option value="golf">골프</option>
												        <option value="football">풋볼</option>
												        <option value="hockey">하키</option>
												        <option value="cricket">크리켓</option>
												        <option value="tennis">테니스</option>
												        <option value="volleyball">배구</option>
												        <option value="boxing">복싱</option>
												        <option value="tableTennis">탁구</option>
												        <option value="swimming">수영</option>
												        <option value="skiing">스키</option>
												        <option value="cycling">사이클링</option>
												        <option value="running">러닝</option>
												    </optgroup>
												    <optgroup label="일상">
												        <option value="food">음식</option>
												        <option value="cafe">카페</option>
												        <option value="drive">드라이브</option>
												        <option value="study">공부</option>
												        <option value="language">언어</option>
												        <option value="travel">여행</option>
												        <option value="shopping">쇼핑</option>
												        <option value="pets">반려동물</option>
												        <option value="fitness">피트니스</option>
												        <option value="gaming">게임</option>
												    </optgroup>
												</select>
												<input type="hidden" name="user_interest"/>
											</div>
										</div>
									</div>
									<div class="selected_card_container col_shrinked">
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
									<div class="selected_card_container col_shrinked">
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
									<div class="selected_card_container col_shrinked">
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
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_4 finished_column" >
							<div class="cards_inner_header">
		        				<i class="fa-solid fa-image"></i>
		        				<span>프로필 사진</span>
		        			</div>
		        			<div class="cards_inner_body half_row profile_files">
		        				<div class="cards_inner_body_left">
			        				<div class="max_div column">
			        					<div class="picture_container max_div column thumbnail">
			        						<div class="picture_content">
		        							    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this);">
			        							<i class="material-symbols-outlined">add</i>
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
	        							    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this)">
		        							<i class="material-symbols-outlined">add</i>
		        						</div>
		        					</div>
		        				</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_5 finished_column" >
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
												<option class="annotation_message" value="" disabled>로그인 상태 공개 여부</option>
												<option value="1" selected>공개</option>
												<option value="3">비공개</option>
												<option value="5">상호 팔로워에게만 공개</option>
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
												<option class="annotation_message" value="" disabled>팔로워 공개 여부</option>
												<option value="1" selected>공개</option>
												<option value="7">비공개</option>
												<option value="11">상호 팔로워에게만 공개</option>
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
												<option class="annotation_message" value="" disabled>게시글 공개 여부</option>
												<option value="1" selected>공개</option>
												<option value="13">비공개</option>
												<option value="17">상호 팔로워에게만 공개</option>
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
												<option class="annotation_message" value="" disabled>방문기록 공개 여부</option>
												<option value="1" selected>공개</option>
												<option value="19">전체 비공개</option>
												<option value="23">팔로워에게만 공개</option>
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
												<option class="annotation_message" value="" disabled>매칭 허용 여부</option>
												<option value="1" selected>모두 허용</option>
												<option value="23">소개받기 허용</option>
												<option value="29">소개되기 허용</option>
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
											유니티 공개 허용
										</div>
										<div class="input_value">
											<select name="user_private" class="annotation_message">
												<option class="annotation_message" value="" disabled>유니티 공개 허용 여부</option>
												<option value="1" selected>공개</option>
												<option value="31">비공개</option>
												<option value="37">상호 팔로워에게만 공개</option>
											</select>
										</div>
									</div>
									<div class="input_hint annotation_message">
										* 가입한 유니티 목록 공개 허용 여부를 선택하세요.			
									</div>
								</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('#modify',0,-1)">이전</button>
		        			</div>
						</div>
					</div>
	        		<div class="cards_container_button next expanded" onclick="toggle_card('#modify',0,1)">
	        			<i class="fa-solid fa-chevron-right"></i>
	        		</div>
	        	</div>
        	</div>
        	<div class="cards_footer">	
        		<div class="submit_hint annotation_message">
					* 모든 정보를 입력하셨습니다.
				</div>
				<div class="cards_footer_button last_submit finished_row" onclick="check_submit('#modify')">
					<span>수정하기</span>
				</div>
				<div class="cards_footer_button" onclick="hiding('#modify'); toggle_card('#modify',1,0);">
					<span>닫기</span>
				</div>
			</div>
        </div>
    </div>
</div>