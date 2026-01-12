package com.baektracker.domain.weekly_result.job;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

import com.baektracker.common.util.DateUtil;
import com.baektracker.domain.problem.code.SolvedAcResultType;
import com.baektracker.domain.problem.model.BaekjoonProblem;
import com.baektracker.domain.problem.model.SolvedProblem;
import com.baektracker.domain.problem.queryRepository.SolvedProblemQueryRepository;
import com.baektracker.domain.problem.service.BaekjoonProblemService;
import com.baektracker.domain.user.model.User;
import com.baektracker.domain.user.repository.UserRepository;
import com.baektracker.domain.weekly_result.code.WeeklyResultState;
import com.baektracker.domain.weekly_result.model.WeeklyResult;
import com.baektracker.domain.weekly_result.repository.WeeklyResultRepository;
import com.baektracker.domain.weekly_result.service.WeeklyResultService;
import com.baektracker.mapper.WeeklyResultMapper;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class WeeklyResultServiceTest {

    @InjectMocks
    private WeeklyResultService weeklyResultService;

    @Mock
    private WeeklyResultMapper weeklyResultMapper;
    @Mock
    private UserRepository userRepository;
    @Mock
    private WeeklyResultRepository weeklyResultRepository;
    @Mock
    private SolvedProblemQueryRepository solvedProblemQueryRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private BaekjoonProblemService problemService;

    @Test
    void 빈_주간_결과_삽입_테스트() {
        LocalDate date = LocalDate.of(2025, 12, 15);
        String yearWeek = DateUtil.toYearWeek(date);

        User user1 = User.builder().id(1L).build();
        User user2 = User.builder().id(2L).build();

        // given
        given(userRepository.findAll()).willReturn(List.of(user1, user2));

        ArgumentCaptor<List<WeeklyResult>> captor = ArgumentCaptor.forClass(List.class);

        // when
        weeklyResultService.insertInitialWeeklyResults(date);

        // then
        then(weeklyResultRepository).should().saveAll(captor.capture());
        List<WeeklyResult> saved = captor.getValue();

        assertThat(saved).hasSize(2);
        assertThat(saved).allSatisfy(wr -> {
            assertThat(wr.getYearWeek()).isEqualTo(yearWeek);
            assertThat(wr.getState()).isEqualTo(WeeklyResultState.None);
            assertThat(wr.getFine()).isEqualTo(0);
            assertThat(wr.getScore()).isEqualTo(0);
            assertThat(wr.getUser()).isNotNull();
        });
    }

    @Test
    void 주간_결과_업데이트_20점_실패() {
        // given
        LocalDate from = LocalDate.of(2026, 1, 1);
        LocalDate to = LocalDate.of(2026, 1, 7);
        String yearWeek = DateUtil.toYearWeek(to);

        User u1 = User.builder().id(1L).build();

        WeeklyResult r1 = WeeklyResult.builder()
                .user(u1)
                .state(WeeklyResultState.None)
                .build();

        given(weeklyResultRepository.findWeeklyResultByYearWeek(yearWeek))
                .willReturn(List.of(r1));

        BaekjoonProblem bronze1 = BaekjoonProblem.builder()
                .id(1)
                .title("bronze 1")
                .level(5)
                .build();

        SolvedProblem sp1 = SolvedProblem.builder()
                .id(1L)
                .user(u1)
                .submitId(1)
                .resultId(SolvedAcResultType.CORRECT.getStatus())
                .problem(bronze1)
                .tryDt(LocalDate.of(2026, 1, 2))
                .build();

        given(solvedProblemQueryRepository.getSolvedCorrectProblems(from, to))
                .willReturn(List.of(sp1));

        given(problemService.mapProblemToScore(sp1)).willReturn(20);

        // when
        weeklyResultService.updateWeeklyResults(from, to);

        // then
        assertThat(r1.getScore()).isEqualTo(20);
        assertThat(r1.getState()).isEqualTo(WeeklyResultState.Failed);
        assertThat(r1.getFine()).isEqualTo(3000);
    }

    @Test
    void 주간_결과_업데이트_100점_통과() {
        // given
        LocalDate from = LocalDate.of(2026, 1, 1);
        LocalDate to = LocalDate.of(2026, 1, 7);
        String yearWeek = DateUtil.toYearWeek(to);

        User u1 = User.builder().id(1L).build();

        WeeklyResult r1 = WeeklyResult.builder()
                .user(u1)
                .state(WeeklyResultState.None)
                .build();

        given(weeklyResultRepository.findWeeklyResultByYearWeek(yearWeek))
                .willReturn(List.of(r1));

        BaekjoonProblem bronze1 = BaekjoonProblem.builder()
                .id(1)
                .title("bronze 1")
                .level(5)
                .build();
        BaekjoonProblem silver1 = BaekjoonProblem.builder()
                .id(2)
                .title("silver 1")
                .level(10)
                .build();
        BaekjoonProblem gold1 = BaekjoonProblem.builder()
                .id(3)
                .title("gold 1")
                .level(15)
                .build();

        SolvedProblem sp1 = SolvedProblem.builder()
                .id(1L)
                .user(u1)
                .submitId(1)
                .resultId(SolvedAcResultType.CORRECT.getStatus())
                .problem(bronze1)
                .tryDt(LocalDate.of(2026, 1, 2))
                .build();
        SolvedProblem sp2 = SolvedProblem.builder()
                .id(2L)
                .user(u1)
                .submitId(2)
                .resultId(SolvedAcResultType.CORRECT.getStatus())
                .problem(silver1)
                .tryDt(LocalDate.of(2026, 1, 2))
                .build();
        SolvedProblem sp3 = SolvedProblem.builder()
                .id(3L)
                .user(u1)
                .submitId(3)
                .resultId(SolvedAcResultType.CORRECT.getStatus())
                .problem(gold1)
                .tryDt(LocalDate.of(2026, 1, 4))
                .build();

        given(solvedProblemQueryRepository.getSolvedCorrectProblems(from, to))
                .willReturn(List.of(sp1, sp2, sp3));

        given(problemService.mapProblemToScore(sp1)).willReturn(20);
        given(problemService.mapProblemToScore(sp2)).willReturn(30);
        given(problemService.mapProblemToScore(sp3)).willReturn(50);

        // when
        weeklyResultService.updateWeeklyResults(from, to);

        // then
        assertThat(r1.getScore()).isEqualTo(100);
        assertThat(r1.getState()).isEqualTo(WeeklyResultState.Completed);
        assertThat(r1.getFine()).isEqualTo(0);
    }


    @Test
    void 주간_결과_업데이트_20점_주간패스() {
        // given
        LocalDate from = LocalDate.of(2026, 1, 1);
        LocalDate to = LocalDate.of(2026, 1, 7);
        String yearWeek = DateUtil.toYearWeek(to);

        User u1 = User.builder().id(1L).build();

        WeeklyResult r1 = WeeklyResult.builder()
                .user(u1)
                .state(WeeklyResultState.WeekPass)
                .build();

        given(weeklyResultRepository.findWeeklyResultByYearWeek(yearWeek))
                .willReturn(List.of(r1));

        BaekjoonProblem bronze1 = BaekjoonProblem.builder()
                .id(1)
                .title("bronze 1")
                .level(5)
                .build();

        SolvedProblem sp1 = SolvedProblem.builder()
                .id(1L)
                .user(u1)
                .submitId(1)
                .resultId(SolvedAcResultType.CORRECT.getStatus())
                .problem(bronze1)
                .tryDt(LocalDate.of(2026, 1, 2))
                .build();

        given(solvedProblemQueryRepository.getSolvedCorrectProblems(from, to))
                .willReturn(List.of(sp1));

        given(problemService.mapProblemToScore(sp1)).willReturn(20);

        // when
        weeklyResultService.updateWeeklyResults(from, to);

        // then
        assertThat(r1.getScore()).isEqualTo(20);
        assertThat(r1.getState()).isEqualTo(WeeklyResultState.WeekPass);
        assertThat(r1.getFine()).isEqualTo(0);
    }

}
