package com.ringo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AddressServiceImpl implements AddressService{

    @Value("${juso.api.key}")
    private String apiKey; // 발급받은 API 키

    private final RestTemplate restTemplate;

    public AddressServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchRoadAddress(String keyword) {
        String apiUrl = "https://www.juso.go.kr/addrlink/addrLinkApi.do";

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("confmKey", apiKey) // 인증키
                .queryParam("currentPage", 1) // 페이지 번호 (1번 페이지)
                .queryParam("countPerPage", 10) // 페이지당 결과 개수
                .queryParam("keyword", keyword); // 검색할 도로명 주소

        ResponseEntity<String> response = restTemplate.exchange(
                uriBuilder.toUriString(), HttpMethod.GET, null, String.class);

        return response.getBody();
    }
}