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
	
	@RequestMapping(value = "/reple", method = RequestMethod.GET)
	@ResponseBody
	public List<PostVO> repleGET(HttpSession session, RepleVO vo) {
		logger.debug("repleGET(RepleVO vo) - vo : "+vo);
		
		return null;
	}
}
