package com.hanco.hanco.dto.request;

public record UpdatePasswordRequestDto(
        String id,
        String orgPwd,
        String newPwd
) {
}
