<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="profile_container hidden expanded">


	<div class="user_profile_container expanded">
		<div class="profile_container_head">
			<div class="profile_container_head_basic">
			</div>
			<div class="profile_container_head_tools">
			</div>
		</div>
		<div class="profile_container_body">
			<div class="scroll_box">
				<div class="scroll_box_inner col">
				</div>
			</div>
		</div> 
	</div>
	<div class="unity_profile_container none expanded">
		<div class="profile_container_head">
			<div class="profile_container_head_basic">
			</div>
			<div class="profile_container_head_tools">
			</div>
		</div>
		<div class="profile_container_body unity_board_names" >
			<div class="scroll_box">
			</div>
		</div>
	</div>
		
</div>
<div class="detail_profile_container shrinked">
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
							src="/img/user/profiles/${user_thumbnail}"
							style="width: 40px; height: 40px; border-radius: 30%;"
							/>
						</div>
						<div class="card_person_info">
							<div class="card_person_info_nickname">즐겨찾는사람</div>
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
<div class="profile_button_container">
	<div class="container_side_button_section top" onclick="expand_profile()">
		<i class="fas fa-chevron-circle-right"></i>
	</div>
	<div class="container_side_button_section bottom" onclick="shrink_profile()">
		<i class="fas fa-chevron-circle-left"></i>
	</div>
	<div class="container_side_button_section left none" onclick="shrink_profile()">
		<i class="fas fa-chevron-circle-left"></i>
	</div>
	<div class="container_side_button_section right none" onclick="expand_profile()">
		<i class="fas fa-chevron-circle-right"></i>
	</div>
</div>