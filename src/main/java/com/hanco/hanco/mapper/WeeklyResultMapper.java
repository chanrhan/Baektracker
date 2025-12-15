package com.hanco.hanco.mapper;

import com.hanco.hanco.weekly_result.dto.WeeklyResultResponseDto;
import java.time.LocalDate;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface WeeklyResultMapper {
    // weekly
    public void insertWeeklyResult(int target, int fine);
    public int updateWeeklyResult(int target, int fine);
    public List<WeeklyResultResponseDto> getWeeklyResults(String date);

    // Fine
    public Map<String,Object> getTotalFine();
    public Map<String,Object> getMonthFine(String date);
    public int updateWeekPass(String id, LocalDate date, int state);
}
