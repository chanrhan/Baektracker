package com.baektracker.common.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.WeekFields;

public class DateUtil {
    private final static WeekFields isoWeekFields = WeekFields.of(DayOfWeek.MONDAY, 4);

    public static String toYearWeek(LocalDate date) {
        int year = date.getYear();
        int week = date.get(isoWeekFields.weekOfYear());
        return String.format("%04d-%02d", year, week);
    }

    public static int toWeekOfMonth(LocalDate date) {
        return date.get(isoWeekFields.weekOfMonth());
    }
}
