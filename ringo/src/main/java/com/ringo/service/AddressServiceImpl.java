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
    private String apiKey; // �߱޹��� API Ű

    private final RestTemplate restTemplate;

    public AddressServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchRoadAddress(String keyword) {
        String apiUrl = "https://www.juso.go.kr/addrlink/addrLinkApi.do";

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("confmKey", apiKey) // ����Ű
                .queryParam("currentPage", 1) // ������ ��ȣ (1�� ������)
                .queryParam("countPerPage", 10) // �������� ��� ����
                .queryParam("keyword", keyword); // �˻��� ���θ� �ּ�

        ResponseEntity<String> response = restTemplate.exchange(
                uriBuilder.toUriString(), HttpMethod.GET, null, String.class);

        return response.getBody();
    }
}