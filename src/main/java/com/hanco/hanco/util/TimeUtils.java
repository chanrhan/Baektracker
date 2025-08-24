package com.hanco.hanco.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class TimeUtils {
    public static LocalDateTime parseTimestamp(long timestamp){
        Instant instantUtc = Instant.ofEpochSecond(timestamp);
        return instantUtc.atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }
}
