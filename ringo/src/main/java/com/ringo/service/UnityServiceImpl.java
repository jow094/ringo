package com.ringo.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ringo.domain.UnityVO;
import com.ringo.domain.RepleVO;
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
	public Integer joinUnity(UnityVO vo) {
		return unitydao.insertUnityMember(vo);
	}

	@Override
	public Integer modifyUnityMember(UnityVO vo) {
		return unitydao.updateUnityMember(vo);
	}

	@Override
	public List<UnityVO> getUnities(String user_code) {
		return unitydao.selectUnities(user_code);
	}
	
	@Override
	public UnityVO getUnity(UnityVO vo) {
		return unitydao.selectUnity(vo);
	}
	
	
	
	
}
