package com.ringo.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import com.google.protobuf.ByteString;
import com.mpatric.mp3agic.InvalidDataException;
import com.mpatric.mp3agic.UnsupportedTagException;

public interface AudioService {
	public String tts(String text,String msg_code,String target_lang) throws IOException;
	public String stt(String file_name) throws IOException;
	public String detectLang(String text);
	public double getMp3Duration(ByteString audioContents) throws UnsupportedTagException, InvalidDataException, IOException;
	public String transferToWav(String mp3FilePath);
}
