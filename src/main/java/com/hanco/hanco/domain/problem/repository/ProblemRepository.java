package com.hanco.hanco.domain.problem.repository;

import com.hanco.hanco.domain.problem.model.BaekjoonProblem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<BaekjoonProblem, Integer> {
    boolean existsById(Integer problemId);
}
