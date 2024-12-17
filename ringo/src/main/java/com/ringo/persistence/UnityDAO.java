package com.ringo.persistence;

import java.util.List;
import java.util.Map;

import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.domain.UnityMemberVO;
import com.ringo.domain.UnityVO;
import com.ringo.domain.UserVO;

public interface UnityDAO {
	public Integer selectDupleUnityName(String data);
	public Integer insertUnity(UnityVO vo);
	public Integer deleteUnity(String unity_code);
	public Integer insertUnityMember(UnityMemberVO vo);
	public Integer deleteUnityMember(UnityMemberVO vo);
	public Integer updateUnityMember(UnityMemberVO vo);
	public Integer selectIsMember(String unity_code,String user_code);
	public Integer selectLastUnityCode();
	public List<UnityVO> selectUnities(AlgorithmVO vo);
	public UnityVO selectUnity(UnityVO vo);
	public UnityVO selectUnityMain(UnityVO vo);
	public List<PostVO> selectUnityBasicPost(UnityVO vo);
	public UnityBoardVO selectUnityboardInfo(UnityBoardVO vo);
	public List<UnityBoardVO> selectUnityboards(String unity_code);
	public Integer updateUnityInfo(UnityVO vo);
	public Integer resetUnityBoard(List<UnityBoardVO> voList,String unity_code);
	public Integer deleteUnityBoards(String unity_code);
}
