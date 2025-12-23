package com.hanco.hanco.domain.problem.service;

import com.hanco.hanco.domain.problem.dto.SolvedAcProblem;
import com.hanco.hanco.domain.problem.dto.SolvedAcProblems;
import com.hanco.hanco.domain.weekly_result.dto.SolvedAcUser;
import com.hanco.hanco.global.code.ApiResponseCode;
import com.hanco.hanco.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

// Solved-ac API
@Service
@RequiredArgsConstructor
public class SolvedAcService {
    private static final String BASE_URL = "https://solved.ac/api/v3";

    public SolvedAcUser searchUser(String username) {
        ResponseEntity<SolvedAcUser> response = getRestClient().get()
                .uri(ub -> ub.path("/search/user")
                        .queryParam("query", username)
                        .build())
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .toEntity(SolvedAcUser.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw CustomException.of(ApiResponseCode.NOT_FOUND_USER);
        }
        return response.getBody();
    }

    public SolvedAcProblem getProblemInfo(Integer problemId) {
        ResponseEntity<SolvedAcProblem> response = getRestClient().get()
                .uri(ub -> ub.path("/problem/show")
                        .queryParam("problemId", problemId)
                        .build())
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .toEntity(SolvedAcProblem.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw CustomException.of(ApiResponseCode.NOT_FOUND_PROBLEM);
        }
        return response.getBody();
    }

    public SolvedAcProblems searchProblems(String query) {
        ResponseEntity<SolvedAcProblems> response = getRestClient().get()
                .uri(ub -> ub
                        .path("/search/problem")
                        .queryParam("direction", "asc")
                        .queryParam("query", query)
                        .queryParam("sort", "level")
                        .build()
                )
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .toEntity(SolvedAcProblems.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw CustomException.of(ApiResponseCode.NOT_FOUND_PROBLEM);
        }
        return response.getBody();
    }

    private RestClient getRestClient() {
        return RestClient.builder()
                .baseUrl(BASE_URL)
                .build();
    }

}
