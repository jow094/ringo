package com.ringo.service;

import java.util.List;
import java.util.Map;

import com.ringo.domain.UnityVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.domain.UnityMemberVO;

public interface UnityService {
	public Integer createUnity(UnityVO vo);
	public Integer shutDownUnity(String unity_code);
	public Integer getLastUnityCode();
	public Integer checkDuplication(String data);
	public Integer joinUnity(UnityMemberVO vo);
	public Integer leaveUnity(UnityMemberVO vo);
	public Integer modifyUnityMember(UnityMemberVO vo);
	public Integer checkUnityMember(String unity_code,String user_code);
	public List<UnityVO> getUnities(AlgorithmVO vo);
	public UnityVO getUnityProfile(UnityVO vo);
	public UnityVO getUnityMain(UnityVO vo);
	public UnityBoardVO getUnityBoardInfo(UnityBoardVO vo);
	public List<UnityBoardVO> getUnityBoards(String user_code);
	public Integer modifyUnity(UnityVO vo);
	public Integer renewUnityBoard(List<UnityBoardVO> voList,String unity_code);
	public Integer initUnityBoard(String unity_code);
	
}
