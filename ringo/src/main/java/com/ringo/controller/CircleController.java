package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.UserVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UserVO;
import com.ringo.service.UserService;
import com.ringo.service.MsgService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;
import com.ringo.service.UserService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(value = "/circle/*")
public class CircleController {
	
	@Inject
	private PostService pService;
	
	private static final Logger logger = LoggerFactory.getLogger(CircleController.class);
	
	private String uploadPath = "C:/ringo_files/circle/upload/";
	
	@RequestMapping(value = "/post", method = RequestMethod.GET)
	@ResponseBody
	public List<PostVO> circlePostGET(HttpSession session, String user_code) {
		if(user_code==null) {
			user_code = (String)session.getAttribute("user_code");
		}
		
		logger.debug("circlePostsGET(String user_code) - user_code : "+user_code);
		return pService.getCirclePost(user_code);
	}
	
	@RequestMapping(value = "/post", method = RequestMethod.POST)
	@ResponseBody
	public Integer circlePostPOST(HttpSession session, PostVO vo) {
		logger.debug("circlePostPOST(MemberVO) - vo : "+vo);
		
		Integer last_post_code = pService.getLastCirclePostCode();
		
		if(last_post_code==null) {
			last_post_code = 0;
		}
		
		String writer = (String)session.getAttribute("user_code");
		String post_code = "cp_"+(last_post_code+1)+"-"+writer;
		
		vo.setPost_code(post_code);
		vo.setPost_writer(writer);
        
		try {
			List<MultipartFile> files = vo.getPosting_files(); 
			StringBuilder post_file_path = new StringBuilder();
			
			if(files != null && !files.isEmpty()) {
				int i = 1;
				for (MultipartFile file : files) {
				    if (!file.isEmpty()) {
				        String originalFileName = file.getOriginalFilename();
		
				        String extension = "";
				        if (originalFileName != null && originalFileName.contains(".")) {
				            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				        }
		
				        String fileName = post_code + "_img" + i + extension;
		
				        if (post_file_path.length() > 0) {
				        	post_file_path.append(",");
				        }
				        post_file_path.append(fileName);
		
				        File dest = new File(uploadPath + fileName);
				        try {
				            file.transferTo(dest);
				        } catch (IOException e) {
				            e.printStackTrace();
				        }
		
				        i++;
				    }
				}
			}
			
			vo.setPost_file_path(post_file_path.toString());
			
			return pService.uploadCirclePost(vo);
			
		} catch (Exception e) {
	    	return 0;
	    }
	}
}
