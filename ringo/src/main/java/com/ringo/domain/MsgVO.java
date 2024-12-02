package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class MsgVO {
	private String msg_code;
	private UserVO msg_sender;
	private String msg_content;
	private Timestamp msg_time;
	private String msg_unreader;
	private Integer msg_unread_count;
	private String msg_place;
}
