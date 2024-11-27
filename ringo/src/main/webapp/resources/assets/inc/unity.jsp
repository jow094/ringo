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
		<div class="main_title_button" onclick="enter_unity()">
			<i class="material-symbols-outlined">forum</i>
			<span id="title_unity_name"></span>
		</div>
		<div class="title_button">
			<i class="material-symbols-outlined" onclick="write_circle()">edit_note</i>
			<i class="material-symbols-outlined" onclick="unity_home()">home</i>
			<div class="input_wrapper">
				<i class="material-symbols-outlined">search</i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	
	
	<!-- unity create -->
	<div class="unity_create_container expanded none">
		<div class="unity_image_info">
			<div class="picture_container column unity_thumbnail">
				<div class="picture_content unity_thumbnail_preview">
				    <input type="file" name="unity_thumbnail_file" class="picture_input" accept="image/*" onchange="add_image(this); clear_unity_create_container();">
					<i class="fa-solid fa-plus"></i>
				</div>
				<div class="picture_name">유니티 썸네일</div>
			</div>
			<div class="picture_container column unity_banner">
				<div class="picture_content unity_banner_preview">
				    <input type="file" name="unity_banner_file" class="picture_input" accept="image/*" onchange="add_image(this); clear_unity_create_container();">
					<i class="fa-solid fa-plus"></i>
				</div>
				<div class="picture_name">유니티 배너</div>
				<div class="banner_style">
					<div class="select_style select_color">
						<input type="color" class="outform" id="banner_color_value" onchange="select_banner_setting(this)"/>
						<span>배너 배경색</span>
					</div>
					<div class="justify_set">
						<div class="select_style">
							<input type="range" class="outform" id="banner_horizontal_value" onchange="select_banner_setting(this)" class="slider" min="0" max="100" value="50">
							<span>가로정렬</span>
						</div>
					</div>
					<div class="justify_set">
						<div class="select_style">
							<input type="range" class="outform" id="banner_vertical_value" onchange="select_banner_setting(this)" class="slider" min="0" max="100" value="50">
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
							<select name="unity_topic" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>대분류</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
							</select>
							<select name="unity_topic" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>소분류</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
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
								<option value="kor">서울</option>
								<option value="us">부산</option>
								<option value="jp">대구</option>
								<option value="ch">대전</option>
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
								<option value="kor">한국어</option>
								<option value="us">미국어</option>
								<option value="jp">일본어</option>
								<option value="ch">중국어</option>
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
							<div class="input_cell_button" onclick="add_tag(`input[name='unity_add_tag']`)">
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
	
	
	
	<div class="main_card_body unity_main_container expanded">
	
		<!-- in_unity -->
		<div class="in_unity br5 inset inner expanded">
		
			<!-- in_unity -->
			<div class="in_unity_main none expanded">
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
					
					
			<div class="in_unity_post none expanded">
				<div class="inner_box max_div inner row ap10 gap5 inset">
					<div class="unity_post_list_container expanded resizable">
						<div class="max_div column" style="max-width:calc(100% - 20px);">
							<div class="inner_title h30">게시판 이름</div>
							<div class="inner_content">
								<div class="post_list">
									<div class="post_row">
										<div>zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</div>
										<div><i class="fa-regular fa-comment-dots"></i><span>13</span></div>
										<div><i class="fa-regular fa-heart"></i><span>125</span></div>
										<div><i class="material-symbols-outlined sf">counter_5</i><span>조우영</span></div>
										<div><span>12.01 11:29</span></div>
									</div>
									<div class="post_row">
										<div>zzzzzzzzzz</div>
										<div><i class="fa-regular fa-comment-dots"></i><span>1,123</span></div>
										<div><i class="fa-regular fa-heart"></i><span>125</span></div>
										<div><i class="material-symbols-outlined sf">counter_5</i><span>조우영</span></div>
										<div><span>12.01 11:24</span></div>
									</div>
								</div>
							</div>
						</div>
						<div class="container_side_button_section post_list_button resize_handle">
							<i class="material-symbols-outlined">pan_zoom</i>
						</div>
					</div>
					
					<div class="unity_post_container">
						<div class="inner_box max_div ap10">
							<div class="inner_content">
								<div class="scroll_box_inner unity_cards">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
		
	
		<!-- unity home -->
		<div class="unity_home main_card_content expanded">
			<div class="unity_menu">
				<div class="menu_tag" onclick="col_toggle('.favorite_unities',$(this).find('i'))">
					<span>즐겨찾기</span>
					<i class="material-symbols-outlined xlf">expand_circle_up</i>
				</div>
				<div class="favorite_unities expanded">
				</div>
			</div>
			<div class="unity_article">
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
		<!-- unity home -->
		
		
	</div>
</div>
