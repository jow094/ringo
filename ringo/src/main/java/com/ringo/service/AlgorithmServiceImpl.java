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
import com.ringo.persistence.AlgorithmDAO;
import com.ringo.persistence.UserDAO;
import com.ringo.persistence.UserDAO;

@Service
public class AlgorithmServiceImpl implements AlgorithmService{

	private static final Logger logger = LoggerFactory.getLogger(AlgorithmServiceImpl.class);
	
	@Autowired
	private AlgorithmDAO adao;

	@Override
	public Integer createUserAlgorithm(String user_code) {
		return adao.insertUserAlgorithm(user_code);
	}
	
	@Override
	public AlgorithmVO getUserAlgorithm(String user_code) {
		return adao.selectUserAlgorithm(user_code);
	}

	@Override
	public Integer modifyUserAlgorithm(Map<String,Object> param) {
		return adao.updateUserAlgorithm(param);
	};
}
