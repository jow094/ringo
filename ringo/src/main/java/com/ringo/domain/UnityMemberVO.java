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
	
	private String unity_member_code;
	private String unity_member_nickname;
	private String unity_member_nation;
	private String unity_member_gender;
	private String unity_member_birth;
	
	private String unity_member_logon;
	private String unity_member_grade;
	private Integer unity_visit_count;
	private Integer unity_write_count;
	private Integer unity_reple_count;
	private Timestamp unity_join_time;
}
