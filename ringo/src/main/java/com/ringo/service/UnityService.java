package com.ringo.service;

import java.util.List;

import com.ringo.domain.UnityVO;
import com.ringo.domain.RepleVO;

public interface UnityService {
	public Integer createUnity(UnityVO vo);
	public Integer getLastUnityCode();
	public Integer checkDuplication(String data);
	public Integer joinUnity(UnityVO vo);
	public Integer modifyUnityMember(UnityVO vo);
	public List<UnityVO> getUnities(String user_code);
	public UnityVO getUnity(UnityVO vo);
	
	
}
