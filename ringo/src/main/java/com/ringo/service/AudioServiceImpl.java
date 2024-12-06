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
	    // 클라이언트 생성
	    try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(textToSpeechSettings)) {

	        // 텍스트 입력 생성
	        SynthesisInput input = SynthesisInput.newBuilder().setText(text).build();

	        // 음성 선택
	        VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
	                .setLanguageCode(target_lang)
	                .setSsmlGender(SsmlVoiceGender.FEMALE)
	                .build();

	        // 오디오 설정
	        AudioConfig audioConfig = AudioConfig.newBuilder()
	                .setAudioEncoding(com.google.cloud.texttospeech.v1.AudioEncoding.MP3) // Text-to-Speech의 MP3 형식
	                .build();

	        // 요청 실행
	        SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

	        // 결과를 MP3 파일로 저장
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

	        return fileName;  // 생성된 오디오 파일 경로를 리턴
	    }
	}

	public String stt(String file_name) throws IOException {
		
		SpeechSettings speechSettings = SpeechSettings.newBuilder()
			    .setCredentialsProvider(FixedCredentialsProvider.create(
			        ServiceAccountCredentials.fromStream(new FileInputStream("C:/ringo_files/bold-origin-440901-h0-f50595916e4e.json"))))
			    .build();
		
	    // 클라이언트 생성
	    try (SpeechClient speechClient = SpeechClient.create(speechSettings)) {
	    	String audioFilePath = uploadPath_audio + file_name;
	    	
	    	 String wavFilePath = transferToWav(audioFilePath);
	    	 
	    	 logger.debug("wfp : "+wavFilePath);
	        // 오디오 파일 읽기
	    	 ByteString audioBytes = ByteString.readFrom(new FileInputStream(wavFilePath));

	        // 오디오 설정
	        RecognitionAudio audio = RecognitionAudio.newBuilder()
	                .setContent(audioBytes)
	                .build();
	        // 음성 인식 설정
	        RecognitionConfig config = RecognitionConfig.newBuilder()
	                .setEncoding(com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16) // Speech-to-Text의 LINEAR16 형식
	                .setLanguageCode("en-US") // 기본 언어 설정
	                .build();

	        // 음성 인식 요청 실행
	        RecognizeRequest request = RecognizeRequest.newBuilder()
	                .setConfig(config)
	                .setAudio(audio)
	                .build();

	        // 결과를 받아오기
	        RecognizeResponse response = speechClient.recognize(request);
	        
	        // 변환된 텍스트 생성
	        StringBuilder transcript = new StringBuilder();
	        for (SpeechRecognitionResult result : response.getResultsList()) {
	            transcript.append(result.getAlternativesList().get(0).getTranscript()).append("\n");
	        }
	        
	        logger.debug("stt result : "+response);
	        return transcript.toString().trim();  // 변환된 텍스트 반환
	    }
	}

	@Override
	public String detectLang(String text) {
		try {
	        Detection detection = translate.detect(text);
	        return detection.getLanguage();
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "unknown"; // 예외 발생 시 기본값 반환
	    }
    }
	
	@Override
	public double getMp3Duration(ByteString audioContents) throws IOException, UnsupportedTagException, InvalidDataException {
	    // ByteArrayInputStream을 파일로 변환
	    File tempFile = File.createTempFile("tempAudio", ".mp3");
	    try (FileOutputStream fos = new FileOutputStream(tempFile)) {
	        fos.write(audioContents.toByteArray());
	    }

	    // Mp3agic로 파일 길이 계산
	    Mp3File mp3File = new Mp3File(tempFile.getAbsolutePath());
	    long durationMillis = mp3File.getLengthInMilliseconds();

	    // 임시 파일 삭제
	    tempFile.delete();

	    double durationInSeconds = durationMillis / 1000.0;
	    return Math.round(durationInSeconds * 10.0) / 10.0;
	}
	
	public String transferToWav(String mp3FilePath) {
        String outputFilePath = mp3FilePath.replace(".mp3", ".wav");  // 출력 파일 경로 (MP3 파일 경로에 .wav 확장자를 사용)

        try {
        	
        	String ffmpegPath = "C:/ringo_files/ffmpeg-master-latest-win64-gpl-shared/bin/ffmpeg.exe";
            // FFmpeg 명령어 구성 (입력 파일과 출력 파일 경로를 매개변수로 전달)
            String ffmpegCommand = ffmpegPath + " -i " + mp3FilePath + " " + outputFilePath;

            // ProcessBuilder로 FFmpeg 명령어 실행
            Process process = new ProcessBuilder(ffmpegCommand.split(" ")).start();
            
            // FFmpeg 실행 로그를 출력할 수 있음
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // FFmpeg 로그 출력
            }

            // 명령어 실행 후 종료 코드 확인
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("MP3 파일을 WAV로 성공적으로 변환했습니다.");
                
                return outputFilePath;
            } else {
                System.out.println("변환 실패.");
                return "변환 실패";
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "변환 중 에러 발생: " + e.getMessage();
        }
    }
}
