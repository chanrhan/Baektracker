package com.hanco.hanco.domain.problem.dto.response;

import com.hanco.hanco.domain.problem.dto.WeeklyProblemInfo;
import java.util.List;

public record WeeklyProblemsResponse(
        Integer count,
        List<WeeklyProblemInfo> items
) {
    public static WeeklyProblemsResponse from(List<WeeklyProblemInfo> weeklyProblems) {
        return new WeeklyProblemsResponse(
                weeklyProblems.size(),
                weeklyProblems
        );
    }
}
