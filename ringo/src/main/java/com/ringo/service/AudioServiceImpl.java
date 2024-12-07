package com.ringo.service;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import com.mpatric.mp3agic.*;
import com.ringo.persistence.MsgDAO;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	private final String stt_key = "8203a5fbbe104e6a96187facb535223f";
    
	private String uploadPath_audio = "C:/ringo_files/messenger/audio/";
	private String ttsPath = "C:/ringo_files/audio/tts/";
	
	private final RestTemplate restTemplate;
	private final Translate translate;
	
	@Autowired
	private MsgDAO msgdao;
	
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
	        		.setAudioEncoding(com.google.cloud.texttospeech.v1.AudioEncoding.OGG_OPUS)
	        		.setSpeakingRate(0.8)
	                .build();

	        // ��û ����
	        SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

	        // ����� MP3 ���Ϸ� ����
	        ByteString audioContents = response.getAudioContent();
	        
	        String duration = getMp3Duration(audioContents).toString();
	        
	        String fileName = msg_code + "_"+ duration +"_tts.mp3";
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
	    	String audioFilePath = (uploadPath_audio + file_name).replace(".mp3", ".wav");
	    	
	    	logger.debug("sst file path :"+audioFilePath);
	    	
	        // ����� ���� �б�
	    	 ByteString audioBytes = ByteString.readFrom(new FileInputStream(audioFilePath));

	        // ����� ����
	        RecognitionAudio audio = RecognitionAudio.newBuilder()
	                .setContent(audioBytes)
	                .build();
	        // ���� �ν� ����
	        RecognitionConfig config = RecognitionConfig.newBuilder()
	        	    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16) // Speech-to-Text�� LINEAR16 ����
	        	    .setLanguageCode("en-US") // �⺻ ��� ����
	        	    .setAudioChannelCount(1) // ��� ä�η� ����
	        	    .addAlternativeLanguageCodes("ko-kr") // ���� ���
	        	    .build();


	        // ���� �ν� ��û ����
	        RecognizeRequest request = RecognizeRequest.newBuilder()
	                .setConfig(config)
	                .setAudio(audio)
	                .build();

	        // ����� �޾ƿ���
	        RecognizeResponse response = speechClient.recognize(request);
	        
	        if (response.getResultsList().isEmpty()) {
	            logger.error("No speech recognition results found.");
	        } else {
	            logger.debug("Speech recognition response: " + response);
	        }

	        for (SpeechRecognitionResult result : response.getResultsList()) {
	            logger.debug("Transcript: " + result.getAlternativesList().get(0).getTranscript());
	        }
	        
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
	        return "unknown";
	    }
    }
	
	@Override
	public Integer getMp3Duration(ByteString audioContents) throws IOException {
	    // �ӽ� MP3 ���� ����
	    File tempFile = File.createTempFile("tempAudio", ".mp3");
	    try (FileOutputStream fos = new FileOutputStream(tempFile)) {
	        fos.write(audioContents.toByteArray());
	    }

	    double durationInSeconds = 0.0;

	    try {
	        // FFmpeg ��ɾ�� ���� ���� ���
	        String ffmpegPath = "C:/ringo_files/ffmpeg-master-latest-win64-gpl-shared/bin/ffmpeg.exe";
	        ProcessBuilder processBuilder = new ProcessBuilder(
	            ffmpegPath,
	            "-i", tempFile.getAbsolutePath(),
	            "-hide_banner"
	        );
	        processBuilder.redirectErrorStream(true);
	        Process process = processBuilder.start();

	        // FFmpeg ��� �б�
	        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
	            String line;
	            while ((line = reader.readLine()) != null) {
	                // "Duration: 00:01:23.45" ������ ��¿��� ���� ����
	                if (line.contains("Duration:")) {
	                    String duration = line.split(",")[0].split(": ")[1].trim();
	                    String[] hms = duration.split(":");
	                    durationInSeconds = Integer.parseInt(hms[0]) * 3600 +
	                                        Integer.parseInt(hms[1]) * 60 +
	                                        Double.parseDouble(hms[2]);
	                    break;
	                }
	            }
	        }
	        try {
				process.waitFor();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
	    } finally {
	        // �ӽ� ���� ����
	        if (!tempFile.delete()) {
	            tempFile.deleteOnExit();
	        }
	    }

	    // �Ҽ��� ù° �ڸ����� �ݿø�
	    return (int)Math.round(durationInSeconds * 10.0);
	}

	
	public String transferToWav(String mp3FilePath) {
	    // .mp3 Ȯ���ڸ� .wav�� ����
	    String outputFilePath = mp3FilePath.replace(".mp3", ".wav");

	    try {
	        logger.debug("mp3FilePath result: " + mp3FilePath);
	        logger.debug("outputFilePath result: " + outputFilePath);

	        // FFmpeg ���� ���� ���
	        String ffmpegPath = "C:/ringo_files/ffmpeg-master-latest-win64-gpl-shared/bin/ffmpeg.exe";

	        // FFmpeg ��ɾ� ����
	        String ffmpegCommand = ffmpegPath + " -i \"" + mp3FilePath + "\" -ac 1 -ar 16000 -f wav \"" + outputFilePath + "\"";
	        logger.debug("Executing FFmpeg command: " + ffmpegCommand);

	        // ProcessBuilder�� FFmpeg ��ɾ� ����
	        ProcessBuilder builder = new ProcessBuilder(ffmpegCommand.split(" "));
	        builder.redirectErrorStream(true); // ���� ��µ� ����
	        Process process = builder.start();

	        // FFmpeg ��ɾ��� ���� �α׸� ���
	        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
	            String line;
	            while ((line = reader.readLine()) != null) {
	                logger.debug(line); // FFmpeg ��� �α�
	            }
	        }

	        // FFmpeg ���μ��� �Ϸ� ���
	        int exitCode = process.waitFor();
	        if (exitCode != 0) {
	            throw new RuntimeException("FFmpeg ��ȯ ����. Exit code: " + exitCode);
	        }

	        // ��ȯ �Ϸ� �� ���� MP3 ���� ����
	        Files.delete(Paths.get(mp3FilePath));
	        logger.debug("Original MP3 file deleted: " + mp3FilePath);

	        // ��� ���� �̸� ��ȯ
	        return Paths.get(outputFilePath).getFileName().toString();

	    } catch (Exception e) {
	        e.printStackTrace();
	        return "��ȯ �� ���� �߻�: " + e.getMessage();
	    }
	}

}
