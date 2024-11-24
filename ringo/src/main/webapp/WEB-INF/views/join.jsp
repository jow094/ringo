<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<%@ include file="/resources/assets/inc/navbar.jsp" %>
</head>
<body>

<div class="join_container">
	<div class="box">
		<form action="/user/join" method="POST" enctype="multipart/form-data">
		
			
			
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			<div class="input_cell">
				<div class="input_name">
					프로필
				</div>
				<div class="input_value">
					<input type="file" name="user_profile_file"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					성별
				</div>
				<div class="input_value">
					<input type="text" name="user_gender"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					주소
				</div>
				<div class="input_value">
					<input type="text" name="user_addr"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					생년월일
				</div>
				<div class="input_value">
					<input type="date" name="user_birth"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					국적
				</div>
				<div class="input_value">
					<input type="text" name="user_nationality"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					전화번호
				</div>
				<div class="input_value">
					<input type="text" name="user_tel"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					이메일
				</div>
				<div class="input_value">
					<input type="text" name="user_email"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					유창한 언어
				</div>
				<div class="input_value">
					<input type="text" name="user_fluent_language"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					학습 언어
				</div>
				<div class="input_value">
					<input type="text" name="user_learning_language"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					대화 주제
				</div>
				<div class="input_value">
					<input type="text" name="user_topic"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					찾는 파트너
				</div>
				<div class="input_value">
					<input type="text" name="user_ideal_partner"/>
				</div>
			</div>
			
			<div class="input_cell">
				<div class="input_name">
					학습 목표
				</div>
				<div class="input_value">
					<input type="text" name="user_objective"/>
				</div>
			</div>
			
			<input type="hidden" name="user_server" value="kor"/>
			<div style="display:flex; justify-content: center; align-content: center;">
				<div style="flex:1; padding:0px; margin:0 30px">
					<button  class="custom_button" type="submit">이전</button>
				</div>
				<div style="flex:1; padding:0px; margin:0 30px">
					<button  class="custom_button" type="submit">다음</button>
				</div>
				<div style="flex:1; padding:0px; margin:0 30px">
					<a><button style="width:100%" class="custom_button" type="button">취소</button></a>
				</div>
			</div>
		</form>
	</div>
</div>


</body>
</html>
