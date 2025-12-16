package com.hanco.hanco.domain.weekly_result.service;

import com.hanco.hanco.domain.user.dto.request.WeekPassRequestDto;
import com.hanco.hanco.domain.weekly_result.dto.WeeklyResultResponseDto;
import com.hanco.hanco.global.code.ApiResponseCode;
import com.hanco.hanco.global.exception.CustomException;
import com.hanco.hanco.mapper.UserMapper;
import com.hanco.hanco.mapper.WeeklyResultMapper;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class WeeklyResultService {
    private final UserMapper userMapper;
    private final WeeklyResultMapper weeklyResultMapper;
    private final PasswordEncoder passwordEncoder;

    public void insertWeeklyScore(int target, int fine) {
        weeklyResultMapper.insertWeeklyResult(target, fine);
    }

    public Map<String, Object> getTotalFine() {
        return weeklyResultMapper.getTotalFine();
    }

    public Map<String, Object> getMonthFine(String date) {
        return weeklyResultMapper.getMonthFine(date);
    }

    public List<WeeklyResultResponseDto> getWeeklyResults(String date) {
        return weeklyResultMapper.getWeeklyResults(date);
    }

    public void updateWeekPass(WeekPassRequestDto dto) {
//        if(LocalDate.now().getDayOfWeek().getValue() >= 6){
//            throw CustomException.of(ApiResponseCode.PASS_NOT_ALLOWED);
//        }
        String password = userMapper.findPassword(dto.id());
        if (!StringUtils.hasText(password)) {
            throw CustomException.of(ApiResponseCode.NOT_FOUND_USER, "user id: " + dto.id());
        }
        if (!passwordEncoder.matches(dto.password(), password)) {
            throw CustomException.of(ApiResponseCode.INVALID_PASSWORD);
        }

        int state = dto.activate() ? 2 : 0;
        weeklyResultMapper.updateWeekPass(dto.id(), dto.date(), state);
    }

    public void settleFine() {

    }
}
