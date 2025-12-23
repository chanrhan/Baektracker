package com.hanco.hanco.domain.problem.code;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
public enum SolvedAcResultType {
    ALL(-1, "전체 결과"),
    CORRECT(4, "맞았습니다!!"),
    ERR_FORMAT(5, "출력 형식이 잘못되었습니다"),
    WRONG(6, "틀렸습니다"),
    ERR_TIMEOUT(7, "시간 초과"),
    ERR_MEMORY(8, "메모리 초과"),
    ERR_PRINT(9, "출력 초과"),
    ERR_RUNTIME(10, "런타임 에러"),
    ERR_COMPILE(11, "컴파일 에러");

    private final int status;
    private final String message;

    SolvedAcResultType(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static SolvedAcResultType of(String resultText) {
        for (SolvedAcResultType type : SolvedAcResultType.values()) {
            if (type.getMessage().equals(resultText)) {
                return type;
            }
        }
        return null;
    }

    @Data
    @AllArgsConstructor
    public static class ErrorType {
        private SolvedAcResultType type;
        private String errorText;
    }

    public static ErrorType getErrorType(String resultText) {
//        System.out.println("get error : " + resultText);
        try {
            return new ErrorType(SolvedAcResultType.of(resultText), null);
        } catch (IllegalArgumentException e) {
            String[] splits = resultText.split("\\(");
            return new ErrorType(SolvedAcResultType.of(splits[0]), splits[1]);
        }

    }

//    public static SolvedAcResultType of(String resultMessage){
//        if(resultMessage.equals("맞았습니다!!")){
//            return SolvedAcResultType.CORRECT;
//        }else if(resultMessage.equals("틀렸습니다")){
//            return SolvedAcResultType.WRONG;
//        }else{
//            return SolvedAcResultType.ERROR;
//        }
//    }
}
