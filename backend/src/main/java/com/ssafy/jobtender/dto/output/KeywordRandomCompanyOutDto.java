package com.ssafy.jobtender.dto.output;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KeywordRandomCompanyOutDto {
    private long companyId;
    private long keywordId;
    private String name;
    private String keyword;

}
