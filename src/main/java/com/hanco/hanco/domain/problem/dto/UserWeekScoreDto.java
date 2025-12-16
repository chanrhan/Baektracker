package com.hanco.hanco.domain.problem.dto;

public record UserWeekScoreDto(
        String id,
        Integer totalScore,
        Boolean isPassed
) {
}
