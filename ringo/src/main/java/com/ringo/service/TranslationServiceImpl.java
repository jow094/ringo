package com.ringo.service;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TranslationServiceImpl implements TranslationService{
	
	private static final Logger logger = LoggerFactory.getLogger(TranslationServiceImpl.class);
	
	@Value("${deepl.api.key}")
    private String apiKey;
	
    private final RestTemplate restTemplate;

    private final String API_URL = "https://api-free.deepl.com/v2/translate";
    private final String DETECT_API_URL = "https://api-free.deepl.com/v2/detect";
    
    public TranslationServiceImpl(RestTemplate restTemplate) {
    	this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
    }

    public String translate(String text, String targetLang) {
    	
    	String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
    	
    	URI uri = UriComponentsBuilder.fromUriString(API_URL)
                .queryParam("auth_key", apiKey)
                .queryParam("text", encodedText)
                .queryParam("target_lang", targetLang)
                .build(true).toUri();
    	
    	logger.debug("uri: "+uri);
    	
        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, null, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
            	logger.debug("Response Body: " + response.getBody());
                JsonNode jsonResponse = new ObjectMapper().readTree(response.getBody());
                String translatedText = jsonResponse.get("translations").get(0).get("text").asText();
                logger.debug("Translated Text: " + translatedText);
                
                return translatedText;
            } catch (Exception e) {
                e.printStackTrace();
                return "Error parsing response from DeepL API";
            }
        } else {
            return "Translation failed";
        }
    }
    
    public String detectLanguage(String text) {
    	String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
    	
    	URI uri = UriComponentsBuilder.fromUriString(DETECT_API_URL)
                .queryParam("auth_key", apiKey)
                .queryParam("text", encodedText)
                .build(true).toUri();

    	logger.debug("Language detection URI: " + uri);
    	
        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, null, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
            	logger.debug("Response Body: " + response.getBody());
                JsonNode jsonResponse = new ObjectMapper().readTree(response.getBody());
                String detectedLanguage = jsonResponse.get("language").asText();
                logger.debug("Detected Language: " + detectedLanguage);
                
                return detectedLanguage;
            } catch (Exception e) {
                e.printStackTrace();
                return "Error parsing response from DeepL API";
            }
        } else {
            return "Language detection failed";
        }
    }
}
