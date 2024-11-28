package com.ringo.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.persistence.PostDAO;

@Service
public class PostServiceImpl implements PostService {
	
	private static final Logger logger = LoggerFactory.getLogger(PostServiceImpl.class);
	
	@Inject
	private PostDAO pdao;
	
	@Override
	public Integer getLastRepleCode() {
		return pdao.selectLastRepleCode();
	}
	
	@Override
	public Integer uploadReple(RepleVO vo) {
		return pdao.insertReple(vo);
	}

	@Override
	public List<RepleVO> getReple(RepleVO vo) {
		return pdao.selectReple(vo);
	}
	
	@Override
	public Integer getLastCirclePostCode() {
		return pdao.selectLastCirclePostCode();
	}
	
	@Override
	public Integer uploadCirclePost(PostVO vo) {
		return pdao.insertCirclePost(vo);
	}

	@Override
	public List<PostVO> getCirclePost(String user_code) {
		return pdao.selectCirclePost(user_code);
	}

	@Override
	public Integer getLastUnityPostCode() {
		return pdao.selectLastUnityPostCode();
	}
	
	@Override
	public Integer uploadUnityPost(PostVO vo) {
		return pdao.insertUnityPost(vo);
	}
	
	@Override
	public List<PostVO> getUnityPost(PostVO vo) {
		return pdao.selectUnityPost(vo);
	}

	@Override
	public List<PostVO> getUnityBoard(PostVO vo) {
		return pdao.selectUnityBoard(vo);
	}
	
	
}
