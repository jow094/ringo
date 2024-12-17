<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="join" class="modal join_modal none">
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
			        					[필수] Ringo 이용약관
			        					</div>
			        					<div class="terms_body">
제1조 (목적)<br>
1.본 약관은 [서비스 이름] (이하 "서비스")에서 제공하는 모든 서비스의 이용과 관련하여, 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br>
<br>
제2조 (정의)<br>
1. "서비스"란 회사가 제공하는 모든 디지털 서비스 및 관련 콘텐츠를 의미합니다.<br>
2. "회원"이란 본 약관에 따라 서비스를 이용하는 모든 이용자를 말합니다.<br>
3. "콘텐츠"란 서비스 내에서 제공되거나 회원이 게시하는 텍스트, 이미지, 동영상 등의 모든 자료를 의미합니다.<br>
<br>
제3조 (약관의 효력 및 변경)<br>
1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.<br>
2. 회사는 합리적인 사유가 발생할 경우 관련 법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.<br>
3. 변경된 약관은 사전에 공지하며, 회원이 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.<br>
<br>
제4조 (회원가입 및 계정 관리)<br>
1. 회원가입은 이용자가 본 약관에 동의하고, 정해진 절차에 따라 가입 신청을 완료한 경우 성립됩니다.<br>
2. 회원은 가입 신청 시 허위 정보를 제공해서는 안 되며, 제공한 정보는 최신 상태로 유지해야 합니다.<br>
3. 회원 계정의 관리 책임은 회원에게 있으며, 계정 도용, 부정 사용 등으로 인한 손해에 대해 회사는 책임지지 않습니다.<br>
<br>
제5조 (서비스의 제공 및 변경)<br>
1. 회사는 회원에게 다양한 서비스를 제공합니다.<br>
2. 회사는 운영, 기술적 필요에 따라 서비스의 내용을 변경할 수 있으며, 중요한 변경 사항은 사전에 공지합니다.<br>
3. 무료로 제공되는 서비스에 대해 회사는 법령에 특별한 규정이 없는 한 책임을 지지 않습니다.<br>
<br>
제6조 (이용 제한)<br>
1. 회원이 다음 각 호에 해당하는 행위를 하는 경우, 회사는 사전 통보 없이 서비스 이용을 제한할 수 있습니다.<br>
 - 법령 또는 공공질서 및 미풍양속에 반하는 행위<br>
 - 타인의 권리 또는 명예를 침해하는 행위<br>
 -회사의 서버, 네트워크에 무단으로 접근하거나 서비스 운영을 방해하는 행위<br>
2. 회사는 필요한 경우 회원 자격을 정지하거나 강제 탈퇴시킬 수 있습니다.<br>
<br>
제7조 (회원의 게시물 관리)<br>
1. 회원이 서비스 내에 게시한 모든 콘텐츠의 책임은 회원에게 있습니다.<br>
2. 회사는 회원이 게시한 콘텐츠가 다음 각 호에 해당하는 경우 사전 통보 없이 삭제할 수 있습니다.<br>
 - 불법적이거나 타인의 권리를 침해하는 내용<br>
 - 음란물, 폭력적 표현 등 공공질서를 해치는 내용<br>
 - 광고 및 스팸 등 서비스 목적과 무관한 내용<br>
<br>
제8조 (개인정보 보호)<br>
1. 회사는 회원의 개인정보를 보호하기 위해 관련 법령을 준수합니다.<br>
2. 회원의 개인정보는 회원의 동의 없이 제3자에게 제공되지 않으며, 회사의 개인정보 처리방침에 따라 관리됩니다.<br>
3. 회사는 회원의 개인정보 보호와 관련한 책임을 다하기 위해 최선을 다합니다.<br>
<br>
제9조 (책임의 제한)<br>
1. 회사는 서비스 이용 과정에서 발생한 문제에 대해 다음의 경우 책임을 지지 않습니다.<br>
 - 천재지변, 비상사태 등 불가항력으로 인한 서비스 중단<br>
 - 회원의 귀책사유로 인해 발생한 손해<br>
 - 무료로 제공되는 서비스로 인한 손해<br>
