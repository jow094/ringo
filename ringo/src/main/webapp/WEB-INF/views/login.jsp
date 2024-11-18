<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ include file="/resources/assets/inc/join_modal.jsp" %>
<html>
<head>
<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>

<div class="login_container">

	<div class="login_img_container">
		<div class="login_img_section">
			<img src="/resources/assets/img/">
		</div>
	</div>
	<div class="login_section">
		<div class="login_banner">
			<img src="/resources/assets/img/">
		</div>
		<div class="login_inputs">
			<form action="/member/login" method="POST">
				<div class="input_cell">
					<div class="input_name">
						아이디
					</div>
					<div class="input_value">
						<input type="text" name="user_id"/>
					</div>
				</div>
				<div class="input_cell">
					<div class="input_name">
						비밀번호
					</div>
					<div class="input_value">
						<input type="password" name="user_pw"/>
					</div>
				</div>
				<input class="custom_button" type="submit" name="submit" value="로그인"/>
				<button class="custom_button modal_button" type="button" onclick="showing('.join_modal'); toggle_card('.join_modal',1,0);">회원가입</button>
				<button class="custom_button" type="button">정보찾기</button>
			</form>
			
			<div class="sns_login">
				<button class="custom_button" type="button">
					<i class="fa-brands fa-google" style="margin-right:16px;"></i>
					Google 계정으로 로그인
				</button>
				<button class="custom_button" type="button">
					<i class="fa-brands fa-kaggle" style="margin-right:20px;"></i>
					kakao 계정으로 로그인
				</button>
			</div>
		</div>
	</div>
</div>




</body>
</html>
