package com.ringo.service;

import java.io.UnsupportedEncodingException;

public interface AddressService {
	public String searchRoadAddress(String keyword) throws UnsupportedEncodingException;
	public String getAddressFromCoordinates(double latitude, double longitude);
	public String parseAddressFromResponse(String responseBody);
}
