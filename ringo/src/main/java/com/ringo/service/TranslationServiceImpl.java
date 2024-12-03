package com.ringo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    private final String API_URL = "https://api-free.deepl.com/v2/translate";

    public String translate(String text, String targetLang) {
        RestTemplate restTemplate = new RestTemplate();

        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                                        .queryParam("auth_key", apiKey)
                                        .queryParam("text", text)
                                        .queryParam("target_lang", "ko")
                                        .toUriString();
        
        logger.debug("url:"+url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
            	String rawResponse = response.getBody();
            	System.out.println("Raw response body: " + rawResponse);
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
}
