package com.hanco.hanco.user.dto.request;

public record UpdatePasswordRequestDto(
        String id,
        String orgPwd,
        String newPwd
) {
}
