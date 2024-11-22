<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_messenger shrinked">
	<div class="container_side_button_section messenger_button" onclick="main_messenger_menu(this)">
		<i class="fas fa-chevron-circle-left"></i>
	</div>
	<div class="main_messenger_menu scroll_box shrinked">
		<div class="scroll_box_inner">
			<div class="card_person">
				<div class="card_person_thumbnail">
					<img
					src="/img/profiles/${user_thumbnail_path}"
					style="width: 40px; height: 40px; border-radius: 30%;"
					/>
				</div>
				<div class="card_person_info">
					<div class="card_person_info_name"></div>
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
				<div class="messenger_room" onclick="enter_room()">
					<div class="room_thumbnail">
						<img src="/img/profiles/${user_thumbnail_path}"/>
					</div>
					<div class="room_body">
						<div class="room_name">조우영</div>
						<div class="room_message">
							<div class="room_message_content">asdasdasdsadasdsadsasdasdasdsadasdsadsasdasdasdsadasdsadsasdasㅁㄴㅇㅁㄴㅇㄴdasdsadasdsadsa</div>
							<div class="room_message_time">11:20</div>
						</div>
					</div>
					<div class="room_unreadcount">
						<div class="badge">1123</div>
					</div>
				
				</div>
				<div class="messenger_room">
				
				</div>
				<div class="messenger_room">
				
				</div>
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
			<div class="messenger_navbar_name">name</div>
			<div class="messenger_navbar_menu">
				<i class="fa-solid fa-bars"></i>
			</div>
		</div>
		<div class="messenger_content">
			<div class="message_box_received">
				<div class="message_sender_thumbnail">
					<img
					src="/img/profiles/${user_thumbnail_path}"
					style="width: 40px; height: 40px; border-radius: 30%;"
					/>
				</div>
				<div class="message_info">	
					<div class="message_sender_name">
					sender_name
					</div>
					<div class="message_body">
						<div class="message_content">본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문마지막</div>
						<div class="message_time">
						20:00
						</div>
					</div>
				</div>
				<span class="message_unread_count">1</span>
			</div>
			<div class="message_box_send">
				<span class="message_unread_count">1</span>
				<div class="message_body">
					<div class="message_content">본문</div>
					<div class="message_time">
					20:00
					</div>
				</div>
			</div>
		</div>
		<div class="messenger_input">
			<textarea></textarea>
			<div class="messenger_input_tools">
				<ul>
					<li>
						<i class="fa-regular fa-face-smile"></i>
					</li>
					<li>
						<i class="fa-solid fa-paperclip"></i>
					</li>
					<li>
						<button type="button">
							<i class="fa-solid fa-paper-plane"></i>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	
	
</div>
