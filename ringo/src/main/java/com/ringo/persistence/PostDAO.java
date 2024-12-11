package com.ringo.persistence;

import java.util.List;
import java.util.Map;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;

public interface PostDAO {
	
	public Integer selectLastRepleCode();
	public Integer insertReple(RepleVO vo);
	public List<RepleVO> selectReple(RepleVO vo);
	
	public Integer selectLastCirclePostCode();
	public Integer insertCirclePost(PostVO vo);
	public List<PostVO> selectCirclePost(String user_code);
	
	public Integer selectLastUnityPostCode();
	public Integer insertUnityPost(PostVO vo);
	public UnityBoardVO selectUnityBoard(UnityBoardVO vo);
	public List<PostVO> selectUnityPost(UnityBoardVO vo);
	public Map<String,Object> selectUnityBoardPost(UnityBoardVO vo);
	public List<PostVO> selectMoreUnityPost(UnityBoardVO vo);
	public Map<String,Object> selectRecommInfo(String user_code,String target_code);
	
	
	
	
}
