<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ringo - Your Lingo Partner</title>
	<link rel="icon" href="/resources/assets/img/favicon.png" type="image/png">
	<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>
<div class="main_container">
	<div class="left_container">
		<%@ include file="/resources/assets/inc/profile_container.jsp" %>
	</div>
	<div class="center_container">
		<%@ include file="/resources/assets/inc/article_container.jsp" %>
	</div>
	<div class="right_container">
		<%@ include file="/resources/assets/inc/alarm_container.jsp" %>
	</div>
</div>

<script>
</script>
</body>
</html>