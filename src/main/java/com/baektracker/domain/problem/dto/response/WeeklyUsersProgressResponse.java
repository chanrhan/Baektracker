package com.baektracker.domain.problem.dto.response;

import com.baektracker.domain.problem.dto.WeeklyUserProgress;
import java.util.List;

public record WeeklyUsersProgressResponse(
        Integer count,
        List<WeeklyUserProgress> items
) {

    public static WeeklyUsersProgressResponse from(List<WeeklyUserProgress> progresses) {
        return new WeeklyUsersProgressResponse(
                progresses.size(),
                progresses
        );
    }
}
