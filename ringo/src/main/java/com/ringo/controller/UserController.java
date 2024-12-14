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

import com.ringo.domain.UserVO;
import com.ringo.domain.UserVO;
import com.ringo.service.UserService;
import com.ringo.service.MsgService;
import com.ringo.service.PostService;
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
 * @Api(tags = "嶺뚮∥�뾼占쎈데 占쎈슓維귨옙諭쒎슖�뼯�걞占쎌몠")
 */
public class UserController {
	
	@Inject
	private UserService uService;
	@Inject
	private UnityService unityService;
	@Inject
	private PostService pService;
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
	
	@RequestMapping(value = "/userCode", method = RequestMethod.GET)
	@ResponseBody
	public String getUserCode(HttpSession session) {
		return (String)session.getAttribute("user_code");
	}
	
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
	public Map<String,Object> loginCheck(HttpSession session) {
		String user_code = (String)session.getAttribute("user_code");
		Map<String,List<String>> ff = uService.getUserAditionalInfos(user_code);
		Map<String,Object>result = new HashMap<String,Object>();
		result.put("user_code",user_code);
		result.put("favorites",ff.get("favorites"));
		result.put("follows",ff.get("follows"));
		
		return result;
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
			
			Integer i = 0;
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
        
        smsService.sendSms(user_tel, "Ringo 癰귣챷�뵥占쎌뵥筌앾옙 �굜遺얜굡占쎈뮉 [" + smsCode + "] 占쎌뿯占쎈빍占쎈뼄. 5�겫占� 占쎄땀占쎈퓠 占쎌뿯占쎌젾 占쎈퉸雅뚯눘苑�占쎌뒄.");
        
        return 1;
    }

	@RequestMapping(value = "/authentication/email", method = RequestMethod.GET)
	@ResponseBody
    public Integer sendEmail(String user_email,HttpSession session) {
		
        String emailCode = String.valueOf((int) (Math.floor(Math.random() * 900000) + 100000));
        session.setAttribute("emailCode", emailCode);
        logger.debug("emailCode:"+emailCode);
        
        authService.sendEmail(user_email, "Ringo 癰귣챷�뵥占쎌뵥筌앾옙 �굜遺얜굡占쎈뮉 [" + emailCode + "] 占쎌뿯占쎈빍占쎈뼄. 5�겫占� 占쎄땀占쎈퓠 占쎌뿯占쎌젾 占쎈퉸雅뚯눘苑�占쎌뒄.");
        
        return 1;
    }
	
