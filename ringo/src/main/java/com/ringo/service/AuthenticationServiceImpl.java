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
import com.google.gson.JsonObject;
import com.twilio.type.PhoneNumber;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.http.entity.StringEntity;
import org.json.JSONObject;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	
	private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

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
    
    public void sendSms(String user_tel, String content) {
    	// API 키 입력
        String apiKey = "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";
        String recipientPhone = "+82" + user_tel.substring(1);
        String message = "Your verification code is 123456";  // 보낼 메시지

        try {
            String url = "https://api.sendinblue.com/v3/smtp/send";
            
            JSONObject json = new JSONObject();
            json.put("sender", "YOUR_SENDER_PHONE_NUMBER");  // 발신자 번호 (Sendinblue에서 설정된 번호)
            json.put("recipient", recipientPhone);  // 수신자 번호
            json.put("message", message);  // 보낼 메시지 내용

            // HTTP 클라이언트 설정
            CloseableHttpClient client = HttpClients.createDefault();
            HttpPost post = new HttpPost(url);
            post.setHeader("api-key", apiKey);
            post.setHeader("Content-Type", "application/json");
            post.setEntity(new StringEntity(json.toString()));

            // 요청 실행
            org.apache.http.HttpResponse response = client.execute(post);
            HttpEntity entity = response.getEntity();
            String responseBody = EntityUtils.toString(entity);

            // 응답 출력
            System.out.println("Response: " + responseBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
}
