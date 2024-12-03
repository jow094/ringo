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
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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
import com.ringo.domain.MsgVO;
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
	
	@RequestMapping(value = "/connect", method = RequestMethod.GET)
	@ResponseBody
	public List<String> connectGET(HttpSession session) {
		
		return msgService.getUserMsgRoomList((String)session.getAttribute("user_code"));
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
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("user_nickname", uService.getUserNickname(user_code));
			return result;
		}else {
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("mr_code", mr_code);
			return result;
		}
	}
	
	@RequestMapping(value = "/personal", method = RequestMethod.POST)
	@ResponseBody
	public MsgRoomVO msgPersonalPost(HttpSession session, String user_code) {
		logger.debug("msgPersonalPOST(String user_code) - user_code : "+user_code);
		
		MsgRoomVO vo = new MsgRoomVO();
		
		Integer last_msg_room_code = msgService.getLastMsgRoomCode();
		Integer mr_code;
		if(last_msg_room_code == null) {
			mr_code = 1;
		}else {
			mr_code = last_msg_room_code+1;
		}
		
		vo.setMr_code("mr_"+mr_code);
		vo.setMr_inviter((String)session.getAttribute("user_code"));
		vo.setMr_admin((String)session.getAttribute("user_code"));
		vo.setMr_guest(user_code);
		
		return msgService.createMsgRoom(vo);
	}
	
	@RequestMapping(value = "/inRoom", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> msgInRoomGET(HttpSession session, String mr_code) {
		logger.debug("msgInRoomGET(String mr_code) - mr_code : "+mr_code);
		
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("room", msgService.getMsgRoomInfo((String)session.getAttribute("user_code"),mr_code));
		result.put("msg", msgService.getMsg((String)session.getAttribute("user_code"),mr_code));
		return result;
	}
	
	@RequestMapping(value = "/send", method = RequestMethod.POST)
	@ResponseBody
	public Integer msgSendPost(HttpSession session, MsgVO vo) {
		logger.debug("msgSendPost(MsgVO vo) - vo : "+vo);
		
		Integer last_msg_code = msgService.getLastMsgCode();
		
		if(last_msg_code==null) {
			last_msg_code = 0;
		}
		
		UserVO writer = new UserVO();
		writer.setUser_code((String)session.getAttribute("user_code"));
		String msg_code = "msg_"+(last_msg_code+1);
		
		vo.setMsg_code(msg_code);
		vo.setMsg_sender(writer);
        
		try {
			List<MultipartFile> files = vo.getMsg_file(); 
			StringBuilder msg_file_path = new StringBuilder();
			
			if(files != null && !files.isEmpty()) {
				int i = 1;
				for (MultipartFile file : files) {
				    if (!file.isEmpty()) {
				        String originalFileName = file.getOriginalFilename();
		
				        String extension = "";
				        if (originalFileName != null && originalFileName.contains(".")) {
				            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				        }
		
				        String fileName = msg_code + "_img" + i + extension;
		
				        if (msg_file_path.length() > 0) {
				        	msg_file_path.append(",");
				        }
				        msg_file_path.append(fileName);
		
				        File dest = new File(uploadPath_img + fileName);
				        try {
				            file.transferTo(dest);
				        } catch (IOException e) {
				            e.printStackTrace();
				        }
		
				        i++;
				    }
				}
			}
			
			vo.setMsg_file_path(msg_file_path.toString());
			
			return msgService.uploadMsg(vo);
			
		} catch (Exception e) {
	    	return 0;
	    }
	}
	
    @MessageMapping("/msgPost/post")
    @SendTo("/msgGet")
    public String sendUpdate() {
        return "Update triggered!";
    }
}
