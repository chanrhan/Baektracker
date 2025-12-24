package com.baektracker.domain.problem.dto;

public record WeeklyProblemInfo(
        Integer problemId,
        Integer level,
        String title,
        Long solvedCount
) {

}
