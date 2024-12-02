package com.ringo.persistence;

import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.MsgRoomVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;
import com.ringo.domain.UserVO;

public interface MsgDAO {
	public Integer selectLastMsgCode();
	public Integer insertMsg(MsgVO vo);
	public String selectPersonalMsgRoom(Map<String,Object> param);
	public List<MsgRoomVO> selectMsgRoomList(String user_code);
	public MsgRoomVO selectMsgRoomInfo(String mr_code);
	public List<MsgVO> selectMsg(String user_code,String mr_code);
}
