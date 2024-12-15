package com.ringo.persistence;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.SettingVO;

public interface UserDAO {

	public UserVO selectUser(UserVO vo);
	public UserVO selectUserEverything(String user_code);
	public String selectUserNickname(String user_code);
	public Map<String,List<String>> selectUserAditionalInfos(String user_code);
	public Integer insertUser(UserVO vo);
	public Integer selectLastCode();
	public Integer selectDuplication(String target, String data);
	public UserVO selectUserProfile(String user_code);
	public UserVO selectConnectedProfile(String user_code);
	public Integer insertFavorite(Map<String,Object> param);
	public Integer deleteFavorite(Map<String,Object> param);
	public Integer insertFollow(Map<String,Object> param);
	public Integer deleteFollow(Map<String,Object> param);
	public Integer insertRecomm(Map<String,Object> param);
	public Integer deleteRecomm(Map<String,Object> param);
	public Integer updateUserInfo(UserVO vo);
	public Integer updateUserLog(UserVO vo);
	public UserVO selectUserPicture(String user_code);
	public List<String> selectConnectedUser(String user_code);
	public List<UserVO> selectLink(Map<String,Object> param);
}
