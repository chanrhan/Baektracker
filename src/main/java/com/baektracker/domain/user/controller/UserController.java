package com.baektracker.domain.user.controller;

import com.baektracker.domain.user.dto.UserInfo;
import com.baektracker.domain.user.dto.request.UpdatePasswordRequestDto;
import com.baektracker.domain.user.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PatchMapping("/pwd")
    public ResponseEntity<Void> updateUserPassword(@RequestBody UpdatePasswordRequestDto dto) {
        userService.updatePassword(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
