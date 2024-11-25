package com.ringo.domain;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UnityVO {
	private Integer unity_code;
	private String unity_name;
	private Integer unity_admin;
	private String unity_tag;
	private String unity_intro;
	private String unity_method;
	private String unity_topic;
	private String unity_lang;
	private String unity_location;
	private Integer unity_private;
	private String unity_thumbnail_path;
	private String unity_banner_path;
	private String unity_banner_set;
	private Timestamp unity_create_time;

	private MultipartFile unity_thumbnail_file;
	private MultipartFile unity_banner_file;
	
	private List<UnityBoardVO> unity_boards;
	
	private Integer user_code;
	private String unity_member_grade;
	private List<UserVO> unity_member;
	
	private String unity_last_post;
	private String unity_type;
}
