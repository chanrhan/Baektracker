package com.hanco.hanco.problem.controller;

import com.hanco.hanco.problem.service.ProblemService;
import com.hanco.hanco.problem.vo.SolvedAcRequestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/problem")
public class ProblemController {
    private final ProblemService problemService;

    @PostMapping("")
    public ResponseEntity<List<Map<String,Object>>> getProblems(@RequestBody SolvedAcRequestVO vo){
//        System.out.println(vo);
        return ResponseEntity.ok(problemService.getProblems(vo));
    }

    @GetMapping("/reload")
    public ResponseEntity<Boolean> loadBaekjoonProblems(){
        return ResponseEntity.ok(problemService.loadBaekjoonProblemStatus() > 0);
    }

    @PostMapping("/weekly")
    public ResponseEntity<Boolean> updateWeeklyProblem(@RequestParam String date, @RequestBody List<Integer> list){
        return ResponseEntity.ok(problemService.updateWeeklyProblem(date, list) > 0);
    }

    @GetMapping("/weekly")
    public ResponseEntity<List<Map<String,Object>>> getWeeklyProblem(@RequestParam String date){
        return ResponseEntity.ok(problemService.getWeeklyProblem(date));
    }

    @GetMapping("/weekly/solved")
    public ResponseEntity<String> getWeeklyProblemSolved(@RequestParam String date){
        return ResponseEntity.ok(problemService.getWeeklyProblemSolved(date));
    }


    @GetMapping("/search")
    public ResponseEntity<List<Map<String,Object>>> searchProblems(@RequestParam String keyword){
        return ResponseEntity.ok(problemService.searchProblems(keyword));
    }

    @GetMapping("/users/solved")
    public ResponseEntity<List<Map<String,Object>>> getUsersByProblem(@RequestParam Integer problemId){
        return ResponseEntity.ok(problemService.getUsersByProblem(problemId));
    }

    @GetMapping("/problem/source")
    public ResponseEntity<List<Map<String,Object>>> getProblemSource(@RequestParam Integer submitId){
        return ResponseEntity.ok(problemService.getProblemSource(submitId));
    }

}
