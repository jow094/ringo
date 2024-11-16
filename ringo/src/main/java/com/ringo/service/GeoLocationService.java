package com.ringo.service;

import org.springframework.web.client.RestTemplate;

public interface GeoLocationService {
	public String getAddressFromCoordinates(double latitude, double longitude);
}
