package com.ringo.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ringo.domain.UnityVO;
import com.ringo.domain.RepleVO;
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
	public Integer modifyUnityMember(UnityMemberVO vo) {
		return unitydao.updateUnityMember(vo);
	}

	@Override
	public List<UnityVO> getUnities(String user_code) {
		return unitydao.selectUnities(user_code);
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
}
