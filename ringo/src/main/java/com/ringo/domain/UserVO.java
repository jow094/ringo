package com.ringo.domain;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
public class UserVO {
	
	private String user_fcode;
	private String user_code;
	private String user_id;
	private String user_pw;
	private String user_name;
	private String user_nickname;
	private Date user_birth;
	private String user_nation;
	private String user_gender;
	private String user_tel;
	private String user_email;
	private String user_address;
	
	private String user_native_lang;
	private String user_fluent_lang;
	private String user_learning_lang;
	
	private String user_intro;
	private String user_ideal_partner;
	private String user_objective;
	private String user_topic;
	
	private String user_interest;
	private String user_correction_degree;
	private String user_usually_time;
	private String user_method;
	
	private String user_grade;
	
	private MultipartFile user_thumbnail_file;
	private String user_thumbnail_path;
	private List<MultipartFile> user_profile_file;
	private String user_profile_path;
	
	private String user_logon;
	private Timestamp user_log_time;
	private String user_log_location;
	
	private Integer user_follower_count;
	private Integer user_following_count;
	
	private Integer mr_notifying;
	private Integer mr_favorite;
	private Integer user_private;
	private SettingVO user_setting;
	private List<UserVO> user_follower;
	private List<UserVO> user_following;
	private List<UserVO> user_favorite;
}
