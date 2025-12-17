package com.hanco.hanco.domain.problem.queryRepository;

import com.hanco.hanco.domain.problem.model.QSolvedProblem;
import com.hanco.hanco.domain.problem.model.SolvedProblem;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SolvedProblemQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<SolvedProblem> fetchUserProgresses(LocalDate beforeDate, LocalDate afterDate) {
        QSolvedProblem sp = QSolvedProblem.solvedProblem;
        QSolvedProblem sp2 = new QSolvedProblem("sp2");
        QSolvedProblem sp3 = new QSolvedProblem("sp3");

        JPQLQuery<Integer> minResultId =
                JPAExpressions.select(sp2.resultId.min())
                        .from(sp2)
                        .where(
                                sp2.user.id.eq(sp.user.id),
                                sp2.problem.id.eq(sp.problem.id),
                                sp2.tryDt.between(beforeDate, afterDate)
                        );

        JPQLQuery<Integer> maxSubmitId =
                JPAExpressions.select(sp3.submitId.max())
                        .from(sp3)
                        .where(
                                sp3.user.id.eq(sp.user.id),
                                sp3.problem.id.eq(sp.problem.id),
                                sp3.tryDt.between(beforeDate, afterDate),
                                sp3.resultId.eq(minResultId)
                        );

        return queryFactory
                .selectFrom(sp)
                .where(
                        sp.tryDt.between(
                                beforeDate,
                                afterDate
                        ),
                        sp.resultId.eq(minResultId),
                        sp.submitId.eq(maxSubmitId)
                )
                .fetch();
    }
}
