package com.ringo.persistence;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.ringo.domain.MemberVO;
import com.ringo.domain.SettingVO;

public interface MemberDAO {

	public MemberVO selectMember(MemberVO vo);
	public Integer insertMember(MemberVO vo);
	
	/*
	 * public MemberVO getMember(String userid);
	 * 
	 * public List<MemberVO> getMemberList(String keyword);
	 * 
	 * public List<MemberVO> getTeamList(String emp_id);
	 * 
	 * public List<SettingVO> getToolList(String emp_id);
	 * 
	 * public void updateFavoriteTool(SettingVO vo);
	 * 
	 * public SettingVO getSetting(String emp_id);
	 * 
	 * public void updateLogout(String emp_id); public void updateLogin(String
	 * emp_id); public void insertFollowEmp(String user_emp_id,String emp_id);
	 * public void deleteFollowEmp(String user_emp_id,String emp_id);
	 * 
	 * public void yammyDummy(String emp_id); public void dummySetting(); public
	 * List<String> getPrecense(String emp_id, LocalDate startDate, LocalDate
	 * endDate);
	 */
}
