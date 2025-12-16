package com.hanco.hanco.domain.problem.service;

import com.hanco.hanco.common.util.DateUtil;
import com.hanco.hanco.domain.problem.dto.request.UpdateWeeklyProblemRequest;
import com.hanco.hanco.domain.problem.dto.response.WeeklyProblemsResponse;
import com.hanco.hanco.domain.problem.model.WeeklyProblem;
import com.hanco.hanco.domain.problem.repository.ProblemRepository;
import com.hanco.hanco.domain.problem.repository.WeeklyProblemRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WeeklyProblemService {
    private final ProblemRepository problemRepository;
    private final WeeklyProblemRepository weeklyProblemRepository;

    @Transactional
    public WeeklyProblemsResponse getWeeklyProblem(LocalDate date) {
        String yearWeek = DateUtil.toYearWeek(date);
        List<WeeklyProblem> weeklyProblems = weeklyProblemRepository.findWeeklyProblemsByYearWeek(yearWeek);
        return WeeklyProblemsResponse.from(weeklyProblems);
    }

    @Transactional
    public void updateWeeklyProblem(UpdateWeeklyProblemRequest request) {
        String yearWeek = DateUtil.toYearWeek(request.date());
        weeklyProblemRepository.deleteWeeklyProblemByYearWeek(yearWeek);
        if (request.problemIds().isEmpty()) {
            return;
        }
        List<WeeklyProblem> weeklyProblems = request.problemIds().stream()
                .map(problemId -> WeeklyProblem.builder()
                        .problem(problemRepository.getReferenceById(problemId))
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
