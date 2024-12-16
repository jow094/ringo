package com.ringo.controller;

import java.io.File;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.UserVO;
import com.fasterxml.jackson.databind.ObjectMapper;
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
@RequestMapping(value = "/circle/*")
public class CircleController {
	
	@Inject
	private PostService pService;
	
	private static final Logger logger = LoggerFactory.getLogger(CircleController.class);
	
	private String uploadPath = "C:/ringo_files/circle/upload/";
	
	@RequestMapping(value = "/post", method = RequestMethod.GET)
	@ResponseBody
	public List<PostVO> circlePostGET(HttpSession session, String visit_code) {
		if(visit_code==null || visit_code.equals("")) {
			visit_code = (String)session.getAttribute("user_code");
		}
		String user_code = (String)session.getAttribute("user_code");
		
		logger.debug("circlePostsGET(String visit_code, String user_code) - visit_code, user_code : "+visit_code+ "," +user_code);
		return pService.getCirclePost(visit_code,user_code);
	}
	
	@RequestMapping(value = "/modifyPost", method = RequestMethod.GET)
	@ResponseBody
	public PostVO circleModifyPostGET(String post_code) {
		return pService.getPost(post_code);
	}
	
	@RequestMapping(value = "/post", method = RequestMethod.POST)
	@ResponseBody
	public Integer circlePostPOST(HttpSession session, PostVO vo) {
		logger.debug("circlePostPOST(MemberVO) - vo : "+vo);
		
		Integer last_post_code = pService.getLastCirclePostCode();
		
		if(last_post_code==null) {
			last_post_code = 0;
		}
		
		String writer = (String)session.getAttribute("user_code");
		String post_code = "cp_"+(last_post_code+1)+"-"+writer;
		
		vo.setPost_code(post_code);
		vo.setPost_writer(writer);
		
		File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            boolean isCreated = uploadDir.mkdirs();
            if (!isCreated) {
                logger.error("Failed to create directory: " + uploadPath);
                return 0;
            }
        }
        
		try {
			List<MultipartFile> files = vo.getPosting_files(); 
			StringBuilder post_file_path = new StringBuilder();
			
			if(files != null && !files.isEmpty()) {
				int i = 0;
				for (MultipartFile file : files) {
				    if (!file.isEmpty()) {
				        String originalFileName = file.getOriginalFilename();
		
				        String extension = "";
				        if (originalFileName != null && originalFileName.contains(".")) {
				            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
				        }
		
				        String fileName = post_code + "_img" + i + extension;
		
				        if (post_file_path.length() > 0) {
				        	post_file_path.append(",");
				        }
				        post_file_path.append(fileName);
		
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
			
			vo.setPost_file_path(post_file_path.toString());
			
			return pService.uploadCirclePost(vo);
			
		} catch (Exception e) {
	    	return 0;
	    }
	}
	
	@RequestMapping(value = "/modifyPost", method = RequestMethod.POST)
	@ResponseBody
	public Integer circleModifyPostPOST(PostVO vo) {
		logger.debug("circleModifyPostPOST(PostVO) - vo : "+vo);
		String post_code = vo.getPost_code();
		List<String> deleteFiles = vo.getDeleting_files();
		List<Integer> existing = new ArrayList<Integer>();
		
		JSONObject jsonObject = new JSONObject(vo.getModifying_files());
		
		Map<Integer, String> modifyingFiles = new HashMap<>();
		
		StringBuilder post_file_path = new StringBuilder();
		
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
		    
            String newName = fileName.split("img")[0] + "img" + intKey + extension;

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

            if (post_file_path.length() > 0) {
                post_file_path.append(",");
            }
            post_file_path.append(newName);
		}
		
		pService.removeTempFromFiles(uploadPath);
		
		try {
			List<MultipartFile> files = vo.getPosting_files(); 
			
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
		
				        String fileName = post_code + "_img" + i + extension;
		
				        if (post_file_path.length() > 0) {
				        	post_file_path.append(",");
				        }
				        post_file_path.append(fileName);
		
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
			
			String new_file_path = post_file_path.toString();
			
			List<String> paths = new ArrayList<>(Arrays.asList(new_file_path.split(",")));

			paths.sort(Comparator.comparingInt(path -> {
	            Pattern pattern = Pattern.compile("img(\\d+)");
	            Matcher matcher = pattern.matcher(path);
	            if (matcher.find()) {
	                return Integer.parseInt(matcher.group(1));
	            }
	            return 0;
	        }));

	        vo.setPost_file_path(String.join(",", paths));
			
			logger.debug("Setting(PostVO) - vo : "+vo);
			
			return pService.modifyPost(vo);
			
		} catch (Exception e) {
	    	return 0;
	    }
		
	}
}
