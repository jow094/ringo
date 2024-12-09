package com.ringo.service;

import java.util.List;
import java.util.Map;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;

public interface PostService {
	public Integer getLastRepleCode();
	public Integer uploadReple(RepleVO vo);
	public List<RepleVO> getReple(RepleVO vo);
	
	public Integer getLastCirclePostCode();
	public Integer uploadCirclePost(PostVO vo);
	public List<PostVO> getCirclePost(String user_code);
	
	public Integer getLastUnityPostCode();
	public Integer uploadUnityPost(PostVO vo);
	public UnityBoardVO getUnityBoard(UnityBoardVO vo);
	public List<PostVO> getUnityPost(UnityBoardVO vo);
	public Map<String,Object> getUnityBoardPost(UnityBoardVO vo);
	public List<PostVO> getMoreUnityPost(UnityBoardVO vo);
	public Map<String,Object> getRecommInfo(String user_code,String target_code);
}
