package com.baektracker.domain.user.dto;

import com.baektracker.domain.weekly_result.dto.SolvedAcUser;

public record UserProfile(
        Long id,
        String username,
        String nickname,
        Integer streak,
        Integer solvedCount,
        Long weekPassCount,
        Integer tier
) {

    public static UserProfile of(UserInfo user, SolvedAcUser solvedAcUser) {
        SolvedAcUser.InnerUserItem item = solvedAcUser.items().get(0);
        return new UserProfile(
                user.id(),
                user.username(),
                user.nickname(),
                user.streak(),
                item.solvedCount(),
                user.weekPassCount(),
                item.tier()
        );
    }
}
