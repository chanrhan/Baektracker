package com.hanco.hanco.domain.problem.controller;

import com.hanco.hanco.domain.baekjoon.service.BaekjoonService;
import com.hanco.hanco.domain.problem.dto.response.ProblemsResponse;
import com.hanco.hanco.domain.problem.dto.response.WeeklyUsersProgressResponse;
import com.hanco.hanco.domain.problem.service.ProblemService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/problem")
public class ProblemController {
    private final ProblemService problemService;
    private final BaekjoonService baekjoonService;

    @GetMapping("")
    public ResponseEntity<WeeklyUsersProgressResponse> getProblems(@RequestParam LocalDate date) {
        return ResponseEntity.ok(problemService.getWeeklyUsersProgress(date));
    }

    @GetMapping("/reload")
    public ResponseEntity<Boolean> loadBaekjoonProblems() {
        return ResponseEntity.ok(baekjoonService.loadBaekjoonProblemStatus() > 0);
    }

    @GetMapping("/search")
    public ResponseEntity<ProblemsResponse> searchProblems(@RequestParam String keyword) {
        return ResponseEntity.ok(problemService.searchProblems(keyword));
    }

}
