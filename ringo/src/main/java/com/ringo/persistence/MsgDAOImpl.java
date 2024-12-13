package com.ringo.persistence;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
	public Integer selectLastMsgRoomCode() {
		return sqlSession.selectOne(NAMESPACE + ".selectLastMsgRoomCode");
	}

	@Override
	public List<String> selectUserMsgRoomList(String user_code) {
		return sqlSession.selectList(NAMESPACE + ".selectUserMsgRoomList",user_code);
	}
	
	@Override
	public Integer insertMsg(MsgVO vo) {
		return sqlSession.insert(NAMESPACE + ".insertMsg",vo);
	}
	
	@Override
	@Transactional
	public MsgRoomVO insertMsgRoom(MsgRoomVO vo) {
		if(vo.getMr_member_codes()==null) {
			if (sqlSession.insert(NAMESPACE + ".insertPersonalMsgRoom", vo) == 1) {
				sqlSession.insert(NAMESPACE + ".insertPersonalMsgMember_1", vo);
				sqlSession.insert(NAMESPACE + ".insertPersonalMsgMember_2", vo);
				
				MsgVO param = new MsgVO();
				param.setMsg_place(vo.getMr_code());
				param.setMsg_content("새로운 대화방이 생성되었습니다.");
				sqlSession.insert(NAMESPACE + ".insertSysMsg", param);
				return vo;
			} else {
				return null;
			}
		}else {
			
			if (sqlSession.insert(NAMESPACE + ".insertPartyMsgRoom", vo) == 1) {
				MsgVO param = new MsgVO();
				param.setMsg_place(vo.getMr_code());
				param.setMsg_content("새로운 대화방이 생성되었습니다.");
				sqlSession.insert(NAMESPACE + ".insertSysMsg", param);
				
				List<String> members = vo.getMr_member_codes();
				for(String member : members) {
					vo.setMr_guest(member);
					insertMsgMember(vo);
				}
				
				return vo;
			} else {
				return null;
			}
		}
	}

	@Override
	public String selectPersonalMsgRoom(Map<String,Object> param) {
		return sqlSession.selectOne(NAMESPACE + ".selectPersonalMsgRoom",param);	
	}

	@Override
	public List<MsgRoomVO> selectMsgRoomList(String user_code) {
		return sqlSession.selectList(NAMESPACE + ".selectMsgRoomList",user_code);	
	}

	@Override
	public MsgRoomVO selectMsgRoomInfo(String user_code,String mr_code) {
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("mr_code", mr_code);
		param.put("user_code", user_code);
		
		return sqlSession.selectOne(NAMESPACE + ".selectMsgRoomInfo",param);	
	}

	@Override
	public List<MsgVO> selectMsg(String user_code,String mr_code) {
		if(user_code != null && user_code != "") {
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("user_code", user_code);
			param.put("mr_code", mr_code);
			
			sqlSession.update(NAMESPACE + ".updateRoomUnreader",param);
		}
		return sqlSession.selectList(NAMESPACE + ".selectMsg",mr_code);	
	}
	
	@Override
	public MsgVO selectOneMsg(String user_code,String msg_code) {
		if(user_code != null && user_code != "") {
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("user_code", user_code);
			param.put("msg_code", msg_code);
			
			sqlSession.update(NAMESPACE + ".updateMsgUnreader",param);
		}
		return sqlSession.selectOne(NAMESPACE + ".selectOneMsg",msg_code);	
	}
	
	@Transactional
	@Override
	public String insertMsgMember(MsgRoomVO vo) {
		if(sqlSession.insert(NAMESPACE + ".insertMsgMember",vo) == 1) {
			
			MsgVO param = new MsgVO();
			param.setMsg_place(vo.getMr_code());
			String inviter = sqlSession.selectOne(NAMESPACE + ".selectNickname",vo.getMr_inviter());
			String guest = sqlSession.selectOne(NAMESPACE + ".selectNickname",vo.getMr_guest());
			
			if(!inviter.equals(guest)) {
				param.setMsg_content(inviter+" 님께서 "+guest+" 님을 대화방에 초대하셨습니다.");
				sqlSession.insert(NAMESPACE + ".insertSysMsg", param);
				param.setMsg_content(guest+" 님이 대화방에 입장하셨습니다.");
				sqlSession.insert(NAMESPACE + ".insertSysMsg", param);
			}else {
				param.setMsg_content(guest+" 님이 대화방에 입장하셨습니다.");
				sqlSession.insert(NAMESPACE + ".insertSysMsg", param);
			}
			
			return vo.getMr_code();
		}else {
			return null;
		}
	}

	@Override
	public List<MsgVO> selectUnreaderCount(String mr_code) {
		return sqlSession.selectList(NAMESPACE + ".selectUnreaderCount",mr_code);
	}

	@Override
	public Integer updateMsgNotifying(Map<String, Object> param) {
		return sqlSession.update(NAMESPACE + ".updateMsgNotifying",param);
	}
	
	@Transactional
	@Override
	public Integer deleteMsgMember(Map<String, Object> param) {
		logger.debug("asdasd"+param);
		
		MsgVO sys = new MsgVO();
		String nickname = sqlSession.selectOne(NAMESPACE + ".selectNickname",param.get("user_code"));
		sys.setMsg_place((String)param.get("mr_code"));
		sys.setMsg_content(nickname+" 님께서 채팅방에서 퇴장하셨습니다.");
		sqlSession.insert(NAMESPACE + ".insertSysMsg", sys);
		
		return sqlSession.delete(NAMESPACE + ".deleteMsgMember",param);
	}

	@Override
	public List<String> selectMsgMembers(String mr_code) {
		return sqlSession.selectList(NAMESPACE + ".selectMsgMembers",mr_code);
	}
	
	
}
