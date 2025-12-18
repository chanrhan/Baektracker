package com.hanco.hanco.mapper;

import com.hanco.hanco.domain.weekly_result.dto.UserStreak;
import com.hanco.hanco.domain.weekly_result.dto.WeeklyResultResponseDto;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WeeklyResultMapper {
    // weekly
    public void insertWeeklyResult(int target, int fine);

    public int updateWeeklyResult(int target, int fine);

    public List<WeeklyResultResponseDto> getWeeklyResults(String date);

    // Fine
    public Map<String, Object> getTotalFine();

    public Map<String, Object> getMonthFine(String date);

    public int updateWeekPass(String id, LocalDate date, int state);

    public List<UserStreak> getStreaks(LocalDate date);
}
