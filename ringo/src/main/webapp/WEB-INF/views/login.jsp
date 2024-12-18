<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ include file="/resources/assets/inc/join_modal.jsp" %>
<html>
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ringo - Your Lingo Partner</title>
	<link rel="icon" href="/resources/assets/img/favicon.png" type="image/png">
	<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>

<div class="login_container">

	<div class="login_img_container">
		<div class="login_img_section">
			<img src="/resources/assets/img/back.webp">
		</div>
	</div>
	<div class="login_section">
		<div class="login_inputs">
			<div class="input_cell">
				<div class="input_name">
					아이디
				</div>
				<div class="input_value">
					<input type="text" name="user_id" onkeydown="if(event.key === 'Enter'){logIn();}"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					비밀번호
				</div>
				<div class="input_value">
					<input type="password" name="user_pw" onkeydown="if(event.key === 'Enter'){logIn();}"/>
				</div>
			</div>
			<input class="custom_button" type="submit" name="submit" value="로그인" onclick="logIn()"/>
			<button class="custom_button modal_button" type="button" onclick="showing('#join'); toggle_card('#join',1,0);">회원가입</button>
			<button class="custom_button" type="button">정보찾기</button>
			
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
