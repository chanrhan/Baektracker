package com.hanco.hanco.controller;

import com.hanco.hanco.service.SolvedAcService;
import com.hanco.hanco.vo.SolvedAcRequestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/solved-ac")
public class SolvedAcController {
    private final SolvedAcService solvedAcService;

    @GetMapping("/user")
    public ResponseEntity<List<Map<String,Object>>> getAllUsers(@RequestParam String date){
        return ResponseEntity.ok(solvedAcService.getAllUsers(date));
    }

    @PostMapping("/problem")
    public ResponseEntity<List<Map<String,Object>>> getProblems(@RequestBody SolvedAcRequestVO vo){
//        System.out.println(vo);
        return ResponseEntity.ok(solvedAcService.getProblems(vo));
    }

    @GetMapping("/reload")
    public ResponseEntity<Boolean> loadBaekjoonProblems(){
        return ResponseEntity.ok(solvedAcService.loadBaekjoonProblemStatus() > 0);
    }

    @PostMapping("/shared-problem")
    public ResponseEntity<Boolean> updateSharedProblem(@RequestParam String date, @RequestBody List<Integer> list){
        return ResponseEntity.ok(solvedAcService.updateSharedProblem(date, list) > 0);
    }

    @GetMapping("/shared-problem")
    public ResponseEntity<List<Map<String,Object>>> getSharedProblem(@RequestParam String date){
        return ResponseEntity.ok(solvedAcService.getSharedProblem(date));
    }

    @GetMapping("/shared-problem/weekly-solved")
    public ResponseEntity<String> getWeeklySharedSolved(@RequestParam String date){
        return ResponseEntity.ok(solvedAcService.getWeeklySharedSolved(date));
    }

    @GetMapping("/fine/week")
    public ResponseEntity<List<Map<String,Object>>> getWeeklyResult(@RequestParam String date){
        return ResponseEntity.ok(solvedAcService.getWeeklyResult(date));
    }

    @GetMapping("/fine/month")
    public ResponseEntity<Map<String,Object>> getMonthFine(@RequestParam String date){
        return ResponseEntity.ok(solvedAcService.getMonthFine(date));
    }

    @GetMapping("/fine/total")
    public ResponseEntity<Map<String,Object>> getTotalFine(){
        return ResponseEntity.ok(solvedAcService.getTotalFine());
    }

    @GetMapping("/problem/info/list")
    public ResponseEntity<List<Map<String,Object>>> getProblemInfoList(@RequestParam String keyword){
        return ResponseEntity.ok(solvedAcService.getProblemInfoList(keyword));
    }

    @GetMapping("/users/solved")
    public ResponseEntity<List<Map<String,Object>>> getUsersByProblem(@RequestParam Integer problemId){
        return ResponseEntity.ok(solvedAcService.getUsersByProblem(problemId));
    }

    @GetMapping("/problem/source")
    public ResponseEntity<List<Map<String,Object>>> getProblemSource(@RequestParam Integer submitId){
        return ResponseEntity.ok(solvedAcService.getProblemSource(submitId));
    }

}
