package com.baektracker.domain.user.dto;

public record UserInfo(
        Long id,
        String username,
        String nickname,
        String password,
        Integer level,
        Integer lastRead,
        Integer streak
) {
}
