package com.ringo.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	@Override
	public String getPersonalMsgRoom(Map<String,Object> param) {
		return msgdao.select_personal_msg_room(param);
	}

	@Override
	public List<MsgRoomVO> getMsgRoomlist(String user_code) {
		return msgdao.select_msg_room_list(user_code);
	}
	
	@Override
	public MsgRoomVO getMsgRoomInfo(String mr_code) {
		return msgdao.select_msg_room_info(mr_code);
	}

	@Override
	public List<MsgVO> getMsg(String mr_code) {
		return msgdao.select_msg(mr_code);
	}
	
	
}
