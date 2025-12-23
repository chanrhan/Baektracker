package com.hanco.hanco.domain.user.dto.request;

public record UpdatePasswordRequestDto(
        Long id,
        String orgPwd,
        String newPwd
) {
}
