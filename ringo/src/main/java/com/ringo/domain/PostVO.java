package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class PostVO {
	private String writer_unity_member_grade;
	private String writer_thumbnail_path;
	private String writer_nickname;
	private String post_code;
	private String post_place;
	private String post_place_name;
	private String post_writer;
	private String post_title;
	private String post_content;
	private Timestamp post_time;
	private List<MultipartFile> posting_files;
	private String post_tag;
	private String post_file_path;
	private Integer post_recomm_count;
	private Integer post_reple_count;
	private boolean post_ismodify;
	private List<RepleVO> reples;
	
	private Integer post_seq;
	private String post_type;
}
