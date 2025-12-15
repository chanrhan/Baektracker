package com.hanco.hanco.user.dto.request;

import java.time.LocalDate;

public record WeekPassRequestDto(
        LocalDate date,
        String id,
        String password,
        Boolean activate
) {
}
