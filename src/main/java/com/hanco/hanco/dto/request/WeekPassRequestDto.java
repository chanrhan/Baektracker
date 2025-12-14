package com.hanco.hanco.dto.request;

public record WeekPassRequestDto(
        String id,
        String password,
        Boolean activate
) {
}
