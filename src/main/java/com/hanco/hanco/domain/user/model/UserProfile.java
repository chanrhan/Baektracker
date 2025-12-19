package com.hanco.hanco.domain.user.model;

import com.hanco.hanco.domain.weekly_result.dto.SolvedAcUser;

public record UserProfile(
        Long id,
        String username,
        String nickname,
        Integer streak,
        Integer solvedCount,
        Integer tier
) {

    public static UserProfile of(User user, SolvedAcUser solvedAcUser) {
        SolvedAcUser.InnerUserItem item = solvedAcUser.items().get(0);
        return new UserProfile(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getStreak(),
                item.solvedCount(),
                item.tier()
        );
    }
}
