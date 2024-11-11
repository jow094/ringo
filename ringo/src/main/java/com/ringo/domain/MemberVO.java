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
public class MemberVO {
	
	private Integer user_code;
	private String user_id;
	private String user_pw;
	private String user_name;
	private String user_nickname;
	private Date user_birth;
	private String user_nationality;
	private String user_gender;
	private String user_tel;
	private String user_email;
	private String user_addr;
	private String user_fluent_language;
	private String user_learning_language;
	private String user_topic;
	private String user_ideal_partner;
	private String user_objective;
	private String user_grade;
	
	private String user_thumbnail;
	private List<String> user_profile_path;
	private List<MultipartFile> user_profile_file;
	
	private boolean user_logon;
	
	private String user_server;
	private SettingVO user_setting;
	private List<String> follower;
	private List<String> following;
	
}
