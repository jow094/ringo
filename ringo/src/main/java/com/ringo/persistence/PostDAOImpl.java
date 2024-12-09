package com.ringo.persistence;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;

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
	public UnityBoardVO selectUnityBoard(UnityBoardVO vo) {
		logger.debug("selectUnityBoard(UnityBoardVO vo) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectUnityBoard",vo);
	}
	
	@Override
	public List<PostVO> selectUnityPost(UnityBoardVO vo) {
		logger.debug("selectUnityPost(UnityBoardVO vo - vo : "+vo);
		return sqlSession.selectList(NAMESPACE + ".selectUnityPost",vo);		
	}
	
	@Override
	public Map<String,Object> selectUnityBoardPost(UnityBoardVO vo) {
		logger.debug("selectUnityBoardPost(UnityBoardVO vo) - vo : "+vo);
		Integer page = sqlSession.selectOne(NAMESPACE + ".selectUnityPage",vo);
		vo.setUb_page(page);
		
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("page", page);
		result.put("post", sqlSession.selectList(NAMESPACE + ".selectUnityPost",vo));
		result.put("board", sqlSession.selectOne(NAMESPACE + ".selectUnityBoard",vo));
		return result;	
	}
	
	@Override
	public List<PostVO> selectMoreUnityPost(UnityBoardVO vo) {
		logger.debug("selectMoreUnityPost(UnityBoardVO vo) - vo : "+vo);
		return sqlSession.selectList(NAMESPACE + ".selectMoreUnityPost",vo);		
	}

	@Override
	public Map<String, Object> selectRecommInfo(String user_code, String target_code) {
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",user_code);
		param.put("target_code",target_code);
		
		return sqlSession.selectOne(NAMESPACE + ".selectRecommInfo",param);	
	}

	
	
}
