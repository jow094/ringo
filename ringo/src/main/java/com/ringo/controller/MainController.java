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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.MemberVO;
import com.ringo.service.MemberService;
import com.ringo.service.MessageService;
import com.ringo.service.TwilloService;
import com.ringo.service.EmailService;

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
	@Inject
    private TwilloService tService;
	@Inject
	private EmailService emailService;
	
	/*
	 * private String uploadPath = System.getProperty("catalina.base") +
	 * "/webapps/ringo/uploads/";
	 */
	private String uploadPath = "C:/ringo_files/profiles/";
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String homeGET(HttpSession session, MemberVO vo) {
		logger.debug("mainGET(MemberVO) - vo : "+vo);
		
		return "home";
	}
}
