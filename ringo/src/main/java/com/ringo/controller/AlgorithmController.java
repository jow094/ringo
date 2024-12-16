package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.AlgorithmVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.UserVO;
import com.ringo.domain.UserVO;
import com.ringo.service.UserService;
import com.ringo.service.MsgService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;
import com.ringo.service.UnityService;
import com.ringo.service.UserService;
import com.ringo.service.AddressService;
import com.ringo.service.AlgorithmService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.parameters.RequestBody;


@Controller
@RequestMapping(value = "/algorithm/*")
public class AlgorithmController {
	
	@Inject
	private UserService uService;
	@Inject
	private AlgorithmService aService;
	@Inject
	private PostService pService;
	
	private static final Logger logger = LoggerFactory.getLogger(AlgorithmController.class);
	
	@RequestMapping(value = "/prev", method = RequestMethod.GET)
	@ResponseBody
	public AlgorithmVO algorithmPrevGET(HttpSession session) {
		logger.debug("get algorithm");
		
		String user_code = (String)session.getAttribute("user_code");
		
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",session.getAttribute("user_code"));
		param.put("user_log_location",session.getAttribute("user_log_location"));
		param.put("user_log_geolocation",session.getAttribute("user_log_geolocation"));
		
		if(aService.modifyUserAlgorithm(param)==1) {
			return aService.getUserAlgorithm(user_code);
		}else {
			return aService.getUserAlgorithm(user_code);
		}
	}
	
	@RequestMapping(value = "/around", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> algorithmAroundGET(HttpSession session) {
		String user_code = (String)session.getAttribute("user_code");
		
		AlgorithmVO vo = aService.getUserAlgorithm(user_code);
		
		List<String> tags = Arrays.asList(vo.getUser_tags().split(","));
		String user_log_geolocation = vo.getUser_log_geolocation();
		String user_latitude = user_log_geolocation.split(",")[0];
		String user_longitude = user_log_geolocation.split(",")[1];
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",user_code);
		param.put("user_latitude",user_latitude);
		param.put("tags",tags);
		param.put("user_longitude",user_longitude);
		
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("tagsPost",pService.getTagsPost(param));
		result.put("nearPost",pService.getNearPost(param));
		
		return result;
	}
	
	@RequestMapping(value = "/timeline", method = RequestMethod.GET)
	@ResponseBody
	public List<PostVO> algorithmTimelineGET(HttpSession session) {
		String user_code = (String)session.getAttribute("user_code");
		
		Map<String,List<String>> connected = uService.getUserAditionalInfos(user_code);
		
		logger.debug("connected:"+connected);
		logger.debug("connected size1:"+connected.get("favorites").size());
		logger.debug("connected size2:"+connected.get("follows").size());
		if(connected.get("favorites").size() == 0 && connected.get("follows").size()==0) {
			
			logger.debug("connected is null:"+connected);
			return null;
		}
		
		List<String> writer_codes = new ArrayList<String>();
		writer_codes.addAll(connected.get("favorites"));
		writer_codes.addAll(connected.get("follows"));
		
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",user_code);
		param.put("writer_codes",writer_codes);
		
		return pService.getConnectedPost(param);
	}
	
	@RequestMapping(value = "/link", method = RequestMethod.GET)
	@ResponseBody
	public List<UserVO> algorithmLinkGET(HttpSession session) {
		String user_code = (String)session.getAttribute("user_code");
		
		AlgorithmVO vo = aService.getUserAlgorithm(user_code);
		
		List<String> tags = Arrays.asList(vo.getUser_tags().split(","));
		List<String> langs = Arrays.asList(vo.getUser_langs().split(","));
		String user_log_geolocation = vo.getUser_log_geolocation();
		String user_latitude = user_log_geolocation.split(",")[0];
		String user_longitude = user_log_geolocation.split(",")[1];
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",user_code);
		param.put("user_latitude",user_latitude);
		param.put("user_tags",tags);
		param.put("user_langs",langs);
		param.put("user_longitude",user_longitude);
		
		return uService.getUserLink(param);
	}
	
	@RequestMapping(value = "/codeLink", method = RequestMethod.GET)
	@ResponseBody
	public UserVO algorithmCodeLinkGET(HttpSession session,String user_code) {
		
		String user_log_geolocation = (String)session.getAttribute("user_log_geolocation");
		String user_latitude = user_log_geolocation.split(",")[0];
		String user_longitude = user_log_geolocation.split(",")[1];
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("user_code",user_code);
		param.put("user_latitude",user_latitude);
		param.put("user_longitude",user_longitude);
		
		return uService.getUserProfile(param);
	}
	
}
