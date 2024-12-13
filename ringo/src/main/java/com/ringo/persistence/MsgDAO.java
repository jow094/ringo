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
	public Integer selectLastMsgRoomCode();
	public List<String> selectUserMsgRoomList(String user_code);
	public Integer insertMsg(MsgVO vo);
	public Integer systemMsg(String mr_code,String msg);
	public MsgRoomVO insertMsgRoom(MsgRoomVO vo);
	public String selectPersonalMsgRoom(Map<String,Object> param);
	public List<MsgRoomVO> selectMsgRoomList(String user_code);
	public MsgRoomVO selectMsgRoomInfo(String user_code,String mr_code);
	public List<MsgVO> selectMsg(String user_code,String mr_code);
	public MsgVO selectOneMsg(String user_code,String msg_code);
	public String insertMsgMember(MsgRoomVO vo);
	public List<MsgVO> selectUnreaderCount(String mr_code);
	public Integer updateMsgNotifying(Map<String, Object> param);
	public Integer deleteMsgMember(Map<String, Object> param);
	public List<String> selectMsgMembers(String mr_code);
}
