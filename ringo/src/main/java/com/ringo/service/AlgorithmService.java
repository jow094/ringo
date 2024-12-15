package com.ringo.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.SettingVO;

public interface AlgorithmService {
	
	public Integer createUserAlgorithm(String user_code);
	public AlgorithmVO getUserAlgorithm(String user_code);
	public Integer modifyUserAlgorithm(Map<String,Object> param);
}
