package com.hanco.hanco.domain.problem.dto.response;

import com.hanco.hanco.domain.problem.dto.SolvedAcProblem;

public record ProblemInfo(
        Integer problemId,
        Integer level,
        String title
) {

    public static ProblemInfo from(SolvedAcProblem solvedAcProblem) {
        Integer level = solvedAcProblem.level();
        if (solvedAcProblem.sprout()) {
            level = -level;
        }
        return new ProblemInfo(
                solvedAcProblem.problemId(),
                solvedAcProblem.level(),
                solvedAcProblem.titleKo()
        );
    }
}
