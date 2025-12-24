package com.baektracker.domain.problem.controller;

import com.baektracker.domain.problem.dto.request.UpdateWeeklyProblemRequest;
import com.baektracker.domain.problem.dto.response.WeeklyProblemsResponse;
import com.baektracker.domain.problem.service.WeeklyProblemService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/weekly-problem")
public class WeeklyProblemController {
    private final WeeklyProblemService weeklyProblemService;

    @GetMapping("")
    public ResponseEntity<WeeklyProblemsResponse> getWeeklyProblem(@RequestParam LocalDate date) {
        return ResponseEntity.ok(weeklyProblemService.getWeeklyProblem(date));
    }

    @PostMapping("")
    public ResponseEntity<Void> updateWeeklyProblem(@RequestBody UpdateWeeklyProblemRequest request) {
        weeklyProblemService.updateWeeklyProblem(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    @GetMapping("/solved")
//    public ResponseEntity<String> getWeeklyProblemSolved(@RequestParam LocalDate date) {
//        return ResponseEntity.ok(weeklyProblemService.getWeeklyProblemSolved(date));
//    }
}
