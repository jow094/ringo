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
        messagingTemplate.convertAndSend("/msgGet", roomId + " has been updated!");
    }
    
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
		Integer result = msgdao.insertMsg(vo);
		
		if (result > 0) {
            // 채팅방 ID를 구하기 (예시로 vo.getRoomId()가 있다고 가정)
            String mr_code = vo.getMsg_place();
            // WebSocket 메시지를 해당 방에 전송
            messagingTemplate.convertAndSend("/msgGet/room/" + mr_code, msgdao.selectOneMsg(vo.getMsg_code()));
        }
		return result;
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
		messagingTemplate.convertAndSend("/msgUpdate/" + mr_code, msgdao.selectUnreaderCount(mr_code));
		return result;
	}
	
	
}
