package com.baektracker.domain.weekly_result.service;

import com.baektracker.common.util.DateUtil;
import com.baektracker.domain.problem.model.SolvedProblem;
import com.baektracker.domain.problem.queryRepository.SolvedProblemQueryRepository;
import com.baektracker.domain.problem.service.BaekjoonProblemService;
import com.baektracker.domain.user.dto.request.WeekPassRequestDto;
import com.baektracker.domain.user.model.User;
import com.baektracker.domain.user.repository.UserRepository;
import com.baektracker.domain.weekly_result.code.WeeklyResultState;
import com.baektracker.domain.weekly_result.dto.UserFine;
import com.baektracker.domain.weekly_result.dto.UserStreak;
import com.baektracker.domain.weekly_result.dto.response.MonthFineStatusResponse;
import com.baektracker.domain.weekly_result.dto.response.MonthFineStatusResponse.InnerUserMonthFineItem;
import com.baektracker.domain.weekly_result.dto.response.TotalFineStatusResponse;
import com.baektracker.domain.weekly_result.dto.response.TotalFineStatusResponse.InnerUserFineItem;
import com.baektracker.domain.weekly_result.model.WeeklyResult;
import com.baektracker.domain.weekly_result.repository.WeeklyResultRepository;
import com.baektracker.global.code.ApiResponseCode;
import com.baektracker.global.exception.CustomException;
import com.baektracker.mapper.WeeklyResultMapper;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WeeklyResultService {
    private static final Integer DEADLINE_SCORE = 60;
    private static final Integer FINE_AMOUNT = 3000;

    private final WeeklyResultMapper weeklyResultMapper;
    private final UserRepository userRepository;
    private final WeeklyResultRepository weeklyResultRepository;
    private final SolvedProblemQueryRepository solvedProblemQueryRepository;
    private final PasswordEncoder passwordEncoder;
    private final BaekjoonProblemService problemService;

    @Transactional(readOnly = true)
    public TotalFineStatusResponse getTotalFineStatus() {
        List<UserFine> weeklyResults = weeklyResultRepository.getTotalFineGroupByUser();
        List<InnerUserFineItem> userFineList = new java.util.ArrayList<>(weeklyResults.stream()
                .map(InnerUserFineItem::from)
                .toList());
        userFineList.sort((f1, f2) -> f2.fine() - f1.fine());

        return TotalFineStatusResponse.of(userFineList);
    }

    @Transactional(readOnly = true)
    public MonthFineStatusResponse getMonthFine(LocalDate date) {
        List<User> users = userRepository.findAll();
        List<WeeklyResult> weeklyResults = weeklyResultRepository.findWeeklyResultByMonth(date);
        int monthTotalFine = weeklyResults.stream()
                .mapToInt(WeeklyResult::getFine)
                .reduce(Integer::sum)
                .orElse(0);
        Map<Long, Integer> userFineMap = weeklyResults.stream()
                .collect(Collectors.groupingBy(
                        WeeklyResult::getUserId,
                        Collectors.summingInt(WeeklyResult::getFine)
                ));
        Map<Long, List<Integer>> weeksMaps = weeklyResults.stream()
                .collect(Collectors.groupingBy(
                        WeeklyResult::getUserId,
                        Collectors.collectingAndThen(
                                Collectors.mapping(this::getWeekOfMonth, Collectors.toList()),
                                list -> {
                                    list.sort(Comparator.naturalOrder());
                                    return list;
                                }
                        )
                ));
        List<InnerUserMonthFineItem> items = new ArrayList<>();
        for (User user : users) {
            if (!userFineMap.containsKey(user.getId())) {
                continue;
            }
            int fine = userFineMap.get(user.getId());
            List<Integer> weekList = weeksMaps.get(user.getId());
            items.add(new InnerUserMonthFineItem(
                    user.getId(),
                    user.getNickname(),
                    fine,
                    weekList
            ));
        }
        return MonthFineStatusResponse.of(monthTotalFine, items);
    }

    @Transactional
    public void updateWeekPass(WeekPassRequestDto dto) {
        LocalDate date = dto.date();
        String yearWeek = DateUtil.toYearWeek(date);
        WeeklyResult weeklyResult = weeklyResultRepository.findWeeklyResultByYearWeekAndUser_Id(yearWeek, dto.id())
                .orElseThrow();
        User user = weeklyResult.getUser();

        if (!passwordEncoder.matches(dto.password(), user.getPassword())) {
            throw CustomException.of(ApiResponseCode.INVALID_PASSWORD);
        }

        if (date.getDayOfWeek().equals(DayOfWeek.SATURDAY) || date.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
            throw CustomException.of(ApiResponseCode.WEEK_PASS_NOT_ALLOWED);
        }

        WeeklyResultState state = dto.activate() ? WeeklyResultState.WeekPass : WeeklyResultState.None;
        weeklyResult.setState(state);
    }

    public void insertInitialWeeklyResults(LocalDate date) {
        List<User> users = userRepository.findAll();
        List<WeeklyResult> weeklyResults = users.stream()
                .map(user -> WeeklyResult.from(date, user))
                .toList();
        weeklyResultRepository.saveAll(weeklyResults);
    }

    @Transactional
    public void updateWeeklyResults(LocalDate fromDate, LocalDate toDate) {
        String yearWeek = DateUtil.toYearWeek(toDate);
        List<WeeklyResult> weeklyResults = weeklyResultRepository.findWeeklyResultByYearWeek(yearWeek);
        List<SolvedProblem> solvedProblems = solvedProblemQueryRepository.getCorrectProblems(fromDate, toDate);

        Map<Long, Integer> userScoreMap = solvedProblems.stream()
                .collect(Collectors.groupingBy(
                        SolvedProblem::getUserId,
                        Collectors.summingInt(problemService::mapProblemToScore)
                ));

        for (WeeklyResult weeklyResult : weeklyResults) {
            int score = userScoreMap.getOrDefault(weeklyResult.getUserId(), 0);
            int fine = 0;
            weeklyResult.setScore(score);
            if (weeklyResult.getState() == WeeklyResultState.None) {
                WeeklyResultState state = getWeeklyResultState(score);
                weeklyResult.setState(state);
                fine = getFineAmount(state);
            }
            weeklyResult.setFine(fine);
        }
    }

    @Transactional
    public void updateUserStreaks(LocalDate fromDate) {
        List<User> users = userRepository.findAll();
        List<UserStreak> streaks = weeklyResultMapper.getStreaks(fromDate);
        Map<Long, Integer> userStreakMap = streaks.stream()
                .collect(Collectors.toMap(
                        UserStreak::id,
                        UserStreak::streak
                ));
        for (User user : users) {
            if (!userStreakMap.containsKey(user.getId())) {
                continue;
            }
            int streak = userStreakMap.get(user.getId());
            user.setStreak(streak);
        }
    }

    private WeeklyResultState getWeeklyResultState(int score) {
        if (score >= DEADLINE_SCORE) {
            return WeeklyResultState.Completed;
        }
        return WeeklyResultState.Failed;
    }

    private int getFineAmount(WeeklyResultState state) {
        if (state == WeeklyResultState.Failed) {
            return FINE_AMOUNT;
        }
        return 0;
    }

    private int getWeekOfMonth(WeeklyResult weeklyResult) {
        return DateUtil.toWeekOfMonth(weeklyResult.getWeekDt());
    }
}
