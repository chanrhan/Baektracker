package com.baektracker.domain.weekly_result.dto.response;

import java.util.List;

public record MonthFineStatusResponse(
        Integer monthTotalFine,
        List<InnerUserMonthFineItem> items
) {

    public static MonthFineStatusResponse of(int monthTotalFine, List<InnerUserMonthFineItem> items) {
        return new MonthFineStatusResponse(
                monthTotalFine,
                items
        );
    }

    public record InnerUserMonthFineItem(
            Long userId,
            String nickname,
            Integer fine,
            List<Integer> weeks
    ) {
    }
}
