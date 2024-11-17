package com.ringo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
@PropertySource("classpath:application.properties")
public class TwilloServiceImpl implements TwilloService{
	
	@Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    @Value("${twilio.phoneNumber}")
    private String phoneNumber;
    
    private boolean isInitialized = false;
    
    private static final Logger logger = LoggerFactory.getLogger(TwilloServiceImpl.class);
    
    public void initTwilio() {
    		
    	if (!isInitialized) {
    		if (accountSid == null || authToken == null) {
    	        throw new IllegalStateException("Twilio SID or Auth Token is missing");
    	    }
    		
    	    logger.debug("Twilio SID: " + accountSid);
    	    logger.debug("Twilio Auth Token: " + authToken);

    	    Twilio.init(accountSid, authToken);
    	    logger.debug("Twilio initialized successfully.");
    	    isInitialized = true;
    	    
    	}
    }

    public void sendSms(String user_tel, String content) {
    	initTwilio();
    	
    	String formattedNumber = "+82" + user_tel.substring(1);  // 010을 제거하고 +82 추가
        
        PhoneNumber number = new PhoneNumber(formattedNumber);  // E.164 형식으로 변환된 번호
        String e164FormattedNumber = number.toString();  // E.164 형식으로 변환된 번호

        System.out.println("E.164 형식: " + e164FormattedNumber);  // E.164 형식 출력
    	
    	Message message = Message.creator(
    		    new PhoneNumber(e164FormattedNumber), // 수신자 번호를 E.164 형식으로 수정
    		    new PhoneNumber(phoneNumber), // Twilio 발신 번호
    		    "안녕하세요! 테스트 메시지입니다."
    		).create();
    	
        logger.debug("Sending SMS from " + phoneNumber + " to " + user_tel);
    }
}
