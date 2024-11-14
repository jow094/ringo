<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>

<div class="login_container">
	<div class="box box-row"></div>
	<div class="box box-row-400 login_section">
		<div class="login_banner">
		
		
		</div>
		<div class="login_inputs">
			<form action="/main/login" method="POST">
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
				<button class="custom_button modal_button" type="button" onclick="showing('.join_modal')">회원가입</button>
				<button class="custom_button" type="button">정보찾기</button>
			</form>
			
				<div class="sns_login">
					<a href="/main/join">
						<button class="custom_button" type="button">
							<i class="fa-brands fa-google" style="margin-right:16px;"></i>
							Google 계정으로 로그인
						</button>
					</a>
					<a href="/main/find">
						<button class="custom_button" type="button">
							<i class="fa-brands fa-kaggle" style="margin-right:20px;"></i>
							kakao 계정으로 로그인
						</button>
					</a>
				</div>
		</div>
	</div>
</div>




</body>
</html>
