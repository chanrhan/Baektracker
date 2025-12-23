package com.hanco.hanco.domain.problem.repository;

import com.hanco.hanco.domain.problem.model.SolvedProblem;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolvedProblemRepository extends JpaRepository<SolvedProblem, Long> {
    List<SolvedProblem> findSolvedProblemsByTryDtBetween(LocalDate tryDtAfter, LocalDate tryDtBefore);
}
