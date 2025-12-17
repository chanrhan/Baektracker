package com.hanco.hanco.domain.problem.dto;

import java.util.List;

public record WeeklyUserProgress(
        Long userId,
        Integer score,
        Boolean isWeekPass,
        List<SolvedProblemDetail> problems
) {

}