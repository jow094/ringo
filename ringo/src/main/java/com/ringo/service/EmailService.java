package com.ringo.service;

import javax.mail.MessagingException;

public interface EmailService {
	public void sendEmail(String user_email, String content);
}
