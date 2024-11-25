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
import com.ringo.domain.UnityVO;
import com.ringo.domain.UserVO;
import com.ringo.service.UserService;
import com.ringo.service.MessageService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;
import com.ringo.service.UnityService;
import com.ringo.service.UserService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(value = "/unity/*")
public class UnityController {
	
	@Inject
	private UserService uService;
	@Inject
	private UnityService unityService;
	@Inject
	private MessageService msgService;
	@Inject
    private TwilloService tService;
	@Inject
	private AuthenticationService emailService;
	@Inject
	private PostService pService;
	
	private static final Logger logger = LoggerFactory.getLogger(UnityController.class);
	
	private String uploadPath_circle = "C:/ringo_files/circle/upload/";
	private String uploadPath_unity = "C:/ringo_files/unity/upload/";
	private String uploadPath_unity_thumbnail = "C:/ringo_files/unity/thumbnail/";
	private String uploadPath_unity_banner = "C:/ringo_files/unity/banner/";
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	@ResponseBody
	public UnityVO unityMainGET(HttpSession session, UnityVO vo) {
		logger.debug("unityMainGET(UnityVO) - vo : "+vo);
		
		return null;
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseBody
	public Integer unityCreatePOST(HttpSession session, UnityVO vo) {
		
		logger.debug("unityCreatePOST - vo : " + vo);
		logger.debug("unityCreatePOST - thumbnailFile : " + vo.getUnity_thumbnail_file());
		logger.debug("unityCreatePOST - banner : " + vo.getUnity_banner_file());
		
		try {
			
			Integer unity_code = unityService.getLastUnityCode();
			
			if(unity_code==null) {
				unity_code = 0;
			}
			
			unity_code++;
			
			MultipartFile unity_thumbnail_file = vo.getUnity_thumbnail_file();
			String unity_thumbnail_path = "";
			MultipartFile unity_banner_file = vo.getUnity_banner_file();
			String unity_banner_path = "";
			
			if (unity_thumbnail_file != null && !unity_thumbnail_file.isEmpty()) {
		        String originalFileName = unity_thumbnail_file.getOriginalFilename();
	
		        String extension = "";
		        if (originalFileName != null && originalFileName.contains(".")) {
		            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		        }
	
		        unity_thumbnail_path = unity_code + "_thumbnail" + extension;
	
		        File dest = new File(uploadPath_unity_thumbnail + unity_thumbnail_path);
		        try {
		        	unity_thumbnail_file.transferTo(dest);
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		    }
			
			if(unity_banner_file != null && !unity_banner_file.isEmpty()) {
		        String originalFileName = unity_banner_file.getOriginalFilename();

		        String extension = "";
		        if (originalFileName != null && originalFileName.contains(".")) {
		            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		        }

		        unity_banner_path = unity_code + "_banner" + extension;

		        File dest = new File(uploadPath_unity_banner + unity_banner_path);
		        try {
		        	unity_banner_file.transferTo(dest);
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
			}
			
			vo.setUnity_code(unity_code);
			vo.setUnity_admin((Integer)session.getAttribute("user_code"));
			vo.setUser_code((Integer)session.getAttribute("user_code"));
			vo.setUnity_thumbnail_path(unity_thumbnail_path);
			vo.setUnity_banner_path(unity_banner_path);
			vo.setUnity_member_grade("admin");
			
			logger.debug("unityCreatePOST( UnityVO vo) - vo : "+vo);
			
			Integer result = unityService.createUnity(vo);
			
			if(result == 1) {
				Integer joinResult = unityService.joinUnity(vo);
				if(joinResult == 1) {
					unityService.modifyUnityMember(vo);
				}
			}
			return result;
			
	    } catch (Exception e) {
	    	return 0;
	    }
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	@ResponseBody
	public List<UnityVO> unityHomeGET(HttpSession session) {
		logger.debug("unityHomeGET()");
		
		Integer user_code = (Integer)session.getAttribute("user_code");
		
		return unityService.getUnities(user_code);
	}
	
	@RequestMapping(value = "/unity", method = RequestMethod.GET)
	@ResponseBody
	public UnityVO unityUnityGET(HttpSession session, Integer unity_code) {
		logger.debug("unityUnityGET(Integer unity_code) - unity_code : "+unity_code);
		
		UnityVO vo = new UnityVO();
		vo.setUnity_code(unity_code);
		vo.setUser_code((Integer)session.getAttribute("user_code"));
		
		UnityVO result = unityService.getUnity(vo);
		
		logger.debug("result : "+result);
		return result;
	}
	
	@RequestMapping(value = "/unity", method = RequestMethod.POST)
	@ResponseBody
	public Integer unityUnityPOST(HttpSession session, UnityVO vo) {
		logger.debug("unityPOST(UnityVO) - vo : "+vo);
		/*
		 * Integer postingCode = (pService.getLastCirclePostCode() != null) ?
		 * pService.getLastCirclePostCode() + 1 : 1; Integer writerCode =
		 * (Integer)session.getAttribute("user_code");
		 * 
		 * vo.setPost_code(postingCode); vo.setPost_writer(writerCode);
		 * 
		 * try { List<MultipartFile> files = vo.getPosting_files(); StringBuilder
		 * post_file_path = new StringBuilder();
		 * 
		 * if(files != null && !files.isEmpty()) { int i = 1; for (MultipartFile file :
		 * files) { if (!file.isEmpty()) { String originalFileName =
		 * file.getOriginalFilename();
		 * 
		 * String extension = ""; if (originalFileName != null &&
		 * originalFileName.contains(".")) { extension =
		 * originalFileName.substring(originalFileName.lastIndexOf(".")); }
		 * 
		 * String fileName = writerCode.toString() + "_" + postingCode + "_" + i +
		 * extension;
		 * 
		 * if (post_file_path.length() > 0) { post_file_path.append(","); }
		 * post_file_path.append(fileName);
		 * 
		 * File dest = new File(uploadPath_circle + fileName); try {
		 * file.transferTo(dest); } catch (IOException e) { e.printStackTrace(); }
		 * 
		 * i++; } } }
		 * 
		 * vo.setPost_file_path(post_file_path.toString());
		 * 
		 * return pService.uploadCirclePost(vo);
		 * 
		 * } catch (Exception e) { return 0; }
		 */
		return null;
	}
}
