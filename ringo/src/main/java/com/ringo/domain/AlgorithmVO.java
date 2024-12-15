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
public class AlgorithmVO {
	
	private String user_code;
	private String user_tags;
	private String user_langs;
	private String user_log_location;
	private String user_log_geolocation;
	private Timestamp since;
}
