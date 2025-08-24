package com.hanco.hanco.mapper;

import com.hanco.hanco.vo.SolvedAcRequestVO;
import com.hanco.hanco.vo.SolvedAcResponseVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProblemMapper {
    // problem
    public void insertMarkedProblems(List<SolvedAcResponseVO> list);
    public List<Map<String, Object>> getBaekjoonProblems(SolvedAcRequestVO vo);
    public boolean existBaekjoonProblem(int problemId);
    public void insertBaekjoonProblem(int problemId, String title, int level);
    public List<Map<String,Object>> getProblemInfoList(String keyword);
    public List<Integer> getUserProblemSolved(List<Integer> list);

    public List<Map<String,Object>> getUsersByProblem(Integer id);

    // Weekly Problem
    public void insertWeeklyProblem(String date, List<Integer> list);
    public int deleteWeeklyProblemAll(String date);

    public List<Map<String,Object>> getWeeklyProblem(String date);
    public String getWeeklyProblemSolved(String date);

}