<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div class="modal none">
    <div class="modal_content">
    	<div class="modal_head">
    		<div class="modal_title">
    			<div class="modal_icon">
	    			<i class="fa-solid fa-user"></i>
    			</div>
    			<div class="modal_name">
	    			제목
    			</div>
    		</div>
    		<button class="modal_close_button" type="button" onclick="hiding('.modal'); toggle_card('.cards_container',1,0);">
    			<i class="fa-solid fa-xmark"></i>
    		</button>
        </div>
        <div class="modal_body">
        	<div class="cards_header">	
				<div class="cards_header_menu finished" onclick="toggle_card('.cards_container',1,0)">
					<span>1</span>
				</div>
				<div class="cards_header_menu unfinished" onclick="toggle_card('.cards_container',2,0)">
					<span>2</span>
				</div>
				<div class="cards_header_menu unfinished" onclick="toggle_card('.cards_container',3,0)">
					<span>3</span>
				</div>
				<div class="cards_header_menu unfinished" onclick="toggle_card('.cards_container',4,0)">
					<span>4</span>
				</div>
				<div class="cards_header_menu unfinished" onclick="toggle_card('.cards_container',5,0)">
					<span>5</span>
				</div>
			</div>
        	<div class="scroll_box" style="height:calc(100% - 20px); flex-direction: column;">
	        	<div class="cards_container">
	        		<div class="cards_container_button prev shrinking" onclick="toggle_card('.cards_container',0,-1)">
	        			<i class="fa-solid fa-chevron-left"></i>
	        		 </div>
	        		<div class="cards_container_content">
		        		<div class="cards card_1">1</div>
						<div class="cards card_2" >2</div>
						<div class="cards card_3" >3</div>
						<div class="cards card_4" >4</div>
						<div class="cards card_5" >5</div>
					</div>
	        		<div class="cards_container_button next expanding" onclick="toggle_card('.cards_container',0,1)">
	        			<i class="fa-solid fa-chevron-right"></i>
	        		</div>
	        	</div>
        	</div>
        	<div class="cards_footer">	
				<div class="cards_footer_button" onclick="">
					<span>가입하기</span>
				</div>
				<div class="cards_footer_button" onclick="hiding('.modal'); toggle_card('.cards_container',1,0);">
					<span>닫기</span>
				</div>
			</div>
        </div>
    </div>
</div>