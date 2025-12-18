package com.hanco.hanco.domain.weekly_result.dto;

import com.hanco.hanco.domain.user.model.User;

public record UserFine(
        User user,
        Integer fine
) {
    public UserFine(User user, Long fine) {
        this(user, fine.intValue());
    }
}
