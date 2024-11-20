<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="profile_container">
	<div class="profile_container_head">
		<div class="profile_container_head_basic">
			<img
			src="/img/profiles/${user_thumbnail}"
			style="width: 150px; height: 150px; margin-bottom:10px;"
			/>
			<div class="profile_container_head_basic_user_name">
			조우영
			</div>
			<div class="profile_container_head_basic_user_nation">
			국적 : 대한민국
			</div>
		</div>
		<div class="profile_container_head_tools">
			<div class="profile_container_head_tool">
				<img src="${pageContext.request.contextPath }/resources/assets/img/message.png" class="icons">
				메세지
			</div>
			<div class="profile_container_head_tool">
				<img src="${pageContext.request.contextPath }/resources/assets/img/follow.png" class="icons">
				팔로우
			</div>
			<div class="profile_container_head_tool">
				<img src="${pageContext.request.contextPath }/resources/assets/img/to_favorite.png" class="icons">
				즐겨찾기
			</div>
			<div class="profile_container_head_tool">
				<img src="${pageContext.request.contextPath }/resources/assets/img/prohibit.png" class="icons">
				차단
			</div>
			<div class="profile_container_head_tool">
				<img src="${pageContext.request.contextPath }/resources/assets/img/report.png" class="icons">
				신고
			</div>
			<div class="profile_container_head_tool">
				<img src="${pageContext.request.contextPath }/resources/assets/img/update.png" class="icons">
				수정
			</div>
		</div>
	</div>
	<div class="profile_container_body">
		<div class="scroll_box">
			<div class="scroll_box_inner">
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
					<div class="user_info_box">
						<div class="user_info_title">
						기타
						</div>
						<div class="user_info_content">
						기타등등 정보들
						</div>
					</div>
					<div class="user_info_box">
						<div class="user_info_title">
						기타
						</div>
						<div class="user_info_content">
						기타등등 정보들
						</div>
					</div>
					<div class="user_info_box">
						<div class="user_info_title">
						기타
						</div>
						<div class="user_info_content">
						기타등등 정보들
						</div>
					</div>
					<div class="user_info_box">
						<div class="user_info_title">
						기타
						</div>
						<div class="user_info_content">
						기타등등 정보들
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="detail_profile_container shrinking">
	<div class="detail_profile_container_menus">	
		<div class="detail_profile_container_menu favorite" onclick="profile_favorite(this)">
			<span>즐겨찾기</span>
		</div>
		<div class="detail_profile_container_menu follower" onclick="profile_follower(this)">
			<span>팔로워</span>
		</div>
		<div class="detail_profile_container_menu following" onclick="profile_following(this)">
			<span>팔로잉</span>
		</div>
		<div class="detail_profile_container_menu history" onclick="profile_history(this)">
			<span>기록</span>
		</div>
		<div class="detail_profile_container_menu prohibit" onclick="profile_prohibit(this)">
			<span>차단</span>
		</div>
	</div>
	<div class="detail_profile_container_body">
		<div class="scroll_box">
			<div class="scroll_box_inner">
				<div class="detail_profile_content favorite none">
					<div class="card_person">
						<div class="card_person_thumbnail">
							<img
							src="/img/profiles/${user_thumbnail}"
							style="width: 40px; height: 40px; border-radius: 30%;"
							/>
						</div>
						<div class="card_person_info">
							<div class="card_person_info_name">즐겨찾는사람</div>
							<div class="card_person_info_comment"></div>
							<div class="card_person_info_logon"></div>
						</div>
						<div class="card_person_tools">
							<div class="card_person_tools_pin"></div>
							<div class="card_person_tools_message"></div>
						</div>
					</div>
				</div>
				<div class="detail_profile_content follower none">
					follower
				</div>
				<div class="detail_profile_content following none">
					following
				</div>
				<div class="detail_profile_content history none">
					history
				</div>
				<div class="detail_profile_content prohibit none">
					prohibit
				</div>
			</div>				
		</div>
	</div>
</div>
<div class="container_side_button_section profile_button" onclick="detail_profile_container(this)">
	<i class="fas fa-chevron-circle-right"></i>
</div>