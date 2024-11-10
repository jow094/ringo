<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="${pageContext.request.contextPath }/resources/assets/js/navbar.js"></script>
<script src="${pageContext.request.contextPath }/resources/assets/js/search.js"></script>
		  <!-- Navbar Header -->
          <nav class="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom" style="position: relative; background-color: rgba(0,0,0,0.8)">
           	<!-- 알람 확장 -->
           	
           	<%
			    String currentURI = request.getRequestURI(); // 현재 URL 가져오기
			%>
			
			<% if (!currentURI.contains("main")) { %>
			    <%-- <%@ include file="/resources/assets/inc/messenger.jsp" %> --%>
			<% } %>
			
			<% if (!currentURI.contains("main")) { %>
			    <%-- <%@ include file="/resources/assets/inc/calendar.jsp" %> --%>
			<% } %>
			
           	<div id="extended_navbar">
	           	<div id="extended_navbar_inner">
	           	</div>
           	</div>
           	<!-- 알람 확장 -->
            <div class="container-fluid" >
              <!-- 검색창 -->
              <nav class="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
				<div id="search_form" class="input-group" style="position: relative; padding: 0px !importatn; margin:0px !important; width:600px !important;">
					<div class="input-group-prepend">
						<button type="submit" class="btn btn-search pe-1">
							<i class="fa fa-search search-icon"></i>
						</button>
					</div>
						<input
						type="text"
						placeholder="Search ..."
						class="form-control"
						id="searchInput"
						oninput="search(this.value)"
						/>
					<div id="search_form_extended">
						<ul id="search_notify" style="font-size: 12px;">
							<li>두글자 이상의 검색어를 입력 해주세요.</li>
						</ul>
						<ul id="search_incorrect" style="display:none; font-size: 12px;">
							<li>올바른 검색어를 입력 해주세요.</li>
						</ul>
						<ul id="search_history" style="font-size: 12px;">
						</ul>
						<ul id="search_employees">
						</ul>
						<ul id="search_null" style="font-size: 12px; display:none;">
							<li></li>
						</ul>
					</div>
				</div>
              </nav>
              
              <i class="fa-regular fa-calendar-days"></i><i class="fa-brands fa-signal-messenger"></i>
              <!-- 검색창 -->
              
			  <!-- 드롭다운 메뉴들 -->
              <ul class="navbar-nav topbar-nav ms-md-auto align-items-center">
              	<!-- 아이콘1 -->
                <li style="margin-right:30px;" id="to_home" class="nav-item topbar-icon dropdown hidden-caret">
                 	<button type="button" style="border: none !important;">
                 		<a href='/main/home'>
                 			<i style="color:white; font-size:20px;" class="fa-solid fa-house"></i>
                 		</a>
					</button>
                </li>
                <!-- 아이콘1 -->
              	<!-- 아이콘1 -->
                <li style="margin-right:30px;" id="extend_calendar" class="nav-item topbar-icon dropdown hidden-caret">
                 	<button type="button" style="border: none !important;">
                 		<i style="color:white; font-size:20px;" class="fa-solid fa-calendar"></i>
					</button>
                </li>
                <!-- 아이콘1 -->
                
                <!-- 아이콘2 -->
                 <li style="margin-right:30px;" id="extend_messenger" class="nav-item topbar-icon dropdown hidden-caret">
                 	<button type="button" style="border: none !important;">
                 		<i id="alarm_message" style="color:white; font-size:20px;" class="fa-solid fa-comments"></i>
					</button>
                    <span id = "alarm_message_badge" class="badge"></span>
                </li>
                <!-- 아이콘2 -->
                
                <!-- 아이콘3 -->
                <li style="margin-right:30px;" id="extend_workflowAlarm" class="nav-item topbar-icon dropdown hidden-caret">
                    <button type="button" style="border: none !important;">
                    	<i id="alarm_workflow" style="color:white; font-size:20px;" class="fa-solid fa-bell"></i>
					</button>
                    <span id = "alarm_workflow_badge" class="badge"></span>
                </li>
                <!-- 아이콘3 -->
                
				<!-- 개인프로필 -->
                <li class="nav-item topbar-user dropdown hidden-caret">
                  <a
                    class="dropdown-toggle profile-pic"
                    data-bs-toggle="dropdown"
                    href="#"
                    aria-expanded="false"
                  >
                    <div class="avatar-sm">
                      <img
                        src="${pageContext.request.contextPath }/resources/assets/img/profile.jpg"
                        alt="..."
                        class="avatar-img rounded-circle"
                      />
                    </div>
                    <span class="profile-username" style="color:white;">
                      <span class="op-7">안녕하세요, </span>
                      <span class="fw-bold">${emp_name}</span>
                      <span class="op-7"> 님!</span>
                    </span>
                  </a>
                  <ul class="dropdown-menu dropdown-user animated fadeIn">
                    <div class="dropdown-user-scroll scrollbar-outer">
                      <li>
                        <div class="user-box">
                          <div class="avatar-lg">
                            <img
                              src="${pageContext.request.contextPath }/resources/assets/img/profile.jpg"
                              alt="image profile"
                              class="avatar-img rounded"
                            />
                          </div>
                          <div class="u-text">
                            <h4>Hizrian</h4>
                            <p class="text-muted">hello@example.com</p>
                            <a
                              href="profile.html"
                              class="btn btn-xs btn-secondary btn-sm"
                              >View Profile</a
                            >
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">My Profile</a>
                        <a class="dropdown-item" href="#">My Balance</a>
                        <a class="dropdown-item" href="#">Inbox</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Account Setting</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Logout</a>
                      </li>
                    </div>
                  </ul>
                </li>
                <!-- 개인프로필 -->
                <!-- 아이콘1 -->
                <li style="margin-left:20px; margin-right:5px;" id="log_out" class="nav-item topbar-icon dropdown hidden-caret">
                 	<a href="/main/logout" method="POST">
	                 	<button type="button" style="border: none !important;">
	                 		<i style="color:white; font-size:20px;" class="fa-solid fa-circle-xmark"></i>
						</button>
					</a>
					
                </li>
                <!-- 아이콘1 -->
                
              </ul>
              <!-- 드롭다운 메뉴들 -->
              	
            </div>
          </nav>
          <!-- End Navbar -->