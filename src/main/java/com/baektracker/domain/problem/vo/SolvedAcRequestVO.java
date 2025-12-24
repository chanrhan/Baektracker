package com.baektracker.domain.problem.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SolvedAcRequestVO {
    private List<String> usernames;
    private Integer resultId;
    private int problemId;
    private String fromDate;
    private String toDate;
}
