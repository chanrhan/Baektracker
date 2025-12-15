package com.hanco.hanco.user.model;

import com.hanco.hanco.weekly_result.dto.SolvedAcUser;

public record UserProfile(
        Long id,
        String username,
        String nickname,
        Integer solvedCount,
        Integer tier
) {

    public static UserProfile of(User user, SolvedAcUser solvedAcUser){
        SolvedAcUser.InnerUserItem item = solvedAcUser.items().getFirst();
        return new UserProfile(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                item.solvedCount(),
                item.tier()
        );
    }
}
