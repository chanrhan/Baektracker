package com.hanco.hanco.domain.problem.dto.response;

import com.hanco.hanco.domain.problem.model.WeeklyProblem;
import java.util.List;

public record WeeklyProblemsResponse(
        Integer count,
        List<InnerWeeklyProblemItem> items
) {
    public static WeeklyProblemsResponse from(List<WeeklyProblem> weeklyProblems) {
        return new WeeklyProblemsResponse(
                weeklyProblems.size(),
                weeklyProblems.stream()
                        .map(InnerWeeklyProblemItem::from)
                        .toList()
        );
    }

    public record InnerWeeklyProblemItem(
            Long id,
            String yearWeek,
            Integer problemId
    ) {

        public static InnerWeeklyProblemItem from(WeeklyProblem weeklyProblem) {
            return new InnerWeeklyProblemItem(
                    weeklyProblem.getId(),
                    weeklyProblem.getYearWeek(),
                    weeklyProblem.getProblem().getId()
            );
        }
    }
}
