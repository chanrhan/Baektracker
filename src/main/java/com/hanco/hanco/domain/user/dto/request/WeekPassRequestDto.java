package com.hanco.hanco.domain.user.dto.request;

import java.time.LocalDate;

public record WeekPassRequestDto(
        LocalDate date,
        Long id,
        String password,
        Boolean activate
) {
}
