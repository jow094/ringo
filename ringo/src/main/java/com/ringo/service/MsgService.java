package com.ringo.service;

import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.MsgRoomVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;

public interface MsgService {
	
	public Integer getLastMsgCode();
	public Integer uploadMsg(MsgVO vo);
	public String getPersonalMsgRoom(Map<String,Object> param);
	public List<MsgRoomVO> getMsgRoomlist(String user_code);
	public MsgRoomVO getMsgRoomInfo(String mr_code);
	public List<MsgVO> getMsg(String user_code,String mr_code);
	
}
