package com.hanco.hanco.mapper;

import com.hanco.hanco.domain.weekly_result.dto.UserStreak;
import java.time.LocalDate;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WeeklyResultMapper {
    public List<UserStreak> getStreaks(LocalDate date);
}
