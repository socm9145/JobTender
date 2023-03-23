package com.ssafy.jobtender.dto.output;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KeywordRandomCompanyOutDto {
    private long companyId;
    private long keywordId;
    private String companyName;
    private String keywordName;

    public KeywordRandomCompanyOutDto(long companyId, long keywordId, String companyName, String keywordName){
        this.companyId = companyId;
        this.keywordId = keywordId;
        this.companyName = companyName;
        this.keywordName = keywordName;
    }
}
