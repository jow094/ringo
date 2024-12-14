<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="image_modal" class="modal none">
    <div class="image_modal_content modal_content image_container">
    	<div class="image_main">
    		<div class="image_button left" onclick="prev_img(this)">
    			<i class="material-symbols-outlined">arrow_left</i>
    		</div>
    		<div class="image_button right" onclick="next_img(this)">
    			<i class="material-symbols-outlined">arrow_right</i>
    		</div>
    	</div>
    	<div class="image_queue">
    		<div class="image_queue_belt">
    		</div>
    	</div>
    </div>
</div>