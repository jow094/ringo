package com.ringo.domain;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UnityBoardVO {
	
	private String user_code;
	
	private String unity_code;
	private String unity_board_code;
	private String unity_board_category;
	private Integer unity_board_category_order;
	private String unity_board_name;
	private Integer unity_board_order;
	private String unity_board_fullname;
	private String unity_post_code;
	private String unity_add_direction;
	
	private Integer unity_board_page;
	private Integer unity_board_page_count;
	private Integer unity_board_post_count;
	
	private List<PostVO> unity_post;
}
