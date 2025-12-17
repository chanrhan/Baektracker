package com.hanco.hanco.domain.weekly_result.repository;

import com.hanco.hanco.domain.weekly_result.model.WeeklyResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyResultRepository extends JpaRepository<WeeklyResult, Long> {
    List<WeeklyResult> findWeeklyResultByYearWeek(String yearWeek);
}
