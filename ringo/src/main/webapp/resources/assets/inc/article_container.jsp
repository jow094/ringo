<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="article_container_menu">	
	<div class="article_container_menu_circle" onclick="main_circle(this)">
		<i class="fa-solid fa-circle-notch"></i>
		<span>서클</span>
	</div>
	<div class="article_container_menu_timeline" onclick="main_timeline(this)">
		<i class="fa-solid fa-timeline"></i>
		<span>타임라인</span>
	</div>
	<div class="article_container_menu_pool" onclick="main_pool(this)">
		<i class="fa-solid fa-water"></i>
		<span>풀</span>
	</div>
	<div class="article_container_menu_link" onclick="main_link(this)">
		<i class="fa-solid fa-link"></i>
		<span>링크</span>
	</div>
	<div class="article_container_menu_messenger" onclick="main_messenger()">
		<i class="fa-solid fa-message"></i>
		<span>메신저</span>
	</div>
</div>

<div class="container_contents">
	<!-- circle start -->
	<div class="container_contents_body main_circle none">
		<span class="container_contents_title">
			<i class="fa-solid fa-circle-notch"></i>
			서클
		</span>
		<div class="scroll_box">
			<div class="scroll_box_inner">
				<div class="card">
					<div class="card_header"></div>
					<div class="card_body">1번째 게시글</div>
					<div class="card_foot"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- circle end -->
	
	<!-- timeline start -->
	<div class="container_contents_body main_timeline none">
		<span class="container_contents_title">
			<i class="fa-solid fa-timeline"></i>
			타임라인
		</span>
		<div class="scroll_box">
			<div class="scroll_box_inner">
				<div class="card">
					<div class="card_header">
						<div class="card_header_img">
							<img
							src="/img/profiles/${user_thumbnail}"
							style="width: 40px; height: 40px; border-radius: 50%; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);"
							/>
						</div>
						<div class="card_header_name">
							작성자
						</div>
						<div class="card_header_tools">
							좋아요
						</div>
					</div>
					<div class="card_body">
						<div class="card_body_content">
							1번째 게시글
						</div>
						<div class="card_body_tags">
							#태그
						</div>
					</div>
					<div class="card_foot">
						<div class="card_foot_comment">
							<div class="card_comment">
								<div class="card_comment_thumbnail">
									<img
									src="/img/profiles/${user_thumbnail}"
									style="width: 40px; height: 40px; border-radius: 30%;"
									/>
								</div>
								<div class="card_comment_body">
									<div class="card_comment_info_name"></div>
									<div class="card_comment_info_content"></div>
									<div class="card_comment_info_time"></div>
								</div>
							</div>
						</div>
						<div class="card_foot_comment_input">
							<textarea>
							</textarea>
							<button type="button">
								<i class="fa-solid fa-paper-plane"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- timeline end -->
	
	<!-- pool start -->
	<div class="container_contents_body main_pool none">
		<span class="container_contents_title">
			<i class="fa-solid fa-water"></i>
			풀
		</span>
		<div class="scroll_box">
			<div class="scroll_box_inner">
				<div class="card">
					<div class="card_header"></div>
					<div class="card_body">1번째 게시글</div>
					<div class="card_foot"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- pool end -->
	
	<!-- link start -->
	<div class="container_contents_body main_link none">
		<span class="container_contents_title">
			<i class="fa-solid fa-link"></i>
			링크
		</span>
		<div class="scroll_box">
			<div class="scroll_box_inner">
				<div class="card">
					<div class="card_header"></div>
					<div class="card_body">1번째 게시글</div>
					<div class="card_foot"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- link end -->
	
	<!-- messenger start -->
	<div class="main_messenger shrinking">
		<div class="container_side_button_section messenger_button" onclick="main_messenger_menu(this)">
			<i class="fas fa-chevron-circle-left"></i>
		</div>
		<div class="main_messenger_menu scroll_box shrinking">
			<div class="scroll_box_inner">
				<div class="card_person">
					<div class="card_person_thumbnail">
						<img
						src="/img/profiles/${user_thumbnail}"
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
		<div class="main_messenger_body scroll_box">
			<div class="messenger_navbar">
				<div class="messenger_navbar_back">
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
						src="/img/profiles/${user_thumbnail}"
						style="width: 40px; height: 40px; border-radius: 30%;"
						/>
					</div>
					<div class="message_info">	
						<div class="message_sender_name">
						sender_name
						</div>
						<div class="message_body">
							<div class="message_content">
							본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문마지막
							</div>
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
						<div class="message_content">
						본문
						</div>
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
	<!-- messenger end -->
</div>