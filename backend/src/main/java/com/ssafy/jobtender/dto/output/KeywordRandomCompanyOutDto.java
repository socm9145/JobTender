package com.ssafy.jobtender.dto.output;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class KeywordRandomCompanyOutDto {
    private long resultId;
    private long companyId;
    private long keywordId;
    private String companyName;
    private String keywordName;
}
