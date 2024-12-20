package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.SettingVO;
import com.ringo.persistence.UserDAO;
import com.ringo.persistence.UserDAO;

@Service
public class UserServiceImpl implements UserService{

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserDAO udao;
	
	@Override
	public UserVO userLogin(UserVO vo) {
		return udao.selectUser(vo);
	}
	
	@Override
	public UserVO userInfo(String user_code) {
		return udao.selectUserEverything(user_code);
	}

	@Override
	public Integer getLastUserCode() {
		return udao.selectLastCode();
	}

	@Override
	public Integer userJoin(UserVO vo) {
		return udao.insertUser(vo);
	}
	
	@Override
	public Integer checkDuplication(String target, String data) {
		return udao.selectDuplication(target,data);
	}

	@Override
	public UserVO getUserProfile(Map<String,Object> param) {
		return udao.selectUserProfile(param);
	}
	
	@Override
	public UserVO getConnectedProfile(String user_code) {
		return udao.selectConnectedProfile(user_code);
	}

	@Override
	public Map<String, List<String>> getUserAditionalInfos(String user_code) {
		return udao.selectUserAditionalInfos(user_code);
	}

	@Override
	public String getUserNickname(String user_code) {
		return udao.selectUserNickname(user_code);
	}

	@Override
	public Integer addFavorite(Map<String, Object> param) {
		return udao.insertFavorite(param);
	}

	@Override
	public Integer removeFavorite(Map<String, Object> param) {
		return udao.deleteFavorite(param);
	}
	
	@Override
	public Integer addFollow(Map<String, Object> param) {
		return udao.insertFollow(param);
	}
	
	@Override
	public Integer removeFollow(Map<String, Object> param) {
		return udao.deleteFollow(param);
	}
	
	@Override
	public Integer addRecomm(Map<String, Object> param) {
		return udao.insertRecomm(param);
	}
	
	@Override
	public Integer removeRecomm(Map<String, Object> param) {
		return udao.deleteRecomm(param);
	}

	@Override
	public Integer modifyUserInfo(UserVO vo) {
		return udao.updateUserInfo(vo);
	}
	
	@Override
	public Integer modifyUserLog(UserVO vo) {
		return udao.updateUserLog(vo);
	}

	@Override
	public UserVO getUserPicture(String user_code) {
		return udao.selectUserPicture(user_code);
	}

	@Override
	public List<UserVO> getUserLink(Map<String,Object> param) {
		return udao.selectLink(param);
	}

	@Override
	public List<UserVO> getCodeLink(Map<String, Object> param) {
		return udao.selectCodeLink(param);
	}
	
	
}
