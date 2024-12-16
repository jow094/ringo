<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_card main_link none">
	<div class="main_card_title">
		<i class="material-symbols-outlined">join</i>
		<span>링크</span>
	</div>
	<div class="main_card_body">
			<div class="link_card_container link_cards">
        		<div class="cards_container_button prev shrinked" onclick="prev_link_card(this)">
        			<i class="material-symbols-outlined">arrow_left</i>
   		 		</div>
   		 		
   		 		<div class="card link_card">
					<div class="card_body">
						<div class="card_body_content">
							<div class="link_image">
								<div class="image_container">
									<div class="image_main">
									<div class="image_button none" onclick="prev_img(this)"><i class="material-symbols-outlined">arrow_left</i></div>
										<img src="" id="user_thumbnail_path" onclick="get_user_picture(this)"/>
									<div class="image_button none" onclick="next_img(this)"><i class="material-symbols-outlined">arrow_right</i></div>
									</div>
									<div class="image_queue none">
										<div class="image_queue_belt data" id="user_profile_path">
										</div>
									</div>
								</div>
							</div>
							<div class="link_info">
								<div class="inner_box max_div row gap5 inset inner">
									<div class="inner_box max_div ff">
										<div class="inner_title h20 df">
											<span>기본 정보</span>
										</div>
										<div class="inner_content gap5">
											<div class="info_box">
												<div class="info_title">
													닉네임
												</div>
												<div class="info_value data" id="user_nickname">
												</div>
											</div>
											<div class="info_box">
												<div class="info_title">
													국적
												</div>
												<div class="info_value data" id="user_nation">
												</div>
											</div>
											<div class="info_box">
												<div class="info_title">
													나이
												</div>
												<div class="info_value data" id="user_birth">
												</div>
											</div>
											<div class="info_box">
												<div class="info_title">
													성별
												</div>
												<div class="info_value data" id="user_gender">
												</div>
											</div>
						        			<div class="info_box">
							        			<div class="info_title">
							        				거리
							        			</div>
							        			<div class="info_value data" id="user_distance">
							        			</div>
						        			</div>
											<div class="info_box">
												<div class="info_title">
													모국어
												</div>
												<div class="info_value data lang" id="user_native_lang">
												</div>
											</div>
											<div class="info_box">
												<div class="info_title">
													유창한 언어
												</div>
												<div class="info_value data lang" id="user_fluent_lang">
												</div>
											</div>
											<div class="info_box">
												<div class="info_title">
													학습 언어
												</div>
												<div class="info_value data lang" id="user_learning_lang">
												</div>
											</div>
										</div>
									</div>
									<div class="inner_box max_div ff">
										<div class="inner_title h20 df">
											<span>추가 정보</span>
										</div>
										<div class="inner_content">
											<div class="inner_box mw p5 mgb h120">
												<div class="inner_title">한줄소개</div>
												<div class="inner_content data" id="user_intro"></div>
											</div>
											<div class="inner_box mw p5 mgb h120">
												<div class="inner_title">선호 주제</div>
												<div class="inner_content data" id="user_topic"></div>
											</div>
											<div class="inner_box mw p5 mgb h120">
												<div class="inner_title">학습 목표</div>
												<div class="inner_content data" id="user_objective"></div>
											</div>
											<div class="inner_box mw p5 mgb h120">
												<div class="inner_title">이상형</div>
												<div class="inner_content data" id="user_ideal_partner"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> 
						<div class="card_body_buttons mgt">
							<div id="user_tags" class="card_body_tags data">
								<span>#자주 사용하는 태그</span>
							</div>
							<div class="button link_visit" onclick="visit($(this).data('user_code'),this)">
								 <i class="material-symbols-outlined">location_away</i>
							</div>
						</div>
					</div>
				</div>
        		 
				<div class="cards_container_button next expanded" onclick="next_link_card(this)">
        			<i class="material-symbols-outlined">arrow_right</i>
        		</div>
        	</div>
        	<div class="link_card_container_footer">
        	</div>
	</div>
</div>
