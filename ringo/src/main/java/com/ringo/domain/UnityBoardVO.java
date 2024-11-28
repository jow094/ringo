package com.ringo.domain;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UnityBoardVO {
	private String unity_code;
	private String unity_board_code;
	private String unity_board_category;
	private String unity_board_name;
	private Integer unity_board_page;
	private String unity_post_code;
	
	private List<PostVO> unity_post;
}
