package com.hanco.hanco.controller;

import com.hanco.hanco.service.UserService;
import com.hanco.hanco.service.WeeklyResultService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/weekly-result")
public class WeeklyResultController {
    private final WeeklyResultService weeklyResultService;


    @GetMapping("/fine/week")
    public ResponseEntity<List<Map<String,Object>>> getWeeklyResult(@RequestParam String date){
        return ResponseEntity.ok(weeklyResultService.getWeeklyResult(date));
    }

    @GetMapping("/fine/month")
    public ResponseEntity<Map<String,Object>> getMonthFine(@RequestParam String date){
        return ResponseEntity.ok(weeklyResultService.getMonthFine(date));
    }

    @GetMapping("/fine/total")
    public ResponseEntity<Map<String,Object>> getTotalFine(){
        return ResponseEntity.ok(weeklyResultService.getTotalFine());
    }
}
