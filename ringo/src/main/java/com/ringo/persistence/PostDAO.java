package com.ringo.persistence;

import java.util.List;

import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;

public interface PostDAO {
	public Integer insertCirclePost(PostVO vo);
	public Integer selectLastCirclePostCode();
	public List<PostVO> selectCirclePost(String user_code);
	public List<RepleVO> selectReple(RepleVO vo);
	public Integer insertReple(RepleVO vo);
}
