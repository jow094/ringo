package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.MemberVO;
import com.ringo.service.MemberService;
import com.ringo.service.MessageService;

import io.swagger.annotations.Api;

// http://localhost:8082/swagger-ui/index.html

@Controller
@RequestMapping(value = "/main/*")
/*
 * @RequestMapping("/api")
 * 
 * @Api(tags = "메인 컨트롤러")
 */
public class MainController {
	
	@Inject
	private MemberService mService;
	@Inject
	private MessageService msgService;
	
	/*
	 * private String uploadPath = System.getProperty("catalina.base") +
	 * "/webapps/ringo/uploads/";
	 */
	private String uploadPath = "C:/ringo_files/profiles/";
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginGET(Locale locale, Model model) {
		logger.debug("loginGET()");
		
		return "login";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String loginPOST(HttpSession session, MemberVO vo) {
		logger.debug("loginPOST(MemberVO) - vo : "+vo);
		
		MemberVO result = mService.memberLogin(vo);
		session.setAttribute("user_id", result.getUser_id());
		session.setAttribute("user_name", result.getUser_name());
		session.setAttribute("user_thumbnail", result.getUser_thumbnail());
		
		logger.debug("loginPOST(MemberVO) - result : "+result);
		return "redirect:/main/home";
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String homeGET(HttpSession session, MemberVO vo) {
		logger.debug("mainGET(MemberVO) - vo : "+vo);
		
		return "home";
	}
	
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public String joinGET(HttpSession session, MemberVO vo) {
		logger.debug("joinGET(MemberVO) - vo : "+vo);
		
		return "join";
	}
	
	@RequestMapping(value = "/join", method = RequestMethod.POST)
	public String joinPOST(HttpSession session, MemberVO vo, BindingResult result) {
		if (result.hasErrors()) {
	        logger.error("joinPOST(MemberVO) - Binding error : " + result.getAllErrors());
	        
	        return "/main/join"; //
	    }
		logger.debug("joinPOST(MemberVO) - vo : "+vo);
		
		Integer user_code = mService.getLastUserCode(vo);
		
		if(user_code==null) {
			user_code = 0;
		}
		
		user_code++;
		
		List<MultipartFile> fileList = vo.getUser_profile_file();
		List<String> fileNames = new ArrayList<String>();

		Integer i = 1;
		
		for (MultipartFile file : fileList) {
	        if (!file.isEmpty()) {
	        	String originalFileName = file.getOriginalFilename();

	        	String extension = "";
	        	if (originalFileName != null && originalFileName.contains(".")) {
	        	    extension = originalFileName.substring(originalFileName.lastIndexOf("."));
	        	}
	        	
                String fileName = vo.getUser_server() + "_" + vo.getUser_nationality() + "_" + user_code + "-" + i + extension;

                File dest = new File(uploadPath + fileName);
                try {
					file.transferTo(dest);
				} catch (IOException e) {
					e.printStackTrace();
				}

                fileNames.add(fileName);
                i++;
	        }
	    }
		
		while (fileNames.size() < 8) {
			fileNames.add("");
	    }
		
		vo.setUser_profile_path(fileNames);
		vo.setUser_code(user_code);

		mService.memberJoin(vo);
		
		return "redirect:/main/login";
	}
	
}
