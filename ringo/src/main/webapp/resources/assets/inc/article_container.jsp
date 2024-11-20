<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="article_container_menu">	
	<div class="article_container_menu_around" onclick="main_show(this,'around')">
		<i class="fa-solid fa-circle-dot"></i>
		<span>어라운드</span>
	</div>
	<div class="article_container_menu_circle" onclick="main_show(this,'circle')">
		<i class="fa-solid fa-circle-notch"></i>
		<span>서클</span>
	</div>
	<div class="article_container_menu_timeline" onclick="main_show(this,'timeline')">
		<i class="fa-solid fa-timeline"></i>
		<span>타임라인</span>
	</div>
	<div class="article_container_menu_pool" onclick="main_show(this,'pool')">
		<i class="fa-solid fa-water"></i>
		<span>풀</span>
	</div>
	<div class="article_container_menu_link" onclick="main_show(this,'link')">
		<i class="fa-solid fa-link"></i>
		<span>링크</span>
	</div>
	<div class="article_container_menu_messenger" onclick="main_messenger(this)">
		<i class="fa-solid fa-message"></i>
		<span>메신저</span>
	</div>
</div>

<div class="container_contents">
	<!-- around start -->
	<div class="main_card main_around none">
		<div class="main_card_title">
			<i class="fa-solid fa-circle-dot"></i>
			어라운드
			<div class="input_wrapper">
			  <i class="input_icon fa-solid fa-magnifying-glass"></i>
			  <input type="text"></input>
			</div>
		</div>
		<div class="main_card_body">
			<div class="scroll_box">
				<div class="scroll_box_inner">
				</div>
			</div>
		</div>
	</div>
	<!-- around end -->
	
	<!-- circle start -->
	<div class="main_card main_circle none">
		<div class="main_card_title">
			<i class="fa-solid fa-circle-notch"></i>
			서클
			<div class="input_wrapper">
			  <i class="input_icon fa-solid fa-magnifying-glass"></i>
			  <input type="text"></input>
			</div>
		</div>
		<div class="main_card_body">
			<div class="scroll_box">
				<div class="scroll_box_inner" >
					<!-- card start -->
					<div class="card">
						<div class="card_header">
							<div class="card_header_img">
								<img
								src="/img/profiles/${user_thumbnail}"
								style="width: 40px; height: 40px; border-radius: 50%; shrink:0; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);"
								/>
							</div>
							<div class="card_header_name">
								작성자
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart" style="font-size: 20px;"></i>
									<span>1,430</span>
								</div>
								<div class="card_header_tool">
									<i class="fa-solid fa-bars" style="font-size: 20px;"></i>
								</div>
							</div>
						</div>
						<div class="card_body">
							<div class="card_body_content">
								<div class="scroll_box">
									<div class="scroll_box_inner">
	프로필 우측 더보기 누르면 확장, 메세지는 꺼지고 우측으로 밀림
	매칭 활성화 시 메신저,프로필 꺼짐
	본인 프로필에서 우측 더보기 누르면 확장해서 남이 보는 내 프로필 확인가능, 수정기능제공
	
	프로필에는 각자의 정보와 함께 가입한 풀도 제공, 팔로잉 팔로워 제공
	
	본인 프로필 하단 : 내가 방문한 사람, 나를 방문한 사람 -> 설정에서 비공개 가능
	
	내 페이지에서는 프로필에 내 프로필 출력, 상단바에 써클/ 풀/ 타임라인/ 매칭/ 메신저
	
	남의 페이지에서는 프로필에 남의 프로필 출력, 상단바에 ~의 써클/ 홈/ 메신저
	
	상단바 풀 누르면 프로필 없어지고 가입한 풀 목록, 추천 풀, 풀 검색기능 출력, 상단바 유지
	풀 들어가면 프로필 자리에 풀 정보, 게시판 등등 출력되고 상단 메뉴는 홈, 메신저 출력
	
	상단 네비바는 결제, 문의, 마이페이지, 계정설정 등 목록 배치
	좌측 네비바는 써클 풀 타임라인 매칭 메신저 등등 유틸 기능들 배치
	
	메신저 메뉴 : 최상단 즐겨찾기, 하단에는 팔로잉 중 로그인한사람, 최근에 로그인한사람 순 정렬, 하단에는 내가 방문한 사람, 그 하단에는 나를 방문한사람 배치
	전부다 열고닫을수 있음
	
	사람 누르면 그사람 써클로 이동
	
	게시글에 태그 가능, 타임라인에서 태그로 써클 게시글 검색가능
	
	개인설정에서 써클 비공개, 가입한 풀 비공개, 내가 방문해도 기록 안남기기, 팔로워 비공개 가능 
	
	미디어쿼리 작동 논리 : 아티클 컨테이너 요소가 특정 사이즈 미만이 되면 불필요한 요소 닫기
	닫아도 되는 요소는 알림창, 프로필창 등 에 클래스를 부여하여 특정, 고정 버튼 누르면 클래스 삭제, 직접 닫으면 다시 클래스 부여
									</div>
								</div>
							</div>
							<div class="card_body_tags">
								#태그
							</div>
						</div>
						<div class="card_foot">
							<div class="card_foot_comment_input">
								<textarea></textarea>
								<button type="button">
									<i class="fa-solid fa-paper-plane"></i>
								</button>
							</div>
							<div class="card_foot_comment">
								<div class="scroll_box">
									<div class="scroll_box_inner">
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">풀,링크,메신저 채팅방,풀 프로필,검색창,정보수정,가입절차</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">내용</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
										<div class="card_comment">
											<div class="card_comment_thumbnail">
												<img
												src="/img/profiles/${user_thumbnail}"
												style="width: 40px; height: 40px; border-radius: 30%;"
												/>
											</div>
											<div class="card_comment_body">
												<div class="card_comment_name">작성자</div>
												<div class="card_comment_content">내용</div>
												<div class="card_comment_time">
													<i class="fa-regular fa-thumbs-up"></i>36
													<i class="fa-regular fa-thumbs-down"></i>12
													<span>작성시간</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- card end -->
					<!-- card start -->
					<div class="card">
						<div class="card_header">
							<div class="card_header_img">
								<img
								src="/img/profiles/${user_thumbnail}"
								style="width: 40px; height: 40px; border-radius: 50%; shrink:0; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);"
								/>
							</div>
							<div class="card_header_name">
								작성자
							</div>
							<div class="card_header_tools">
								<div class="card_header_tool">
									<i class="fa-regular fa-heart" style="font-size: 20px;"></i>
									<span>1,430</span>
								</div>
								<div class="card_header_tool">
									<i class="fa-solid fa-bars" style="font-size: 20px;"></i>
								</div>
							</div>
						</div>
						<div class="card_body">
							<div class="card_body_content">
								<div class="scroll_box">
									<div class="scroll_box_inner" style="justify-content: flex-start; align-items: flex-start; padding:0px 10px;">내용</div>
								</div>
							</div>
							<div class="card_body_tags">
								#태그
							</div>
						</div>
						<div class="card_foot">
							<div class="card_foot_comment_input">
								<textarea></textarea>
								<button type="button">
									<i class="fa-solid fa-paper-plane"></i>
								</button>
							</div>
							<div class="card_foot_comment">
								<div class="scroll_box">
									<div class="scroll_box_inner">
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- card end -->
				</div>
			</div>
		</div>
	</div>
	<!-- circle end -->
	
	<!-- timeline start -->
	<div class="main_card main_timeline none">
		<div class="main_card_title">
			<i class="fa-solid fa-timeline"></i>
			타임라인
			<div class="input_wrapper">
			  <i class="input_icon fa-solid fa-magnifying-glass"></i>
			  <input type="text"></input>
			</div>
		</div>
		<div class="main_card_body">
			<div class="scroll_box">
				<div class="scroll_box_inner">
				</div>
			</div>
		</div>
	</div>
	<!-- timeline end -->
	
	<!-- pool start -->
	<div class="main_card main_pool none">
		<div class="main_card_title">
			<i class="fa-solid fa-water"></i>
			풀
			<div class="input_wrapper">
			  <i class="input_icon fa-solid fa-magnifying-glass"></i>
			  <input type="text"></input>
			</div>
		</div>
		<div class="main_card_body pool_main_container">
			<div class="scroll_box">
				<div class="pool_menu">
					<div class="menu_tag" onclick="col_toggle($(this).next('.favorite_pools'),$(this).find('i').last())">
						<i class="fa-solid fa-bookmark"></i>
						<span>즐겨찾기</span>
						<i class="fas fa-chevron-circle-up"></i>
					</div>
					<div class="favorite_pools expanded">
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는풀즐겨찾는풀즐</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
						<div class="favorite_pool deletable" data-value="" onclick="delete_card(this)">
							<img src=""></img>
							<div>즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀즐겨찾는풀</div>
							<i class="fa-solid fa-circle-xmark"></i>
						</div>
					</div>
				</div>
				<div class="scroll_box_inner">
					<div class="pool_content">
					
						<div class="menu_tag" onclick="col_toggle($(this).next('.pools_container'),$(this).find('i').last())">
							<i class="fa-solid fa-water"></i>
							<span>추천 풀</span>
							<i class="fas fa-chevron-circle-up"></i>
						</div>
						<div class="pools_container expanded">
							<div class="pool_card">
								<div class="pool_card_thumbnail">
									<img src=""></img>
									<div class="pool_card_button">
										<i class="fa-regular fa-bookmark"></i>즐겨찾기
									</div>
								</div>
								<div class="pool_card_body">
									<div class="pool_card_name">풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_tags">
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
									</div>
								</div>
							</div>
							<div class="pool_card">
								<div class="pool_card_thumbnail">
									<img src=""></img>
									<div class="pool_card_button">
										<i class="fa-regular fa-bookmark"></i>즐겨찾기
									</div>
								</div>
								<div class="pool_card_body">
									<div class="pool_card_name">풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_tags">
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
						
						<div class="menu_tag" onclick="col_toggle($(this).next('.pools_container'),$(this).find('i').last())">
							<i class="fa-solid fa-water"></i>
							<span>근처 풀</span>
							<i class="fas fa-chevron-circle-up"></i>
						</div>
						<div class="pools_container expanded">
							<div class="pool_card">
								<div class="pool_card_thumbnail">
									<img src=""></img>
									<div class="pool_card_button">
										<i class="fa-regular fa-bookmark"></i>즐겨찾기
									</div>
								</div>
								<div class="pool_card_body">
									<div class="pool_card_name">풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_tags">
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
						
						<div class="menu_tag" onclick="col_toggle($(this).next('.pools_container'),$(this).find('i').last())">
							<i class="fa-solid fa-water"></i>
							<span>가입한 풀</span>
							<i class="fas fa-chevron-circle-up"></i>
						</div>
						<div class="pools_container expanded">
							<div class="pool_card">
								<div class="pool_card_thumbnail">
									<img src=""></img>
									<div class="pool_card_button">
										<i class="fa-regular fa-bookmark"></i>즐겨찾기
									</div>
								</div>
								<div class="pool_card_body">
									<div class="pool_card_name">풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_message">새로운 게시글새로운 게시글새로운 게시글새로운 게시글풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름풀이름</div>
									<div class="pool_card_tags">
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
										<div class="tag_card">#축구</div>
									</div>
								</div>
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
							<div class="pool_card">
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		
		
		
	</div>
	<!-- pool end -->
	
	<!-- link start -->
	<div class="main_card main_link none">
		<div class="main_card_title">
			<i class="fa-solid fa-link"></i>
			링크
			<div class="input_wrapper">
			  <i class="input_icon fa-solid fa-magnifying-glass"></i>
			  <input type="text"></input>
			</div>
		</div>
		<div class="main_card_body">
			<div class="scroll_box">
				<div class="scroll_box_inner">
				</div>
			</div>
		</div>
	</div>
	<!-- link end -->
	
	<!-- messenger start -->
	<div class="main_messenger shrinked">
		<div class="container_side_button_section messenger_button" onclick="main_messenger_menu(this)">
			<i class="fas fa-chevron-circle-left"></i>
		</div>
		<div class="main_messenger_menu scroll_box shrinked">
			<div class="scroll_box_inner">
				<div class="card_person">
					<div class="card_person_thumbnail">
						<img
						src="/img/profiles/${user_thumbnail}"
						style="width: 40px; height: 40px; border-radius: 30%;"
						/>
					</div>
					<div class="card_person_info">
						<div class="card_person_info_name"></div>
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
		<div class="main_messenger_body scroll_box">
			<div class="messenger_navbar">
				<div class="messenger_navbar_back">
					<i class="fa-solid fa-arrow-left"></i>
				</div>
				<div class="messenger_navbar_name">name</div>
				<div class="messenger_navbar_menu">
					<i class="fa-solid fa-bars"></i>
				</div>
			</div>
			<div class="messenger_content">
				<div class="message_box_received">
					<div class="message_sender_thumbnail">
						<img
						src="/img/profiles/${user_thumbnail}"
						style="width: 40px; height: 40px; border-radius: 30%;"
						/>
					</div>
					<div class="message_info">	
						<div class="message_sender_name">
						sender_name
						</div>
						<div class="message_body">
							<div class="message_content">본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문마지막</div>
							<div class="message_time">
							20:00
							</div>
						</div>
					</div>
					<span class="message_unread_count">1</span>
				</div>
				<div class="message_box_send">
					<span class="message_unread_count">1</span>
					<div class="message_body">
						<div class="message_content">본문</div>
						<div class="message_time">
						20:00
						</div>
					</div>
				</div>
				
			</div>
			<div class="messenger_input">
				<textarea></textarea>
				<div class="messenger_input_tools">
					<ul>
						<li>
							<i class="fa-regular fa-face-smile"></i>
						</li>
						<li>
							<i class="fa-solid fa-paperclip"></i>
						</li>
						<li>
							<button type="button">
								<i class="fa-solid fa-paper-plane"></i>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- messenger end -->
</div>