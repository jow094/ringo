<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>

<div class="login_container">
	<div class="box box-row-7"></div>
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
				<input type="submit" name="submit" value="로그인"/>
				<a href="/main/join" method="GET"><button class="custom_button" type="button">회원가입</button></a>
				<a href="/main/find" method="GET"><button class="custom_button" type="button">정보찾기</button></a>
			</form>
			
				<div class="sns_login">
					<a href="/main/join" method="GET"><button class="custom_button" type="button">Google 계정으로 로그인</button></a>
					<a href="/main/find" method="GET"><button class="custom_button" type="button">kakao 계정으로 로그인</button></a>
				</div>
		</div>
	</div>
</div>




</body>
</html>
