package com.baektracker.domain.weekly_result.dto;

import com.baektracker.domain.user.model.User;

public record UserFine(
        User user,
        Integer fine
) {
    public UserFine(User user, Long fine) {
        this(user, fine.intValue());
    }
}
