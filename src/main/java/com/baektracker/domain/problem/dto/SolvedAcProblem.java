package com.baektracker.domain.problem.dto;

import java.util.List;

public record SolvedAcProblem(
        Integer problemId,
        String titleKo,
        List<InnerTitleItem> titles,
        Boolean isSolvable,
        Boolean isPartial,
        Integer acceptedUserCount,
        Integer level,
        Integer votedUserCount,
        Boolean sprout,
        Boolean isLevelLocked
) {

    public record InnerTitleItem(
            String language,
            String languageDisplayName,
            String title,
            Boolean isOriginal
    ) {

    }
}
