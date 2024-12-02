<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_messenger shrinked">
	<div class="container_side_button_section messenger_button" onclick="main_messenger_menu(this)">
		<i class="fas fa-chevron-circle-left"></i>
	</div>
	<div class="main_messenger_menu scroll_box shrinked">
		<div class="scroll_box_inner">
			<div class="card_person">
				<div class="card_person_thumbnail">
					<img class="small_img"
					src="/img/user/profiles/${user_thumbnail_path}"
					/>
				</div>
				<div class="card_person_info">
					<div class="card_person_info_nickname"></div>
					<div class="card_person_info_comment"></div>
					<div class="card_person_info_logon"></div>
				</div>
				<div class="card_person_tools">
					<div class="card_person_tools_pin"></div>
					<div class="card_person_tools_message"></div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="main_messenger_body out_of_room">
		<div class="messenger_navbar small">
			<div class="active">전체</div>
			<div>즐겨찾기</div>
			<div>팔로워</div>
			<div>유니티</div>
			<div>일반</div>
		</div>
		<div class="messenger_rooms_container">
			<div class="menu_tag" onclick="col_toggle($(this).next('.messenger_rooms'),this)">
				<span>즐겨찾기</span>
				<i class="fas fa-chevron-circle-up"></i>
			</div>
			<div class="messenger_rooms favorite expanded">
			</div>
			<div class="menu_tag" onclick="col_toggle($(this).next('.messenger_rooms'),this)">
				<span>팔로워</span>
				<i class="fas fa-chevron-circle-up"></i>
			</div>
			<div class="messenger_rooms follower expanded">
				<div class="messenger_room">
				
				</div>
				<div class="messenger_room">
				
				</div>
				<div class="messenger_room">
				
				</div>
			</div>
		</div>
	</div>
	
	
	
	<div class="main_messenger_body in_room none">
		<div class="messenger_navbar">
			<div class="messenger_navbar_back" onclick="exit_room()">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="messenger_navbar_nickname">nickname</div>
			<div class="messenger_navbar_menu">
				<i class="fa-solid fa-bars"></i>
			</div>
		</div>
		
		<div class="messenger_content">
		</div>
		
		<div class="messenger_input" data-mr_code="mr_1">
			<textarea id="input_msg_content"></textarea>
			<div class="messenger_input_tools">
				<ul>
					<li>
						<i class="fa-regular fa-face-smile"></i>
					</li>
					<li>
						<i class="fa-solid fa-paperclip"></i>
						<input id="input_msg_file" class="hidden_input" type="file"></input>
					</li>
					<li>
						<button type="button" onclick="submit_msg()">
							<i class="fa-solid fa-paper-plane"></i>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	
	
</div>
