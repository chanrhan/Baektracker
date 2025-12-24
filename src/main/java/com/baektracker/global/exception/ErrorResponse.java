package com.baektracker.global.exception;

public record ErrorResponse(
        int status,
        String code,
        String message,
        String errorTraceId
) {
}
