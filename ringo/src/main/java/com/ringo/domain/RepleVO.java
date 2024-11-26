package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class RepleVO {
	private String writer_thumbnail_path;
	private String writer_nickname;
	private String reple_writer;
	private String reple_code;
	private String reple_target;
	private String reple_content;
	private Timestamp reple_time;
	private Integer reple_recomm_count;
	private String reple_recomm_user;
	private boolean reple_ismodify;
}
