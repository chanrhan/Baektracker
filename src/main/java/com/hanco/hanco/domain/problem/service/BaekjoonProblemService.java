package com.hanco.hanco.domain.problem.service;

import com.hanco.hanco.common.util.DateUtil;
import com.hanco.hanco.domain.problem.code.SolvedAcResultType;
import com.hanco.hanco.domain.problem.dto.SolvedAcProblem;
import com.hanco.hanco.domain.problem.dto.SolvedAcProblems;
import com.hanco.hanco.domain.problem.dto.SolvedProblemDetail;
import com.hanco.hanco.domain.problem.dto.WeeklyUserProgress;
import com.hanco.hanco.domain.problem.dto.response.ProblemInfo;
import com.hanco.hanco.domain.problem.dto.response.ProblemsResponse;
import com.hanco.hanco.domain.problem.dto.response.WeeklyUsersProgressResponse;
import com.hanco.hanco.domain.problem.model.BaekjoonProblem;
import com.hanco.hanco.domain.problem.model.SolvedProblem;
import com.hanco.hanco.domain.problem.queryRepository.SolvedProblemQueryRepository;
import com.hanco.hanco.domain.problem.repository.ProblemRepository;
import com.hanco.hanco.domain.user.model.User;
import com.hanco.hanco.domain.user.repository.UserRepository;
import com.hanco.hanco.domain.weekly_result.code.WeeklyResultState;
import com.hanco.hanco.domain.weekly_result.model.WeeklyResult;
import com.hanco.hanco.domain.weekly_result.repository.WeeklyResultRepository;
import com.hanco.hanco.global.code.ApiResponseCode;
import com.hanco.hanco.global.exception.CustomException;
import com.hanco.hanco.mapper.ProblemMapper;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Log4j2
public class BaekjoonProblemService {
    private final SolvedAcService solvedAcService;
    private final ProblemRepository problemRepository;
    private final ProblemMapper problemMapper;
    private final SolvedProblemQueryRepository solvedProblemQueryRepository;
    private final UserRepository userRepository;
    private final WeeklyResultRepository weeklyResultRepository;

    @Transactional(transactionManager = "mybatisTxManager")
    public ProblemsResponse searchProblems(String keyword) {
        SolvedAcProblems result = solvedAcService.searchProblems(keyword);

        List<SolvedAcProblem> problems = result.items();
        if (result.count() > 50) {
            problems = problems.subList(0, 50);
        }
        List<Integer> list = problems.stream()
                .map(SolvedAcProblem::problemId)
                .collect(Collectors.toList());

        List<Integer> solvedCountList = problemMapper.countUsersProblemSolved(list);

        return ProblemsResponse.of(problems, solvedCountList);
    }

    public Optional<ProblemInfo> getProblemInfo(int problemId) {
        SolvedAcProblem problem = solvedAcService.getProblemInfo(problemId);
        System.out.printf("qwe get problem (%d) : %s\n", problemId, problem.titleKo());
        return Optional.of(ProblemInfo.from(problem));
    }

    @Transactional(readOnly = true)
    public WeeklyUsersProgressResponse getWeeklyUsersProgress(LocalDate fromDate) {
        List<WeeklyUserProgress> progresses = new ArrayList<>();
        LocalDate toDate = fromDate.plusDays(6);
        List<User> users = userRepository.findAll();
        List<SolvedProblem> solvedProblems = solvedProblemQueryRepository.fetchUserProgresses(fromDate, toDate);
        String yearWeek = DateUtil.toYearWeek(fromDate);
        List<WeeklyResult> weeklyResults = weeklyResultRepository.findWeeklyResultByYearWeek(yearWeek);

        if (users.isEmpty() || solvedProblems.isEmpty()) {
            return WeeklyUsersProgressResponse.from(progresses);
        }
        Map<Long, List<SolvedProblem>> userMap = new HashMap<>();
        Map<Long, Boolean> weekPassMap = weeklyResults.stream()
                .collect(Collectors.toMap(
                        WeeklyResult::getUserId,
                        this::isWeekPass
                ));

        Map<Integer, List<String>> coSolverMap = solvedProblems.stream()
                .collect(Collectors.groupingBy(
                        SolvedProblem::getProblemId,
                        Collectors.mapping(SolvedProblem::getUserNickname, Collectors.toList())
                ));
        for (SolvedProblem solvedProblem : solvedProblems) {
            Long userId = solvedProblem.getUser().getId();
            if (!userMap.containsKey(userId)) {
                userMap.put(userId, new ArrayList<>());
            }
            List<SolvedProblem> list = userMap.get(userId);
            list.add(solvedProblem);
            userMap.put(userId, list);
        }
        for (User user : users) {
            boolean isWeekPass = false;
            if (weekPassMap.containsKey(user.getId())) {
                isWeekPass = weekPassMap.get(user.getId());
            }
            List<SolvedProblem> userProblems = userMap.get(user.getId());
            if (userProblems == null || userProblems.isEmpty()) {
                progresses.add(new WeeklyUserProgress(user.getId(), 0, isWeekPass, null));
                continue;
            }
            List<SolvedProblemDetail> details = userProblems.stream()
                    .map(problem ->
                            SolvedProblemDetail.of(
                                    problem,
                                    coSolverMap.get(problem.getProblemId())))
                    .toList();
            int score = userProblems.stream()
                    .filter(p -> p.getResultId() == SolvedAcResultType.CORRECT.getStatus())
                    .map(this::mapProblemToScore)
                    .reduce(Integer::sum)
                    .orElse(0);
            progresses.add(new WeeklyUserProgress(user.getId(), score, isWeekPass, details));
        }
        return WeeklyUsersProgressResponse.from(progresses);
    }

    public BaekjoonProblem getProblemOrInsert(Integer problemId) {
        BaekjoonProblem baekjoonProblem = problemRepository.findById(problemId)
                .orElse(null);
        if (baekjoonProblem == null) {
            return loadBaekjoonProblemAndInsert(problemId);
        }
        return baekjoonProblem;
    }

    @Transactional
    public BaekjoonProblem loadBaekjoonProblemAndInsert(Integer problemId) {
        ProblemInfo problemInfo = getProblemInfo(problemId)
                .orElseThrow(() -> CustomException.of(ApiResponseCode.SOLVED_AC_PROBLEM_SEARCH_ERROR));
        BaekjoonProblem baekjoonProblem = BaekjoonProblem.builder()
                .id(problemId)
                .title(problemInfo.title())
                .level(problemInfo.level())
                .build();
        return problemRepository.save(baekjoonProblem);
    }

    private boolean isWeekPass(WeeklyResult weeklyResult) {
        return weeklyResult.getState() == WeeklyResultState.WeekPass;
    }

    public int mapProblemToScore(SolvedProblem solvedProblem) {
        int level = solvedProblem.getProblem().getLevel();
        if (level <= 0) {
            return 10;
        } else if (level <= 5) {
            return 20;
        } else if (level <= 10) {
            return 30;
        } else if (level <= 15) {
            return 50;
        } else if (level > 15) {
            return 80;
        }
        return 0;
    }
}
