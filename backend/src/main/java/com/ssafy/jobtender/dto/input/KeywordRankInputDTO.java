package com.ssafy.jobtender.dto.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KeywordRankInputDTO {
    long keywordId1;
    long keywordId2;
    long keywordId3;
    public long[] getKeywords(){
        long[] keywords = new long[3];
        keywords[0] = this.keywordId1;
        keywords[1] = this.keywordId2;
        keywords[2] = this.keywordId3;
        return keywords;
    }
}
