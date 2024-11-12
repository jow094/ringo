<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/assets/css/ringo.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icon-css/css/flag-icon.min.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<meta charset="UTF-8">

<%
	String currentURL = request.getRequestURL().toString();
	request.setAttribute("currentURL", currentURL);
	System.out.println("currentURL: " + currentURL);
%>

<c:if test="${!currentURL.contains('join')&&!currentURL.contains('login')&&empty sessionScope.user_id}">
	<script type="text/javascript">
   		alert("로그인 정보가 없습니다. 로그인 페이지로 이동합니다.");
        window.location.href = "/main/login";
    </script>
</c:if>

<c:if test="${!currentURL.contains('join')&&!currentURL.contains('login')}">
	<nav class="navbar left_navbar">
		<!-- 드롭다운 메뉴들 -->
		<ul>
			<li>
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
			</li>
		</ul>
		<!-- 드롭다운 메뉴들 -->
	</nav>
	
</c:if>
<nav class="navbar top_navbar">
	<!-- 드롭다운 메뉴들 -->
	<ul>
		<li>
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
		</li>
		<c:if test="${!empty sessionScope.user_id}">
			<li>
				<img
				src="/img/profiles/${user_thumbnail}"
				style="width: 30px; height: 30px; border-radius: 50%; margin-right:20px;"
				/>
				<span class="profile-username" style="color:white; font-size:15px;">
					<span>안녕하세요 , </span>
					<span>${user_name}</span>
					<span> 님!</span>
				</span>
			</li>
			<li>
				<a href="/main/logout" method="POST">
					<button type="button">
						<i class="fa-solid fa-circle-xmark"></i>
					</button>
				</a>
			</li>
		</c:if>
	</ul>
	<!-- 드롭다운 메뉴들 -->
</nav>
