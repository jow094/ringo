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
import org.springframework.transaction.annotation.Transactional;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.SettingVO;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Repository
public class AlgorithmDAOImpl implements AlgorithmDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.AlgorithmMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(AlgorithmDAOImpl.class);

	@Override
	public Integer insertUserAlgorithm(String user_code) {
		return sqlSession.insert(NAMESPACE + ".insertUserAlgorithm",user_code);	
	}
	
	@Override
	public AlgorithmVO selectUserAlgorithm(String user_code) {
		return sqlSession.selectOne(NAMESPACE + ".selectUserAlgorithm",user_code);	
	}

	@Override
	public Integer updateUserAlgorithm(Map<String,Object> param) {
		return sqlSession.update(NAMESPACE + ".updateUserAlgorithm",param);	
	}

}
