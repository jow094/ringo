package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.UserVO;
import com.ringo.domain.UserVO;
import com.ringo.service.UserService;
import com.ringo.service.MessageService;
import com.ringo.service.TwilloService;
import com.ringo.service.UnityService;
import com.ringo.service.UserService;
import com.ringo.service.AddressService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

// http://localhost:8082/swagger-ui/index.html 

@Controller
@RequestMapping(value = "/user/*")
/*
 * @RequestMapping("/api")
 * 
 * @Api(tags = "硫붿씤 而⑦듃濡ㅻ윭")
 */
public class UserController {
	
	@Inject
	private UserService uService;
	@Inject
	private UnityService unityService;
	@Inject
	private MessageService msgService;
	@Inject
    private TwilloService smsService;
	@Inject
	private AuthenticationService authService;
	@Inject
	private AddressService addrService;
	
	/*
	 * private String uploadPath = System.getProperty("catalina.base") +
	 * "/webapps/ringo/uploads/";
	 */
	private String uploadPath = "C:/ringo_files/user/profiles/";
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	public String getCode(String user_fcode) {
		if (user_fcode == null || user_fcode.chars().filter(ch -> ch == '_').count() != 2) {
	        return user_fcode;
	    }
	    return user_fcode.substring(0, user_fcode.lastIndexOf("_"));
	}

