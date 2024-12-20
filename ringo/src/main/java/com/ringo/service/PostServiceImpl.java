package com.ringo.service;

import java.io.File;
import java.util.List;
import java.util.Map;

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
	public List<RepleVO> getReple(String user_code, String target_code) {
		return pdao.selectReple(user_code,target_code);
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
	public List<PostVO> getCirclePost(String visit_code, String user_code) {
		return pdao.selectCirclePost(visit_code,user_code);
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
	public UnityBoardVO getUnityBoard(UnityBoardVO vo) {
		return pdao.selectUnityBoard(vo);
	}
	
	@Override
	public List<PostVO> getUnityPost(UnityBoardVO vo) {
		return pdao.selectUnityPost(vo);
	}
	
	@Override
	public Map<String,Object> getUnityBoardPost(UnityBoardVO vo) {
		return pdao.selectUnityBoardPost(vo);
	}

	@Override
	public List<PostVO> getMoreUnityPost(UnityBoardVO vo) {
		return pdao.selectMoreUnityPost(vo);
	}

	@Override
	public Map<String,Object>  getRecommInfo(String user_code, String target_code) {
		return pdao.selectRecommInfo(user_code,target_code);
	}

	@Override
	public Integer removePost(String post_code) {
		return pdao.deletePost(post_code);
	}

	@Override
	public PostVO getPost(String post_code) {
		return pdao.selectPost(post_code);
	}

	@Override
	public Integer modifyPost(PostVO vo) {
		return pdao.updatePost(vo);
	}
	
	@Override
	public void removeTempFromFiles(String directoryPath) {
        File dir = new File(directoryPath);

        if (dir.exists() && dir.isDirectory()) {
            File[] files = dir.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isFile() && file.getName().contains("temp_")) {
                        String newFileName = file.getName().replace("temp_", "");

                        File renamedFile = new File(dir, newFileName);
                        file.renameTo(renamedFile);
                    }
                }
            }
        } else {
        }
    }

	@Override
	public List<PostVO> getTagsPost(Map<String, Object> param) {
		return pdao.selectTagsPost(param);
	}

	@Override
	public List<PostVO> getNearPost(Map<String, Object> param) {
		return pdao.selectNearPost(param);
	}
	
	@Override
	public List<PostVO> getConnectedPost(Map<String, Object> param) {
		return pdao.selectConnectedPost(param);
	}
	
	
}
