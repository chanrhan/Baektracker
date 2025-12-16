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
    private final RestClient restClient;

    public SolvedAcUser searchUser(String username) {
        ResponseEntity<SolvedAcUser> response = restClient.get()
                .uri(BASE_URL + "/search/user")
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .toEntity(SolvedAcUser.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw CustomException.of(ApiResponseCode.NOT_FOUND_USER);
        }
        return response.getBody();
    }

    public SolvedAcProblem getProblemInfo(Integer problemId) {
        ResponseEntity<SolvedAcProblem> response = restClient.get()
                .uri(BASE_URL + "/problem/show)")
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .retrieve()
                .toEntity(SolvedAcProblem.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw CustomException.of(ApiResponseCode.NOT_FOUND_PROBLEM);
        }
        return response.getBody();
    }

    public SolvedAcProblems searchProblems(String query) {
        ResponseEntity<SolvedAcProblems> response = restClient.get()
                .uri(ub -> ub
                        .path("/search/problem")
                        .queryParam("page", 0)
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

}
