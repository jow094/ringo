<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="main_card main_unity none">

	<div class="main_card_title unity_home_title expanded">
		<div class="main_title_button" onclick="unity_home()">
			<i class="material-symbols-outlined">forum</i>
			<span>유니티</span>
		</div>
		<div class="title_button">
			<i class="material-symbols-outlined" onclick="expand_create_unity()">add_link</i>
			<i class="material-symbols-outlined" onclick="unity_home()">home</i>
			<div class="input_wrapper">
				<i class="material-symbols-outlined">search</i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	
	<div class="main_card_title unity_main_title none expanded">
		<div class="main_title_button" onclick="enter_unity_main()">
			<i class="material-symbols-outlined">forum</i>
			<span id="title_unity_name"></span>
		</div>
		<div class="title_button">
			<i class="material-symbols-outlined" onclick="col_toggle('.unity_write')">edit_note</i>
			<i class="material-symbols-outlined" onclick="unity_home()">home</i>
			<div class="input_wrapper">
				<i class="material-symbols-outlined">search</i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	
	<!-- unity write -->
	<div class="unity_write col_shrinked col_resizable">
		<div class="write_container">
			<div class="card">
				<div class="card_header input_title">
					<select id="unity_post_place" class="annotation_message">
						<option class="annotation_message" value="" selected disabled>작성 게시판을 선택하세요.</option>
					</select>
					<input type="text" id="unity_post_title" placeholder="제목을 입력하세요."/>
				</div>
				<div class="card_body">
					<div class="card_body_content">
						<div class="scroll_box">
							<textarea class="scroll"></textarea>
						</div>
					</div>
					<div class="card_body_tags">
						#태그<input class="tag_input" type="text" placeholder="태그를 입력하세요." onkeydown="if(event.key === 'Enter'){ add_tag(this); }">
					</div>
					<div class="card_body_buttons">
						<div class="button">
							<i class="fa-solid fa-link" onclick="open_itf(this);">
								<input type="file" name="" class="none" accept="image/*" onchange="upload_file(this)" multiple>
							</i>
						</div>
						<div class="button">
							<i class="fa-solid fa-check" onclick="submit_unity(this)"></i>
						</div>
					</div>
					<div class="upload_files col_shrinked">
					</div>
				</div>
			</div>
		</div>
		<div class="write_container_button_section col_resize_handle">
			<i class="material-symbols-outlined" >drag_handle</i>
		</div>
	</div>
	<!-- unity write -->
	
	<!-- unity create -->
	<div class="unity_create_container expanded none">
		<div class="unity_image_info">
			<div class="picture_container column unity_thumbnail">
				<div class="picture_content unity_thumbnail_preview">
				    <input type="file" name="unity_thumbnail_file" class="picture_input" accept="image/*" onchange="add_image(this); clear_unity_create_container(this);">
					<i class="material-symbols-outlined">add</i>
				</div>
				<div class="picture_name">유니티 썸네일</div>
			</div>
			<div class="picture_container column unity_banner">
				<div class="picture_content unity_banner_preview">
				    <input type="file" name="unity_banner_file" class="picture_input" accept="image/*" onchange="add_image(this); clear_unity_create_container(this);">
					<i class="material-symbols-outlined">add</i>
				</div>
				<div class="picture_name">유니티 배너</div>
				<div class="banner_style">
					<div class="select_style select_color">
						<input type="color" class="outform" id="banner_color_value" onchange="select_banner_setting('create')"/>
						<span>배너 배경색</span>
					</div>
					<div class="justify_set">
						<div class="select_style">
							<input type="range" class="outform" id="banner_horizontal_value" onchange="select_banner_setting('create')" class="slider" min="0" max="100" value="50">
							<span>가로정렬</span>
						</div>
					</div>
					<div class="justify_set">
						<div class="select_style">
							<input type="range" class="outform" id="banner_vertical_value" onchange="select_banner_setting('create')" class="slider" min="0" max="100" value="50">
							<span>세로정렬</span>
						</div>
					</div>
					<input type="hidden" name="unity_banner_set"/>
				</div>
				<div class="input_hint annotation_message">
					* 배너는 가로 6 : 세로 1 비율로 적용되며, 세로 최대 160px까지 표현됩니다.
				</div>
				<div class="input_hint annotation_message">
					* 배너의 빈공간을 채울 색상과 이미지 배치 방법을 선택 해주세요.
				</div>
			</div>
		</div>
		<div class="unity_basic_info">
			<div class="unity_infos">
			
				<div class="input_box">
  						<div class="input_cell unfinished_row">
						<div class="input_name">유니티 이름</div>
						<div class="input_value">
							<input type="text" name="unity_name" onblur="validate_unity_name(this)" oninput="validate_unity_name(this)"/>
						</div>
					</div>
					<div class="input_hint annotation_message">* 유니티의 이름을 입력 해주세요.</div>
				</div>
				
				<div class="input_box">
					<div class="input_cell unfinished_row with_select">
						<div class="input_name">
							주제
						</div>
						<div class="input_value">
							<select name="unity_topic" class="annotation_message" onchange="sort_after(this)">
								<option class="annotation_message" value="" selected disabled>대분류</option>
						        <option value="culture">문화</option>
						        <option value="sports">스포츠</option>
						        <option value="live">일상</option>
							</select>
							<select name="unity_topic" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>소분류</option>
								<optgroup class="culture" label="문화">
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
							    <optgroup class="sports" label="스포츠">
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
							    <optgroup class="live" label="일상">
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
							<input type="hidden" name="unity_topic"/>
						</div>
					</div>
					<div class="input_hint annotation_message">
						* 유니티의 주제를 선택해주세요.				
					</div>
				</div>
				
				
				
				<div class="input_box textarea">
					<div class="input_cell unfinished_row">
						<div class="input_name">
							머릿말
						</div>
						<div class="input_value">
							<textarea name="unity_intro" onblur="validate_text(this,'* 유니티를 소개할 문구를 작성 해주세요.')" oninput="validate_text(this,'* 자신을 소개할 문구를 작성 해주세요.')"></textarea>
						</div>
					</div>
					<div class="input_hint annotation_message">
						* 유니티를 소개할 문구를 작성 해주세요.			
					</div>
	    		</div>
			
				<div class="input_box">
					<div class="input_cell unfinished_row">
						<div class="input_name" style="font-size:10px;">
							주 활동지역
						</div>
						<div class="input_value">
							<select class="annotation_message" onchange="select_card(this)">
								<option class="annotation_message" value="" selected disabled>주 활동지역을 선택하세요.</option>
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
							<input type="hidden" name="unity_location"/>
						</div>
					</div>
				</div>
				<div class="selected_card_container col_shrinked">
				</div>
				
				<div class="input_box">
					<div class="input_cell unfinished_row">
						<div class="input_name" style="font-size:10px;">
							주 사용언어
						</div>
						<div class="input_value">
							<select class="annotation_message" onchange="select_card(this)">
								<option class="annotation_message" value="" selected disabled>주 사용언어를 선택하세요.</option>
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
							<input type="hidden" name="unity_lang"/>
						</div>
					</div>
				</div>
				<div class="selected_card_container col_shrinked">
				</div>
				
				<div class="input_box">
					<div class="input_cell unfinished_row">
						<div class="input_name" style="font-size:10px;">
							주 활동방식
						</div>
						<div class="input_value">
							<select class="annotation_message" onchange="select_card(this)">
								<option class="annotation_message" value="" selected disabled>주 활동방식을 선택하세요.</option>
								<option value="kor">오프라인</option>
								<option value="us">온라인</option>
								<option value="jp">모두</option>
							</select>
							<input type="hidden" name="unity_method"/>
						</div>
					</div>
				</div>
				<div class="selected_card_container col_shrinked">
				</div>
				
				<div class="input_box">
 					<div class="input_cell unfinished_row">
						<div class="input_name">태그</div>
						<div class="input_value">
							<input type="text" name="unity_add_tag" onkeydown="if(event.key === 'Enter'){ add_tag(this); }"/>
							<input type="hidden" name="unity_tag"/>
							<div class="input_cell_button" onclick="add_tag($(this).siblings(`input[name='unity_add_tag']`))">
								추가
							</div>
						</div>
					</div>
					<div class="input_hint annotation_message">* 유니티를 표현하는 태그를 입력해주세요.</div>
				</div>
				<div class="selected_card_container col_shrinked">
				</div>
				
			</div>
			<div class="unity_setting">
				<div class="input_box">
					<div class="input_cell unfinished_row with_select">
						<div class="input_name">
							자동 가입
						</div>
						<div class="input_value">
							<select name="unity_private" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>자동 가입 허용 여부</option>
								<option value="1">허용</option>
								<option value="3">불허용</option>
							</select>
						</div>
					</div>
					<div class="input_hint annotation_message">
						* 가입신청 시 자동 수락 여부를 선택하세요.				
					</div>
				</div>
				<div class="input_box">
					<div class="input_cell unfinished_row with_select">
						<div class="input_name">
							검색 공개
						</div>
						<div class="input_value">
							<select name="unity_private" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>검색 공개 여부</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
							</select>
						</div>
					</div>
					<div class="input_hint annotation_message">
						* 검색 시 노출여부를 선택하세요. 태그를 기준으로 노출됩니다.					
					</div>
				</div>
				<div class="input_box">
					<div class="input_cell unfinished_row with_select">
						<div class="input_name">
							추천 노출
						</div>
						<div class="input_value">
							<select name="unity_private" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>추천 유니티 노출 여부</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
							</select>
						</div>
					</div>
					<div class="input_hint annotation_message">
						* 추천 유니티에 노출 여부를 선택하세요.					
					</div>
				</div>
				<div class="input_box">
					<div class="input_cell unfinished_row with_select">
						<div class="input_name">
							게시글 공개
						</div>
						<div class="input_value">
							<select name="unity_private" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>게시글 공개 여부</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
							</select>
						</div>
					</div>
					<div class="input_hint annotation_message">
						* 미가입자에게 게시글 공개 여부를 선택하세요.					
					</div>
				</div>
			</div>
		</div>
		<div class="unity_create_container_button">
			<div class="submit_hint annotation_message">
				* 미 입력 된 항목이 있습니다.
			</div>
			<div class="cards_footer_button last_submit unfinished_row" onclick="check_submit('.unity_create_container')">
				<span>가입하기</span>
			</div>
			<div class="cards_footer_button" onclick="hiding('.modal'); toggle_card('.join_modal',1,0);">
				<span>닫기</span>
			</div>
		</div>
	</div>
	<!-- unity create -->
	
	<!-- main card body -->
	<div class="main_card_body unity_main_container expanded">
		<!-- in_unity -->
		<div class="in_unity br5 inset inner expanded">
			<!-- unity main -->
			<div class="in_unity_main expanded">
				<div class="in_unity_banner">
				</div>
				<div class="in_unity_home_container">
					<div class="in_unity_home_left_container">
						<div class="unity_member_profile">
							<div class="inner_box mw col">
								<div id="user_nickname" class="inner_title h30"><i class="material-symbols-outlined mgr" id="unity_member_grade_icon"></i><span class="cell mf"></span></div>
								<div class="scroll_box row">
									<div class="unity_member_basic_info">
										<div id="unity_member_grade" class="unity_member_infos">유니티 회원등급 : <span class="cell"></span></div>
										<div id="unity_member_visit_times" class="unity_member_infos">방문횟수 : <span class="cell"></span></div>
										<div id="unity_member_since" class="unity_member_infos">가입일 : <span class="cell"></span></div>
									</div>
									<div class="unity_member_activity_info">
										<div id="unity_member_write_count" class="unity_member_infos">작성한 게시글  : <span class="cell"></span></div>
										<div id="unity_member_reple_count" class="unity_member_infos">작성한 댓글 : <span class="cell"></span></div>
										<div id="unity_member_new_reple" class="unity_member_infos">새로 달린 댓글 : <span class="cell"></span></div>
									</div>
								</div>
							</div>
						</div>
						<div class="unity_recent_post ff mw mh">
							<div class="inner_box mw mh">
								<div class="inner_title h30"><i class="material-symbols-outlined mgr">search_activity</i>최근 게시물</div>
								<div class="scroll_box">
									<div class="scroll_box_inner recent_post gap5">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="in_unity_home_right_container">
						<div class="inner_box mw mh">
							<div class="inner_title h30"><i class="material-symbols-outlined mgr">local_fire_department</i>인기 게시물</div>
							<div class="scroll_box">
								<div class="scroll_box_inner hot_post gap5">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- unity main -->
				
			<!-- unity_modify -->
			<div class="in_unity_modify none">
				<div class="in_unity_modify_container">
					<div>
						<div class="in_unity_home_left_container">
							<div class="inner_box max_div">
								<div class="inner_title h20">기본 설정</div>
								<div class="inner_content">
									<div class="unity_modify_container">
										<div class="unity_image_modify">
											<div class="picture_container column unity_thumbnail">
												<div class="picture_content unity_thumbnail_preview">
												    <input type="file" name="unity_thumbnail_file" class="picture_input" accept="image/*" onchange="add_image(this);">
													<i class="material-symbols-outlined">add</i>
												</div>
												<div class="picture_name">유니티 썸네일</div>
											</div>
											<div class="picture_container column unity_banner">
												<div class="picture_content unity_banner_preview">
												    <input type="file" name="unity_banner_file" class="picture_input" accept="image/*" onchange="add_image(this);">
													<i class="material-symbols-outlined">add</i>
												</div>
												<div class="picture_name">유니티 배너</div>
												<div class="unity_banner_modify">
													<div class="select_style select_color">
														<input type="color" class="outform" id="banner_color_value" onchange="select_banner_setting('modify')"/>
														<span>배너 배경색</span>
													</div>
													<div class="select_justify column gap5">
														<div class="justify_set">
															<div class="select_style">
																<input type="range" class="outform" id="banner_horizontal_value" onchange="select_banner_setting('modify')" class="slider" min="0" max="100" value="50">
																<span>가로정렬</span>
															</div>
														</div>
														<div class="justify_set">
															<div class="select_style">
																<input type="range" class="outform" id="banner_vertical_value" onchange="select_banner_setting('modify')" class="slider" min="0" max="100" value="50">
																<span>세로정렬</span>
															</div>
														</div>
													</div>
												</div>
												<input type="hidden" name="unity_banner_set"/>
											</div>
										</div>
										
										<div class="input_box">
						  						<div class="input_cell unfinished_row">
												<div class="input_name">유니티 이름</div>
												<div class="input_value">
													<input type="text" name="unity_name" onblur="validate_unity_name(this,'update')" oninput="validate_unity_name(this,'update')"/>
												</div>
											</div>
											<div class="input_hint annotation_message">* 유니티의 이름을 입력 해주세요.</div>
										</div>
												
										<div class="input_box">
											<div class="input_cell unfinished_row with_select">
												<div class="input_name">
													주제
												</div>
												<div class="input_value">
													<select name="unity_topic" class="annotation_message" onchange="sort_after(this)">
														<option class="annotation_message" value="" selected disabled>대분류</option>
												        <option value="culture">문화</option>
												        <option value="sports">스포츠</option>
												        <option value="live">일상</option>
													</select>
													<select name="unity_topic" class="annotation_message">
														<option class="annotation_message" value="" selected disabled>소분류</option>
														<optgroup class="culture" label="문화">
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
													    <optgroup class="sports" label="스포츠">
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
													    <optgroup class="live" label="일상">
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
													<input type="hidden" name="unity_topic"/>
												</div>
											</div>
											<div class="input_hint annotation_message">
												* 유니티의 주제를 선택해주세요.				
											</div>
										</div>
										<div class="input_box textarea">
											<div class="input_cell unfinished_row">
												<div class="input_name">
													머릿말
												</div>
												<div class="input_value">
													<textarea name="unity_intro" onblur="validate_text(this,'* 유니티를 소개할 문구를 작성 해주세요.')" oninput="validate_text(this,'* 자신을 소개할 문구를 작성 해주세요.')"></textarea>
												</div>
											</div>
											<div class="input_hint annotation_message">
												* 유니티를 소개할 문구를 작성 해주세요.			
											</div>
							    		</div>
											
										<div class="input_box">
											<div class="input_cell unfinished_row">
												<div class="input_name" style="font-size:10px;">
													주 활동지역
												</div>
												<div class="input_value">
													<select class="annotation_message" onchange="select_card(this)">
														<option class="annotation_message" value="" selected disabled>주 활동지역을 선택하세요.</option>
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
													<input type="hidden" name="unity_location"/>
												</div>
											</div>
										</div>
										<div class="selected_card_container col_shrinked">
										</div>
												
										<div class="input_box">
											<div class="input_cell unfinished_row">
												<div class="input_name" style="font-size:10px;">
													주 사용언어
												</div>
												<div class="input_value">
													<select class="annotation_message" onchange="select_card(this)">
														<option class="annotation_message" value="" selected disabled>주 사용언어를 선택하세요.</option>
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
													<input type="hidden" name="unity_lang"/>
												</div>
											</div>
										</div>
										<div class="selected_card_container col_shrinked">
										</div>
												
										<div class="input_box">
											<div class="input_cell unfinished_row">
												<div class="input_name" style="font-size:10px;">
													주 활동방식
												</div>
												<div class="input_value">
													<select class="annotation_message" onchange="select_card(this)">
														<option class="annotation_message" value="" selected disabled>주 활동방식을 선택하세요.</option>
														<option value="kor">오프라인</option>
														<option value="us">온라인</option>
														<option value="jp">모두</option>
													</select>
													<input type="hidden" name="unity_method"/>
												</div>
											</div>
										</div>
										<div class="selected_card_container col_shrinked">
										</div>
												
										<div class="input_box">
						 					<div class="input_cell unfinished_row">
												<div class="input_name">태그</div>
												<div class="input_value">
													<input type="text" name="unity_add_tag" onkeydown="if(event.key === 'Enter'){ add_tag(this); }"/>
													<input type="hidden" name="unity_tag"/>
													<div class="input_cell_button" onclick="add_tag($(this).siblings(`input[name='unity_add_tag']`))">
														추가									
													</div>
												</div>
											</div>
											<div class="input_hint annotation_message">* 유니티를 표현하는 태그를 입력해주세요.</div>
										</div>
										<div class="selected_card_container col_shrinked tags_container">
										</div>
												
										<div class="input_box">
											<div class="input_cell unfinished_row with_select">
												<div class="input_name">
													자동 가입
												</div>
												<div class="input_value">
													<select name="unity_private" class="annotation_message">
														<option class="annotation_message" value="" selected disabled>자동 가입 허용 여부</option>
														<option value="1">허용</option>
														<option value="3">불허용</option>
													</select>
												</div>
											</div>
											<div class="input_hint annotation_message">
												* 가입신청 시 자동 수락 여부를 선택하세요.				
											</div>
										</div>
										<div class="input_box">
											<div class="input_cell unfinished_row with_select">
												<div class="input_name">
													검색 공개
												</div>
												<div class="input_value">
													<select name="unity_private" class="annotation_message">
														<option class="annotation_message" value="" selected disabled>검색 공개 여부</option>
														<option value="1">공개</option>
														<option value="3">비공개</option>
													</select>
												</div>
											</div>
											<div class="input_hint annotation_message">
												* 검색 시 노출여부를 선택하세요. 태그를 기준으로 노출됩니다.					
											</div>
										</div>
										<div class="input_box">
											<div class="input_cell unfinished_row with_select">
												<div class="input_name">
													추천 노출
												</div>
												<div class="input_value">
													<select name="unity_private" class="annotation_message">
														<option class="annotation_message" value="" selected disabled>추천 유니티 노출 여부</option>
														<option value="1">공개</option>
														<option value="3">비공개</option>
													</select>
												</div>
											</div>
											<div class="input_hint annotation_message">
												* 추천 유니티에 노출 여부를 선택하세요.					
											</div>
										</div>
										<div class="input_box">
											<div class="input_cell unfinished_row with_select">
												<div class="input_name">
													게시글 공개
												</div>
												<div class="input_value">
													<select name="unity_private" class="annotation_message">
														<option class="annotation_message" value="" selected disabled>게시글 공개 여부</option>
														<option value="1">공개</option>
														<option value="3">비공개</option>
													</select>
												</div>
											</div>
											<div class="input_hint annotation_message">
												* 미가입자에게 게시글 공개 여부를 선택하세요.					
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="in_unity_home_right_container">
							<div class="mbc inner_box max_div">
								<div class="inner_title h20">게시판 설정</div>
								<div class="inner_content modify_board_container">
									<div class="inner_box new_category" onclick="add_category()">
										<div class="inner_title h20">
											카테고리 추가
											<div class="tiny_button_section">
												<i class="material-symbols-outlined">add</i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="unity_modify_container_buttons">
						<div class="submit_hint annotation_message">
							* 미 입력 된 항목이 있습니다.
						</div>
						<div class="cards_footer_button last_submit unfinished_row" onclick="submit_modify_unity_info(this);">
							<span>수정하기</span>
						</div>
						<div class="cards_footer_button" onclick="get_modify_unity()">
							<span>초기화</span>
						</div>
						<div class="cards_footer_button" onclick="enter_unity_main();">
							<span>취소</span>
						</div>
					</div>
				</div>
			</div>
			<!-- unity_modify -->
			<!-- unity post -->		
			<div class="in_unity_post none expanded">
				<div class="inner_box max_div inner row ap10 gap5 inset">
					<div class="unity_post_list_container expanded resizable">
						<div class="max_div column" style="max-width:calc(100% - 20px);">
							<div id="unity_board_info" class="inner_title h40 lf"></div>
							<div class="inner_content ofyh gap5">
								<div id="unity_post_list" class="post_list">
								</div>
								<div class="pagenation">
									<div class="numbers">
										<div class="page "><i class="material-symbols-outlined">first_page</i></div>
										<div class="page"><i class="fa-solid fa-chevron-left"></i></div>
											<div class="page num">1</div>
										<div class="added_page">
										</div>
											<div class="page"><i class="fa-solid fa-chevron-right"></i></div>
										<div class="page"><i class="material-symbols-outlined">last_page</i></div>
									</div>
								</div>
							</div>
						</div>
						<div class="container_side_button_section post_list_button resize_handle">
							<i class="material-symbols-outlined" style="transform: rotate(90deg); display:flex;">drag_handle</i>
						</div>
					</div>
					
					<div class="unity_post_container">
						<div id="unity_posts" class="inner_box max_div ap10">
							<div class="inner_content">
								<div class="scroll_box_inner unity_cards">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- unity post -->		
		</div>	
		<!-- in unity -->		
	
		<!-- unity home -->
		<div class="unity_home main_card_content expanded">
			<div class="unity_menu">
				<div class="menu_tag" onclick="col_toggle('.favorite_unities',$(this).find('i'))">
					<span>즐겨찾기</span>
					<i class="material-symbols-outlined xlf">arrow_drop_up</i>
				</div>
				<div class="favorite_unities expanded">
				</div>
			</div>
			<div class="unity_article">
				<div class="scroll_box back">
					<div class="scroll_box_inner">
						<div class="unities_container">
							<div class="inner_title h30">
								가입한 유니티
							</div>
							<div class="joined_unities unities expanded"></div>
						</div>	
						<div class="unities_container">
							<div class="inner_title h30" onclick="col_toggle($(this).next('.unities'),this)">
								추천 유니티
							</div>
							<div class="recomm_unities unities expanded"></div>
						</div>		
						<div class="unities_container">
							<div class="inner_title h30" onclick="col_toggle($(this).next('.unities'),this)">
								근처 유니티
							</div>
							<div class="near_unities unities expanded"></div>
						</div>	
					</div>
				</div>
				
			</div>
		</div>
		<!-- unity home -->
	</div>
	<!-- main card body -->
</div>
