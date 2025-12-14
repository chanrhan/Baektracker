package com.hanco.hanco.problem.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

// Solved-ac API
@Service
@RequiredArgsConstructor
public class SolvedAcService {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String BASE_URL = "https://solved.ac/api/v3";

    private static WebClient getWebClient(){
        return WebClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("x-solvedac-language", "ko")
                .build();
    }
//
//    public Map<String, Object> solvedacAPIRequest(String uri) throws IOException, InterruptedException {
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create(uri))
//                .header("x-solvedac-language", "ko")
//                .header("Accept", "application/json")
//                .GET()
//                .build();
////        System.out.println("aaa http request : " + request.toString());
//
//        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
//        Map<String, Object> map = objectMapper.readValue(response.body(), Map.class);
//        System.out.println(map);
//        return map;
//    }

    public Map<String,Object> searchUsers(String query){
        String body = getWebClient().get()
                .uri(ub->
                        ub.path("/search/user")
                                .queryParam("query", query)
                                .build())
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .bodyToMono(String.class)
                .block();
//        System.out.println(body);
        try {
            return objectMapper.readValue(body, Map.class);
        }catch (Exception e){
            throw new RuntimeException("[Solved-ac API] 응답 파싱 실패: ", e);
        }
    }

    public Map<String,Object> getProblem(Integer problemId){
        String body = getWebClient().get()
                .uri(ub->
                        ub.path("/problem/show")
                                .queryParam("problemId", problemId)
                                .build())
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .bodyToMono(String.class)
                .block();
//        System.out.println(body);
        try {
            return objectMapper.readValue(body, Map.class);
        }catch (Exception e){
            throw new RuntimeException("[Solved-ac API] 응답 파싱 실패: ", e);
        }
    }


    public Map<String,Object> searchProblem(String keyword){
        String body = getWebClient().get()
                .uri(ub->
                        ub.path("/search/problem")
                                .queryParam("query", keyword)
                                .queryParam("direction", "asc")
                                .queryParam("sort", "id")
                                .build())
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        System.out.println(body);
        try {
            return objectMapper.readValue(body, Map.class);
        }catch (Exception e){
            throw new RuntimeException("[Solved-ac API] 응답 파싱 실패: ", e);
        }
    }

}
