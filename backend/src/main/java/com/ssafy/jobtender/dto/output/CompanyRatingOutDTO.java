package com.ssafy.jobtender.dto.output;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class CompanyRatingOutDTO {
    // company
    String name;
    String type;
    String scale;
    String salary;
    String employeeNumber;
    String address;
    long yearFounded;
    long companyId;
    // company rating
    long companyRatingId;
    String averageRating;
    String growthRating;
    String balanceRating;
    String salaryWelfareRating;
    String cultureRating;
    String managementRating;
}
