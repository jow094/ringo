package com.ringo.persistence;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ringo.domain.MemberVO;
import com.ringo.domain.SettingVO;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Repository
public class MemberDAOImpl implements MemberDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.MemberMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(MemberDAOImpl.class);

	@Override
	public MemberVO selectMember(MemberVO vo) {
		logger.debug("selectMember(MemberVO) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectMember",vo);		
	}
	
	@Override
	public Integer selectLastCode(MemberVO vo) {
		logger.debug("selectLastCode(MemberVO) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectLastCode",vo);		
	}
	
	@Override
	public Integer insertMember(MemberVO vo) {
		logger.debug("insertMember(MemberVO) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertMember",vo);	
	}

	/*
	 * @Override public MemberVO getMember(String emp_id) { return
	 * sqlSession.selectOne(NAMESPACE + ".getMember",emp_id); }
	 * 
	 * @Override public List<MemberVO> getMemberList(String keyword) { return
	 * sqlSession.selectList(NAMESPACE + ".getSearchedMemberList",keyword); }
	 * 
	 * @Override public List<MemberVO> getTeamList(String emp_id) { return
	 * sqlSession.selectList(NAMESPACE + ".getTeamList",emp_id); }
	 * 
	 * @Override public List<SettingVO> getToolList(String keyword) { return
	 * sqlSession.selectList(NAMESPACE + ".searchTools",keyword); }
	 * 
	 * @Override public void updateFavoriteTool(SettingVO vo) {
	 * sqlSession.update(NAMESPACE + ".updateFavoriteTool",vo); }
	 * 
	 * @Override public SettingVO getSetting(String emp_id) { return
	 * sqlSession.selectOne(NAMESPACE + ".getSetting",emp_id); }
	 * 
	 * @Override public void updateLogout(String emp_id) {
	 * sqlSession.update(NAMESPACE + ".logout",emp_id); }
	 * 
	 * @Override public void updateLogin(String emp_id) {
	 * sqlSession.update(NAMESPACE + ".login",emp_id); }
	 * 
	 * @Override public void insertFollowEmp(String user_emp_id, String emp_id) {
	 * Map<String, String> param = new HashMap<String, String>();
	 * param.put("user_emp_id", user_emp_id); param.put("emp_id", emp_id);
	 * sqlSession.insert(NAMESPACE + ".followEmp",param); }
	 * 
	 * @Override public void deleteFollowEmp(String user_emp_id, String emp_id) {
	 * Map<String, String> param = new HashMap<String, String>();
	 * param.put("user_emp_id", user_emp_id); param.put("emp_id", emp_id);
	 * sqlSession.delete(NAMESPACE + ".unfollowEmp",param); }
	 * 
	 * public void yammyDummy(String emp_id) {
	 * 
	 * 
	 * Random random = new Random();
	 * 
	 * LocalDate startDate = LocalDate.of(2024, 1, 1); LocalDate endDate =
	 * LocalDate.of(2024, 10, 30);
	 * 
	 * 
	 * List<String> emp_list = sqlSession.selectList(NAMESPACE + ".emp_dummy");
	 * 
	 * for(String emp : emp_list) {
	 * 
	 * for (LocalDate date = startDate; date.isBefore(endDate); date =
	 * date.plusDays(1)) { if (date.getDayOfWeek().getValue() >= 6) { continue; }
	 * 
	 * Map<String, Object> param = new HashMap<>(); param.put("emp_id", emp);
	 * param.put("date", date.toString());
	 * 
	 * Integer presence = random.nextInt(365);
	 * 
	 * if(presence > 350) { param.put("presence", "�빊�뮇�삢"); }else if(351 > presence &&
	 * presence > 310) { param.put("presence", "占쎌몧揶쏉옙"); }else if(311 > presence ) {
	 * param.put("presence", "�빊�뮄�젏"); }
	 * 
	 * if (311>presence) {
	 * 
	 * int checkInMinute = 44 + random.nextInt(16); String checkIn =
	 * String.format("08:%02d:00", checkInMinute); param.put("check_in", checkIn);
	 * param.put("working_time", 8);
	 * 
	 * int overtimeChance = random.nextInt(100); Integer overtime = null; if
	 * (overtimeChance < 10) { overtime = 1; } else if (overtimeChance < 15) {
	 * overtime = 2; } else if (overtimeChance < 20) { overtime = 3; }
	 * param.put("overtime", overtime); }
	 * 
	 * param.put("night_work_time", null); param.put("special_working_time", null);
	 * 
	 * sqlSession.insert(NAMESPACE + ".dummy", param); }
	 * 
	 * 
	 * } }
	 * 
	 * @Override public void dummySetting() { List<String> emp_list =
	 * sqlSession.selectList(NAMESPACE + ".emp_dummy");
	 * 
	 * for(String emp : emp_list) { sqlSession.insert(NAMESPACE +
	 * ".dummySetting",emp); sqlSession.insert(NAMESPACE + ".dummyFavorite",emp); }
	 * }
	 * 
	 * @Override public List<String> getPrecense(String emp_id, LocalDate startDate,
	 * LocalDate endDate) { Map<String, Object> param = new HashMap<>();
	 * param.put("emp_id", emp_id); param.put("startDate", startDate);
	 * param.put("endDate", endDate); List<String> result =
	 * sqlSession.selectList(NAMESPACE + ".getPresence",param);
	 * logger.debug("precense : " + result); return result; }
	 * 
	 * 
	 */
}
