package com.ringo.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ringo.domain.UnityVO;
import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.domain.UnityMemberVO;
import com.ringo.persistence.UnityDAO;
import com.ringo.persistence.UnityDAO;

@Service
public class UnityServiceImpl implements UnityService {
	
	private static final Logger logger = LoggerFactory.getLogger(UnityServiceImpl.class);
	
	@Inject
	private UnityDAO unitydao;
	
	@Override
	public Integer createUnity(UnityVO vo) {
		return unitydao.insertUnity(vo);
	}
	
	@Override
	public Integer shutDownUnity(String unity_code) {
		return unitydao.deleteUnity(unity_code);
	}

	@Override
	public Integer checkDuplication(String data) {
		return unitydao.selectDupleUnityName(data);
	}

	@Override
	public Integer getLastUnityCode() {
		return unitydao.selectLastUnityCode();
	}

	@Override
	public Integer joinUnity(UnityMemberVO vo) {
		return unitydao.insertUnityMember(vo);
	}
	@Override
	public Integer leaveUnity(UnityMemberVO vo) {
		return unitydao.deleteUnityMember(vo);
	}

	@Override
	public Integer modifyUnityMember(UnityMemberVO vo) {
		return unitydao.updateUnityMember(vo);
	}
	
	@Override
	public Integer checkUnityMember(String unity_code, String user_code) {
		return unitydao.selectIsMember(unity_code,user_code);
	}

	@Override
	public List<UnityVO> getUnities(AlgorithmVO vo) {
		return unitydao.selectUnities(vo);
	}
	
	@Override
	public UnityVO getUnityProfile(UnityVO vo) {
		return unitydao.selectUnity(vo);
	}
	
	@Override
	public UnityVO getUnityMain(UnityVO vo) {
		
		UnityVO result = unitydao.selectUnityMain(vo);
		result.setUnity_post(unitydao.selectUnityBasicPost(vo));
		
		return result;
	}

	@Override
	public UnityBoardVO getUnityBoardInfo(UnityBoardVO vo) {
		return unitydao.selectUnityboardInfo(vo);
	}

	@Override
	public List<UnityBoardVO> getUnityBoards(String user_code) {
		
		return unitydao.selectUnityboards(user_code);
	}

	@Override
	public Integer modifyUnity(UnityVO vo) {
		return unitydao.updateUnityInfo(vo);
	}

	@Override
	public Integer renewUnityBoard(List<UnityBoardVO> voList, String unity_code) {
		return unitydao.resetUnityBoard(voList,unity_code);
	}
	
	
}
