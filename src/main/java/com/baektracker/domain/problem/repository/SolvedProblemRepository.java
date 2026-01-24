package com.baektracker.domain.problem.repository;

import com.baektracker.domain.problem.model.SolvedProblem;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolvedProblemRepository extends JpaRepository<SolvedProblem, Long> {
    List<SolvedProblem> findSolvedProblemsByTryDtBetween(LocalDate tryDtAfter, LocalDate tryDtBefore);

    List<SolvedProblem> findSolvedProblemByResultId(Integer resultId);
}
