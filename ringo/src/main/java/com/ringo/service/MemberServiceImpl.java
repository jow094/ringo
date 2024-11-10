package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ringo.domain.MemberVO;
import com.ringo.domain.SettingVO;
import com.ringo.persistence.MemberDAO;

@Service
public class MemberServiceImpl implements MemberService{

	private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	@Autowired
	private MemberDAO mdao;
	
	@Override
	public MemberVO memberLogin(MemberVO vo) {
		return mdao.selectMember(vo);
	}
	
	@Override
	public Integer memberJoin(MemberVO vo) {
		return mdao.insertMember(vo);
	}
	/*
	 * @Override public MemberVO memberInfo(String userid) { return
	 * mdao.getMember(userid); };
	 * 
	 * @Override public List<MemberVO> memberSearch(String keyword) { return
	 * mdao.getMemberList(keyword); }
	 * 
	 * @Override public List<MemberVO> getTeammate(String emp_id) { return
	 * mdao.getTeamList(emp_id); }
	 * 
	 * @Override public List<SettingVO> searchTools(String keyword) { return
	 * mdao.getToolList(keyword); }
	 * 
	 * @Override public void settingFavoriteTool(SettingVO vo) {
	 * mdao.updateFavoriteTool(vo); }
	 * 
	 * @Override public SettingVO showSetting(String emp_id) { return
	 * mdao.getSetting(emp_id); }
	 * 
	 * @Override public void userLogout(String emp_id) { mdao.updateLogout(emp_id);
	 * };
	 * 
	 * @Override public void userLogin(String emp_id) { mdao.updateLogin(emp_id); }
	 * 
	 * @Override public void followEmp(String user_emp_id, String emp_id) {
	 * mdao.insertFollowEmp(user_emp_id, emp_id); }
	 * 
	 * @Override public void unFollowEmp(String user_emp_id, String emp_id) {
	 * mdao.deleteFollowEmp(user_emp_id, emp_id); };
	 * 
	 * public void yammyDummy(String emp_id) { mdao.yammyDummy(emp_id); }
	 * 
	 * public void dummySetting() { mdao.dummySetting(); }
	 * 
	 * @Override public List<String> showPrecense(String emp_id, LocalDate
	 * startDate, LocalDate endDate) { return mdao.getPrecense(emp_id, startDate,
	 * endDate); }
	 */
	
}
