package com.ringo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ringo.domain.UserVO;
import com.ringo.domain.MsgRoomVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;
import com.ringo.persistence.UserDAO;
import com.ringo.persistence.MsgDAO;

@Service
public class MsgServiceImpl implements MsgService{

	private static final Logger logger = LoggerFactory.getLogger(MsgServiceImpl.class);
	
	@Autowired
	private MsgDAO msgdao;
	
	@Autowired
    private SimpMessagingTemplate messagingTemplate;
    
	@Override
	public Integer getLastMsgCode() {
		return msgdao.selectLastMsgCode();
	}
	
	@Override
	public Integer getLastMsgRoomCode() {
		return msgdao.selectLastMsgRoomCode();
	}
	
	@Override
	public List<String> getUserMsgRoomList(String user_code) {
		return msgdao.selectUserMsgRoomList(user_code);
	}

	@Override
	public Integer uploadMsg(MsgVO vo) {
		return msgdao.insertMsg(vo);
	}
	
	@Override
	public MsgRoomVO createMsgRoom(MsgRoomVO vo) {
		return msgdao.insertMsgRoom(vo);
	}

	@Override
	public String getPersonalMsgRoom(Map<String,Object> param) {
		return msgdao.selectPersonalMsgRoom(param);
	}

	@Override
	public List<MsgRoomVO> getMsgRoomlist(String user_code) {
		return msgdao.selectMsgRoomList(user_code);
	}
	
	@Override
	public MsgRoomVO getMsgRoomInfo(String user_code,String mr_code) {
		return msgdao.selectMsgRoomInfo(user_code,mr_code);
	}

	@Override
	public List<MsgVO> getMsg(String user_code,String mr_code) {
		
		List<MsgVO> result = msgdao.selectMsg(user_code,mr_code);
		messagingTemplate.convertAndSend("/ringGet/connectRoom/" + mr_code, msgdao.selectUnreaderCount(mr_code));
		return result;
	}
	
	@Override
	public MsgVO getOneMsg(String user_code,String mr_code,String msg_code) {
		
		MsgVO result = msgdao.selectOneMsg(user_code,msg_code);
		messagingTemplate.convertAndSend("/ringGet/connectRoom/" + mr_code, msgdao.selectUnreaderCount(mr_code));
		return result;
	}

	@Override
	public Integer modifyMsgNotifying(Map<String, Object> param) {
		return msgdao.updateMsgNotifying(param);
	}

	@Override
	public Integer exitMsgRoom(Map<String, Object> param) {
		return msgdao.deleteMsgMember(param);
	}

	@Override
	public List<String> getMsgMembers(String mr_code) {
		return msgdao.selectMsgMembers(mr_code);
	}

	@Override
	public String addMsgMember(MsgRoomVO vo) {
		return msgdao.insertMsgMember(vo);
	}
}
