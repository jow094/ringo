package com.ringo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;
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
public class AddressServiceImpl implements AddressService{
	
	private static final Logger logger = LoggerFactory.getLogger(AddressServiceImpl.class);

    @Value("${juso.api.key}")
    private String apiKey; // πﬂ±ﬁπﬁ¿∫ API ≈∞

    private final RestTemplate restTemplate;

    public AddressServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchRoadAddress(String keyword) throws UnsupportedEncodingException{
    	logger.debug("Original keyword: " + keyword);
    	String encodedKeyword = keyword.trim().replaceAll("[^a-zA-Z0-9∞°-∆R ]", "");

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
            	    uriBuilder.toUriString(), // √÷¡æ URL
            	    HttpMethod.GET,           // GET ø‰√ª
            	    null,                     // «Ï¥ı æ¯¿Ã ø‰√ª
            	    String.class              // ¿¿¥‰ ≈∏¿‘
            	);
            
            logger.debug("Response Status Code: " + response.getStatusCode());
            logger.debug("API Response: " + response.getBody());

            return response.getBody();
        } catch (Exception e) {
            logger.error("Encoding error: " + e.getMessage(), e);
            return "Encoding error";
        }
    }
}