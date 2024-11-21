<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="article_container_menu">	
	<div class="article_container_menu_around" data-user_code="${user_code}" onclick="main_show(this,'around'); enter_person(this)">
		<i class="fa-solid fa-circle-dot"></i>
		<span>어라운드</span>
	</div>
	<div class="article_container_menu_circle" data-user_code="${user_code}" onclick="main_show(this,'circle'); enter_person(this)">
		<i class="fa-solid fa-circle-notch"></i>
		<span>서클</span>
	</div>
	<div class="article_container_menu_timeline" data-user_code="${user_code}" onclick="main_show(this,'timeline'); enter_person(this)">
		<i class="fa-solid fa-timeline"></i>
		<span>타임라인</span>
	</div>
	<div class="article_container_menu_unity" data-user_code="${user_code}" onclick="main_show(this,'unity'); check_unity()">
		<i class="ringo unity"></i>
		<span>유니티</span>
	</div>
	<div class="article_container_menu_link" data-user_code="${user_code}" onclick="main_show(this,'link'); enter_person(this)">
		<i class="ringo link"></i>
		<span>링크</span>
	</div>
	<div class="article_container_menu_messenger" data-user_code="${user_code}" onclick="main_messenger(this);">
		<i class="fa-solid fa-message"></i>
		<span>메신저</span>
	</div>
</div>

<div class="container_contents">
	<%@ include file="/resources/assets/inc/around.jsp" %>
	<%@ include file="/resources/assets/inc/circle.jsp" %>
	<%@ include file="/resources/assets/inc/timeline.jsp" %>
	<%@ include file="/resources/assets/inc/unity.jsp" %>
	<%@ include file="/resources/assets/inc/link.jsp" %>
	<%@ include file="/resources/assets/inc/messenger.jsp" %>
</div>