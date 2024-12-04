package com.ringo.service;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.springframework.stereotype.Service;

import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding; // Google Speech-to-Text의 AudioEncoding
import java.io.FileInputStream;

@Service
public class AudioServiceImpl implements AudioService {
	
	private String ttsPath = "C:/ringo_files/audio/tts/";
	private String sttPath = "C:/ringo_files/audio/stt/";
    
	public String tts(String text,String msg_code,String target_lang) throws IOException {
	    // 클라이언트 생성
	    try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {

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
	        String outputPath = msg_code + "output.mp3"; // 파일 경로
	        try (OutputStream out = new FileOutputStream(outputPath)) {
	            out.write(audioContents.toByteArray());
	        }

	        System.out.println("Audio content written to file 'output.mp3'");
	        return outputPath;  // 생성된 오디오 파일 경로를 리턴
	    }
	}

    
	public String stt(String msg_code) throws IOException {
	    // 클라이언트 생성
	    try (SpeechClient speechClient = SpeechClient.create()) {
	    	String audioFilePath = sttPath + msg_code;
	        // 오디오 파일 읽기
	        ByteString audioBytes = ByteString.readFrom(new FileInputStream(audioFilePath));

	        // 오디오 설정
	        RecognitionAudio audio = RecognitionAudio.newBuilder()
	                .setContent(audioBytes)
	                .build();

	        // 음성 인식 설정
	        RecognitionConfig config = RecognitionConfig.newBuilder()
	                .setEncoding(com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16) // Speech-to-Text의 LINEAR16 형식
	                .setSampleRateHertz(16000)
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

	        return transcript.toString().trim();  // 변환된 텍스트 반환
	    }
	}

}
