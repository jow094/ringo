<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/assets/css/ringo.css" />
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

<nav class="navbar">
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
				${user_thumbnail}
			</li>
			<li>
				<img
				src="/ringo/uploads/kor_kor_1_path_1.jpg"
				style="width: 30px; height: 30px; border-radius: 50%;"
				/>
				<span class="profile-username" style="color:white;">
					<span>안녕하세요, </span>
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
