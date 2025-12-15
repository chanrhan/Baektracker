package com.hanco.hanco.user.dto.request;

public record UpdatePasswordRequestDto(
        Long id,
        String orgPwd,
        String newPwd
) {
}
