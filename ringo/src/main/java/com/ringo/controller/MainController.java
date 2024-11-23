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

import com.ringo.domain.MemberVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.service.MemberService;
import com.ringo.service.MessageService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(value = "/main/*")
public class MainController {
	
	@Inject
	private MemberService mService;
	@Inject
	private MessageService msgService;
	@Inject
    private TwilloService tService;
	@Inject
	private AuthenticationService emailService;
	@Inject
	private PostService pService;
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	private String uploadPath_circle = "C:/ringo_files/circle/upload/";
	private String uploadPath_unity = "C:/ringo_files/unity/upload/";
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String homeGET(HttpSession session, MemberVO vo) {
		logger.debug("mainGET(MemberVO) - vo : "+vo);
		
		return "home";
	}
	
	@RequestMapping(value = "/circle", method = RequestMethod.GET)
	@ResponseBody
	public List<PostVO> circleGET(HttpSession session, Integer user_code) {
		logger.debug("circleGET(Integer user_code) - user_code : "+user_code);
		if(user_code==0||user_code==null) {
			user_code = (Integer)session.getAttribute("user_code");
		}
		
		return pService.getCirclePost(user_code);
	}
	
	@RequestMapping(value = "/circle", method = RequestMethod.POST)
	@ResponseBody
	public Integer circlePOST(HttpSession session, PostVO vo) {
		logger.debug("circlePOST(MemberVO) - vo : "+vo);
		
		Integer postingCode = (pService.getLastCirclePostCode() != null) ? pService.getLastCirclePostCode() + 1 : 1;
		Integer writerCode = (Integer)session.getAttribute("user_code");
		
		vo.setPost_code(postingCode);
		vo.setPost_writer(writerCode);
        
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
		
				        String fileName = writerCode.toString()  + "_" + postingCode + "_" + i + extension;
		
				        if (post_file_path.length() > 0) {
				        	post_file_path.append(",");
				        }
				        post_file_path.append(fileName);
		
				        File dest = new File(uploadPath_circle + fileName);
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
	
	@RequestMapping(value = "/reple", method = RequestMethod.GET)
	@ResponseBody
	public List<RepleVO> repleGET(HttpSession session, RepleVO vo) {
		logger.debug("repleGET(RepleVO vo) - vo : "+vo);
		
		return pService.getReple(vo);
	}
	
	@RequestMapping(value = "/reple", method = RequestMethod.POST)
	@ResponseBody
	public Integer replePOST(HttpSession session, RepleVO vo) {
		logger.debug("replePOST(RepleVO vo) - vo : "+vo);
		vo.setReple_writer((Integer)session.getAttribute("user_code"));
		return pService.uploadReple(vo);
	}
}
