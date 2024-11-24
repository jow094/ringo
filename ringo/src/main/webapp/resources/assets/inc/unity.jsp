<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="main_card main_unity none">
	<div class="main_card_title">
		<div class="unity_home_button" onclick="unity_home()" style="cursor:pointer;">
			<i class="ringo unity"></i>
			<span>유니티</span>
		</div>
		<div class="title_button">
			<i class="fa-solid fa-plus" onclick="expand_create_unity()" style="cursor:pointer;"></i>
			<i class="fa-solid fa-house" onclick="unity_home()" style="cursor:pointer;"></i>
			<div class="input_wrapper">
				<i class="input_icon fa-solid fa-magnifying-glass"></i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	
	<div class="unity_create_container">
		<div class="unity_essential_info">
			<div class="picture_container column unity_thumbnail">
				<div class="picture_content">
				    <input type="file" name="user_profile" class="picture_input" accept="image/*" onchange="add_image(this);">
					<i class="fa-solid fa-plus"></i>
				</div>
				<div class="picture_name">유니티 썸네일</div>
			</div>
			<div class="unity_basic_info">
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
							<select name="user_private" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>대분류</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
							</select>
							<select name="user_private" class="annotation_message">
								<option class="annotation_message" value="" selected disabled>소분류</option>
								<option value="1">공개</option>
								<option value="3">비공개</option>
							</select>
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
			</div>
		</div>
		<div class="unity_additianal_info">
			<div class="unity_infos">
			
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
				<div class="selected_card_container none">
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
				<div class="selected_card_container none">
				</div>
				
				<div class="input_box">
 					<div class="input_cell unfinished_row">
						<div class="input_name">태그</div>
						<div class="input_value">
							<input type="text" name="unity_tag"/>
							<input type="hidden" name="unity_location"/>
							<div class="input_cell_button" onclick="">
								추가
							</div>
						</div>
					</div>
					<div class="input_hint annotation_message">* 유니티를 표현하는 태그를 입력해주세요.</div>
				</div>
				
			</div>
			<div class="unity_setting">
				<div class="input_box">
					<div class="input_cell unfinished_row with_select">
						<div class="input_name">
							자동 가입
						</div>
						<div class="input_value">
							<select name="user_private" class="annotation_message">
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
							<select name="user_private" class="annotation_message">
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
							<select name="user_private" class="annotation_message">
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
							<select name="user_private" class="annotation_message">
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
	
	
	
	<div class="main_card_body unity_main_container col_shrinked">
	
	
		<div class="unity_unity none">
			<div class="unity_board expanded">
				<div class="unity_boardlist">
					<div class="unity_boardlist_header">
						<div class="post_num">번호</div>
						<div class="post_title">제목</div>
						<div class="post_writer">작성자</div>
						<div class="post_view">조회수</div>
						<div class="post_time">일시</div>
					</div>
					<div class="unity_boardlist_body">
						<div class="post_row">
							<div class="post_num">1</div>
							<div class="post_title">제목임ㄴㅋㅋㅋㅋㅋ</div>
							<div class="post_writer">조우영</div>
							<div class="post_view">2</div>
							<div class="post_time">12:28</div>
						</div>
						<div class="post_row">
							<div class="post_num">2</div>
							<div class="post_title">제제목제목제목목</div>
							<div class="post_writer">작성자</div>
							<div class="post_view">441</div>
							<div class="post_time">12:30</div>
						</div>
						<div class="post_row">
							<div class="post_num">3</div>
							<div class="post_title">제목</div>
							<div class="post_writer">조우영</div>
							<div class="post_view">123</div>
							<div class="post_time">12:30</div>
						</div>
					</div>
					<div class="unity_boardlist_footer">
						<div>페이징처리</div>
						<div>검색창</div>
					</div>
				</div>
			</div>
			<div class="unity_content">
				<div class="scroll_box_inner">
				
					<!-- card start -->
					<div class="card">
						<div class="card_header">
							<div class="card_header_img">
								<img
								src="/img/profiles/${user_thumbnail_path}"
								style="width: 40px; height: 40px; border-radius: 50%; shrink:0; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);"
								/>
							</div>
							<div class="card_header_name">
								작성자
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart" style="font-size: 20px;"></i>
									<span>1,430</span>
								</div>
								<div class="card_header_tool">
									<i class="fa-solid fa-bars" style="font-size: 20px;"></i>
									</div>
								</div>
							</div>
							<div class="card_body">
								<div class="card_body_content">
									<div class="scroll_box">
										<div class="scroll_box_inner">
										본문
										</div>
									</div>
								</div>
								<div class="card_body_tags">
									#태그
								</div>
							</div>
							<div class="card_foot">
								<div class="card_foot_comment_input">
									<textarea></textarea>
									<button type="button">
										<i class="fa-solid fa-paper-plane"></i>
									</button>
								</div>
								<div class="card_foot_comment">
									<div class="scroll_box">
										<div class="scroll_box_inner">
											<div class="card_comment">
												<div class="card_comment_thumbnail">
													<img
													src="/img/profiles/${user_thumbnail_path}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">유니티,링크,메신저 채팅방,유니티 프로필,검색창,정보수정,가입절차</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail_path}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">내용</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail_path}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">내용</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- card end -->
					<!-- card start -->
					<div class="card">
						<div class="card_header">
							<div class="card_header_img">
								<img
								src="/img/profiles/${user_thumbnail_path}"
								style="width: 40px; height: 40px; border-radius: 50%; shrink:0; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);"
								/>
							</div>
							<div class="card_header_name">
								작성자
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart" style="font-size: 20px;"></i>
									<span>1,430</span>
								</div>
								<div class="card_header_tool">
									<i class="fa-solid fa-bars" style="font-size: 20px;"></i>
									</div>
								</div>
							</div>
							<div class="card_body">
								<div class="card_body_content">
									<div class="scroll_box">
										<div class="scroll_box_inner">
										본문
										</div>
									</div>
								</div>
								<div class="card_body_tags">
									#태그
								</div>
							</div>
							<div class="card_foot">
								<div class="card_foot_comment_input">
									<textarea></textarea>
									<button type="button">
										<i class="fa-solid fa-paper-plane"></i>
									</button>
								</div>
								<div class="card_foot_comment">
									<div class="scroll_box">
										<div class="scroll_box_inner">
											<div class="card_comment">
												<div class="card_comment_thumbnail">
													<img
													src="/img/profiles/${user_thumbnail_path}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">유니티,링크,메신저 채팅방,유니티 프로필,검색창,정보수정,가입절차</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail_path}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">내용</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail_path}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">내용</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- card end -->
				
				
				</div>
			</div>
		</div>
	
		<div class="unity_home main_card_content">
			<div class="unity_menu">
				<div class="menu_tag" onclick="col_toggle($(this).next('.favorite_unities'),this)">
					<span>즐겨찾기</span>
					<i class="fas fa-chevron-circle-up"></i>
				</div>
				<div class="favorite_unities expanded">
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/1.jpg"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
				</div>
			</div>
			<div class="unity_article">
				<div class="menu_tag" onclick="col_toggle($(this).next('.unities_container'),this)">
					<span>추천 유니티</span>
					<i class="fas fa-chevron-circle-up"></i>
				</div>
				<div class="unities_container expanded">
					<div class="unity_card" data-unity_code="asd" onclick="enter_unity($(this).attr('data-unity_code'))">
						<div class="unity_card_thumbnail">
							<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						</div>
						<div class="unity_card_body">
							<div class="unity_card_name">asdasd름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_tags">
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
							</div>
						</div>
					</div>
					<div class="unity_card" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<div class="unity_card_thumbnail">
							<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						</div>
						<div class="unity_card_body">
							<div class="unity_card_name">유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_tags">
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
							</div>
						</div>
					</div>
				</div>	
				
				<div class="menu_tag" onclick="col_toggle($(this).next('.unities_container'),this)">
					<span>근처 유니티</span>
					<i class="fas fa-chevron-circle-up"></i>
				</div>
				<div class="unities_container expanded">
					<div class="unity_card" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<div class="unity_card_thumbnail">
							<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						</div>
						<div class="unity_card_body">
							<div class="unity_card_name">유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_tags">
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
							</div>
						</div>
					</div>
				</div>	
				
				<div class="menu_tag" onclick="col_toggle($(this).next('.unities_container'),this)">
					<span>가입한 유니티</span>
					<i class="fas fa-chevron-circle-up"></i>
				</div>
				<div class="unities_container expanded">
					<div class="unity_card" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<div class="unity_card_thumbnail">
							<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						</div>
						<div class="unity_card_body">
							<div class="unity_card_name">유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
							<div class="unity_card_tags">
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
								<div class="tag_card">#축구</div>
							</div>
						</div>
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
					<div class="unity_card">
					</div>
				</div>	
			</div>
		</div>
		
		
	</div>
</div>
