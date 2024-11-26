package com.ringo.persistence;

import java.util.List;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ringo.domain.UnityVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;

@Repository
public class UnityDAOImpl implements UnityDAO {

	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.UnityMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(UnityDAOImpl.class);
	
	@Override
	public Integer selectDupleUnityName(String data) {
		logger.debug("selectDupleUnityName(String data) - data : "+data);
		return sqlSession.selectOne(NAMESPACE + ".selectDupleUnityName",data);	
	}

	@Override
	public Integer insertUnity(UnityVO vo) {
		logger.debug("insertUnity(UnityVO) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertUnity",vo);		
	}
	
	@Override
	public Integer insertUnityMember(UnityVO vo) {
		logger.debug("insertUnityMember(UnityVO vo) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertUnityMember",vo);		
	}
	
	@Override
	public Integer updateUnityMember(UnityVO vo) {
		logger.debug("updateUnityMember(UnityVO vo) - vo : "+vo);
		return sqlSession.update(NAMESPACE + ".updateUnityMember",vo);	
	}

	@Override
	public Integer selectLastUnityCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastUnityCode");	
	}
	
	@Override
	public List<UnityVO> selectUnities(String user_code) {
		return sqlSession.selectList(NAMESPACE + ".selectUnities",user_code);	
	}
	
	@Override
	public UnityVO selectUnity(UnityVO vo) {
		return sqlSession.selectOne(NAMESPACE + ".selectUnity",vo);	
	}

	@Override
	public List<PostVO> selectUnityPost(UnityVO vo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RepleVO> selectReple(UnityVO vo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer insertUnityPost(UnityVO vo) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	
	
}
