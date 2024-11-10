package com.ringo.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ringo.domain.MemberVO;
import com.ringo.domain.MessageVO;
import com.ringo.domain.SettingVO;
import com.ringo.persistence.MemberDAO;
import com.ringo.persistence.MessageDAO;

@Service
public class MessageServiceImpl implements MessageService{

	private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);
	
	@Autowired
	private MessageDAO msgdao;
	
	@Inject
	private MemberDAO mdao;
	
	/*
	 * @Override public List<MessageVO> openPersonalChat(String sender_User_id,
	 * String receiver_User_id) {
	 * 
	 * return msgdao.join_messages(sender_User_id,msgdao.check_personal_chat(
	 * sender_User_id, receiver_User_id)); }
	 * 
	 * @Override public List<MessageVO> openChatRoom(String msg_reader,Integer
	 * room_id) {
	 * 
	 * return msgdao.join_messages(msg_reader, room_id); }
	 * 
	 * @Override public int createChatRoom(MessageVO vo) { return
	 * msgdao.insert_msg_room(vo); }
	 * 
	 * @Override public void enterRoom(MessageVO vo) {
	 * msgdao.insert_participant(vo); }
	 * 
	 * @Override public void sendMessage(MessageVO vo) { msgdao.insert_message(vo);
	 * msgdao.update_room_info(vo); }
	 * 
	 * @Override public List<MessageVO> getChatRoomList(String User_id,String
	 * User_name) { List<MessageVO> result = msgdao.select_rooms(User_id);
	 * for(MessageVO vo : result) {
	 * 
	 * if((vo.getRoom_name().split(",")).length==2) { List<MemberVO> people =
	 * msgdao.get_person(vo.getRoom_id()); for(MemberVO person : people) {
	 * if(!person.getUser_id().equals(User_id)){
	 * vo.setRoom_thumbnail(person.getUser_profile()); } } }
	 * 
	 * vo.setRoom_name( vo.getRoom_name() .replaceAll("(^|,)\\s*" + User_name.trim()
	 * + "\\s*(,|$)", "$1$2") // �돹�몴 �뮘 怨듬갚 �룷�븿�븯�뿬 �씠由� �젣嫄� .replaceAll(",,",
	 * ",") // 以묐났 �돹�몴 �젣嫄� .replaceAll("^,|,$", "") // �븵�뮘 �돹�몴 �젣嫄� );
	 * 
	 * } return result; }
	 * 
	 * @Override public List<MessageVO> getFavoriteChatRoomList(String
	 * User_id,String User_name) { List<MessageVO> result =
	 * msgdao.select_favorite_rooms(User_id); for(MessageVO vo : result) {
	 * 
	 * if((vo.getRoom_name().split(",")).length==2) { List<MemberVO> people =
	 * msgdao.get_person(vo.getRoom_id()); for(MemberVO person : people) {
	 * if(!person.getUser_id().equals(User_id)){
	 * vo.setRoom_thumbnail(person.getUser_profile()); } } }
	 * 
	 * vo.setRoom_name( vo.getRoom_name() .replaceAll("(^|,)\\s*" + User_name.trim()
	 * + "\\s*(,|$)", "$1$2") // �돹�몴 �뮘 怨듬갚 �룷�븿�븯�뿬 �씠由� �젣嫄� .replaceAll(",,",
	 * ",") // 以묐났 �돹�몴 �젣嫄� .replaceAll("^,|,$", "") // �븵�뮘 �돹�몴 �젣嫄� ); } return
	 * result; }
	 * 
	 * @Override public List<MessageVO> searchRoom(String User_id, String keyword) {
	 * 
	 * return msgdao.search_into_rooms(User_id,keyword); }
	 * 
	 * @Override public void changeRoomName(MessageVO vo) {
	 * msgdao.update_room_name(vo); }
	 * 
	 * @Override public void exitRoom(MessageVO vo) { msgdao.delete_participant(vo);
	 * }
	 * 
	 * @Override public void cutRoomName(MessageVO vo) {
	 * msgdao.delete_room_name(vo); }
	 * 
	 * @Override public void systemMessage(MessageVO vo) {
	 * msgdao.insert_system_message(vo); }
	 * 
	 * @Override public List<MessageVO> getMessageUnreadAlarm(String User_id) {
	 * return msgdao.get_message_unread_alarm(User_id); }
	 * 
	 * @Override public List<MessageVO> getMessageRealtimeAlarm(String User_id) {
	 * List<MessageVO> result = msgdao.get_message_realtime_alarm(User_id);
	 * 
	 * String User_name = mdao.getMember(User_id).getUser_name();
	 * 
	 * for(MessageVO vo : result) { vo.setRoom_name( vo.getRoom_name()
	 * .replaceAll("(^|,)\\s*" + User_name.trim() + "\\s*(,|$)", "$1$2") // �돹�몴 �뮘
	 * 怨듬갚 �룷�븿�븯�뿬 �씠由� �젣嫄� .replaceAll(",,", ",") // 以묐났 �돹�몴 �젣嫄�
	 * .replaceAll("^,|,$", "") // �븵�뮘 �돹�몴 �젣嫄� ); } return result; }
	 * 
	 * @Override public int countParticipant(int room_id) { return
	 * msgdao.check_participant_count(room_id); }
	 * 
	 * @Override public MessageVO checkRoomInfo(int room_id) { return
	 * msgdao.get_room_info(room_id); }
	 * 
	 * @Override public int createPartyRoom(MessageVO vo) { int result =
	 * msgdao.insert_party_room(vo); return result; }
	 * 
	 * @Override public SettingVO showMessengerSetting(String User_id) { return
	 * msgdao.get_messenger_setting(User_id); }
	 * 
	 * @Override public void followRoom(String User_id, Integer room_id) {
	 * msgdao.insert_follow_room(User_id, room_id); }
	 * 
	 * @Override public void unfollowRoom(String User_id, Integer room_id) {
	 * msgdao.delete_follow_room(User_id, room_id); }
	 */
	
}
