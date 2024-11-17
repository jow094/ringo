package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
import com.ringo.service.AddressService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

// http://localhost:8082/swagger-ui/index.html 

@Controller
@RequestMapping(value = "/member/*")
/*
 * @RequestMapping("/api")
 * 
 * @Api(tags = "���� ��Ʈ�ѷ�")
 */
public class MemberController {
	
	@Inject
	private MemberService mService;
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
	private String uploadPath = "C:/ringo_files/profiles/";
	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginGET(HttpSession session, Model model) {
		
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
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logoutPOST(HttpSession session, MemberVO vo) {
		logger.debug("logoutPOST(MemberVO) - vo : "+vo);
		session.invalidate();
		
		return "redirect:/member/login";
	}
	
	@RequestMapping(value = "/loginCheck", method = RequestMethod.GET)
	@ResponseBody
	public String loginCheck(HttpSession session) {
		return (String)session.getAttribute("user_id");
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
	        
	        return "/member/join"; //
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
		
		return "redirect:/member/login";
	}
	
	@RequestMapping(value = "/authentication/sms", method = RequestMethod.GET)
	@ResponseBody
    public Integer sendSms(String user_tel,HttpSession session) {
		
        String smsCode = String.valueOf((int) (Math.floor(Math.random() * 900000) + 100000));
        session.setAttribute("smsCode", smsCode);
        logger.debug("smsCode:"+smsCode);
        
        logger.debug("sendSms: "+user_tel);
        
        smsService.sendSms(user_tel, "Ringo ������ȣ�� [" + smsCode + "] �Դϴ�. 5�� ���� �Է����ּ���.");
        
        return 1;
    }

	@RequestMapping(value = "/authentication/email", method = RequestMethod.GET)
	@ResponseBody
    public Integer sendEmail(String user_email,HttpSession session) {
		
        String emailCode = String.valueOf((int) (Math.floor(Math.random() * 900000) + 100000));
        session.setAttribute("emailCode", emailCode);
        logger.debug("emailCode:"+emailCode);
        
        authService.sendEmail(user_email, "Ringo ������ȣ�� [" + emailCode + "] �Դϴ�. 5�� ���� �Է����ּ���.");
        
        return 1;
    }
	
	@RequestMapping(value = "/authentication/check", method = RequestMethod.POST)
	@ResponseBody
    public Integer checkCode(String user_code,String target,HttpSession session) {
		
		
		logger.debug("smsCode:"+session.getAttribute("smsCode"));
		logger.debug("emailCode:"+session.getAttribute("emailCode"));
		logger.debug("userCode:"+user_code);
		logger.debug("target:"+target);
		
		
		
		if(target.equals("sms")) {
			if(user_code.equals(session.getAttribute("smsCode"))) {
				session.removeAttribute("smsCode");
				logger.debug("sms ���� ����");
				return 1;
			}else {
				return 0;
			}
		}
		
		if(target.equals("email")) {
			if(user_code.equals(session.getAttribute("emailCode"))) {
				session.removeAttribute("emailCode");
				logger.debug("email ���� ����");
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
}
