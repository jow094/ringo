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
import com.ringo.service.MessageService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;
import com.ringo.service.UserService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(value = "/main/*")
public class MainController {
	
	@Inject
	private UserService uService;
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
	
	public Integer getCode(String user_fcode) {
	    if (user_fcode.contains("_")) {
	        return Integer.parseInt(user_fcode.split("_")[0]);
	    }
	    return Integer.parseInt(user_fcode);
	}
	
	public Integer getPrivate(String user_fcode) {
	    if (user_fcode.contains("_")) {
	        return Integer.parseInt(user_fcode.split("_")[1]);
	    }
	    return null;
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String mainHomeGET(HttpSession session, UserVO vo) {
		logger.debug("mainHomeGET(MemberVO) - vo : "+vo);
		
		return "home";
	}
	
	@RequestMapping(value = "/reple", method = RequestMethod.POST)
	@ResponseBody
	public Integer replePOST(HttpSession session, RepleVO vo) {
		logger.debug("replePOST(RepleVO vo) - vo : "+vo);
		
		Integer last_reple_code = pService.getLastRepleCode();
		
		if(last_reple_code==null) {
			last_reple_code = 0;
		}
		
		String reple_code = "rp_"+(last_reple_code+1);
		
		vo.setReple_writer((String)session.getAttribute("user_code"));
		vo.setReple_code(reple_code);
		
		return pService.uploadReple(vo);
	}
	
	@RequestMapping(value = "/reple", method = RequestMethod.GET)
	@ResponseBody
	public List<RepleVO> repleGET(HttpSession session, RepleVO vo) {
		logger.debug("repleGET(RepleVO vo) - vo : "+vo);
		
		return pService.getReple(vo);
	}
	
}
