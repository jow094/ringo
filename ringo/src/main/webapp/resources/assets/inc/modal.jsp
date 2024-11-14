<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="modal join_modal none">
    <div class="modal_content">
    	<div class="modal_head">
    		<button class="modal_close_button" type="button" onclick="hiding('.modal')">
    		<i class="fa-solid fa-xmark"></i>
    		</button>
        </div>
        <div class="modal_body">
        	<div class="scroll_box" style="height:calc(100% - 20px); flex-direction: column;">
        		<div class="cards_header">	
					<div class="cards_header_menu" onclick="toggle_cards(this,'.cards.1')">
						<span>1</span>
					</div>
					<div class="cards_header_menu" onclick="toggle_cards(this,'.cards.2')">
						<span>2</span>
					</div>
					<div class="cards_header_menu" onclick="toggle_cards(this,'.cards.3')">
						<span>3</span>
					</div>
					<div class="cards_header_menu" onclick="toggle_cards(this,'.cards.4')">
						<span>4</span>
					</div>
					<div class="cards_header_menu" onclick="toggle_cards(this,'.cards.5')">
						<span>5</span>
					</div>
				</div>
	        	<div class="cards_container">
	        		<div class="cards 1 active">1</div>
					<div class="cards 2" >2</div>
					<div class="cards 3" >3</div>
					<div class="cards 4" >4</div>
					<div class="cards 5" >5</div>
	        	</div>
        	</div>
        </div>
    </div>
</div>