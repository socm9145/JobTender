package com.ssafy.jobtender.dto.output;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComparableCompanyNameOutputDTO {
    private String name;
    private String comparableScore;

    @Builder(builderMethodName = "createBuilder")
    public ComparableCompanyNameOutputDTO(String name, String comparableScore){
        this.name = name;
        this.comparableScore = comparableScore;
    }
}
