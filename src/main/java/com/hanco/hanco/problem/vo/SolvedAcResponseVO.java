package com.hanco.hanco.problem.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@SuperBuilder
public class SolvedAcResponseVO {
    private String username;
    private Integer resultId;
    private String errorText;
    private int problemId;
    private String date;
    private int submitId;
    private int elapsedTm;
    private int usedMem;
    private String lang;


//    public SolvedAcResponseVO(SolvedAcResultType resultType, LocalDate dateTime) {
//        this.date = dateTime;
//        this.resultType = resultType;
//    }
}