2. 회사는 회원 간 또는 회원과 제3자 간의 분쟁에 관여하지 않으며, 이로 인해 발생한 손해에 대해 책임지지 않습니다.<br>
<br>
제10조 (준거법 및 재판 관할)<br>
1. 본 약관은 대한민국 법령에 따라 규정되고 이행됩니다.<br>
2. 서비스 이용과 관련된 분쟁은 관할 법원에 소송을 제기할 수 있습니다.<br>
			        					</div>
			        					<div class="terms_footer">
				        					<input type="checkbox" class="" id="terms_1_agree" name="checkbox" />
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
													<option value="kr">한국</option>
													<option value="us">미국</option>
													<option value="jp">일본</option>
													<option value="cn">중국</option>
													<option value="ph">필리핀</option>
													<option value="th">태국</option>
													<option value="my">말레이시아</option>
													<option value="vn">베트남</option>
													<option value="sg">싱가포르</option>
													<option value="id">인도네시아</option>
													<option value="lk">스리랑카</option>
													<option value="bn">브루나이</option>
													<option value="mm">미얀마</option>
													<option value="fr">프랑스</option>
													<option value="de">독일</option>
													<option value="gb">영국</option>
													<option value="es">스페인</option>
													<option value="it">이탈리아</option>
													<option value="ru">러시아</option>
													<option value="be">벨기에</option>
													<option value="ch">스위스</option>
													<option value="nl">네덜란드</option>
													<option value="se">스웨덴</option>
													<option value="no">노르웨이</option>
													<option value="dk">덴마크</option>
													<option value="fi">핀란드</option>
													<option value="at">오스트리아</option>
													<option value="pl">폴란드</option>
													<option value="cz">체코</option>
													<option value="hu">헝가리</option>
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
													<input type="text" name="user_authentication" class="" placeholder="인증번호를 입력하세요."/>
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
													<input type="text" name="user_authentication" class="" placeholder="인증번호를 입력하세요."/>
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
													<input type="text" class="" id="search_address_input" onkeydown="if(event.key === 'Enter'){ search_address('.join_modal','#user_address_search_container'); }"/>
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
													<input type="text" class="" id="detail_address" onkeydown="if(event.key === 'Enter'){ submit_address(this); }"/>
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
													<input type="password" class="" oninput="check_pw(this)"/>
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
													<option value="kr">한국어</option>
													<option value="us">영어</option>
													<option value="jp">일본어</option>
													<option value="cn">중국어</option>
													<option value="ph">필리핀어(타갈로그어)</option>
													<option value="th">태국어</option>
													<option value="my">말레이어</option>
													<option value="vn">베트남어</option>
													<option value="sg">영어, 중국어, 말레이어</option>
													<option value="id">인도네시아어</option>
													<option value="lk">싱할라어, 타밀어</option>
													<option value="bn">말레이어</option>
													<option value="mm">버마어</option>
													<option value="fr">프랑스어</option>
													<option value="de">독일어</option>
													<option value="gb">영어</option>
													<option value="es">스페인어</option>
													<option value="it">이탈리아어</option>
													<option value="ru">러시아어</option>
													<option value="be">네덜란드어, 프랑스어, 독일어</option>
													<option value="ch">독일어, 프랑스어, 이탈리아어</option>
													<option value="nl">네덜란드어</option>
													<option value="se">스웨덴어</option>
													<option value="no">노르웨이어</option>
													<option value="dk">덴마크어</option>
													<option value="fi">핀란드어, 스웨덴어</option>
													<option value="at">독일어</option>
													<option value="pl">폴란드어</option>
													<option value="cz">체코어</option>
													<option value="hu">헝가리어</option>
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
													<option value="ph">필리핀어(타갈로그어)</option>
													<option value="th">태국어</option>
													<option value="my">말레이어</option>
													<option value="vn">베트남어</option>
													<option value="sg">영어, 중국어, 말레이어</option>
													<option value="id">인도네시아어</option>
													<option value="lk">싱할라어, 타밀어</option>
													<option value="bn">말레이어</option>
													<option value="mm">버마어</option>
													<option value="fr">프랑스어</option>
													<option value="de">독일어</option>
													<option value="gb">영어</option>
													<option value="es">스페인어</option>
													<option value="it">이탈리아어</option>
													<option value="ru">러시아어</option>
													<option value="be">네덜란드어, 프랑스어, 독일어</option>
													<option value="ch">독일어, 프랑스어, 이탈리아어</option>
													<option value="nl">네덜란드어</option>
													<option value="se">스웨덴어</option>
													<option value="no">노르웨이어</option>
													<option value="dk">덴마크어</option>
													<option value="fi">핀란드어, 스웨덴어</option>
													<option value="at">독일어</option>
													<option value="pl">폴란드어</option>
													<option value="cz">체코어</option>
													<option value="hu">헝가리어</option>
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
													<option value="ph">필리핀어(타갈로그어)</option>
													<option value="th">태국어</option>
													<option value="my">말레이어</option>
													<option value="vn">베트남어</option>
													<option value="sg">영어, 중국어, 말레이어</option>
													<option value="id">인도네시아어</option>
													<option value="lk">싱할라어, 타밀어</option>
													<option value="bn">말레이어</option>
													<option value="mm">버마어</option>
													<option value="fr">프랑스어</option>
													<option value="de">독일어</option>
													<option value="gb">영어</option>
													<option value="es">스페인어</option>
													<option value="it">이탈리아어</option>
													<option value="ru">러시아어</option>
													<option value="be">네덜란드어, 프랑스어, 독일어</option>
													<option value="ch">독일어, 프랑스어, 이탈리아어</option>
													<option value="nl">네덜란드어</option>
													<option value="se">스웨덴어</option>
													<option value="no">노르웨이어</option>
													<option value="dk">덴마크어</option>
													<option value="fi">핀란드어, 스웨덴어</option>
													<option value="at">독일어</option>
													<option value="pl">폴란드어</option>
													<option value="cz">체코어</option>
													<option value="hu">헝가리어</option>
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
													<optgroup label="문화">
												        <option value="music">음악</option>
												        <option value="hiphop">힙합</option>
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
												        <option value="cooking">요리</option>
												        <option value="food">음식</option>
												        <option value="reading">독서</option>
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
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,-1)">이전</button>
		        				<button type="button" class="custom_button" onclick="toggle_card('.join_modal',0,1)">다음</button>
		        			</div>
						</div>
						<div class="cards card_4 unfinished_column" >
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
												<option class="annotation_message" value="" selected disabled>팔로워 공개 여부</option>
												<option value="1">공개</option>
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
												<option class="annotation_message" value="" selected disabled>게시글 공개 여부</option>
												<option value="1">공개</option>
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
												<option class="annotation_message" value="" selected disabled>방문기록 공개 여부</option>
												<option value="1">공개</option>
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
												<option class="annotation_message" value="" selected disabled>매칭 허용 여부</option>
												<option value="1">모두 허용</option>
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
												<option class="annotation_message" value="" selected disabled>유니티 공개 허용 여부</option>
												<option value="1">공개</option>
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
				<div class="cards_footer_button last_submit unfinished_row" onclick="check_submit(this)">
					<span>가입하기</span>
				</div>
				<div class="cards_footer_button" onclick="hiding('.modal'); toggle_card('.join_modal',1,0);">
					<span>닫기</span>
				</div>
			</div>
        </div>
    </div>
</div>