package com.baektracker.common.util;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

public class DateUtilTest {

    @Test
    void 날짜를_주차로_변경() {
        LocalDate date = LocalDate.of(2025, 12, 29);

        String yearWeek = DateUtil.toYearWeek(date);
        System.out.println(yearWeek);
    }

}
