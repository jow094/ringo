package com.ringo.service;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.springframework.stereotype.Service;

import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding; // Google Speech-to-Text�� AudioEncoding
import java.io.FileInputStream;

@Service
public class AudioServiceImpl implements AudioService {
	
	private String ttsPath = "C:/ringo_files/audio/tts/";
	private String sttPath = "C:/ringo_files/audio/stt/";
    
	public String tts(String text,String msg_code,String target_lang) throws IOException {
	    // Ŭ���̾�Ʈ ����
	    try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {

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
	        String outputPath = msg_code + "output.mp3"; // ���� ���
	        try (OutputStream out = new FileOutputStream(outputPath)) {
	            out.write(audioContents.toByteArray());
	        }

	        System.out.println("Audio content written to file 'output.mp3'");
	        return outputPath;  // ������ ����� ���� ��θ� ����
	    }
	}

    
	public String stt(String msg_code) throws IOException {
	    // Ŭ���̾�Ʈ ����
	    try (SpeechClient speechClient = SpeechClient.create()) {
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

}
