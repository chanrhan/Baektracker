package com.hanco.hanco.domain.problem.service;

import com.hanco.hanco.common.util.DateUtil;
import com.hanco.hanco.domain.problem.dto.WeeklyProblemInfo;
import com.hanco.hanco.domain.problem.dto.request.UpdateWeeklyProblemRequest;
import com.hanco.hanco.domain.problem.dto.response.WeeklyProblemsResponse;
import com.hanco.hanco.domain.problem.model.WeeklyProblem;
import com.hanco.hanco.domain.problem.queryRepository.WeeklyProblemQueryRepository;
import com.hanco.hanco.domain.problem.repository.ProblemRepository;
import com.hanco.hanco.domain.problem.repository.WeeklyProblemRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WeeklyProblemService {
    private final BaekjoonProblemService baekjoonProblemService;
    private final ProblemRepository problemRepository;
    private final WeeklyProblemRepository weeklyProblemRepository;
    private final WeeklyProblemQueryRepository weeklyProblemQueryRepository;

    @Transactional(readOnly = true)
    public WeeklyProblemsResponse getWeeklyProblem(LocalDate date) {
        List<WeeklyProblemInfo> weeklyProblems = weeklyProblemQueryRepository.fetchWeeklyProblemsWithSolvedCount(date);
        return WeeklyProblemsResponse.from(weeklyProblems);
    }

    @Transactional
    public void updateWeeklyProblem(UpdateWeeklyProblemRequest request) {
        System.out.println(request.problemIds());
        String yearWeek = DateUtil.toYearWeek(request.date());
        weeklyProblemRepository.deleteWeeklyProblemByYearWeek(yearWeek);
        weeklyProblemRepository.flush();
        if (request.problemIds().isEmpty()) {
            return;
        }
        insertWeeklyProblems(yearWeek, request.problemIds());
    }

    @Transactional
    protected void insertWeeklyProblems(String yearWeek, List<Integer> problemIds) {
        List<WeeklyProblem> weeklyProblems = problemIds.stream()
                .filter(Objects::nonNull)
                .map(id -> WeeklyProblem.builder()
                        .problem(baekjoonProblemService.getProblemOrInsert(id))
                        .yearWeek(yearWeek)
                        .build())
                .toList();
        weeklyProblemRepository.saveAll(weeklyProblems);
    }

//    public String getWeeklyProblemSolved(LocalDate date) {
//        String yearWeek = DateUtil.toYearWeek(date);
//        return problemMapper.getWeeklyProblemSolved(yearWeek);
//    }
}
