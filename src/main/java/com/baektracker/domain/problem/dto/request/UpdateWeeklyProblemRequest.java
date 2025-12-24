package com.baektracker.domain.problem.dto.request;

import java.time.LocalDate;
import java.util.List;

public record UpdateWeeklyProblemRequest(
        LocalDate date,
        List<Integer> problemIds
) {
}
