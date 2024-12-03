package com.ringo.service;

import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.MsgRoomVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;

public interface MsgService {
	
	public Integer getLastMsgCode();
	public Integer getLastMsgRoomCode();
	public List<String> getUserMsgRoomList(String user_code);
	public Integer uploadMsg(MsgVO vo);
	public MsgRoomVO createMsgRoom(MsgRoomVO vo);
	public String getPersonalMsgRoom(Map<String,Object> param);
	public List<MsgRoomVO> getMsgRoomlist(String user_code);
	public MsgRoomVO getMsgRoomInfo(String user_code, String mr_code);
	public List<MsgVO> getMsg(String user_code,String mr_code);
	
}
