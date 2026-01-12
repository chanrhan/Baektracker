package com.baektracker.domain.user.service;

import com.baektracker.domain.problem.service.SolvedAcService;
import com.baektracker.domain.user.dto.UserInfo;
import com.baektracker.domain.user.dto.request.UpdatePasswordRequestDto;
import com.baektracker.domain.user.model.User;
import com.baektracker.domain.user.repository.UserRepository;
import com.baektracker.domain.weekly_result.dto.SolvedAcUser;
import com.baektracker.global.code.ApiResponseCode;
import com.baektracker.global.exception.CustomException;
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

    public List<UserInfo> getUsers() {
        return userRepository.getUserInfo();
    }

    @Transactional
    public void updateUserInfoFromSolvedAc() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            SolvedAcUser solvedAcUser = solvedAcService.searchUser(user.getUsername());

            try {
                user.setLevel(solvedAcUser.items().get(0).tier());
            } catch (NullPointerException e) {
                e.printStackTrace();
                continue;
            }
        }
    }

}
