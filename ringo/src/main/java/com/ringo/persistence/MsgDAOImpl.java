package com.ringo.persistence;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ringo.domain.UserVO;
import com.ringo.domain.MsgRoomVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;
import com.ringo.domain.UserVO;

@Repository
public class MsgDAOImpl implements MsgDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.MsgMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(MsgDAOImpl.class);

	@Override
	public Integer selectLastMsgCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastMsgCode");
	}

	@Override
	public Integer insertMsg(MsgVO vo) {
		return sqlSession.insert(NAMESPACE + ".insertMsg",vo);
	}

	@Override
	public String selectPersonalMsgRoom(Map<String,Object> param) {
		logger.debug("result:"+sqlSession.selectOne(NAMESPACE + ".selectPersonalMsgRoom",param));
		return sqlSession.selectOne(NAMESPACE + ".selectPersonalMsgRoom",param);	
	}

	@Override
	public List<MsgRoomVO> selectMsgRoomList(String user_code) {
		logger.debug("result:"+sqlSession.selectList(NAMESPACE + ".selectMsgRoomList",user_code));
		return sqlSession.selectList(NAMESPACE + ".selectMsgRoomList",user_code);	
	}

	@Override
	public MsgRoomVO selectMsgRoomInfo(String mr_code) {
		logger.debug("result:"+sqlSession.selectOne(NAMESPACE + ".selectMsgRoomInfo",mr_code));
		return sqlSession.selectOne(NAMESPACE + ".selectMsgRoomInfo",mr_code);	
	}

	@Override
	public List<MsgVO> selectMsg(String user_code,String mr_code) {
		logger.debug("selectMsg result:"+sqlSession.selectList(NAMESPACE + ".selectMsg",mr_code));
		
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("mr_code", mr_code);
		param.put("user_code", user_code);
		
		sqlSession.update(NAMESPACE + ".updateMsgUnreader",param);
		return sqlSession.selectList(NAMESPACE + ".selectMsg",mr_code);	
	}

	
	
}
