package com.hanco.hanco.mapper;

import com.hanco.hanco.domain.problem.dto.UserWeekScoreDto;
import com.hanco.hanco.domain.problem.vo.BaekjoonSolvedProblemInfo;
import com.hanco.hanco.domain.problem.vo.SolvedAcRequestVO;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProblemMapper {
    // problem
    public void insertMarkedProblems(List<BaekjoonSolvedProblemInfo> list);

    public List<Map<String, Object>> getBaekjoonProblems(SolvedAcRequestVO vo);

    public boolean existBaekjoonProblem(int problemId);

    public void insertBaekjoonProblem(int problemId, String title, int level);

    public List<Map<String, Object>> getProblemInfoList(String keyword);

    public List<Integer> countUsersProblemSolved(List<Integer> list);

    public List<UserWeekScoreDto> findUserWeekScores(String date);

    public List<Map<String, Object>> getUsersByProblem(Integer id);

    // Weekly Problem
    public void insertWeeklyProblem(String date, List<Integer> list);

    public int deleteWeeklyProblemAll(String date);

    public List<Map<String, Object>> getWeeklyProblem(String date);

//    public String getWeeklyProblemSolved(String yearWeek);

}