	public Integer getPrivate(String user_fcode) {
		if (user_fcode == null || user_fcode.chars().filter(ch -> ch == '_').count() != 2) {
	        return null;
	    }
	    try {
	        return Integer.parseInt(user_fcode.substring(user_fcode.lastIndexOf("_") + 1));
	    } catch (NumberFormatException e) {
	        return null;
	    }
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginGET(HttpSession session, Model model) {
		
		logger.debug("loginGET()");
		
		return "login";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String loginPOST(HttpSession session, UserVO vo) {
		logger.debug("loginPOST(MemberVO) - vo : "+vo);
		
		UserVO result = uService.userLogin(vo);
		session.setAttribute("user_code", result.getUser_code());
		session.setAttribute("user_fcode", result.getUser_fcode());
		session.setAttribute("user_name", result.getUser_name());
		session.setAttribute("user_thumbnail_path", result.getUser_thumbnail_path());
		session.setAttribute("unity_thumbnail_path", "1.jpg");
		
		logger.debug("loginPOST(MemberVO) - result : "+result);
		return "redirect:/main/home";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logoutPOST(HttpSession session, UserVO vo) {
		logger.debug("logoutPOST(MemberVO) - vo : "+vo);
		session.invalidate();
		
		return "redirect:/user/login";
	}
	
	@RequestMapping(value = "/loginCheck", method = RequestMethod.GET)
	@ResponseBody
	public String loginCheck(HttpSession session) {
		return (String)session.getAttribute("user_code");
	}
	
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public String joinGET(HttpSession session, UserVO vo) {
		logger.debug("joinGET(MemberVO) - vo : "+vo);
		
		return "join";
	}
	
	@RequestMapping(value = "/join", method = RequestMethod.POST)
	@ResponseBody
	public Integer joinPOST(HttpSession session,UserVO vo) {
		
		logger.debug("joinPOST - vo : " + vo);
		logger.debug("joinPOST - thumbnailFile : " + vo.getUser_thumbnail_file());
		logger.debug("joinPOST - fileList : " + vo.getUser_profile_file());
		try {
			
			Integer last_user_code = uService.getLastUserCode();
			
			if(last_user_code==null) {
				last_user_code = 0;
			}
			
			String user_code = "r_"+(last_user_code+1);
			
			List<MultipartFile> profile_files = vo.getUser_profile_file(); 
			StringBuilder user_profile_path = new StringBuilder();
			MultipartFile thumbnail_file = vo.getUser_thumbnail_file();
			String user_thumbnail_path = "";
			
			Integer i = 1;
			if (thumbnail_file != null && !thumbnail_file.isEmpty()) {
		        String originalFileName = thumbnail_file.getOriginalFilename();
	
		        String extension = "";
		        if (originalFileName != null && originalFileName.contains(".")) {
		            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		        }
	
		        user_thumbnail_path = user_code + "_thumbnail" + extension;
	
		        File dest = new File(uploadPath + user_thumbnail_path);
		        try {
		        	thumbnail_file.transferTo(dest);
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		    }
			
			if(profile_files != null && !profile_files.isEmpty()) {
				for (MultipartFile file : profile_files) {
				    if (!file.isEmpty()) {
				        String originalFileName = file.getOriginalFilename();
		
				        String extension = "";
				        if (originalFileName != null && originalFileName.contains(".")) {
				            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				        }
		
				        String fileName = user_code + "_" + i + extension;
		
				        if (user_profile_path.length() > 0) {
				        	user_profile_path.append(",");
				        }
				        user_profile_path.append(fileName);
		
				        File dest = new File(uploadPath + fileName);
				        try {
				            file.transferTo(dest);
				        } catch (IOException e) {
				            e.printStackTrace();
				        }
		
				        i++;
				    }
				}
			}
			
			String fcode = user_code+"_"+vo.getUser_private().toString();
			vo.setUser_fcode(fcode);
			vo.setUser_code(user_code);
			vo.setUser_thumbnail_path(user_thumbnail_path);
			vo.setUser_profile_path((user_profile_path.toString()));
			
			return uService.userJoin(vo);
			
		} catch (NullPointerException e) {
	        return 3;
	    } catch (Exception e) {
	    	return 0;
	    }
	}
	
	@RequestMapping(value = "/authentication/sms", method = RequestMethod.GET)
	@ResponseBody
    public Integer sendSms(String user_tel,HttpSession session) {
		
        String smsCode = String.valueOf((int) (Math.floor(Math.random() * 900000) + 100000));
        session.setAttribute("smsCode", smsCode);
        logger.debug("smsCode:"+smsCode);
        
        logger.debug("sendSms: "+user_tel);
        
        smsService.sendSms(user_tel, "Ringo 본인인증 코드는 [" + smsCode + "] 입니다. 5분 내에 입력 해주세요.");
        
        return 1;
    }

	@RequestMapping(value = "/authentication/email", method = RequestMethod.GET)
	@ResponseBody
    public Integer sendEmail(String user_email,HttpSession session) {
		
        String emailCode = String.valueOf((int) (Math.floor(Math.random() * 900000) + 100000));
        session.setAttribute("emailCode", emailCode);
        logger.debug("emailCode:"+emailCode);
        
        authService.sendEmail(user_email, "Ringo 본인인증 코드는 [" + emailCode + "] 입니다. 5분 내에 입력 해주세요.");
        
        return 1;
    }
	
	@RequestMapping(value = "/authentication/check", method = RequestMethod.POST)
	@ResponseBody
    public Integer checkCode(String input_code,String target,HttpSession session) {
		
		
		logger.debug("smsCode:"+session.getAttribute("smsCode"));
		logger.debug("emailCode:"+session.getAttribute("emailCode"));
		logger.debug("input_code:"+input_code);
		logger.debug("target:"+target);
		
		
		
		if(target.equals("sms")) {
			if(input_code.equals(session.getAttribute("smsCode"))) {
				session.removeAttribute("smsCode");
				logger.debug("sms validated");
				return 1;
			}else {
				return 0;
			}
		}
		
		if(target.equals("email")) {
			if(input_code.equals(session.getAttribute("emailCode"))) {
				session.removeAttribute("emailCode");
				logger.debug("email validated");
				return 1;
			}else {
				return 0;
			}
		}
        
        return 0;
    }
	
	@RequestMapping(value = "/getAddress", method = RequestMethod.GET)
	public String getAddress(@RequestParam double latitude, @RequestParam double longitude) {
	    logger.debug("msg: " + addrService.getAddressFromCoordinates(latitude, longitude));
	    return addrService.getAddressFromCoordinates(latitude, longitude);
	}
	
	@RequestMapping(value = "/searchAddress", method = RequestMethod.GET)
	@ResponseBody
    public String searchRoadAddress(@RequestParam String keyword) {
        try {
			return addrService.searchRoadAddress(keyword);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "failed";
		}
    }
	
	@RequestMapping(value = "/checkDuple", method = RequestMethod.GET)
	@ResponseBody
    public Integer checkDuple(String target, String data) {
		if(target.equals("unity_name")) {
			return unityService.checkDuplication(data);
		}
		return uService.checkDuplication(target,data);
	}
	
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	@ResponseBody
    public UserVO userProfileGET(HttpSession session, String user_code) {
		if(user_code==null) {
			user_code = (String)session.getAttribute("user_code");
		}
		
		logger.debug("profileGET(String user_code) - user_code : "+user_code);
		return uService.getUserProfile(user_code);
	}
}
