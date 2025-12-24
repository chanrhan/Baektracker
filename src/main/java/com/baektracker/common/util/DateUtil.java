package com.baektracker.common.util;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class DateUtil {
    private final static WeekFields isoWeekFields = WeekFields.of(Locale.KOREA);

    public static String toYearWeek(LocalDate date) {
        return String.format("%s-%s", date.getYear(), date.get(isoWeekFields.weekOfWeekBasedYear()));
    }

    public static int toWeekOfMonth(LocalDate date) {
        return date.get(isoWeekFields.weekOfMonth());
    }
}
