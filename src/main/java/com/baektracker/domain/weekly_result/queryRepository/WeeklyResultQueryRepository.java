package com.baektracker.domain.weekly_result.queryRepository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WeeklyResultQueryRepository {
    private final JPAQueryFactory queryFactory;

}
