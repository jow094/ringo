package com.ringo.service;

import java.io.IOException;

public interface AudioService {
	public String tts(String text,String msg_code,String target_lang) throws IOException;
	public String stt(String msg_code) throws IOException;
}
