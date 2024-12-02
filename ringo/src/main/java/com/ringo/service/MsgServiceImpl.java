package com.ringo.service;

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

    public void sendRoomUpdate(String roomId) {
        // "/topic/rooms" 寃쎈줈濡� 硫붿떆吏� �쟾�넚
        messagingTemplate.convertAndSend("/msgGet", roomId + " has been updated!");
    }
    
	@Override
	public Integer getLastMsgCode() {
		return msgdao.selectLastMsgCode();
	}
	
	@Override
	public Integer uploadMsg(MsgVO vo) {
		return msgdao.insertMsg(vo);
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
	public MsgRoomVO getMsgRoomInfo(String mr_code) {
		return msgdao.selectMsgRoomInfo(mr_code);
	}

	@Override
	public List<MsgVO> getMsg(String user_code,String mr_code) {
		return msgdao.selectMsg(user_code,mr_code);
	}
	
	
}
