package com.hanco.hanco.user.service;

import com.hanco.hanco.common.util.ApiUtil;
import com.hanco.hanco.global.code.ApiResponseCode;
import com.hanco.hanco.global.exception.CustomException;
import com.hanco.hanco.user.dto.request.UpdatePasswordRequestDto;
import com.hanco.hanco.mapper.UserMapper;
import com.hanco.hanco.problem.service.SolvedAcService;
import com.hanco.hanco.user.model.User;
import com.hanco.hanco.user.model.UserProfile;
import com.hanco.hanco.user.repository.UserRepository;
import com.hanco.hanco.weekly_result.dto.SolvedAcUser;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class UserService {
    private final SolvedAcService solvedAcService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void updatePassword(UpdatePasswordRequestDto dto) {
        User user = userRepository.findUserById(dto.id())
                .orElseThrow(() -> CustomException.of(ApiResponseCode.NOT_FOUND_USER));
        if (!passwordEncoder.matches(dto.orgPwd(), user.getPassword())) {
            throw CustomException.of(ApiResponseCode.INVALID_PASSWORD);
        }
        user.updatePassword(passwordEncoder.encode(dto.newPwd()));
    }

    public List<UserProfile> getUsers() {
        List<User> users = userRepository.findAll();
        List<UserProfile> userProfiles = new ArrayList<>();
        for (User user : users) {
            SolvedAcUser solvedAcUser = solvedAcService.searchUser(user.getUsername());
            userProfiles.add(UserProfile.of(user, solvedAcUser));
        }
        userProfiles.sort((u1, u2) -> u2.tier() - u1.tier());
        return userProfiles;
    }

}
