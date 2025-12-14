package com.hanco.hanco.problem.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SolvedAcRequestVO {
    private List<String> usernames;
    private Integer resultId;
    private int problemId;
    private String fromDate;
    private String toDate;
}
