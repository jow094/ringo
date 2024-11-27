package com.ringo.service;

import java.util.List;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;

public interface PostService {
	public Integer getLastCirclePostCode();
	public Integer uploadCirclePost(PostVO vo);
	public List<PostVO> getCirclePost(String user_code);
	
	public Integer getLastUnityPostCode();
	public Integer uploadUnityPost(PostVO vo);
	public List<PostVO> getUnityPost(String post_code);
	
	public Integer uploadReple(RepleVO vo);
	public List<RepleVO> getReple(RepleVO vo);
	
}
