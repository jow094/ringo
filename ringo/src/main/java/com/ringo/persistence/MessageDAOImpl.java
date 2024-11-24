package com.ringo.persistence;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.ringo.domain.UserVO;
import com.ringo.domain.MessageVO;
import com.ringo.domain.SettingVO;
import com.ringo.domain.UserVO;

@Repository
public class MessageDAOImpl implements MessageDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "com.ringo.mapper.MessageMapper";
	
	private static final Logger logger = LoggerFactory.getLogger(MessageDAOImpl.class);

	@Override
	public int check_personal_chat(String sender_emp_id, String receiver_emp_id) {
		
		Map<String, String> people = new HashMap<String, String>();
	    people.put("sender_emp_id", sender_emp_id);
	    people.put("receiver_emp_id", receiver_emp_id);

	    Integer result = sqlSession.selectOne(NAMESPACE + ".findRoom", people);
	    
		if (result == null) {
			result = 0;
		}
			
		return result;
	}

	@Override
	public void insert_participant(MessageVO vo) {
		sqlSession.insert(NAMESPACE + ".insertParticipant",vo);
	}

	@Override
	public int insert_message(MessageVO vo) {
		return sqlSession.insert(NAMESPACE + ".sendMessage",vo);
	}

	@Override
	public List<MessageVO> join_messages(String msg_reader, Integer room_id) {
		MessageVO vo = new MessageVO();
		vo.setMsg_reader(msg_reader);
		vo.setRoom_id(room_id);
		
		List<Integer> msg_id = sqlSession.selectList(NAMESPACE + ".checkReadOrNot",vo);
		if(msg_id.size()!=0) {
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("msg_reader", msg_reader);
			params.put("room_id", room_id);
			params.put("msg_id", msg_id);
			sqlSession.update(NAMESPACE + ".updateMessageReader",params);
		}else {
		}
		
		List<MessageVO> result = sqlSession.selectList(NAMESPACE + ".getMessages",room_id);
		
		
		return result;
	}

	@Override
	public int insert_msg_room(MessageVO vo) {
		sqlSession.selectList(NAMESPACE + ".insertMsgRoom",vo);
		return sqlSession.selectOne(NAMESPACE + ".selectLastRoomId");
	}

	@Override
	public List<MessageVO> select_rooms(String emp_id) {
		return sqlSession.selectList(NAMESPACE + ".selectRoomList",emp_id);
	}
	
	@Override
	public List<MessageVO> select_favorite_rooms(String emp_id) {
		return sqlSession.selectList(NAMESPACE + ".selectFavoriteRoomList",emp_id);
	}

	@Override
	public void update_room_info(MessageVO vo) {
		sqlSession.update(NAMESPACE + ".updateRoomInfo",vo);
	}

	@Override
	public List<MessageVO> search_into_rooms(String emp_id,String keyword) {
		
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("emp_id", emp_id);
	    param.put("keyword", keyword);
		List<Integer> roomList = sqlSession.selectList(NAMESPACE + ".getSearchedRoomList",param);
		if(roomList.size()>0) {
			param.put("room_id",roomList);
			return sqlSession.selectList(NAMESPACE + ".getSearchedRoom",param);
		}
		return null;
	}

	@Override
	public void update_room_name(MessageVO vo) {
		sqlSession.update(NAMESPACE + ".updateRoomName",vo);
	}

	@Override
	public void delete_participant(MessageVO vo) {
		sqlSession.delete(NAMESPACE + ".deleteParticipant",vo);
		
		int room_id = vo.getRoom_id();
		String emp_id = vo.getLeaver_emp_id();
		List<Integer> garbageMsg = sqlSession.selectList(NAMESPACE + ".getGarbageMessage",vo);
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("emp_id", emp_id);
	    param.put("msg_reader", emp_id);
	    param.put("room_id", room_id);
	    param.put("msg_id", garbageMsg);
	    sqlSession.update(NAMESPACE + ".updateMessageReader",param);
	    sqlSession.update(NAMESPACE + ".updateMessageAlarmToken",param);
	}

	@Override
	public void delete_room_name(MessageVO vo) {
		sqlSession.update(NAMESPACE + ".deleteRoomName",vo);
	}

	@Override
	public List<UserVO> get_person(int room_id) {
			
		return sqlSession.selectList(NAMESPACE + ".getPersonalInfo",room_id);
	}

	@Override
	public void insert_system_message(MessageVO vo) {
		sqlSession.insert(NAMESPACE + ".systemMessage",vo);
	}
	
	@Override
	public List<MessageVO> get_message_unread_alarm(String emp_id) {
		return sqlSession.selectList(NAMESPACE + ".messageUnreadAlarm",emp_id);
	}
	
	@Override
	public List<MessageVO> get_message_realtime_alarm(String emp_id) {
		List<MessageVO> realtimeAlarms = sqlSession.selectList(NAMESPACE + ".messageRealtimeAlarm",emp_id);
		List<Integer> msg_id = new ArrayList<Integer>();
		
			if(realtimeAlarms.size()>0) { 
				Map<String, Object> param = new HashMap<String, Object>();
				for(MessageVO vo : realtimeAlarms) {
					msg_id.add(vo.getMsg_id());
				} 
				param.put("msg_id", msg_id);
				param.put("emp_id", emp_id);
				sqlSession.selectList(NAMESPACE + ".updateMessageAlarmToken",param);
			}
		return realtimeAlarms;
	}

	@Override
	public int check_participant_count(int room_id) {
		return sqlSession.selectOne(NAMESPACE + ".checkParticipantCount",room_id);
	}

	@Override
	public MessageVO get_room_info(int room_id) {
		return sqlSession.selectOne(NAMESPACE + ".getRoomInfo",room_id);
	}

	@Override
	public int insert_party_room(MessageVO vo) {
		sqlSession.insert(NAMESPACE + ".insertNewPartyRoom",vo);
		return sqlSession.selectOne(NAMESPACE + ".selectLastRoomId");
	}
	
	@Override
	public SettingVO get_messenger_setting(String emp_id) {
		return sqlSession.selectOne(NAMESPACE + ".getMessengerSetting",emp_id);
	}

	@Override
	public void insert_follow_room(String emp_id, Integer room_id) {
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("emp_id", emp_id);
	    param.put("room_id", room_id);
		sqlSession.insert(NAMESPACE + ".followRoom",param);
	}

	@Override
	public void delete_follow_room(String emp_id, Integer room_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("emp_id", emp_id);
	    param.put("room_id", room_id);
		sqlSession.delete(NAMESPACE + ".unfollowRoom",param);
	}
	
	
	
}
