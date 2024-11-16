package com.ringo.service;

import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
	
	private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

	@Value("${mail.host}")
    private String host;
	@Value("${mail.user}")
    private String user;
	@Value("${mail.password}")
    private String password;
	@Value("${mail.port}")
    private String port;
	
    public void sendEmail(String user_email, String content){

        Properties properties = System.getProperties();
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password);
            }
        });

        String subject = "ringo 이메일 인증번호입니다.";
        String body = content;

        MimeMessage message = new MimeMessage(session);
        try {
	        message.setFrom(new InternetAddress(user));
	        message.addRecipient(Message.RecipientType.TO, new InternetAddress(user_email));
	        message.setSubject(subject);
			message.setText(body);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

        try {
			Transport.send(message);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  // 이메일 발송
        
        logger.debug("이메일 전송 완료");
    }
}
