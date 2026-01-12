package com.baektracker.domain.test.controller;

import com.baektracker.domain.weekly_result.service.WeeklyResultService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {

    private final WeeklyResultService weeklyResultService;

    @GetMapping("/job")
    public ResponseEntity<Void> testWeeklyResultJob(@RequestParam LocalDate date) {
        LocalDate fromDate = date.minusDays(6);
        System.out.printf("test: %s - %s", fromDate, date);
        weeklyResultService.updateWeeklyResults(fromDate, date);
        return ResponseEntity.noContent().build();
    }
}
