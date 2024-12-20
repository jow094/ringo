package com.ringo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@PropertySource("classpath:application.properties")
public class AddressServiceImpl implements AddressService{
	
	private static final Logger logger = LoggerFactory.getLogger(AddressServiceImpl.class);

    @Value("${juso.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate;

    @Value("${opencage.api.key}")
    private String locationApiKey;

    public AddressServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchRoadAddress(String keyword) throws UnsupportedEncodingException{
    	logger.debug("Original keyword: " + keyword);
    	String encodedKeyword = keyword.trim().replaceAll("[^a-zA-Z0-9媛�-�옡 ]", "");

        try {
            logger.debug("Encoded keyword: " + encodedKeyword);

            String apiUrl = "https://www.juso.go.kr/addrlink/addrLinkApi.do";
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .queryParam("confmKey", "devU01TX0FVVEgyMDI0MTExNzEzNDIwMzExNTI0NDQ=")
                    .queryParam("currentPage", 1)
                    .queryParam("countPerPage", 10)
                    .queryParam("keyword", encodedKeyword)
                    .queryParam("firstSort", "road");

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            logger.debug("Final API URL: " + uriBuilder.toUriString());
            
            ResponseEntity<String> response = restTemplate.exchange(
            	    uriBuilder.toUriString(),
            	    HttpMethod.GET,           
            	    null,                     
            	    String.class             
            	);
            
            logger.debug("Response Status Code: " + response.getStatusCode());
            logger.debug("API Response: " + response.getBody());

            return response.getBody();
        } catch (Exception e) {
            logger.error("Encoding error: " + e.getMessage(), e);
            return "Encoding error";
        }
    }
    
    @Override
    public String getAddressFromCoordinates(double latitude, double longitude) {
    	
    	String apiUrl = String.format("https://api.opencagedata.com/geocode/v1/json?q=%f+%f&key=%s&language=ko", latitude, longitude, locationApiKey);

        // 외부 API 호출
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
        
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            String responseBody = response.getBody();
            return parseAddressFromResponse(responseBody);
        } else {
            return "주소를 찾을 수 없습니다.";
        }
    }
    
    @Override
    public String parseAddressFromResponse(String responseBody) {
        JsonObject jsonResponse = JsonParser.parseString(responseBody).getAsJsonObject();
        String formattedAddress = jsonResponse.getAsJsonArray("results")
                                              .get(0).getAsJsonObject()
                                              .get("formatted")
                                              .getAsString();
        return formattedAddress;
    }
}