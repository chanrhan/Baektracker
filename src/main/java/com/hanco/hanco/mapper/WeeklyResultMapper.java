package com.hanco.hanco.mapper;

import com.hanco.hanco.domain.weekly_result.dto.UserStreak;
import com.hanco.hanco.domain.weekly_result.dto.WeeklyResultResponseDto;
import java.time.LocalDate;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WeeklyResultMapper {
    public List<WeeklyResultResponseDto> getWeeklyResults(String date);

    public int updateWeekPass(String username, LocalDate date, int state);

    public List<UserStreak> getStreaks(LocalDate date);
}
