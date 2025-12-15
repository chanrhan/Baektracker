package com.hanco.hanco.problem.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanco.hanco.common.util.ApiUtil;
import com.hanco.hanco.global.code.ApiResponseCode;
import com.hanco.hanco.global.exception.CustomException;
import com.hanco.hanco.weekly_result.dto.SolvedAcUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

// Solved-ac API
@Service
@RequiredArgsConstructor
public class SolvedAcService {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String BASE_URL = "https://solved.ac/api/v3";
    private final ApiUtil apiUtil;

    public SolvedAcUser searchUser(String username){
        ResponseEntity<SolvedAcUser> response = apiUtil.get(BASE_URL + "/search/user", null, SolvedAcUser.class);
        if(!response.getStatusCode().is2xxSuccessful()){
            throw CustomException.of(ApiResponseCode.NOT_FOUND_USER);
        }
        return response.getBody();
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
