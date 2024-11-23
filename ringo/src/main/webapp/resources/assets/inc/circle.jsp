<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="main_card main_circle none">
	<div class="main_card_title">
		<i class="fa-solid fa-circle-notch"></i>
		<span>서클</span>
		<div class="title_button">
			<i class="fa-solid fa-pen-to-square" onclick="write_circle()" style="cursor:pointer;"></i>
			<div class="input_wrapper">
				<i class="input_icon fa-solid fa-magnifying-glass"></i>
				<input type="text"></input>
			</div>
		</div>
	</div>
	
	<div class="write_container col_shrinked">
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
						<i class="fa-solid fa-link" onclick="open_itf(this); say_upload(this)">
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
	
	<div class="main_card_body">
		<div class="scroll_box">
			<div class="scroll_box_inner circle_cards" >
				<!-- card start -->
				<div class="card">
					<div class="card_header">
						<div class="card_header_img">
							<img
							src="/img/profiles/${user_thumbnail_path}"
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

프로필에는 각자의 정보와 함께 가입한 유니티도 제공, 팔로잉 팔로워 제공

본인 프로필 하단 : 내가 방문한 사람, 나를 방문한 사람 -> 설정에서 비공개 가능

내 페이지에서는 프로필에 내 프로필 출력, 상단바에 써클/ 유니티/ 타임라인/ 매칭/ 메신저

남의 페이지에서는 프로필에 남의 프로필 출력, 상단바에 ~의 써클/ 홈/ 메신저

상단바 유니티 누르면 프로필 없어지고 가입한 유니티 목록, 추천 유니티, 유니티 검색기능 출력, 상단바 유지
유니티 들어가면 프로필 자리에 유니티 정보, 게시판 등등 출력되고 상단 메뉴는 홈, 메신저 출력

상단 네비바는 결제, 문의, 마이페이지, 계정설정 등 목록 배치
좌측 네비바는 써클 유니티 타임라인 매칭 메신저 등등 유틸 기능들 배치

메신저 메뉴 : 최상단 즐겨찾기, 하단에는 팔로잉 중 로그인한사람, 최근에 로그인한사람 순 정렬, 하단에는 내가 방문한 사람, 그 하단에는 나를 방문한사람 배치
전부다 열고닫을수 있음

사람 누르면 그사람 써클로 이동

게시글에 태그 가능, 타임라인에서 태그로 써클 게시글 검색가능

개인설정에서 써클 비공개, 가입한 유니티 비공개, 내가 방문해도 기록 안남기기, 팔로워 비공개 가능 

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
											src="/img/profiles/${user_thumbnail_path}"
										style="width: 40px; height: 40px; border-radius: 30%;"
										/>
										</div>
										<div class="card_comment_body">
											<div class="card_comment_name">작성자</div>
											<div class="card_comment_content">유니티,링크,메신저 채팅방,유니티 프로필,검색창,정보수정,가입절차</div>
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
											src="/img/profiles/${user_thumbnail_path}"
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
											src="/img/profiles/${user_thumbnail_path}"
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
			</div>
		</div>
	</div>
</div>
