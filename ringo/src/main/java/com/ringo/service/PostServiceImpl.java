package com.ringo.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.persistence.PostDAO;

@Service
public class PostServiceImpl implements PostService {
	
	private static final Logger logger = LoggerFactory.getLogger(PostServiceImpl.class);
	
	@Inject
	private PostDAO pdao;
	
	@Override
	public Integer uploadCirclePost(PostVO vo) {
		logger.debug("uploadPost(PostVO) - vo : "+vo);
		return pdao.insertCirclePost(vo);
	}
	
	@Override
	public Integer getLastCirclePostCode() {
		logger.debug("getLastUserCode()");
		return pdao.selectLastCirclePostCode();
	}

	@Override
	public List<PostVO> getCirclePost(String user_code) {
		logger.debug("getCirclePost(Integer user_code) - user_code : "+user_code);
		return pdao.selectCirclePost(user_code);
	}

	@Override
	public Integer uploadReple(RepleVO vo) {
		logger.debug("uploadReple(RepleVO) - vo : "+vo);
		return pdao.insertReple(vo);
	}

	@Override
	public List<RepleVO> getReple(RepleVO vo) {
		logger.debug("getReple(RepleVO) - vo : "+vo);
		return pdao.selectReple(vo);
	}
	
	
	
}
