package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ringo.domain.UserVO;
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
		logger.debug("UserLogin(UserVO) - vo : "+vo);
		return udao.selectUser(vo);
	}
	
	@Override
	public Integer getLastUserCode() {
		logger.debug("getLastUserCode()");
		return udao.selectLastCode();
	}


	@Override
	public Integer userJoin(UserVO vo) {
		logger.debug("UserJoin(UserVO) - vo : "+vo);
		return udao.insertUser(vo);
	}
	
	@Override
	public Integer checkDuplication(String target, String data) {
		return udao.selectDuplication(target,data);
	}

	@Override
	public UserVO getUserProfile(Integer user_code) {
		return udao.selectUserProfile(user_code);
	}

	
}
