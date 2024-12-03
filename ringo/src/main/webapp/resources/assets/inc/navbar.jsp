<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ include file="/resources/assets/inc/modal.jsp" %>
<script src="https://cdn.jsdelivr.net/npm/sockjs-client"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
<script src="${pageContext.request.contextPath }/resources/assets/js/messenger.js"></script>
<script src="${pageContext.request.contextPath }/resources/assets/js/webSocket.js"></script>
<script src="${pageContext.request.contextPath }/resources/assets/js/method.js"></script>
<script src="${pageContext.request.contextPath }/resources/assets/js/function.js"></script>
<script src="${pageContext.request.contextPath }/resources/assets/js/docReady.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/assets/css/ringo.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/assets/css/modal.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icon-css/css/flag-icon.min.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<meta charset="UTF-8">

<nav class="navbar left_navbar">
		<!-- 드롭다운 메뉴들 -->
		<ul>
			<!-- <li>
				<button type="button">
					<a href='/main/home'>
						<i class="fa-solid fa-house"></i>
					</a>
				</button>
			</li>
			<li>
				<button type="button">
					<i class="fa-solid fa-calendar"></i>
				</button>
			</li>
			<li>
				<button type="button">
					<i class="fa-solid fa-comments"></i>
				</button>
				<span class="nav_badge"></span>
			</li>
			<li>
				<button type="button">
					<i class="fa-solid fa-bell"></i>
				</button>
				<span class="nav_badge"></span>
			</li> -->
		</ul>
		<!-- 드롭다운 메뉴들 -->
</nav>

<nav class="navbar top_navbar">
	<!-- 드롭다운 메뉴들 -->
	<ul>
		<%-- <li>
			<button type="button">
				<a href="/main/home">
					<i class="fa-solid fa-house"></i>
				</a>
			</button>
		</li>
		<li>
			<button type="button">
				<i class="fa-solid fa-calendar"></i>
			</button>
		</li>
		<li>
			<button type="button">
				<i class="fa-solid fa-comments"></i>
			</button>
			<span class="nav_badge"></span>
		</li>
		<li>
			<button type="button">
				<i class="fa-solid fa-bell"></i>
			</button>
			<span class="nav_badge"></span>
		</li> --%>
		<c:if test="${!empty sessionScope.user_fcode}">
			<li>
				<span class="profile-username" style="color:white; font-size:15px;">
					<span>안녕하세요,  </span>
					<span> ${user_nickname} </span>
					<span> 님!</span>
				</span>
			</li>
			<li>
				<form action="/user/logout" method="POST" onclick="logout()">
					<button type="submit">
						<i class="fa-solid fa-xmark"></i>
					</button>
				</form>
			</li>
		</c:if>
	</ul>
	<!-- 드롭다운 메뉴들 -->
</nav>