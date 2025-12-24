package com.baektracker.domain.problem.repository;

import com.baektracker.domain.problem.model.WeeklyProblem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyProblemRepository extends JpaRepository<WeeklyProblem, Long> {
    List<WeeklyProblem> findWeeklyProblemsByYearWeek(String weekId);

    void deleteWeeklyProblemByYearWeek(String yearWeek);


}
