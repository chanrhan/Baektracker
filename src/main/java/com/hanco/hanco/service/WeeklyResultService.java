package com.hanco.hanco.service;

import com.hanco.hanco.mapper.WeeklyResultMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WeeklyResultService {
    private final WeeklyResultMapper weeklyResultMapper;

    public void insertWeeklyScore(int target, int fine){
        weeklyResultMapper.insertWeeklyResult(target, fine);
    }

    public Map<String,Object> getTotalFine(){
        return weeklyResultMapper.getTotalFine();
    }

    public Map<String,Object> getMonthFine(String date){
        return weeklyResultMapper.getMonthFine(date);
    }

    public List<Map<String,Object>> getWeeklyResult(String date){
        return weeklyResultMapper.getWeeklyResult(date);
    }

}
