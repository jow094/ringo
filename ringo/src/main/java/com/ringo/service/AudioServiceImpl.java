package com.ringo.service;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import com.mpatric.mp3agic.*;
import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;

@Service
public class AudioServiceImpl implements AudioService {
	
	private final String detect_URL = "https://translation.googleapis.com/language/translate/v2/detect";
    
	private String uploadPath_audio = "C:/ringo_files/messenger/audio/";
	private String ttsPath = "C:/ringo_files/audio/tts/";
	
	private final RestTemplate restTemplate;
	private final Translate translate;
	
	private static final Logger logger = LoggerFactory.getLogger(AudioServiceImpl.class);
	
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
	        double duration = 0.0;
	        try {
	        	duration = getMp3Duration(audioContents);
			} catch (Exception e) {
				e.printStackTrace();
			}
	        
	        Integer value = (int)duration*10;
	        
	        String fileName = msg_code + "_"+ value +"_tts.mp3";
	        String outputPath = ttsPath + fileName;
	        try (OutputStream out = new FileOutputStream(outputPath)) {
	            out.write(audioContents.toByteArray());
	        }

	        return fileName;  // ������ ����� ���� ��θ� ����
	    }
	}

	public String stt(String file_name) throws IOException {
		
		SpeechSettings speechSettings = SpeechSettings.newBuilder()
			    .setCredentialsProvider(FixedCredentialsProvider.create(
			        ServiceAccountCredentials.fromStream(new FileInputStream("C:/ringo_files/bold-origin-440901-h0-f50595916e4e.json"))))
			    .build();
		
	    // Ŭ���̾�Ʈ ����
	    try (SpeechClient speechClient = SpeechClient.create(speechSettings)) {
	    	String audioFilePath = uploadPath_audio + file_name;
	    	
	    	 String wavFilePath = transferToWav(audioFilePath);
	    	 
	    	 logger.debug("wfp : "+wavFilePath);
	        // ����� ���� �б�
	    	 ByteString audioBytes = ByteString.readFrom(new FileInputStream(wavFilePath));

	        // ����� ����
	        RecognitionAudio audio = RecognitionAudio.newBuilder()
	                .setContent(audioBytes)
	                .build();
	        // ���� �ν� ����
	        RecognitionConfig config = RecognitionConfig.newBuilder()
	                .setEncoding(com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16) // Speech-to-Text�� LINEAR16 ����
	                .setLanguageCode("en-US") // �⺻ ��� ����
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
	        
	        logger.debug("stt result : "+response);
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
	
	@Override
	public double getMp3Duration(ByteString audioContents) throws IOException, UnsupportedTagException, InvalidDataException {
	    // ByteArrayInputStream�� ���Ϸ� ��ȯ
	    File tempFile = File.createTempFile("tempAudio", ".mp3");
	    try (FileOutputStream fos = new FileOutputStream(tempFile)) {
	        fos.write(audioContents.toByteArray());
	    }

	    // Mp3agic�� ���� ���� ���
	    Mp3File mp3File = new Mp3File(tempFile.getAbsolutePath());
	    long durationMillis = mp3File.getLengthInMilliseconds();

	    // �ӽ� ���� ����
	    tempFile.delete();

	    double durationInSeconds = durationMillis / 1000.0;
	    return Math.round(durationInSeconds * 10.0) / 10.0;
	}
	
	public String transferToWav(String mp3FilePath) {
        String outputFilePath = mp3FilePath.replace(".mp3", ".wav");  // ��� ���� ��� (MP3 ���� ��ο� .wav Ȯ���ڸ� ���)

        try {
        	
        	String ffmpegPath = "C:/ringo_files/ffmpeg-master-latest-win64-gpl-shared/bin/ffmpeg.exe";
            // FFmpeg ��ɾ� ���� (�Է� ���ϰ� ��� ���� ��θ� �Ű������� ����)
            String ffmpegCommand = ffmpegPath + " -i " + mp3FilePath + " " + outputFilePath;

            // ProcessBuilder�� FFmpeg ��ɾ� ����
            Process process = new ProcessBuilder(ffmpegCommand.split(" ")).start();
            
            // FFmpeg ���� �α׸� ����� �� ����
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // FFmpeg �α� ���
            }

            // ��ɾ� ���� �� ���� �ڵ� Ȯ��
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("MP3 ������ WAV�� ���������� ��ȯ�߽��ϴ�.");
                
                return outputFilePath;
            } else {
                System.out.println("��ȯ ����.");
                return "��ȯ ����";
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "��ȯ �� ���� �߻�: " + e.getMessage();
        }
    }
}
