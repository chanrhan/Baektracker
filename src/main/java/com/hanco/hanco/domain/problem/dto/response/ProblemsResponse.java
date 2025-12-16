package com.hanco.hanco.domain.problem.dto.response;

import com.hanco.hanco.domain.problem.dto.SolvedAcProblem;
import java.util.ArrayList;
import java.util.List;

public record ProblemsResponse(
        Integer count,
        List<InnerProblemItem> items
) {

    public static ProblemsResponse of(List<SolvedAcProblem> problems, List<Integer> solvedCountList) {
        List<InnerProblemItem> items = new ArrayList<>();
        for (int i = 0; i < problems.size(); ++i) {
            items.add(InnerProblemItem.of(problems.get(i), solvedCountList.get(i)));
        }
        return new ProblemsResponse(
                problems.size(),
                items
        );
    }

    public record InnerProblemItem(
            Integer problemId,
            Integer level,
            String title,
            Integer solvedCount
    ) {

        public static InnerProblemItem of(SolvedAcProblem problem, Integer solvedCount) {
            return new InnerProblemItem(
                    problem.problemId(),
                    problem.level(),
                    problem.titleKo(),
                    solvedCount
            );
        }
    }
}
