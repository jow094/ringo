<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_card main_link none">
	<div class="main_card_title">
		<i class="ringo link"></i>
		<span>링크</span>
		<div class="title_button">
			<div class="input_wrapper">
			  <i class="input_icon fa-solid fa-magnifying-glass"></i>
			  <input type="text"></input>
			</div>
		</div>
	</div>
	<div class="main_card_body">
			<div class="link_card_container">
        		<div class="cards_container_button prev shrinked" onclick="prev_link_card(this)">
        			<i class="fa-solid fa-chevron-left"></i>
   		 		</div>
   		 		
   		 		
   		 		
   		 			<div class="card link_card">
						<div class="card_body">
							<div class="card_body_content">
								<div class="image_container">
									<div class="image_main">
										<img src="/img/profiles/${user_thumbnail_path}"/>
									</div>
									<div class="image_queue">
										<div class="image_queue_belt">
											<div class="image_waiting">
												<img src="/img/profiles/${user_thumbnail_path}"/>
											</div>
											<div class="image_waiting">
												<img src="/img/profiles/${user_thumbnail_path}"/>
											</div>
											<div class="image_waiting">
												<img src="/img/profiles/${user_thumbnail_path}"/>
											</div>
											<div class="image_waiting">
												<img src="/img/profiles/${user_thumbnail_path}"/>
											</div>
											<div class="image_waiting">
												<img src="/img/profiles/${user_thumbnail_path}"/>
											</div>
											<div class="image_waiting">
												<img src="/img/profiles/${user_thumbnail_path}"/>
											</div>
										</div>
									</div>
								</div>
								<div class="link_info">
									<div class="scroll_x">
									</div>
								</div>
							</div>
							<div class="card_body_tags">
								#자주 사용하는 태그
								<div class="tag_card">#asd</div>
							</div>
							<div class="card_body_buttons">
								<div class="button">
									<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
								</div>
								<div class="button">
									<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
								</div>
								<div class="button">
									<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
								</div>
								<div class="button">
									<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
								</div>
							</div>
						</div>
					</div>
   		 		
        		 
        		 
				<div class="cards_container_button next expanded" onclick="next_link_card(this)">
        			<i class="fa-solid fa-chevron-right"></i>
        		</div>
        	</div>
        	<div class="link_card_container_footer">
        	
        	
        			<div class="small_link_card active" data-user_code="asd" onclick="toggle_link_card(this)">
						<div class="small_link_card_thumbnail">
							<img src=""/>
						</div>
						<div class="small_link_card_info">
						조우영
						</div>
						<div class="small_link_card_info">
						한국, 31세
						</div>
					</div>
					
					<div class="small_link_card" data-user_code="asd" onclick="toggle_link_card(this)">
						<div class="small_link_card_thumbnail">
							<img src=""/>
						</div>
						<div class="small_link_card_info">
						조우영
						</div>
						<div class="small_link_card_info">
						한국, 31세
						</div>
					</div>
					
					
					<div class="small_link_card" data-user_code="a123" onclick="toggle_link_card(this)">
						<div class="small_link_card_thumbnail">
							<img src="/img/profiles/${user_thumbnail_path}"/>
						</div>
						<div class="small_link_card_info">
						</div>
						<div class="small_link_card_buttons">
							<div class="button">
								<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
							</div>
							<div class="button">
								<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
							</div>
							<div class="button">
								<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
							</div>
							<div class="button">
								<i class="fa-solid fa-pen-to-square" onclick="write_circle()"></i>
							</div>
						</div>
					</div>
        	
        	
        	
        	</div>
	</div>
</div>
