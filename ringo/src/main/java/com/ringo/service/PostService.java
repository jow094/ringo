package com.ringo.service;

import java.util.List;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;

public interface PostService {
	public Integer uploadCirclePost(PostVO vo);
	public Integer getLastCirclePostCode();
	public List<PostVO> getCirclePost(Integer user_code);
	public Integer uploadReple(RepleVO vo);
	public List<RepleVO> getReple(RepleVO vo);
	
}
