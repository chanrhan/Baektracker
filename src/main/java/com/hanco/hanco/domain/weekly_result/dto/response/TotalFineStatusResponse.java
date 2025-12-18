package com.hanco.hanco.domain.weekly_result.dto.response;

import com.hanco.hanco.domain.weekly_result.dto.UserFine;
import java.util.List;

public record TotalFineStatusResponse(
        Integer totalFine,
        List<InnerUserFineItem> items
) {

    public static TotalFineStatusResponse of(List<InnerUserFineItem> userFines) {
        return new TotalFineStatusResponse(
                userFines.stream()
                        .mapToInt(InnerUserFineItem::fine)
                        .sum(),
                userFines
        );
    }

    public record InnerUserFineItem(
            Long id,
            String nickname,
            Integer fine
    ) {

        public static InnerUserFineItem from(UserFine userFine) {
            return new InnerUserFineItem(
                    userFine.user().getId(),
                    userFine.user().getNickname(),
                    userFine.fine()
            );
        }
    }
}
