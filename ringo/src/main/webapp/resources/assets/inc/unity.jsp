<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_card main_unity none">
	<div class="main_card_title">
		<div class="unity_home_button" onclick="unity_home()" style="cursor:pointer;">
			<i class="ringo unity"></i>
			<span>유니티</span>
		</div>
		<div class="title_button">
			<i class="fa-solid fa-house" onclick="unity_home()" style="cursor:pointer;"></i>
			<div class="input_wrapper">
				<i class="input_icon fa-solid fa-magnifying-glass"></i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	<div class="main_card_body unity_main_container">
	
	
		<div class="scroll_box unity_unity none">
			<div class="scroll_box_inner">
			</div>
		</div>
	
	
		<div class="scroll_box unity_home">
			<div class="unity_menu">
				<div class="menu_tag" onclick="col_toggle($(this).next('.favorite_unities'),this)">
					<span>즐겨찾기</span>
					<i class="fas fa-chevron-circle-up"></i>
				</div>
				<div class="favorite_unities expanded">
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/1.jpg"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
					<div class="favorite_unity deletable" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
						<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
						<div>즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티즐겨찾는유니티</div>
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
				</div>
			</div>
			<div class="scroll_box_inner">
				<div class="unity_content">
					<div class="menu_tag" onclick="col_toggle($(this).next('.unities_container'),this)">
						<span>추천 유니티</span>
						<i class="fas fa-chevron-circle-up"></i>
					</div>
					<div class="unities_container expanded">
						<div class="unity_card" data-unity_code="asd" onclick="enter_unity($(this).attr('data-unity_code'))">
							<div class="unity_card_thumbnail">
								<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
							</div>
							<div class="unity_card_body">
								<div class="unity_card_name">asdasd름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_tags">
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
								</div>
							</div>
						</div>
						<div class="unity_card" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
							<div class="unity_card_thumbnail">
								<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
							</div>
							<div class="unity_card_body">
								<div class="unity_card_name">유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_tags">
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
								</div>
							</div>
						</div>
					</div>	
					
					<div class="menu_tag" onclick="col_toggle($(this).next('.unities_container'),this)">
						<span>근처 유니티</span>
						<i class="fas fa-chevron-circle-up"></i>
					</div>
					<div class="unities_container expanded">
						<div class="unity_card" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
							<div class="unity_card_thumbnail">
								<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
							</div>
							<div class="unity_card_body">
								<div class="unity_card_name">유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_tags">
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
								</div>
							</div>
						</div>
					</div>	
					
					<div class="menu_tag" onclick="col_toggle($(this).next('.unities_container'),this)">
						<span>가입한 유니티</span>
						<i class="fas fa-chevron-circle-up"></i>
					</div>
					<div class="unities_container expanded">
						<div class="unity_card" data-unity_code="" onclick="enter_unity($(this).attr('data-unity_code'))">
							<div class="unity_card_thumbnail">
								<img src="/img/unity/thumbnail/${unity_thumbnail_path}"></img>
							</div>
							<div class="unity_card_body">
								<div class="unity_card_name">유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름유니티이름</div>
								<div class="unity_card_tags">
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
									<div class="tag_card">#축구</div>
								</div>
							</div>
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
						<div class="unity_card">
						</div>
					</div>	
				</div>
			</div>
		</div>
		
		
	</div>
</div>
