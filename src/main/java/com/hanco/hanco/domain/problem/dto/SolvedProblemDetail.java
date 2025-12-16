package com.hanco.hanco.domain.problem.dto;

import com.hanco.hanco.domain.problem.model.SolvedProblem;
import java.time.LocalDate;
import java.util.List;

public record SolvedProblemDetail(
        Integer problemId,
        String title,
        Integer level,
        Integer resultId,
        Integer submitId,
        LocalDate tryDt,
        Boolean isWeeklyProblem,
        List<String> coSolvers
) {

    public static SolvedProblemDetail of(SolvedProblem solvedProblem, List<String> coSolvers) {
        return new SolvedProblemDetail(
                solvedProblem.getProblemId(),
                solvedProblem.getProblem().getTitle(),
                solvedProblem.getProblem().getLevel(),
                solvedProblem.getResultId(),
                solvedProblem.getSubmitId(),
                solvedProblem.getTryDt(),
                false,
                coSolvers
        );
    }
}
