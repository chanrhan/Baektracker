package com.hanco.hanco.domain.user.dto.request;

import java.time.LocalDate;

public record WeekPassRequestDto(
        LocalDate date,
        String id,
        String password,
        Boolean activate
) {
}
