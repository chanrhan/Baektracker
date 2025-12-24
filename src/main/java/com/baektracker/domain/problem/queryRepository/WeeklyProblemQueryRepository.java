package com.baektracker.domain.problem.queryRepository;

import com.baektracker.common.util.DateUtil;
import com.baektracker.domain.problem.code.SolvedAcResultType;
import com.baektracker.domain.problem.dto.WeeklyProblemInfo;
import com.baektracker.domain.problem.model.QSolvedProblem;
import com.baektracker.domain.problem.model.QWeeklyProblem;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WeeklyProblemQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<WeeklyProblemInfo> fetchWeeklyProblemsWithSolvedCount(LocalDate date) {
        String yearWeek = DateUtil.toYearWeek(date);
        System.out.println("year week: " + yearWeek);
        QWeeklyProblem wp = QWeeklyProblem.weeklyProblem;
        QSolvedProblem sp = QSolvedProblem.solvedProblem;

        return queryFactory
                .select(
                        Projections.constructor(
                                WeeklyProblemInfo.class,
                                wp.problem.id,
                                wp.problem.level,
                                wp.problem.title,
                                JPAExpressions.select(
                                                sp.user.countDistinct()
                                        )
                                        .from(sp)
                                        .where(
                                                sp.problem.id.eq(wp.problem.id),
                                                sp.resultId.eq(SolvedAcResultType.CORRECT.getStatus())
                                        )
                        )
                )
                .from(wp)
                .where(
                        wp.yearWeek.eq(yearWeek)
                )
                .fetch();
    }
}
