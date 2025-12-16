//package com.hanco.hanco.common.util;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.web.reactive.function.BodyInserters;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.io.IOException;
//import java.net.URI;
//import java.net.http.HttpClient;
//import java.net.http.HttpRequest;
//import java.net.http.HttpResponse;
//import java.util.Map;
//
//public class ExternalApiUtils {
//    private static final ObjectMapper objectMapper = new ObjectMapper();
//
////    private static WebClient getWebClient(String url){
////        return WebClient.builder()
////                .baseUrl(url)
////                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
////                .defaultHeader("x-solvedac-language", "ko")
////                .build();
////    }
////
////    public static Map<String, Object> solvedacAPIRequest(String uri) throws IOException, InterruptedException {
////        HttpRequest request = HttpRequest.newBuilder()
////                .uri(URI.create(uri))
////                .header("x-solvedac-language", "ko")
////                .header("Accept", "application/json")
////                .GET()
////                .build();
//////        System.out.println("aaa http request : " + request.toString());
////
////        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
////        System.out.println("aaa header: " + response.headers().toString());
////        System.out.println("aaa body: " + response.body());
////        Map<String, Object> map = objectMapper.readValue(response.body(), Map.class);
////        System.out.println(map);
////        return map;
////    }
////
//
//
//}
