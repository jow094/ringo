package com.ringo.domain;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UnityVO {
	private String unity_code;
	private String unity_name;
	private String unity_admin;
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
	private Timestamp unity_since;
	private String unity_grade;
	private String unity_member_count;

	private String unity_last_post;
	
	private List<UnityBoardVO> unity_board;
	private List<PostVO> unity_post;
	
	private MultipartFile unity_thumbnail_file;
	private MultipartFile unity_banner_file;

	private String user_code;
	private UnityMemberVO unity_member;
	private String unity_member_grade;
	
	private String unity_type;
}
