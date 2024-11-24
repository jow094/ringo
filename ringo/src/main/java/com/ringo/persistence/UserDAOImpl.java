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

import com.ringo.domain.UserVO;
import com.ringo.domain.SettingVO;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Repository
public class UserDAOImpl implements UserDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.UserMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(UserDAOImpl.class);

	@Override
	public UserVO selectUser(UserVO vo) {
		logger.debug("selectUser(UserVO) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectUser",vo);		
	}
	
	@Override
	public Integer selectLastCode() {
		logger.debug("selectLastCode");
		return sqlSession.selectOne(NAMESPACE + ".selectLastCode");		
	}
	
	@Override
	public Integer insertUser(UserVO vo) {
		logger.debug("insertUser(UserVO) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertUser",vo);	
	}

	@Override
	public Integer selectDuplication(String target, String data) {
		
		Map<String, Object> params = new HashMap<>();
		params.put("target", target);
		params.put("value", data);
		
		return sqlSession.selectOne(NAMESPACE + ".selectDuplication",params);	
	}

	@Override
	public UserVO selectUserProfile(Integer user_code) {
		logger.debug("selectUserProfile(Integer user_code) - user_code : "+user_code);
		return sqlSession.selectOne(NAMESPACE + ".selectUserProfile",user_code);	
	}

	
}
