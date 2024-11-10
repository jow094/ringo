<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- <%@ include file="/resources/assets/inc/get_employee_info.jsp" %>
<%@ include file="/resources/assets/inc/realtime_alarm.jsp" %>
<%@ include file="/resources/assets/inc/workflow_modal.jsp" %> --%>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/assets/css/custom.css" />
      <!-- Sidebar -->
      <div class="sidebar" data-background-color="dark">
        <!-- Start logo -->
        <div class="sidebar-logo" >
          <div class="logo-header" style="background-color: rgba(0,0,0,0.8)">
          	<a href="/main/home" class="logo" style="padding-top:20px;">
              <img
                src="${pageContext.request.contextPath }/resources/assets/img/project/favicon_black.png"
                alt="navbar brand"
                class="navbar-brand"
                height="50px;"
                style="padding-right:10px;"
              />
            </a>
            <a href="/main/home" class="logo" style="padding-top:20px;">
              <img
                src="${pageContext.request.contextPath }/resources/assets/img/project/logo_black.png"
                alt="navbar brand"
                class="navbar-brand"
                height="60px;"
              />
            </a>
            <div class="nav-toggle">
              <button class="btn btn-toggle toggle-sidebar">
                <i class="gg-menu-right"></i>
              </button>
              <button class="btn btn-toggle sidenav-toggler">
                <i class="gg-menu-left"></i>
              </button>
            </div>
            <button class="topbar-toggler more">
              <i class="gg-more-vertical-alt"></i>
            </button>
          </div>
        </div>
        <!-- End Logo -->
        <div class="sidebar-wrapper scrollbar scrollbar-inner" style="background-color: rgba(0,0,0,0.8)">
          <div class="sidebar-content">
            <ul class="nav nav-secondary">
              <li class="nav-item">
                <a href="/main/home">
                  <i class="fas fa-home"></i>
                  <p>HOME</p>
                  <span class="caret"></span>
                </a>
                <!-- <div class="collapse" id="dashboard"> 
                  <ul class="nav nav-collapse">
                    <li>
                      <a href="../project/main">
                        <span class="sub-item">Dashboard 1</span>
                      </a>
                    </li>
                  </ul>
                </div> Main 하위버튼--> 
              </li>
              
              <li class="nav-item">
		          <a href="/work/workflow">
		          	<i class="fa-solid fa-bell"></i>
		          	<p>WORK FLOW</p>
		          	<span class="sub-item"></span>
		          </a>
              </li>
              
              <!-- Components start -->
              <li class="nav-section">
                <span class="sidebar-mini-icon">
                  <i class="fa fa-ellipsis-h"></i>
                </span>
                <h4 class="text-section">Components</h4>
              </li>
              <!-- Components end-->
              
              <!-- Menu start -->
              <!-- <li class="nav-item">
                <a data-bs-toggle="collapse" href="#base"> href="" 를 여는 a태그
                  <i class="fas fa-layer-group"></i> icon
                  <p>Title</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="base"> href="" 를 여는 a태그의 타겟
                  <ul class="nav nav-collapse">
                    <li>
                      <a href="components/avatars.html">
                        <span class="sub-item">small_title</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li> -->
              <!-- Menu start -->
              <!-- Menu start -->
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#person"> <!-- href="" 를 여는 a태그 -->
                  <i class="fas fa-address-card"></i> <!-- icon -->
                  <p>인사관리</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="person"> <!-- href="" 를 여는 a태그의 타겟 -->
                  <ul class="nav nav-collapse">
                    <li>
                      <a href="/member/info">
                        <span class="sub-item">내 정보</span>
                      </a>
                    </li>
                    <li>
                      <a href="/member/list">
                        <span class="sub-item">사원목록</span>
                      </a>
                    </li>
                    <li>
                      <a href="/member/org/chart">
                        <span class="sub-item">조직도</span>
                      </a>
                    </li>
                    <li>
                      <a href="/member/quit">
                        <span class="sub-item">퇴직신청</span>
                      </a>
                    </li>
                    <li>
                      <a href="/member/manager">
                        <span class="sub-item">사원관리(관리자 페이지)</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- Menu start -->
               <!-- Menu start -->
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#base"> <!-- href="" 를 여는 a태그 -->
                  <i class="fas fa-calculator"></i> <!-- icon -->
                  <p>급여관리</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="base"> <!-- href="" 를 여는 a태그의 타겟 -->
                  <ul class="nav nav-collapse">
					<c:if test="${emp_level <= 3 }">              
	                    <li>
	                      <a href="/salary/salaryBasicInfo">
	                        <span class="sub-item">급여기본정보 설정</span>
	                      </a>
	                    </li>
                    <li>
                      <a href="/salary/salaryPositionJobInfo">
                        <span class="sub-item">직무급/직급급 설정</span>
                      </a>
                    </li>
                    <li>
                      <a href="/salary/calSalary">
                        <span class="sub-item">급여산출</span>
                      </a>
                    </li>
                    <li>
                      <a href="/salary/salaryInquiryForManage">
                        <span class="sub-item">급여조회(관리자)</span>
                      </a>
                    </li>
                    </c:if>
                    <li>
                      <a href="/salary/salaryInquiryForEmployee">
                        <span class="sub-item">급여조회</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- Menu start -->
              <!-- Menu start -->
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#maps"> <!-- href="" 를 여는 a태그 -->
                  <i class="fas fa-chalkboard-teacher"></i> <!-- icon -->
                  <p>교육관리</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="maps"> <!-- href="" 를 여는 a태그의 타겟 -->
                  <ul class="nav nav-collapse">
                  <c:if test="${emp_level <= 3 }">  
                    <li>
                      <a href="/edu/eduManage">
                        <span class="sub-item">교육관리(관리자)</span>
                      </a>
                    </li>
                    <li>
                      <a href="/edu/eduHisManageForManager">
                        <span class="sub-item">교육이력관리(관리자)</span>
                      </a>
                    </li>
                    </c:if>
                    <li>
                      <a href="/edu/eduApply">
                        <span class="sub-item">교육신청</span>
                      </a>
                    </li>
                    <li>
                      <a href="/edu/eduHisManageForEmp">
                        <span class="sub-item">교육이력관리</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- Menu start -->
              <!-- Menu start -->
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#charts"> <!-- href="" 를 여는 a태그 -->
                  <i class="far fa-chart-bar"></i>
                  <p>성과관리</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="charts"> <!-- href="" 를 여는 a태그의 타겟 -->
                  <ul class="nav nav-collapse">
                  <c:if test="${emp_level <= 3 }">  
                    <li>
                      <a href="/eval/evalManage">
                        <span class="sub-item">성과관리(관리자)</span>
                      </a>
                    </li>
                   </c:if>
                    <li>
                      <a href="/eval/reportEval">
                        <span class="sub-item">성과보고(피평가자)</span>
                      </a>
                    </li>
                    <c:if test="${emp_position == '부장' || emp_position == '본부장' || emp_position == '부사장'
                    || emp_position == '사장'}">  
                    <li>
                      <a href="/eval/resultEval">
                        <span class="sub-item">성과평가(평가자)</span>
                      </a>
                    </li>
                    </c:if>
                    <li>
                      <a href="/eval/evalHisInquiry">
                        <span class="sub-item">성과이력조회</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- Menu start -->
              <!-- Menu start -->
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#attendance"> <!-- href="" 를 여는 a태그 -->
                  <i class="fas fa-clipboard"></i>
                  <p>근태관리</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="attendance"> <!-- href="" 를 여는 a태그의 타겟 -->
                  <ul class="nav nav-collapse">
                     <li>
                      <a href="/Attendance/attendanceMain">
                        <span class="sub-item">나의 근태관리</span>
                      </a>
                    </li>
                    <li>
                      <a href="/Attendance/attendanceAdmin">
                        <span class="sub-item">근태관리(어드민)</span>
                      </a>
                    </li>       
                  </ul>
                </div>
              </li>
              <!-- Menu start -->
              <!-- Menu start -->
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#leave"> <!-- href="" 를 여는 a태그 -->
                  <i class="fas fa-rocket"></i>
                  <p>휴가관리</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="leave"> <!-- href="" 를 여는 a태그의 타겟 -->
                  <ul class="nav nav-collapse">
                    <li>
                      <a href="/leave/main">
                        <span class="sub-item">나의 휴가관리</span>
                      </a>
                    </li>
                    <li>
                      <a href="/leave/mainAdmin">
                        <span class="sub-item">휴가관리(어드민)</span>
                      </a>
                    </li>
                     <li>
                      <a href="/leave/AdminAnnual">
                        <span class="sub-item">연차조회/생성(어드민)</span>
                      </a>
                    </li>        
                  </ul>
                </div>
              </li>
              <!-- Menu start -->
            </ul>
          </div>
        </div>
      </div>
      <!-- End Sidebar -->
