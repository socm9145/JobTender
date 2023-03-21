package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReadResultOutDTO {
    // result
    long resultId;
    long userId;
    // input
    String keyword;
    // company scores
    String score;
    // companies
    String name;
    String type;
    String scale;
    String salary;
    String employeesNumber;
    String address;
    long yearFounded;
    // company rating
    String averageRating;
    String growthRating;
    String balanceRating;
    String salaryWelfareRating;
    String cultureRating;
    String managementRating;
}
