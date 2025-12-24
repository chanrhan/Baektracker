package com.baektracker.domain.user.service;

import com.baektracker.domain.problem.service.SolvedAcService;
import com.baektracker.domain.user.dto.UserInfo;
import com.baektracker.domain.user.dto.UserProfile;
import com.baektracker.domain.user.dto.request.UpdatePasswordRequestDto;
import com.baektracker.domain.user.model.User;
import com.baektracker.domain.user.repository.UserRepository;
import com.baektracker.domain.weekly_result.dto.SolvedAcUser;
import com.baektracker.global.code.ApiResponseCode;
import com.baektracker.global.exception.CustomException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final String DEFAULT_PWD = "0000";
    private final SolvedAcService solvedAcService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Transactional
    public void updatePassword(UpdatePasswordRequestDto dto) {
        User user = userRepository.findUserById(dto.id())
                .orElseThrow(() -> CustomException.of(ApiResponseCode.NOT_FOUND_USER));
        if (user.getPassword().equals(DEFAULT_PWD)) {
            user.updatePassword(passwordEncoder.encode(dto.newPwd()));
            return;
        }
        if (!passwordEncoder.matches(dto.orgPwd(), user.getPassword())) {
            throw CustomException.of(ApiResponseCode.INVALID_PASSWORD);
        }
        user.updatePassword(passwordEncoder.encode(dto.newPwd()));
    }

    public List<UserProfile> getUsers() {
        List<UserInfo> users = userRepository.getUserInfo();
        List<UserProfile> userProfiles = new ArrayList<>();
        for (UserInfo user : users) {
            SolvedAcUser solvedAcUser = solvedAcService.searchUser(user.username());
            userProfiles.add(UserProfile.of(user, solvedAcUser));
        }
        userProfiles.sort((u1, u2) -> u2.tier() - u1.tier());
        return userProfiles;
    }

}
