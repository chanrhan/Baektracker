package com.baektracker.domain.problem.repository;

import com.baektracker.domain.problem.model.BaekjoonProblem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<BaekjoonProblem, Integer> {
    boolean existsById(Integer problemId);
}
