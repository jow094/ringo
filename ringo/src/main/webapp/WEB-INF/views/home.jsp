<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>
<div class="outter_container main_container">
	<div class="left_container">
		<div class="profile_container">
			<img
			src="/img/profiles/${user_thumbnail}"
			style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 10px;"
			/>
			<div class="user_info_container">
				<div class="profile_user_name">
				조우영
				</div>
				<div class="profile_user_nation">
				국적 : 대한민국
				</div>
				<div class="profile_tools">
					<div class="profile_tool">
						<img src="${pageContext.request.contextPath }/resources/assets/img/message.png" class="icons">
						메세지
					</div>
					<div class="profile_tool">
						<img src="${pageContext.request.contextPath }/resources/assets/img/follow.png" class="icons">
						팔로우
					</div>
					<div class="profile_tool">
						<img src="${pageContext.request.contextPath }/resources/assets/img/to_favorite.png" class="icons">
						즐겨찾기
					</div>
				</div>
				<div class="user_languages">
					<div class="user_language">
						<div class="user_language_type">모국어</div>
						<div class="user_language_name">
							<img src="https://flagcdn.com/w80/kr.png" class="flags">
							한국어
						</div>
					</div>
					<div class="user_language">
						<div class="user_language_type">유창한 언어</div>
						<div class="user_language_name">
							<img src="https://flagcdn.com/w80/kr.png" class="flags">
							한국어
						</div>
					</div>
					<div class="user_language">
						<div class="user_language_type">학습 언어</div>
						<div class="user_language_name">
							<img src="https://flagcdn.com/w80/us.png" class="flags">
							영어
						</div>
					</div>
				</div>
				<div class="user_infos">
					<div>
					기타등등 정보들
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="center_container">
		<div class="container_menu">
			<div>
				<i class="fa-solid fa-timeline"></i>
				<span>타임라인</span>
			</div>
			<div>
				<i class="fa-solid fa-handshake-angle"></i>
				<span>매칭</span>
			</div>
			<div>
				<i class="fa-solid fa-message"></i>
				<span>메세지</span>
			</div>
		</div>
		<div class="container_contents">
			<div class="main_timeline">
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
			<!-- <div class="main_matching">
					<div class="scroll_box">
						<div class="scroll_box_inner">
							<div class="card">
								<div class="card_header"></div>
								<div class="card_body"></div>
								<div class="card_foot"></div>
							</div>
						</div>
					</div>
				</div> -->
			<div class="main_messenger">
				<div class="main_messenger_menu scroll_box">
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
		</div>
	</div>
	<div class="right_container">
	</div>
</div>
</body>
</html>