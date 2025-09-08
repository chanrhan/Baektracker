package com.hanco.hanco.controller;

import com.hanco.hanco.service.ProblemService;
import com.hanco.hanco.service.UserService;
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
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<Map<String,Object>>> getAllUsers(@RequestParam String date){
        return ResponseEntity.ok(userService.getAllUsers(date));
    }

    @PostMapping("/pass/{id}/{state}")
    public ResponseEntity<Boolean> grantPassThisWeek(@PathVariable String id, @PathVariable int state, @RequestBody String password){
        return ResponseEntity.ok(userService.grantPassThisWeek(id, state, password));
    }

}
