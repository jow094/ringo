package com.ringo.domain;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UnityBoardVO {
	
	private String user_code;
	private String unity_code;
	
	private String ub_category_code;
	private String ub_category_name;
	private Integer ub_category_order;
	private String ub_board_code;
	private String ub_board_name;
	private Integer ub_board_order;
	
	private String ub_board_fullname;
	
	private String upost_code;
	private String ub_add_direction;
	
	private Integer ub_page;
	private Integer ub_page_count;
	private Integer ub_post_count;
	
	private List<PostVO> unity_post;
}
