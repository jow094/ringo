<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<div class="container_side_button_section alarm_button" onclick="alarm_container(this)">
	<i class="fas fa-chevron-circle-right"></i>
</div>

<div class="alarm_container">
	<div class="scroll_box">
		<div class="scroll_box_inner">
			<div class="card_alarm">
				<div class="card_alarm_thumbnail">
					<img
					src="/img/profiles/${user_thumbnail}"
					style="width: 40px; height: 40px; border-radius: 30%;"
					/>
				</div>
				<div class="card_alarm_info">
					<div class="card_alarm_info_title"></div>
					<div class="card_alarm_info_content"></div>
					<div class="card_alarm_info_time"></div>
				</div>
			</div>
		</div>
	</div>
</div>