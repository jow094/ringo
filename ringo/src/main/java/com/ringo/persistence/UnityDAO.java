package com.ringo.persistence;

import java.util.List;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.domain.UnityMemberVO;
import com.ringo.domain.UnityVO;
import com.ringo.domain.UserVO;

public interface UnityDAO {
	public Integer selectDupleUnityName(String data);
	public Integer insertUnity(UnityVO vo);
	public Integer insertUnityMember(UnityMemberVO vo);
	public Integer updateUnityMember(UnityMemberVO vo);
	public Integer selectLastUnityCode();
	public List<UnityVO> selectUnities(String user_code);
	public UnityVO selectUnity(UnityVO vo);
	public UnityVO selectUnityMain(UnityVO vo);
	public List<PostVO> selectUnityBasicPost(UnityVO vo);
	public UnityBoardVO selectUnityboardInfo(UnityBoardVO vo);
	public Integer updateUnityInfo(UnityVO vo);
}
