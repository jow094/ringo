package com.ringo.service;

import javax.mail.MessagingException;

public interface AuthenticationService {
	public void sendEmail(String user_email, String content);
	public void sendSms(String user_email, String content);
}
