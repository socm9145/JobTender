package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResultCompanyOutDTO {
    long resultId;
    long companyId;
    String companyName;
}
