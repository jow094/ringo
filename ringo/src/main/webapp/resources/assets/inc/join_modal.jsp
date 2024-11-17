<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div class="modal join_modal none">
    <div class="modal_content">
    	<div class="modal_head">
    		<div class="modal_title">
    			<div class="modal_icon">
	    			<i class="fa-solid fa-user"></i>
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
					<span>1</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="2" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>2</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="3" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>3</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="4" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>4</span>
				</div>
				<div class="menu unfinished_column" data-targetindex="5" onclick="toggle_card('.join_modal',this.dataset.targetindex,0)">
					<span>5</span>
				</div>
			</div>
        	<div class="scroll_box" style="height:calc(100% - 20px); flex-direction: column;">
	        	<div class="cards_container">
	        		<div class="cards_container_button prev shrinking" onclick="toggle_card('.join_modal',0,-1)">
	        			<i class="fa-solid fa-chevron-left"></i>
	        		 </div>
	        		<div class="cards_container_content">
		        		<div class="cards card_1 unfinished_column">
		        			<div class="cards_inner_header">
		        				<i class="fa-solid fa-user-check"></i>
		        				<span>기본 정보</span>
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
				        					<input type="checkbox" id="terms_1_agree" name="checkbox" />
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
												<input type="text" name="user_id" oninput="validate_name(this)"/>
											</div>
										</div>
										<div class="input_hint annotoation_message">
											* 본명을 입력 해주세요.						
										</div>
		        					</div>
									<div class="input_box">
										<div class="input_cell unfinished_row">
											<div class="input_name">
												생년월일
											</div>
											<div class="input_value">
												<input type="text" name="user_id" oninput="validate_birth(this)"/>
											</div>
										</div>
										<div class="input_hint annotoation_message annotoation_message">
											* 8자리로 입력 해주세요. 예시) 2000.01.01						
										</div>
									</div>
									<div class="input_box">
										<div class="input_cell with_radio unfinished_row">
											<div class="input_name">
												성별
											</div>
											<div class="input_value">
												<input type="radio" id="user_gender_male" name="user_gender" />
											    <label class="radio_button" for="user_gender_male">
											        <i class="fa-regular fa-square-check"></i> <span class="radio_value">남성</span>
											    </label>
											
											    <input type="radio" id="user_gender_female" name="user_gender" />
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
												<select id="user_nation" name="user_nation" class="annotoation_message">
													<option class="annotoation_message" value="" selected disabled>* 국적을 선택하세요.</option>
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
													<input id="user_tel" type="text" name="user_tel" onkeydown="if(event.key === 'Enter'){ send_sms('.join_modal','#user_sms_authentication'); }"/>
													<div class="input_cell_button" onclick="send_sms('.join_modal','#user_sms_authentication');">
														인증요청
													</div>
												</div>
												<div id="user_sms_authentication" class="input_value none">
													<input type="text" name="user_authentication"/>
													<div class="input_cell_button" onclick="check_code(this,'sms')">
														인증확인
													</div>
												</div>
											</div>
										</div>
										<div class="input_hint annotoation_message annotoation_message">
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
													<input id="user_email" type="text" name="user_email" onkeydown="if(event.key === 'Enter'){ send_email('.join_modal','#user_email_authentication'); }"/>
													<div class="input_cell_button" onclick="send_email('.join_modal','#user_email_authentication');">
														인증요청
													</div>
												</div>
												<div id="user_email_authentication" class="input_value none">
													<input type="text" name="user_authentication"/>
													<div class="input_cell_button" onclick="check_code(this,'email')">
														인증확인
													</div>
												</div>
											</div>
										</div>
										<div class="input_hint annotoation_message annotoation_message">
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
													<input type="text" id="search_address_input" onkeydown="if(event.key === 'Enter'){ search_address('.join_modal','#user_address_search_container'); }"/>
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
													<input type="text" onkeydown="if(event.key === 'Enter'){ submit_address(this); }"/>
													<div class="input_cell_button" onclick="submit_address(this);">
														확인
													</div>
												</div>
												<input type="hidden" id="user_address" name="user_address"/>
											</div>
										</div>
										<div class="for_address input_hint annotoation_message">
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
		        				<i class="fa fa-user"></i>
		        				<span>기본정보</span>
		        			</div>
		        			<div class="cards_inner_body">
	        					<div class="input_box">
	        						<div class="input_cell">
										<div class="input_name">
											아이디
										</div>
										<div class="input_value">
											<input type="text" name="user_id"/>
										</div>
									</div>
									<div class="input_hint annotoation_message annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
									</div>
	        					</div>
								<div class="input_box">
									<div class="input_cell double">
										<div class="input_name">
											비밀번호
										</div>
										<div class="input_values">
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
										</div>
									</div>
									<div class="input_hint annotoation_message annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
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
		        				<i class="fa fa-user"></i>
		        				<span>기본정보</span>
		        			</div>
		        			<div class="cards_inner_body">
	        					<div class="input_box">
	        						<div class="input_cell">
										<div class="input_name">
											아이디
										</div>
										<div class="input_value">
											<input type="text" name="user_id"/>
										</div>
									</div>
									<div class="input_hint annotoation_message annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
									</div>
	        					</div>
								<div class="input_box">
									<div class="input_cell double">
										<div class="input_name">
											비밀번호
										</div>
										<div class="input_values">
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
										</div>
									</div>
									<div class="input_hint annotoation_message annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
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
		        				<i class="fa fa-user"></i>
		        				<span>기본정보</span>
		        			</div>
		        			<div class="cards_inner_body">
	        					<div class="input_box">
	        						<div class="input_cell">
										<div class="input_name">
											아이디
										</div>
										<div class="input_value">
											<input type="text" name="user_id"/>
										</div>
									</div>
									<div class="input_hint annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
									</div>
	        					</div>
								<div class="input_box">
									<div class="input_cell double">
										<div class="input_name">
											비밀번호
										</div>
										<div class="input_values">
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
										</div>
									</div>
									<div class="input_hint annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
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
		        				<i class="fa fa-user"></i>
		        				<span>기본정보</span>
		        			</div>
		        			<div class="cards_inner_body">
	        					<div class="input_box">
	        						<div class="input_cell">
										<div class="input_name">
											아이디
										</div>
										<div class="input_value">
											<input type="text" name="user_id"/>
										</div>
									</div>
									<div class="input_hint annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
									</div>
	        					</div>
								<div class="input_box">
									<div class="input_cell double">
										<div class="input_name">
											비밀번호
										</div>
										<div class="input_values">
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
											<div class="input_value">
												<input type="password" name="user_pw"/>
											</div>
										</div>
									</div>
									<div class="input_hint annotoation_message">
										* 4~20자리의 영문, 숫자 조합								
									</div>
								</div>
		        			</div>
		        			<div class="cards_inner_footer">
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,-1)">이전</button>
		        			</div>
						</div>
					</div>
	        		<div class="cards_container_button next expanding" onclick="toggle_card('.join_modal',0,1)">
	        			<i class="fa-solid fa-chevron-right"></i>
	        		</div>
	        	</div>
        	</div>
        	<div class="cards_footer">	
				<div class="cards_footer_button" onclick="">
					<span>가입하기</span>
				</div>
				<div class="cards_footer_button" onclick="hiding('.modal'); toggle_card('.join_modal',1,0);">
					<span>닫기</span>
				</div>
			</div>
        </div>
    </div>
</div>