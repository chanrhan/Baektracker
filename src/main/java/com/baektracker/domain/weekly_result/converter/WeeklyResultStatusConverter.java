package com.baektracker.domain.weekly_result.converter;

import com.baektracker.domain.weekly_result.code.WeeklyResultState;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class WeeklyResultStatusConverter implements AttributeConverter<WeeklyResultState, Integer> {
    @Override
    public Integer convertToDatabaseColumn(WeeklyResultState attr) {
        if (attr == null) {
            return null;
        }
        return attr.ordinal();
    }

    @Override
    public WeeklyResultState convertToEntityAttribute(Integer dbData) {
        if (dbData == null) {
            return null;
        }
        return WeeklyResultState.values()[dbData];
    }
}
