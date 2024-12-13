package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class MsgRoomVO {
	private String mr_code;
	private String mr_name;
	private String mr_thumbnail_path;
	private Integer mr_alarm_count;
	private String mr_admin;
	private Timestamp mr_created_date;
	private Integer mr_notify;
	private Integer mr_favorite;
	
	private MsgVO mr_last_message;
	private List<MsgVO> mr_msgs;
	private List<UserVO> mr_member;
	private List<String> mr_member_codes;
	
	private String mr_inviter;
	private String mr_guest;
}
