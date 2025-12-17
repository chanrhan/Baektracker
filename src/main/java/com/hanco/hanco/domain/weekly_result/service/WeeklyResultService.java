package com.hanco.hanco.domain.weekly_result.service;

import com.hanco.hanco.domain.user.dto.request.WeekPassRequestDto;
import com.hanco.hanco.domain.user.model.User;
import com.hanco.hanco.domain.weekly_result.dto.WeeklyResultResponseDto;
import com.hanco.hanco.domain.weekly_result.dto.response.TotalFineStatusResponse;
import com.hanco.hanco.domain.weekly_result.dto.response.TotalFineStatusResponse.InnerUserFineItem;
import com.hanco.hanco.domain.weekly_result.model.WeeklyResult;
import com.hanco.hanco.domain.weekly_result.repository.WeeklyResultRepository;
import com.hanco.hanco.global.code.ApiResponseCode;
import com.hanco.hanco.global.exception.CustomException;
import com.hanco.hanco.mapper.UserMapper;
import com.hanco.hanco.mapper.WeeklyResultMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class WeeklyResultService {
    private final UserMapper userMapper;
    private final WeeklyResultMapper weeklyResultMapper;
    private final WeeklyResultRepository weeklyResultRepository;
    private final PasswordEncoder passwordEncoder;

    public void insertWeeklyScore(int target, int fine) {
        weeklyResultMapper.insertWeeklyResult(target, fine);
    }

    public TotalFineStatusResponse getTotalFineStatus() {
        List<WeeklyResult> weeklyResults = weeklyResultRepository.findAll();
        Map<User, Integer> userFineMap = weeklyResults.stream()
                .collect(Collectors.groupingBy(
                        WeeklyResult::getUser,
                        Collectors.summingInt(WeeklyResult::getFine)
                ));
        List<InnerUserFineItem> userFineList = new ArrayList<>();
        for (User user : userFineMap.keySet()) {
            userFineList.add(InnerUserFineItem.of(user, userFineMap.get(user)));
        }
        userFineList.sort((f1, f2) -> f2.fine() - f1.fine());

        return TotalFineStatusResponse.of(userFineList);
//        return weeklyResultMapper.getTotalFine();
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
