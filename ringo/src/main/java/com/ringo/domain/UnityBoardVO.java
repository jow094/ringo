package com.ringo.domain;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UnityBoardVO {
	private Integer unity_code;
	private String unity_board_category;
	private String unity_board_name;
}