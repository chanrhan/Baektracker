package com.hanco.hanco.weekly_result.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;

@JsonNaming(value = SnakeCaseStrategy.class)
public record SolvedAcUser(
        Integer count,
        List<InnerUserItem> items
) {

    @JsonNaming(value = SnakeCaseStrategy.class)
    public record InnerUserItem(
            String handle,
            String bio,
            String badgeId,
            String backgroundId,
            String profileImageUrl,
            Integer solvedCount,
            Integer voteCount,
            @JsonProperty("class")
            Integer userClass,
            String classDecoration,
            Integer rivalCount,
            Integer reverseRivalCount,
            Integer tier,
            Integer rating,
            Integer ratingByProblemSum,
            Integer ratingByClass,
            Integer ratingBySolvedCount,
            String joinedAt
    ){

    }
}
