package com.hanco.hanco.domain.problem.dto;

import java.util.List;

public record SolvedAcProblems(
        Integer count,
        List<SolvedAcProblem> items
) {
}
