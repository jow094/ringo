package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.SettingVO;

public interface UserService {
	
	public UserVO userLogin(UserVO vo);
	public UserVO userInfo(String user_code);
	public Integer userJoin(UserVO vo);
	public Integer getLastUserCode();
	public Integer checkDuplication(String target, String data);
	public UserVO getUserProfile(Map<String,Object> param);
	public UserVO getConnectedProfile(String user_code);
	public String getUserNickname(String user_code);
	public Map<String,List<String>> getUserAditionalInfos(String user_code);
	public Integer addFavorite(Map<String,Object> param);
	public Integer removeFavorite(Map<String,Object> param);
	public Integer addFollow(Map<String,Object> param);
	public Integer removeFollow(Map<String,Object> param);
	public Integer addRecomm(Map<String,Object> param);
	public Integer removeRecomm(Map<String,Object> param);
	public Integer modifyUserInfo(UserVO vo);
	public Integer modifyUserLog(UserVO vo);
	public UserVO getUserPicture(String user_code);
	public List<UserVO> getUserLink(Map<String,Object> param);
	public List<UserVO> getCodeLink(Map<String,Object> param);
}
