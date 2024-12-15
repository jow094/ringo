package com.ringo.persistence;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.SettingVO;

public interface AlgorithmDAO {

	public Integer insertUserAlgorithm(String user_code);
	public AlgorithmVO selectUserAlgorithm(String user_code);
	public Integer updateUserAlgorithm(Map<String,Object> param);
}
