<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>

<form action="/join" method="POST">
	아이디<input type="text" name="user_id"/>
	비밀번호<input type="password" name="user_pw"/>
	이름<input type="text" name="user_name"/>
	계정명<input type="text" name="user_nickname"/>
	프로필사진<input type="text" name="user_profile"/>
	성별<input type="text" name="user_gender"/>
	주소<input type="text" name="user_addr"/>
	생년월일<input type="text" name="user_birth"/>
	국적<input type="text" name="user_nationality"/>
	전화번호<input type="text" name="user_tel"/>
	이메일<input type="text" name="user_email"/>
	유창한 언어<input type="text" name="user_fluent_language"/>
	학습 언어<input type="text" name="user_learning_language"/>
	대화 주제<input type="text" name="user_topic"/>
	찾는 파트너<input type="text" name="user_ideal_partner"/>
	학습 목표<input type="text" name="user_objective"/>
	<button type="submit">가입</button>
	<a href="/main" method="GET"><button type="button">취소</button></a>
</form>

</body>
</html>
