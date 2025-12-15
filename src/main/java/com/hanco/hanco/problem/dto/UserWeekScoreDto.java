package com.hanco.hanco.problem.dto;

public record UserWeekScoreDto(
        String id,
        Integer totalScore,
        Boolean isPassed
) {
}
