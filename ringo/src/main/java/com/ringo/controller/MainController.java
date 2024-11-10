package com.ringo.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ringo.domain.MemberVO;
import com.ringo.service.MemberService;
import com.ringo.service.MessageService;

@Controller
public class MainController {
	
	@Inject
	private MemberService mService;
	@Inject
	private MessageService msgService;
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginGET(Locale locale, Model model) {
		return "login";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String loginPOST(HttpSession session, MemberVO vo) {
		session.setAttribute("user_id", vo.getUser_id());
		logger.debug("loginPOST(vo) - vo : "+vo);
		
		return "redirect:/main";
	}
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String mainGET(HttpSession session, MemberVO vo) {
		
		return "main";
	}
	
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public String joinGET(HttpSession session, MemberVO vo) {
		
		return "join";
	}
	
	@RequestMapping(value = "/join", method = RequestMethod.POST)
	public String joinPOST(HttpSession session, MemberVO vo) {
		mService.memberJoin(vo);
		logger.debug("joinPOST(vo) - vo : "+vo);
		
		return "redirect:/login";
	}
	
}
