package com.hanco.hanco.domain.problem.dto.response;

import com.hanco.hanco.domain.problem.dto.SolvedProblemDetail;
import java.util.List;

public record UserProgressResponse(
        Integer score,
        Boolean isWeekPass,
        List<SolvedProblemDetail> problems
) {
}
