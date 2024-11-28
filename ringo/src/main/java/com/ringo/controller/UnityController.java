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
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.domain.UnityBoardVO;
import com.ringo.domain.UnityMemberVO;
import com.ringo.domain.UnityVO;
import com.ringo.domain.UserVO;
import com.ringo.service.UserService;
import com.ringo.service.MessageService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;
import com.ringo.service.UnityService;
import com.ringo.service.UserService;
import com.ringo.service.AuthenticationService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(value = "/unity/*")
public class UnityController {

	@Inject
	private UserService uService;
	@Inject
	private UnityService unityService;
	@Inject
	private MessageService msgService;
	@Inject
	private TwilloService tService;
	@Inject
	private AuthenticationService emailService;
	@Inject
	private PostService pService;

	private static final Logger logger = LoggerFactory.getLogger(UnityController.class);

	private String uploadPath_unity_upload = "C:/ringo_files/unity/upload/";
	private String uploadPath_unity_thumbnail = "C:/ringo_files/unity/thumbnail/";
	private String uploadPath_unity_banner = "C:/ringo_files/unity/banner/";

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	@ResponseBody
	public List<UnityVO> unityHomeGET(HttpSession session) {
		logger.debug("unityHomeGET()");

		String user_code = (String) session.getAttribute("user_code");

		return unityService.getUnities(user_code);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseBody
	public Integer unityCreatePOST(HttpSession session, UnityVO vo) {

		logger.debug("unityCreatePOST - vo : " + vo);
		logger.debug("unityCreatePOST - thumbnailFile : " + vo.getUnity_thumbnail_file());
		logger.debug("unityCreatePOST - banner : " + vo.getUnity_banner_file());

		try {

			Integer last_unity_code = unityService.getLastUnityCode();

			if (last_unity_code == null) {
				last_unity_code = 0;
			}

			String unity_code = "unt_" + (last_unity_code + 1);

			MultipartFile unity_thumbnail_file = vo.getUnity_thumbnail_file();
			String unity_thumbnail_path = "";
			MultipartFile unity_banner_file = vo.getUnity_banner_file();
			String unity_banner_path = "";

			if (unity_thumbnail_file != null && !unity_thumbnail_file.isEmpty()) {
				String originalFileName = unity_thumbnail_file.getOriginalFilename();

				String extension = "";
				if (originalFileName != null && originalFileName.contains(".")) {
					extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				}

				unity_thumbnail_path = unity_code + "_thumbnail" + extension;

				File dest = new File(uploadPath_unity_thumbnail + unity_thumbnail_path);
				try {
					unity_thumbnail_file.transferTo(dest);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (unity_banner_file != null && !unity_banner_file.isEmpty()) {
				String originalFileName = unity_banner_file.getOriginalFilename();

				String extension = "";
				if (originalFileName != null && originalFileName.contains(".")) {
					extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				}

				unity_banner_path = unity_code + "_banner" + extension;

				File dest = new File(uploadPath_unity_banner + unity_banner_path);
				try {
					unity_banner_file.transferTo(dest);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			vo.setUnity_code(unity_code);
			vo.setUnity_admin((String) session.getAttribute("user_code"));
			vo.setUnity_thumbnail_path(unity_thumbnail_path);
			vo.setUnity_banner_path(unity_banner_path);
			vo.setUnity_member_grade("admin");

			logger.debug("unityCreatePOST( UnityVO vo) - vo : " + vo);

			Integer result = unityService.createUnity(vo);

			if (result == 1) {

				UnityMemberVO mvo = new UnityMemberVO();
				mvo.setUnity_code(vo.getUnity_code());
				mvo.setUser_code((String) session.getAttribute("user_code"));
				mvo.setUnity_member_grade("admin");

				Integer joinResult = unityService.joinUnity(mvo);
				if (joinResult == 1) {
					unityService.modifyUnityMember(mvo);
				}
			}
			return result;

		} catch (Exception e) {
			return 0;
		}
	}

	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	@ResponseBody
	public UnityVO unityProfileGET(HttpSession session, String unity_code) {
		logger.debug("unityUnityGET(Integer unity_code) - unity_code : " + unity_code);

		UnityVO vo = new UnityVO();
		vo.setUnity_code(unity_code);
		vo.setUser_code((String) session.getAttribute("user_code"));

		return unityService.getUnityProfile(vo);
	}

	@RequestMapping(value = "/main", method = RequestMethod.GET)
	@ResponseBody
	public UnityVO unityMainGET(HttpSession session, String unity_code) {
		logger.debug("unityMainGET(String unity_code) - unity_code : " + unity_code);

		UnityVO vo = new UnityVO();
		vo.setUnity_code(unity_code);
		vo.setUser_code((String) session.getAttribute("user_code"));

		UnityVO result = unityService.getUnityMain(vo);

		logger.debug("result : " + result);
		return result;
	}

	@RequestMapping(value = "/post", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,List<PostVO>> unityPostGET(HttpSession session, PostVO vo) {

		logger.debug("unityPostGET(PostVO vo) - vo : " + vo);

		if (vo.getPost_code()!=""){
			vo.setUnity_board_page(0);
		}else{
			vo.setPost_code(null);
			
			if(vo.getUnity_board_page()!=0) {
				vo.setUnity_board_page((vo.getUnity_board_page()-1)*10);
			}
		}
		
		Map<String,List<PostVO>> result = new HashMap<String,List<PostVO>>();
			
		logger.debug("post: " + pService.getUnityPost(vo));
		logger.debug("board :" + pService.getUnityBoard(vo));
		
			result.put("posts",pService.getUnityPost(vo));
			result.put("titles",pService.getUnityBoard(vo));
			
		return result;
	}

	@RequestMapping(value = "/post", method = RequestMethod.POST)
	@ResponseBody
	public Integer unityPostPOST(HttpSession session, PostVO vo) {
		logger.debug("unityPostPOST(PostVO) - vo : " + vo);
		
		Integer last_post_code = pService.getLastUnityPostCode();
		
		if(last_post_code==null) {
			last_post_code = 0;
		}
		
		String post_code = "up_"+(last_post_code+1);
		String writer = (String)session.getAttribute("user_code");
		
		vo.setPost_code(post_code);
		vo.setPost_writer(writer);
        
		try {
			List<MultipartFile> files = vo.getPosting_files(); 
			StringBuilder post_file_path = new StringBuilder();
			
			if(files != null && !files.isEmpty()) {
				int i = 1;
				for (MultipartFile file : files) {
				    if (!file.isEmpty()) {
				        String originalFileName = file.getOriginalFilename();
		
				        String extension = "";
				        if (originalFileName != null && originalFileName.contains(".")) {
				            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				        }
		
				        String fileName = post_code + "_" + i + extension;
		
				        if (post_file_path.length() > 0) {
				        	post_file_path.append(",");
				        }
				        post_file_path.append(fileName);
		
				        File dest = new File(uploadPath_unity_upload + fileName);
				        try {
				            file.transferTo(dest);
				        } catch (IOException e) {
				            e.printStackTrace();
				        }
		
				        i++;
				    }
				}
			}
			
			vo.setPost_file_path(post_file_path.toString());
			
			return pService.uploadUnityPost(vo);
			
		} catch (Exception e) {
	    	return 0;
	    }
	}
}
