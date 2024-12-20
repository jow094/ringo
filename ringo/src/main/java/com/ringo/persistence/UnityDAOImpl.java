package com.ringo.persistence;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ringo.domain.UnityVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.domain.UnityMemberVO;

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
	
	@Transactional
	@Override
	public Integer deleteUnity(String unity_code) {
		sqlSession.delete(NAMESPACE + ".deleteUnityTrashReple",unity_code);
		sqlSession.delete(NAMESPACE + ".deleteUnityTrashRecomm",unity_code);
		sqlSession.delete(NAMESPACE + ".deleteFavoriteUnity",unity_code);
		sqlSession.delete(NAMESPACE + ".deleteUnityTrashPost",unity_code);
		sqlSession.delete(NAMESPACE + ".deleteUnityTrashBoard",unity_code);
		sqlSession.delete(NAMESPACE + ".deleteUnityTrashMember",unity_code);
		return sqlSession.delete(NAMESPACE + ".deleteUnity",unity_code);		
	}
	
	@Override
	public Integer insertUnityMember(UnityMemberVO vo) {
		logger.debug("insertUnityMember(UnityMemberVO vo) - vo : "+vo);
		return sqlSession.insert(NAMESPACE + ".insertUnityMember",vo);		
	}
	
	@Override
	public Integer deleteUnityMember(UnityMemberVO vo) {
		logger.debug("deleteUnityMember(UnityMemberVO vo) - vo : "+vo);
		return sqlSession.delete(NAMESPACE + ".deleteUnityMember",vo);		
	}
	
	@Override
	public Integer updateUnityMember(UnityMemberVO vo) {
		logger.debug("updateUnityMember(UnityMemberVO vo) - vo : "+vo);
		return sqlSession.update(NAMESPACE + ".updateUnityMember",vo);	
	}
	
	@Override
	public Integer selectIsMember(String unity_code, String user_code) {
		logger.debug("selectIsMember(String unity_code, String user_code) - unity_code,user_code : "+unity_code+" , "+user_code);
		
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("unity_code",unity_code);
		param.put("user_code",user_code);
		
		return sqlSession.selectOne(NAMESPACE + ".selectIsMember",param);
	}

	@Override
	public Integer selectLastUnityCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastUnityCode");	
	}
	
	@Transactional
	@Override
	public List<UnityVO> selectUnities(AlgorithmVO vo) {
		
		List<String> tags = Arrays.asList(vo.getUser_tags().split(","));

		String user_code = vo.getUser_code();
		String user_log_geolocation = vo.getUser_log_geolocation();
		String user_latitude = user_log_geolocation.split(",")[0];
		String user_longitude = user_log_geolocation.split(",")[1];
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",user_code);
		param.put("user_latitude",user_latitude);
		param.put("tags",tags);
		param.put("user_longitude",user_longitude);
		
		List<UnityVO> result = new ArrayList<UnityVO>();
		result.addAll(sqlSession.selectList(NAMESPACE + ".selectUnities",user_code));
		result.addAll(sqlSession.selectList(NAMESPACE + ".selectAlgorithmUnities",param));
		
		return result;
	}
	
	@Override
	public UnityVO selectUnity(UnityVO vo) {
		logger.debug("selectUnity(UnityVO vo) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectUnity",vo);	
	}
	
	@Override
	public UnityVO selectUnityMain(UnityVO vo) {
		logger.debug("selectUnityMain(UnityVO vo) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectUnityMain",vo);	
	}

	@Override
	public List<PostVO> selectUnityBasicPost(UnityVO vo) {
		logger.debug("selectUnityBasicPost(UnityVO vo) - vo : "+vo);
		return sqlSession.selectList(NAMESPACE + ".selectUnityBasicPost",vo);	
	}
	
	@Override
	public UnityBoardVO selectUnityboardInfo(UnityBoardVO vo) {
		logger.debug("selectUnityboardInfo(UnityBoardVO vo) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectUnityBoardInfo",vo);	
	}
	
	@Override
	public List<UnityBoardVO> selectUnityboards(String unity_code) {
		logger.debug("selectUnityboards(String unity_code) - unity_code : "+unity_code);
		return sqlSession.selectOne(NAMESPACE + ".selectUnityBoards",unity_code);	
	}

	@Override
	public Integer updateUnityInfo(UnityVO vo) {
		logger.debug("updateUnityInfo(UnityVO vo) - vo : "+vo);
		return sqlSession.update(NAMESPACE + ".updateUnityInfo",vo);	
	}

	@Transactional
	@Override
	public Integer resetUnityBoard(List<UnityBoardVO> voList, String unity_code) {
		logger.debug("resetUnityBoard(List<UnityBoardVO> vo, String unity_code) - vo,unity_code : "+voList+" , "+unity_code);
		sqlSession.delete(NAMESPACE + ".deleteUnityTrashBoard",unity_code);
		return sqlSession.insert(NAMESPACE + ".insertUnityBoard",voList);
	}

	@Override
	public Integer deleteUnityBoards(String unity_code) {
		return sqlSession.delete(NAMESPACE + ".deleteUnityTrashBoard",unity_code);
	}
	
	
}
