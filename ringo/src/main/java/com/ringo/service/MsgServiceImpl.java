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
		Integer result = msgdao.insertMsg(vo);
		
		if (result > 0) {
            String mr_code = vo.getMsg_place();
            Map<String,Object> param = new HashMap<String,Object>();
    		param.put("mr_code", mr_code);
    		param.put("msg_code", vo.getMsg_code());
            messagingTemplate.convertAndSend("/msgGet/getMsg/" + mr_code, param);
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
		messagingTemplate.convertAndSend("/msgGet/updateMUC/" + mr_code, msgdao.selectUnreaderCount(mr_code));
		return result;
	}
	
	@Override
	public MsgVO getOneMsg(String user_code,String mr_code,String msg_code) {
		
		MsgVO result = msgdao.selectOneMsg(user_code,msg_code);
		messagingTemplate.convertAndSend("/msgGet/updateMUC/" + mr_code, msgdao.selectUnreaderCount(mr_code));
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
	
	
}
