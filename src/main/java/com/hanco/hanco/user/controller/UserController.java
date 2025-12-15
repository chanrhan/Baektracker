package com.hanco.hanco.user.controller;

import com.hanco.hanco.user.dto.request.UpdatePasswordRequestDto;
import com.hanco.hanco.user.model.UserProfile;
import com.hanco.hanco.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserProfile>> getAllUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }


    @PatchMapping("/pwd")
    public ResponseEntity<Void> updateUserPassword(@RequestBody UpdatePasswordRequestDto dto) {
        userService.updatePassword(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
