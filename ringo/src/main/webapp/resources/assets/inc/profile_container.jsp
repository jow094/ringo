<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="profile_container hidden expanded">


	<div class="user_profile_container expanded">
		<div class="profile_container_head">
			<div class="profile_container_head_basic">
				<img class="black"/>
				<div class="profile_container_head_basic_nickname">
				</div>
				<div class="profile_container_head_basic_info">
				</div>
				<div class="profile_container_head_basic_info">
				</div>
				<div class="profile_container_head_basic_info">
				</div>
				<div class="profile_container_head_basic_info">
				</div>
			</div>
			<div class="profile_container_head_tools">
				<div class="profile_container_head_tool personal_mr" onclick="get_personal_msg_room(profile_target)">
					<i class="material-symbols-outlined">sms</i>
					<span>메세지</span>
				</div>
				<div class="profile_container_head_tool add_follow" onclick="add_follow();">
					<i class="material-symbols-outlined">person_add</i>
					<span>팔로우</span>
				</div>
				<div class="profile_container_head_tool delete_follow" onclick="delete_follow();">
					<i class="material-symbols-outlined">person_remove</i>
					<span>언팔로우</span>
				</div>
				<div class="profile_container_head_tool add_favorite" onclick="add_favorite(this);">
					<i class="material-symbols-outlined">bookmark_star</i>
					<span>즐겨찾기</span>
				</div>
				<div class="profile_container_head_tool delete_favorite" onclick="delete_favorite(this);">
					<i class="material-symbols-outlined">bookmark_remove</i>
					<span>즐겨찾기 해제</span>
				</div>
    			<div class="profile_container_head_tool open_modify_profile" onclick="open_modify_profile();">
	    			<i class="material-symbols-outlined">manage_accounts</i>
	    			<span>수정</span>
    			</div>
			</div>
		</div>
		<div class="profile_container_body">
			<div class="scroll_box">
				<div class="scroll_box_inner col">
					<div class="inner_box mw p5 mgb">
						<div class="inner_title">모국어</div>
						<div class="scroll_box row user_native_lang">
							<img class="flags">
							<span></span>
	        			</div>
					</div>
					<div class="inner_box mw p5 mgb">
						<div class="inner_title">유창한 언어</div>
						<div class="scroll_box row user_fluent_lang">
							<img class="flags">
							<span></span>
	        			</div>
					</div>
					<div class="inner_box mw p5 mgb">
						<div class="inner_title">학습중인 언어</div>
						<div class="scroll_box row user_learning_lang">
							<img class="flags">
							<span></span>
	        			</div>
					</div>
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
		<div class="detail_profile_container_menu favorite active" onclick="profile_favorite(this)">
			<span>즐겨찾기</span>
		</div>
		<div class="detail_profile_container_menu follower" onclick="profile_follower(this)">
			<span>팔로워</span>
		</div>
		<div class="detail_profile_container_menu following" onclick="profile_following(this)">
			<span>팔로잉</span>
		</div>
		<!-- <div class="detail_profile_container_menu history" onclick="profile_history(this)">
			<span>기록</span>
		</div>
		<div class="detail_profile_container_menu prohibit" onclick="profile_prohibit(this)">
			<span>차단</span>
		</div> -->
	</div>
	<div class="detail_profile_container_body">
		<div class="scroll_box">
			<div class="scroll_box_inner">
				<div class="detail_profile_content favorite">
				</div>
				<div class="detail_profile_content follower none">
				</div>
				<div class="detail_profile_content following none">
				</div>
				<div class="detail_profile_content history none">
				</div>
				<div class="detail_profile_content prohibit none">
				</div>
			</div>				
		</div>
	</div>
</div>
<div class="profile_button_container">
	<div class="container_side_button_section top" onclick="expand_profile()">
		<i class="material-symbols-outlined">arrow_right</i>
	</div>
	<div class="container_side_button_section bottom" onclick="shrink_profile()">
		<i class="material-symbols-outlined">arrow_left</i>
	</div>
	<div class="container_side_button_section left none" onclick="shrink_profile()">
		<i class="material-symbols-outlined">arrow_left</i>
	</div>
	<div class="container_side_button_section right none" onclick="expand_profile()">
		<i class="material-symbols-outlined">arrow_right</i>
	</div>
</div>