package com.hanco.hanco.mapper;

import com.hanco.hanco.vo.SolvedAcRequestVO;
import com.hanco.hanco.vo.SolvedAcResponseVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SolvedAcMapper {
    public List<Map<String, Object>> getAllUsers(String date);

    public List<Map<String, Object>> getContinuousCompleteCount();

    public List<Map<String, Object>> getAllUsersLastRead();

    public void updateLastRead(String id, Integer lastRead);

    public void insertMarkedProblems(List<SolvedAcResponseVO> list);

    public List<Map<String, Object>> getBaekjoonProblems(SolvedAcRequestVO vo);

    public boolean existBaekjoonProblem(int problemId);

    public void insertBaekjoonProblem(int problemId, String title, int level);

    public List<Map<String,Object>> getProblemInfoList(String keyword);

    // weekly
    public void insertWeeklyScore(int target, int fine);

    public void insertSharedProblem(String date, List<Integer> list);
    public int deleteSharedProblemAll(String date);

    public List<Map<String,Object>> getSharedProblem(String date);
    public String getWeeklySharedSolved(String date);

    // Fine
    public List<Map<String,Object>> getTotalFine();
    public List<Map<String,Object>> getMonthFine(String date);
    public List<Map<String,Object>> getWeeklyResult(String date);
}