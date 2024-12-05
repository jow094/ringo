<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_card main_circle none">
	<div class="main_card_title">
		<i class="fa-solid fa-circle-notch"></i>
		<span>서클</span>
		<div class="title_button">
			<i class="material-symbols-outlined" onclick="col_toggle('.circle_write')">edit_note</i>
			<div class="input_wrapper">
				<i class="material-symbols-outlined">search</i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	<div class="circle_write col_shrinked col_resizable">
		<div class="write_container">
			<div class="card">
				<div class="card_body">
					<div class="card_body_content">
						<div class="scroll_box">
							<textarea class="scroll"></textarea>
						</div>
					</div>
					<div class="card_body_tags">
						#태그<input class="tag_input" type="text" placeholder="태그를 입력하세요." onkeydown="if(event.key === 'Enter'){ add_tag(this); }">
					</div>
					<div class="card_body_buttons">
						<div class="button">
							<i class="material-symbols-outlined" onclick="open_itf(this);">attach_file
								<input type="file" name="" class="none" accept="image/*" onchange="upload_file(this)" multiple>
							</i>
						</div>
						<div class="button">
							<i class="fa-solid fa-check" onclick="submit_circle(this)"></i>
						</div>
					</div>
					<div class="upload_files col_shrinked">
					</div>
				</div>
			</div>
		</div>
		<div class="write_container_button_section col_resize_handle">
			<i class="material-symbols-outlined" >drag_handle</i>
		</div>
	</div>
	
	<div class="main_card_body">
		<div class="scroll_box">
			<div class="scroll_box_inner circle_cards" >
			</div>
		</div>
	</div>
</div>
