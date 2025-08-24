package com.hanco.hanco.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface WeeklyResultMapper {
    // weekly
    public void insertWeeklyResult(int target, int fine);
    public List<Map<String,Object>> getWeeklyResult(String date);

    // Fine
    public Map<String,Object> getTotalFine();
    public Map<String,Object> getMonthFine(String date);
}
