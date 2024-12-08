<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_messenger shrinked">
	<div class="container_side_button_section messenger_button" onclick="main_messenger_menu(this)">
		<i class="material-symbols-outlined">arrow_left</i>
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
			<div class="messenger_navbar_nickname"></div>
			<div class="messenger_navbar_menu">
				<i class="fa-solid fa-bars" onclick="rr_toggle('.messenger_option')"></i>
			</div>
		</div>
		
		<div class="messenger_content_container">
			<div class="messenger_content">
			</div>
			<div class="messenger_option rr_shrinked">
				<div class="messenger_option_toggle_button" onclick="rr_toggle('.messenger_option')"><i class="material-symbols-outlined">arrow_right</i></div>
				<div class="messenger_option_body">
					<div class="buttons">
						<div class="sm_button">
							<i class="material-symbols-outlined">bookmark_add</i>
						</div>
						<div class="sm_button">
							<i class="material-symbols-outlined">bookmark_remove</i>
						</div>
						<div class="sm_button">
							<i class="material-symbols-outlined">notifications_off</i>
						</div>
						<div class="sm_button">
							<i class="material-symbols-outlined">person_add</i>
						</div>
						<div class="sm_button mla">
							<i class="material-symbols-outlined">move_item</i>
						</div>
					</div>
					<div class="inner_box inset">
						<div class="inner_title"><i class="material-symbols-outlined mgr5">group</i>참가자</div>
						<div class="inner_content gap5">
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="messenger_input_roof"></div>
		
		<audio id="audio_preview" style="display:none"></audio>
		
		<div class="messenger_audio col_shrinked">
			<div class="audio_toggle_button" onclick="col_toggle('.messenger_audio'); init_recorder()"><i class="material-symbols-outlined">arrow_drop_down</i></div>
			<div class="audio_section">
				<div class="audio_bar">
					<input type="range" id="audio_bar" value="0" min="0" max="100" step="1"/>
					<div class="record_time">
						<div class="playing_time">0</div>
						<span>초</span>
						<span>/</span>
						<div class="recording_time">0</div>
						<span>초</span>
					</div>
				</div>
				<div class="buttons">
					<div id="record_start" class="sm_button">
						<i class="fa-solid fa-record-vinyl"></i>
					</div>
					<div id="audio_play" class="sm_button none">
						<i class="fa-solid fa-play"></i>
					</div>
					<div id="record_pause" class="sm_button">
						<i class="fa-solid fa-pause"></i>
					</div>
					<div id="audio_pause" class="sm_button none">
						<i class="fa-solid fa-pause"></i>
					</div>
					<div id="record_stop" class="sm_button">
						<i class="fa-solid fa-stop"></i>
					</div>
					<div id="audio_delete" class="sm_button none">
						<i class="fa-solid fa-trash"></i>
					</div>
					<div id="audio_upload" class="sm_button none">
						<i class="fa-solid fa-paper-plane"></i>
					</div>
				</div>
			</div>
		</div>		
		<div class="about_comment col_shrinked">
		</div>
		<div class="messenger_input">
			<textarea id="input_msg_content" onkeydown="if(event.key === 'Enter'){check_submit_msg();}"></textarea>
			<div class="upload_files col_shrinked"></div>
			<div class="messenger_input_tools">
				<div onclick="col_toggle('.messenger_audio'); init_recorder(); cancle_commentary()">
					<i class="material-symbols-outlined na">mic</i>
				</div>
				<div onclick="open_itf(this);">
					<i class="material-symbols-outlined na">attach_file
						<input type="file" name="" class="none" accept="image/*" onchange="upload_file(this)" multiple>
					</i>
				</div>
				<div onclick="check_submit_msg()">
					<i class="fa-solid fa-paper-plane na"></i>
				</div>
			</div>
		</div>
	</div>
	
	
	
</div>
