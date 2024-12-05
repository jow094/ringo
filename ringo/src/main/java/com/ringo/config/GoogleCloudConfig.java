package com.ringo.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class GoogleCloudConfig {

	@Bean
	public Translate translate() throws IOException {
	    // JSON 키 경로 설정
	    String jsonPath = "C:/ringo_files/bold-origin-440901-h0-f50595916e4e.json";

	    return TranslateOptions.newBuilder()
	            .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(jsonPath)))
	            .build()
	            .getService();
	}
}
