package com.hanco.hanco.common.util;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@AllArgsConstructor
@Component
public class ApiUtil {
    private final RestClient restClient;

    public <T>ResponseEntity<T> get(String targetUrl, MultiValueMap<String, String> headers,
                                    Class<T> responseType){
        return restClient.get()
                .uri(targetUrl)
                .accept(MediaType.APPLICATION_JSON)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .toEntity(responseType);
    }

    public <T> ResponseEntity<T> post(String targetUrl, MultiValueMap<String, String> headers,
                                          Object body, Class<T> responseType) {
        return restClient.post()
                .uri(targetUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .body(body)
                .retrieve()
                .toEntity(responseType);
    }
}
