package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.SettingVO;

public interface UserService {
	
	public UserVO userLogin(UserVO vo);
	public Integer userJoin(UserVO vo);
	public Integer getLastUserCode();
	public Integer checkDuplication(String target, String data);
	public UserVO getUserProfile(String user_code);
	public UserVO getConnectedProfile(String user_code);
	public String getUserNickname(String user_code);
	public Map<String,List<String>> getUserAditionalInfos(String user_code);
	public Integer addFavorite(Map<String,Object> param);
	public Integer removeFavorite(Map<String,Object> param);
	public Integer addFollow(Map<String,Object> param);
	public Integer removeFollow(Map<String,Object> param);
	public Integer addRecomm(Map<String,Object> param);
	public Integer removeRecomm(Map<String,Object> param);
	
	
	/*
	 * 
	 * public UserVO memberInfo(String userid);
	 * 
	 * public List<UserVO> memberSearch(String keyword);
	 * 
	 * public List<UserVO> getTeammate(String emp_id);
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
