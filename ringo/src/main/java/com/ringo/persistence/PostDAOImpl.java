package com.ringo.persistence;

import java.util.List;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;

@Repository
public class PostDAOImpl implements PostDAO {

	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.PostMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(PostDAOImpl.class);
	
	@Override
	public Integer selectLastRepleCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastRepleCode");		
	}
	
	@Override
	public List<RepleVO> selectReple(RepleVO vo) {
		logger.debug("selectReple(RepleVO) - vo : "+vo);
		return sqlSession.selectList(NAMESPACE + ".selectReple",vo);		
	}

	@Override
	public Integer insertReple(RepleVO vo) {
		logger.debug("insertReple(RepleVO) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertReple",vo);		
	}
	
	@Override
	public Integer selectLastCirclePostCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastCirclePostCode");		
	}
	
	@Override
	public Integer insertCirclePost(PostVO vo) {
		logger.debug("insertCirclePost(PostVO) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertCirclePost",vo);		
	}

	@Override
	public List<PostVO> selectCirclePost(String user_code) {
		logger.debug("selectCirclePost(String user_code) - user_code : "+user_code);
		return sqlSession.selectList(NAMESPACE + ".selectCirclePost",user_code);		
	}

	@Override
	public Integer selectLastUnityPostCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastUnityPostCode");		
	}

	@Override
	public Integer insertUnityPost(PostVO vo) {
		logger.debug("insertUnityPost(PostVO) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertUnityPost",vo);	
	}

	@Override
	public List<PostVO> selectUnityPost(String post_code) {
		logger.debug("selectUnityPost(String post_code) - post_code : "+post_code);
		return sqlSession.selectList(NAMESPACE + ".selectUnityPost",post_code);		
	}
	
}
