package com.hanco.hanco.user.dto.request;

public record WeekPassRequestDto(
        String id,
        String password,
        Boolean activate
) {
}
