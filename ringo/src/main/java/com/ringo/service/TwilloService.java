package com.ringo.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public interface TwilloService {
	public void initTwilio();
    public void sendSms(String user_tel, String content);
}
