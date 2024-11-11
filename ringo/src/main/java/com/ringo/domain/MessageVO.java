package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class MessageVO {
	private int msg_id;
	private Timestamp msg_date;
	private String msg_reader;
	private String msg_unreader;
	private int msg_unread_count;
	private String msg_content;
	
	private int room_id;
	private String room_name;
	private String room_admin;
	private Timestamp room_created_date;
	private String room_last_message;
	private Timestamp room_last_message_date;
	private String room_last_sender_name;
	private String room_last_sender_position;
	private Timestamp room_join_date;
	private int room_alarm_count;
	private String room_thumbnail;
	
	private String inviter_emp_id;
	private String inviter_emp_name;
	private String enter_emp_id;
	private String enter_emp_name;
	private String leaver_emp_id;
	private String leaver_emp_name;
	private String personal_sender_emp_id;
	private String personal_sender_emp_name;
	private String personal_sender_emp_position;
	private String personal_receiver_emp_id;
	private String personal_receiver_emp_name;
	private String personal_receiver_emp_position;
	private MemberVO msg_sender;
	private List<MemberVO> room_people;
}
