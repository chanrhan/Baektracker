package com.hanco.hanco.domain.weekly_result.converter;

import com.hanco.hanco.domain.weekly_result.code.WeeklyResultStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class WeeklyResultStatusConverter implements AttributeConverter<WeeklyResultStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(WeeklyResultStatus attr) {
        if (attr == null) {
            return null;
        }
        return attr.ordinal();
    }

    @Override
    public WeeklyResultStatus convertToEntityAttribute(Integer dbData) {
        if (dbData == null) {
            return null;
        }
        return WeeklyResultStatus.values()[dbData];
    }
}
