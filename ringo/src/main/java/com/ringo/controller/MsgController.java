package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
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
import org.springframework.http.ResponseEntity;
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
import com.ringo.service.TranslationService;
import com.ringo.service.TwilloService;
import com.ringo.service.UserService;
import com.ringo.service.AudioService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(value = "/msg/*")
public class MsgController {
	
	@Inject
	private UserService uService;
	@Inject
	private MsgService msgService;
	@Inject
    private TranslationService trService;
	@Inject
	private AudioService audioService;
	
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
	
	@RequestMapping(value = "/msg", method = RequestMethod.GET)
	@ResponseBody
	public MsgVO msgGET(HttpSession session, String mr_code, String msg_code) {
		logger.debug("msgGET(String mr_code, String msg_code) - mr_code, msg_code : "+mr_code + "," + msg_code);
		
		return msgService.getOneMsg((String)session.getAttribute("user_code"),mr_code,msg_code);
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
			
		return msgService.uploadMsg(vo);
	}
	
	@RequestMapping(value = "/image", method = RequestMethod.POST)
	@ResponseBody
	public Integer msgImagePOST(HttpSession session, MsgVO vo) throws IOException {
		
		Integer last_msg_code = msgService.getLastMsgCode();
		
		if(last_msg_code==null) {
			last_msg_code = 0;
		}
		UserVO writer = new UserVO();
		writer.setUser_code((String)session.getAttribute("user_code"));
		String msg_code = "msg_"+(last_msg_code+1);
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
			
			vo.setMsg_code(msg_code);
			vo.setMsg_sender(writer);
			vo.setMsg_place(vo.getMsg_place());
			vo.setMsg_image_path(msg_file_path.toString());
			
			return msgService.uploadMsg(vo);
	}
	
	@RequestMapping(value = "/audio", method = RequestMethod.POST)
	@ResponseBody
	public Integer msgAudioPOST(HttpSession session, MultipartFile audioFile, String mr_code, double recordingTime) throws IOException {
	    
	    Integer last_msg_code = msgService.getLastMsgCode();
		
		if(last_msg_code==null) {
			last_msg_code = 0;
		}
		
		MsgVO vo = new MsgVO();
		UserVO writer = new UserVO();
		writer.setUser_code((String)session.getAttribute("user_code"));
		String msg_code = "msg_"+(last_msg_code+1);
		
		Integer duration = (int)(recordingTime*10);
		
		String fileName = msg_code + "_" + duration + "_audio.mp3";
		String filePath = uploadPath_audio + fileName;
		audioFile.transferTo(new File(filePath));
		String wavfileName = audioService.transferToWav(filePath);
		vo.setMsg_code(msg_code);
		vo.setMsg_sender(writer);
		vo.setMsg_audio_path(wavfileName);
		vo.setMsg_place(mr_code);
	    return msgService.uploadMsg(vo);
	}
	
	@RequestMapping(value = "/trs", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> msgTRSGET(String text, String targetLang) {
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("text",trService.translate(text,targetLang));
        return result;
	}
	
	@RequestMapping(value = "/tts", method = RequestMethod.GET)
	@ResponseBody
	public String msgTTSGET(String text,String msg_code) throws IOException {
		logger.debug("text to speech "+text);
		String target_lang = audioService.detectLang(text);
		String result = audioService.tts(text,msg_code,target_lang);
		logger.debug("text to speech detected lang is "+target_lang);
		logger.debug("text to speech result "+result);
		return result;
	}
	
	@RequestMapping(value = "/stt", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> msgSTTGET(String file_name) throws IOException{
		logger.debug("speech to text "+file_name);
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("text",audioService.stt(file_name));
		return result;
	}
	
	@RequestMapping(value = "/notifying", method = RequestMethod.POST)
	@ResponseBody
	public Integer msgNotifyingPOST(HttpSession session,String mr_code,String update) {
		
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code", session.getAttribute("user_code"));
		param.put("mr_code", mr_code);
		param.put("method", update);
		return msgService.modifyMsgNotifying(param);
	}
	
	@RequestMapping(value = "/getOut", method = RequestMethod.DELETE)
	@ResponseBody
	public Integer msgGetOutDELETE(HttpSession session, String mr_code, String user_code){
		logger.debug("mrc:"+mr_code+",user_code:"+user_code);
		
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("mr_code",mr_code);
		if(user_code == "" || user_code == null || "undefined".equals(user_code) ||  "null".equals(user_code)) {
			param.put("user_code",session.getAttribute("user_code"));
		}else {
			param.put("user_code",user_code);
		}
		logger.debug("prams"+param.get("mr_code")+","+param.get("user_code"));
		return msgService.exitMsgRoom(param);
	}
	
	@RequestMapping(value = "/invite", method = RequestMethod.POST)
	@ResponseBody
	public String msgInvitePOST(HttpSession session, String mr_code, String mr_guest){
		
		MsgRoomVO vo = new MsgRoomVO();
		
		List<String> currentList = msgService.getMsgMembers(mr_code);
		
		if(currentList.size() == 1) {
			return "error";
		}else if(currentList.size() == 2){
			logger.debug("currentList size:"+currentList.size()+" so create new room");
			Integer last_msg_room_code = msgService.getLastMsgRoomCode();
			Integer new_mr_code = last_msg_room_code+1;
			currentList.add(mr_guest);
			vo.setMr_code("mr_"+new_mr_code);
			vo.setMr_member_codes(currentList);
			vo.setMr_inviter((String)session.getAttribute("user_code"));
			vo.setMr_admin((String)session.getAttribute("user_code"));
			logger.debug("now vo:"+vo);
			msgService.createMsgRoom(vo);
			
			return vo.getMr_code();
		}else {
			logger.debug("currentList size:"+currentList.size()+" just invite");
			vo.setMr_code(mr_code);
			vo.setMr_inviter((String)session.getAttribute("user_code"));
			vo.setMr_guest(mr_guest);
			return msgService.addMsgMember(vo);
		}
	}
}
