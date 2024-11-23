package com.ringo.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ringo.domain.MemberVO;
import com.ringo.domain.PostVO;
import com.ringo.domain.RepleVO;
import com.ringo.service.AddressService;
import com.ringo.service.AuthenticationService;
import com.ringo.service.MemberService;
import com.ringo.service.MessageService;
import com.ringo.service.PostService;
import com.ringo.service.TwilloService;

@Controller
@RequestMapping(value = "/post/*")
public class PostController {
	@Inject
	private MemberService mService;
	@Inject
	private PostService pService;
	@Inject
	private MessageService msgService;
	@Inject
    private TwilloService smsService;
	@Inject
	private AuthenticationService authService;
	@Inject
	private AddressService addrService;
	
	private String uploadPath_circle = "C:/ringo_files/circle/upload/";
	private String uploadPath_unity = "C:/ringo_files/unity/upload/";
	
	private static final Logger logger = LoggerFactory.getLogger(PostController.class);
	
	@RequestMapping(value = "/circle", method = RequestMethod.POST)
	@ResponseBody
	public Integer circlePOST(HttpSession session, PostVO vo) {
		logger.debug("circlePOST(MemberVO) - vo : "+vo);
		
		Integer postingCode = (pService.getLastCirclePostCode() != null) ? pService.getLastCirclePostCode() + 1 : 1;
		Integer writerCode = (Integer)session.getAttribute("user_code");
		
		vo.setPost_code(postingCode);
		vo.setPost_writer(writerCode);
        
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
		
				        String fileName = writerCode.toString()  + "_" + postingCode + "_" + i + extension;
		
				        if (post_file_path.length() > 0) {
				        	post_file_path.append(",");
				        }
				        post_file_path.append(fileName);
		
				        File dest = new File(uploadPath_circle + fileName);
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
	
	@RequestMapping(value = "/reple", method = RequestMethod.POST)
	@ResponseBody
	public Integer replePOST(HttpSession session, RepleVO vo) {
			
		return null;
	}
}
