package com.ringo.persistence;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ringo.domain.UserVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Repository
public class UserDAOImpl implements UserDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	@Autowired
    private SimpMessagingTemplate messagingTemplate;
	
	private static final String NAMESPACE = "com.ringo.mapper.UserMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(UserDAOImpl.class);

	@Override
	public UserVO selectUser(UserVO vo) {
		logger.debug("selectUser(UserVO) - vo : "+vo);
		return sqlSession.selectOne(NAMESPACE + ".selectUser",vo);		
	}
	
	@Override
	public UserVO selectUserEverything(String user_code) {
		return sqlSession.selectOne(NAMESPACE + ".selectUserEverything",user_code);		
	}

	@Override
	public String selectUserNickname(String user_code) {
		logger.debug("selectUserNickname(String user_code) - user_code : "+user_code);
		return sqlSession.selectOne(NAMESPACE + ".selectUserNickname",user_code);		
	}
	
	@Transactional
	@Override
	public Map<String,List<String>> selectUserAditionalInfos(String user_code) {
		List<String> favorites = sqlSession.selectList(NAMESPACE + ".selectUserFavorite",user_code);
		List<String> follows = sqlSession.selectList(NAMESPACE + ".selectUserFollow",user_code);
		Map<String,List<String>> result = new HashMap<String,List<String>>();
		result.put("favorites",favorites);
		result.put("follows",follows);
		return result;
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
	public UserVO selectUserProfile(String user_code) {
		logger.debug("selectUserProfile(Integer user_code) - user_code : "+user_code);
		return sqlSession.selectOne(NAMESPACE + ".selectUserProfile",user_code);	
	}
	
	@Transactional
	@Override
	public UserVO selectConnectedProfile(String user_code) {
		logger.debug("selectConnectedProfile(String user_code) - user_code : "+user_code);
		
		UserVO result = new UserVO();
		
		result.setUser_follower(sqlSession.selectList(NAMESPACE + ".selectFollowerProfile",user_code));
		result.setUser_following(sqlSession.selectList(NAMESPACE + ".selectFollowingProfile",user_code));
		result.setUser_favorite(sqlSession.selectList(NAMESPACE + ".selectFavoriteProfile",user_code));
			
		return result;
	}

	@Override
	public Integer insertFavorite(Map<String, Object> param) {
		return sqlSession.insert(NAMESPACE + ".insertFavorite",param);	
	}

	@Override
	public Integer deleteFavorite(Map<String, Object> param) {
		return sqlSession.delete(NAMESPACE + ".deleteFavorite",param);	
	}
	
	@Override
	public Integer insertFollow(Map<String, Object> param) {
		return sqlSession.insert(NAMESPACE + ".insertFollow",param);	
	}
	
	@Override
	public Integer deleteFollow(Map<String, Object> param) {
		return sqlSession.delete(NAMESPACE + ".deleteFollow",param);	
	}
	
	@Override
	public Integer insertRecomm(Map<String, Object> param) {
		return sqlSession.insert(NAMESPACE + ".insertRecomm",param);	
	}
	
	@Override
	public Integer deleteRecomm(Map<String, Object> param) {
		return sqlSession.delete(NAMESPACE + ".deleteRecomm",param);	
	}

	@Override
	public Integer updateUserInfo(UserVO vo) {
		return sqlSession.update(NAMESPACE + ".updateUserInfo",vo);	
	}
	
	@Override
	public List<String> selectConnectedUser(String user_code) {
		return sqlSession.selectList(NAMESPACE + ".selectConnectedUser",user_code);
	}

	@Override
	public Integer updateUserLog(UserVO vo) {
		String user_code = vo.getUser_code();
		
		Integer result = 0;
		if(vo.getUser_log_location() == null) {
			result = sqlSession.update(NAMESPACE + ".updateUserlogOut",vo);	
			if(result==1) {
				Map<String,Object> trigger = new HashMap<String,Object>();
				trigger.put("type", "logOut");
				trigger.put("user_code", user_code);
				for(String target_code : selectConnectedUser(user_code)) {
					logger.debug("shoot logOut trigger for "+target_code);
					messagingTemplate.convertAndSend("/ringGet/" + target_code, trigger);
				}
			}	
		}else {
			result = sqlSession.update(NAMESPACE + ".updateUserlogOn",vo);	
			if(result==1) {
				Map<String,Object> trigger = new HashMap<String,Object>();
				trigger.put("type", "logOn");
				trigger.put("user_code", user_code);
				for(String target_code : selectConnectedUser(user_code)) {
					logger.debug("shoot logOn trigger for "+target_code);
					messagingTemplate.convertAndSend("/ringGet/" + target_code, trigger);
				}
			}	
		}
		
		return result;
	}

	@Override
	public UserVO selectUserPicture(String user_code) {
		return sqlSession.selectOne(NAMESPACE + ".selectUserPicture",user_code);	
	}
	
	@Transactional
	@Override
	public List<UserVO> selectLink(Map<String,Object> param) {
		List<UserVO> result = new ArrayList<UserVO>();
		result.addAll(sqlSession.selectList(NAMESPACE + ".selectNearLink",param));	
		result.addAll(sqlSession.selectList(NAMESPACE + ".selectTagsLink",param));	
		return result;
	}
}
