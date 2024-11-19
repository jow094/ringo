package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.ringo.domain.MemberVO;
import com.ringo.domain.SettingVO;

public interface MemberService {
	
	public MemberVO memberLogin(MemberVO vo);
	public Integer memberJoin(MemberVO vo);
	public Integer getLastUserCode();
	public Integer checkDuplication(String target, String data);
	
	
	/*
	 * 
	 * public MemberVO memberInfo(String userid);
	 * 
	 * public List<MemberVO> memberSearch(String keyword);
	 * 
	 * public List<MemberVO> getTeammate(String emp_id);
	 * 
	 * public List<SettingVO> searchTools(String keyword);
	 * 
	 * public void settingFavoriteTool(SettingVO vo);
	 * 
	 * public SettingVO showSetting(String emp_id);
	 * 
	 * public void userLogout(String emp_id);
	 * 
	 * public void userLogin(String emp_id);
	 * 
	 * public void followEmp(String user_emp_id,String emp_id);
	 * 
	 * public void unFollowEmp(String user_emp_id,String emp_id);
	 * 
	 * public void yammyDummy(String emp_id);
	 * 
	 * public void dummySetting();
	 * 
	 * public List<String> showPrecense(String emp_id, LocalDate startDate,
	 * LocalDate endDate);
	 */
}
