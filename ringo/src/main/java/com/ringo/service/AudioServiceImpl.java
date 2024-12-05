package com.ringo.service;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import com.google.cloud.translate.Detection;
import com.google.cloud.translate.Translation;
import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import java.io.FileInputStream;
import java.io.ByteArrayInputStream;

@Service
public class AudioServiceImpl implements AudioService {
	
	private final String detect_URL = "https://translation.googleapis.com/language/translate/v2/detect";
    
	private String ttsPath = "C:/ringo_files/audio/tts/";
	private String sttPath = "C:/ringo_files/audio/stt/";
	
	private final RestTemplate restTemplate;
	private final Translate translate;
	
	public AudioServiceImpl(RestTemplate restTemplate,Translate translate) {
        this.restTemplate = restTemplate;
        this.translate = translate;
    }
	
	public String tts(String text,String msg_code,String target_lang) throws IOException {
		
		TextToSpeechSettings textToSpeechSettings = TextToSpeechSettings.newBuilder()
			    .setCredentialsProvider(FixedCredentialsProvider.create(
			        ServiceAccountCredentials.fromStream(new FileInputStream("C:/ringo_files/bold-origin-440901-h0-f50595916e4e.json"))))
			    .build();
	    // Ŭ���̾�Ʈ ����
	    try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(textToSpeechSettings)) {

	        // �ؽ�Ʈ �Է� ����
	        SynthesisInput input = SynthesisInput.newBuilder().setText(text).build();

	        // ���� ����
	        VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
	                .setLanguageCode(target_lang)
	                .setSsmlGender(SsmlVoiceGender.FEMALE)
	                .build();

	        // ����� ����
	        AudioConfig audioConfig = AudioConfig.newBuilder()
	                .setAudioEncoding(com.google.cloud.texttospeech.v1.AudioEncoding.MP3) // Text-to-Speech�� MP3 ����
	                .build();

	        // ��û ����
	        SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

	        // ����� MP3 ���Ϸ� ����
	        ByteString audioContents = response.getAudioContent();
	        String fileName = msg_code + "_tts.mp3";
	        String outputPath = ttsPath + msg_code + "_tts[12.34].mp3";
	        try (OutputStream out = new FileOutputStream(outputPath)) {
	            out.write(audioContents.toByteArray());
	        }

	        return fileName;  // ������ ����� ���� ��θ� ����
	    }
	}

	public String stt(String msg_code) throws IOException {
		
		SpeechSettings speechSettings = SpeechSettings.newBuilder()
			    .setCredentialsProvider(FixedCredentialsProvider.create(
			        ServiceAccountCredentials.fromStream(new FileInputStream("C:/ringo_files/bold-origin-440901-h0-f50595916e4e.json"))))
			    .build();
	    // Ŭ���̾�Ʈ ����
	    try (SpeechClient speechClient = SpeechClient.create(speechSettings)) {
	    	String audioFilePath = sttPath + msg_code;
	        // ����� ���� �б�
	        ByteString audioBytes = ByteString.readFrom(new FileInputStream(audioFilePath));

	        // ����� ����
	        RecognitionAudio audio = RecognitionAudio.newBuilder()
	                .setContent(audioBytes)
	                .build();

	        // ���� �ν� ����
	        RecognitionConfig config = RecognitionConfig.newBuilder()
	                .setEncoding(com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16) // Speech-to-Text�� LINEAR16 ����
	                .setSampleRateHertz(16000)
	                .build();

	        // ���� �ν� ��û ����
	        RecognizeRequest request = RecognizeRequest.newBuilder()
	                .setConfig(config)
	                .setAudio(audio)
	                .build();

	        // ����� �޾ƿ���
	        RecognizeResponse response = speechClient.recognize(request);

	        // ��ȯ�� �ؽ�Ʈ ����
	        StringBuilder transcript = new StringBuilder();
	        for (SpeechRecognitionResult result : response.getResultsList()) {
	            transcript.append(result.getAlternativesList().get(0).getTranscript()).append("\n");
	        }

	        return transcript.toString().trim();  // ��ȯ�� �ؽ�Ʈ ��ȯ
	    }
	}

	@Override
	public String detectLang(String text) {
		try {
	        Detection detection = translate.detect(text);
	        return detection.getLanguage();
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "unknown"; // ���� �߻� �� �⺻�� ��ȯ
	    }
    }
}
