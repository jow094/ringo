package com.ringo.persistence;

import java.util.List;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityVO;

public interface UnityDAO {
	public Integer selectDupleUnityName(String data);
	public Integer insertUnity(UnityVO vo);
	public Integer insertUnityMember(UnityVO vo);
	public Integer updateUnityMember(UnityVO vo);
	public Integer selectLastUnityCode();
	public List<UnityVO> selectUnities(Integer user_code);
	public UnityVO selectUnity(UnityVO vo);
	
	
	
	public List<PostVO> selectUnityPost(UnityVO vo);
	public List<RepleVO> selectReple(UnityVO vo);
	public Integer insertUnityPost(UnityVO vo);
}
