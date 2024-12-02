package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import com.ringo.domain.MsgRoomVO;
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
@RequestMapping(value = "/msg/*")
public class MsgController {
	
	@Inject
	private UserService uService;
	@Inject
	private MsgService msgService;
	
	private static final Logger logger = LoggerFactory.getLogger(MsgController.class);
	
	private String uploadPath_img = "C:/ringo_files/messenger/img/";
	private String uploadPath_audio = "C:/ringo_files/messenger/audio/";
	
	@RequestMapping(value = "/roomList", method = RequestMethod.GET)
	@ResponseBody
	public List<MsgRoomVO> msgRoomListGET(HttpSession session) {
		
		logger.debug("msgMainGET");
		
		return msgService.getMsgRoomlist((String)session.getAttribute("user_code"));
	}
	
	@RequestMapping(value = "/personal", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> msgPersonalGET(HttpSession session, String user_code) {
		logger.debug("msgPersonalGET(String user_code) - user_code : "+user_code);
		
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code_1", (String)session.getAttribute("user_code"));
		param.put("user_code_2", user_code);
		String mr_code = msgService.getPersonalMsgRoom(param);
		
		if(mr_code == null) {
			return null;
		}else {
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("room", msgService.getMsgRoomInfo(mr_code));
			result.put("msg", msgService.getMsg(mr_code));
			return result;
		}
	}
	
	@RequestMapping(value = "/room", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> msgRoomGET(HttpSession session, String mr_code) {
		logger.debug("msgRoomGET(String mr_code) - mr_code : "+mr_code);
		
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("room", msgService.getMsgRoomInfo(mr_code));
		result.put("msg", msgService.getMsg(mr_code));
		return result;
	}
}
