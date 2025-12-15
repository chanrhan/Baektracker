package com.hanco.hanco.weekly_result.controller;

import com.hanco.hanco.user.dto.request.WeekPassRequestDto;
import com.hanco.hanco.weekly_result.dto.WeeklyResultResponseDto;
import com.hanco.hanco.weekly_result.service.WeeklyResultService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("")
    public ResponseEntity<List<WeeklyResultResponseDto>> getWeeklyResult(@RequestParam String date){
        return ResponseEntity.ok(weeklyResultService.getWeeklyResults(date));
    }

    @PostMapping("/pass")
    public ResponseEntity<Void> updatePass(@RequestBody WeekPassRequestDto dto){
        weeklyResultService.updateWeekPass(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
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
