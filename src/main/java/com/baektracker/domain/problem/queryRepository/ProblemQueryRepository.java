package com.baektracker.domain.problem.queryRepository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ProblemQueryRepository {
    private final JPAQueryFactory queryFactory;

}
