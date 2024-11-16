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
    
    private boolean isTwilioInitialized = false;
    
    private static final Logger logger = LoggerFactory.getLogger(TwilloServiceImpl.class);
    
    public void initTwilio() {
    	if (!isTwilioInitialized) {
    		
    		if (accountSid == null || authToken == null) {
    	        throw new IllegalStateException("Twilio SID or Auth Token is missing");
    	    }
    		
    	    logger.debug("Twilio SID: " + accountSid);
    	    logger.debug("Twilio Auth Token: " + authToken);

    	    Twilio.init(accountSid, authToken);
    	    logger.debug("Twilio initialized successfully.");
    	    isTwilioInitialized = true;
    	}
    }

    public void sendSms(String user_tel, String content) {
    	initTwilio();
    	
    	Message message = Message.creator(
                new PhoneNumber(user_tel), // 수신자의 전화번호
                new PhoneNumber(phoneNumber), // 발신자의 Twilio 전화번호
                content // 전송할 메시지 내용
        ).create();
    	
        logger.debug("Sending SMS from " + phoneNumber + " to " + user_tel);
    }
}
