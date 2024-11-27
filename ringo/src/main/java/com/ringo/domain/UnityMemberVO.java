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
public class UnityMemberVO {
	
	private String unity_code;
	private String user_code;
	private String user_nickname;
	private String user_logon;
	
	private Integer unity_member_visit_times;
	private Integer unity_member_write_count;
	private Integer unity_member_reple_count;
	private String unity_member_grade;
	private Timestamp unity_member_since;
	
	private UserVO unity_member_info;
}
