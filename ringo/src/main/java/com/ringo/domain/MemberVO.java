package com.ringo.domain;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Repository;

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
	
	private String user_profile_1;
	private String user_profile_2;
	private String user_profile_3;
	private String user_profile_4;
	private String user_profile_5;
	private String user_profile_6;
	private String user_profile_7;
	private String user_profile_8;
	
	private boolean user_logon;
	
	private SettingVO user_setting;
	private List<String> follower;
	private List<String> following;
	
}
