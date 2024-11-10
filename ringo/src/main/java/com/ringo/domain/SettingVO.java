package com.ringo.domain;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class SettingVO {
	private String user_code;
	private boolean profile_recomm;
	private boolean logon_expose;
	private boolean follow_expose;
	private boolean board_expose;
	private Integer ideal_distance;
	private String ideal_gender;
	private Date ideal_min_birth;
	private Date ideal_max_birth;
	private String ideal_nationality;
}
