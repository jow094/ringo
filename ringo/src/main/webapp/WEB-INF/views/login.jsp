<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!!  
</h1>

<P>  The time on the server is ${serverTime}. </P>

<form action="/login" method="POST">
	<input type="text" name="user_id"/>
	<input type="password" name="user_id"/>
	<input type="submit" name="submit"/> 
</form>

<a href="/join" method="GET"><button type="button">회원가입</button></a>
<a href="/find" method="GET"><button type="button">정보찾기</button></a>

</body>
</html>