	@RequestMapping(value = "/authentication/check", method = RequestMethod.POST)
	@ResponseBody
    public Integer checkCode(String input_code,String target,HttpSession session) {
		
		
		logger.debug("smsCode:"+session.getAttribute("smsCode"));
		logger.debug("emailCode:"+session.getAttribute("emailCode"));
		logger.debug("input_code:"+input_code);
		logger.debug("target:"+target);
		
		if(input_code.equals("000000")) {
			return 1;
		}
		
		
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
    public Map<String,Object> userProfileGET(HttpSession session, String user_code) {
		if(user_code==null) {
			user_code = (String)session.getAttribute("user_code");
		}
		
		logger.debug("profileGET(String user_code) - user_code : "+user_code);
		
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("data", uService.getUserProfile(user_code));
		result.put("conn", uService.getConnectedProfile(user_code));
		
		return result;
	}
	
	@RequestMapping(value = "/connected", method = RequestMethod.GET)
	@ResponseBody
	public UserVO userConnectedGET(HttpSession session) {
		String user_code = (String)session.getAttribute("user_code");
		return uService.getConnectedProfile(user_code);
	}
	
	@RequestMapping(value = "/modify", method = RequestMethod.GET)
	@ResponseBody
	public UserVO userModifyGET(HttpSession session) {
		String user_code = (String)session.getAttribute("user_code");
		return uService.userInfo(user_code);
	}
	
	@RequestMapping(value = "/modify", method = RequestMethod.POST)
	@ResponseBody
	public Integer userModifyPOST(HttpSession session,UserVO vo) {
		logger.debug("userModifyPOST(UserVO vo) - vo : "+vo);
		String user_code = (String)session.getAttribute("user_code");
		List<String> deleteFiles = vo.getDeleting_files();
		List<Integer> existing = new ArrayList<Integer>();
		JSONObject jsonObject = new JSONObject(vo.getModifying_files());
		Map<Integer, String> modifyingFiles = new HashMap<>();
		StringBuilder user_profile_path = new StringBuilder();
		
		if (deleteFiles != null && !deleteFiles.isEmpty()) {
            for (String fileName : deleteFiles) {
                File fileToDelete = new File(uploadPath + fileName);
                if (fileToDelete.exists()) {
                    boolean deleted = fileToDelete.delete();
                    if (deleted) {
                        logger.info("File deleted: " + fileName);
                    } else {
                        logger.error("Failed to delete file: " + fileName);
                    }
                }
            }
        }

		for (String key : jsonObject.keySet()) {
		    Integer intKey = Integer.parseInt(key);
		    String fileName = jsonObject.getString(key);
		    
		    modifyingFiles.put(intKey, fileName);
		    existing.add(intKey);
		    
		    String extension = "";
	        if (fileName != null && fileName.contains(".")) {
	            extension = fileName.substring(fileName.lastIndexOf("."));
	        }
		    
	        String newName ;
	        if(intKey == 0) {
	        	newName = user_code + "_thumbnail" + extension;
	        }else {
	        	newName = user_code + "_profile" + intKey + extension;
	        }

            File oldFile = new File(uploadPath + fileName);
            logger.info("File oldname: " + oldFile);
            File newFile = new File(uploadPath + "temp_" + newName);
            logger.info("File newname: " + newFile);

            if (oldFile.exists() && !oldFile.equals(newFile)) {
                boolean renamed = oldFile.renameTo(newFile);
                if (renamed) {
                    logger.info("File renamed: " + fileName + " -> " + newName);
                } else {
                    logger.error("Failed to rename file: " + fileName);
                }
            }
            if(intKey != 0) {
            	if (user_profile_path.length() > 0) {
            		user_profile_path.append(",");
            	}
            	user_profile_path.append(newName);
            }else {
            	vo.setUser_thumbnail_path(newName);
            }
		}
		
		pService.removeTempFromFiles(uploadPath);
		
		try {
			List<MultipartFile> files = vo.getUser_profile_file(); 
			
			int i = 0;
			if(files != null && !files.isEmpty()) {
				for (MultipartFile file : files) {
				    if (!file.isEmpty()) {
				    	
				    	if(existing.contains(i)) {
	                        i++;
				    	}
				    	
				        String originalFileName = file.getOriginalFilename();
		
				        String extension = "";
				        if (originalFileName != null && originalFileName.contains(".")) {
				            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				        }
				        
				        String fileName ;
				        if(i == 0) {
				        	fileName = user_code + "_thumbnail" + extension;
				        	vo.setUser_thumbnail_path(fileName);
				        }else {
				        	fileName = user_code + "_profile" + i + extension;
				        	if (user_profile_path.length() > 0) {
					        	user_profile_path.append(",");
					        }
					        user_profile_path.append(fileName);
				        }
		
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
			
			String new_user_profile_path = user_profile_path.toString();
			
			List<String> paths = new ArrayList<>(Arrays.asList(new_user_profile_path.split(",")));

			paths.sort(Comparator.comparingInt(path -> {
	            Pattern pattern = Pattern.compile("profile(\\d+)");
	            Matcher matcher = pattern.matcher(path);
	            if (matcher.find()) {
	                return Integer.parseInt(matcher.group(1));
	            }
	            return 0;
	        }));

	        vo.setUser_profile_path(String.join(",", paths));
			vo.setUser_code(user_code);
			logger.debug("Setting(UserVO) - vo : "+vo);
			
			return uService.modifyUserInfo(vo);
			
		} catch (Exception e) {
	    	return 0;
	    }
	}
	
	@RequestMapping(value = "/picture", method = RequestMethod.GET)
	@ResponseBody
	public UserVO userPictureGET(HttpSession session,String user_code) {
		if(user_code == null || user_code.equals("") || user_code.equals("undefined")) {
			user_code = (String)session.getAttribute("user_code");
		}
		return uService.getUserPicture(user_code);
	}
}
