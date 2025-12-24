package com.baektracker.domain.weekly_result.dto;

public record WeeklyResultResponseDto(
        String id,
        Integer score,
        String state
) {
}
