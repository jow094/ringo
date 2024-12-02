package com.ringo.persistence;

import java.util.List;
import java.util.Map;

import com.ringo.domain.UserVO;
import com.ringo.domain.MsgRoomVO;
import com.ringo.domain.MsgVO;
import com.ringo.domain.SettingVO;
import com.ringo.domain.UserVO;

public interface MsgDAO {
	
	public String select_personal_msg_room(Map<String,Object> param);
	public List<MsgRoomVO> select_msg_room_list(String user_code);
	public MsgRoomVO select_msg_room_info(String mr_code);
	public List<MsgVO> select_msg(String mr_code);
}
