package com.ringo.domain;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class PostVO {
	private String writer_thumbnail_path;
	private String writer_nickname;
	private Integer post_code;
	private Integer post_place;
	private Integer post_writer;
	private String post_content;
	private Timestamp post_time;
	private List<MultipartFile> posting_files;
	private String post_tag;
	private String post_file_path;
	private Integer post_recomm_count;
	private String post_recomm_user;
	private boolean post_ismodify;
	private List<RepleVO> reples;
}
