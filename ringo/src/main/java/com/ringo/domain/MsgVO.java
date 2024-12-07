package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MsgVO {
	private String msg_code;
	private UserVO msg_sender;
	private String msg_content;
	private Timestamp msg_time;
	private String msg_unreader;
	private Integer msg_unreader_count;
	private String msg_place;
	private List<MultipartFile> msg_file;
	private String msg_image_path;
	private String msg_audio_path;
	private String msg_transfer_user_code;
	private String msg_correction;

	private String msg_target;
	private String msg_comment_target;
	private String msg_origin_content;
	private String msg_origin_sender_nickname;
}
