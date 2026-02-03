package com.baektracker.domain.problem.repository;

import com.baektracker.domain.problem.dto.CoSolver;
import com.baektracker.domain.problem.model.SolvedProblem;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SolvedProblemRepository extends JpaRepository<SolvedProblem, Long> {
    List<SolvedProblem> findSolvedProblemsByTryDtBetween(LocalDate tryDtAfter, LocalDate tryDtBefore);

    @Query("""
            select distinct new com.baektracker.domain.problem.dto.CoSolver(
                sp.problem.id,
                sp.user.nickname
            )
            from SolvedProblem sp
            where sp.resultId=:resultId
            """)
    List<CoSolver> getCoSolverInfo(Integer resultId);
}
