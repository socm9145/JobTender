package com.ssafy.jobtender.dto.input;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateInputDTO {
    long resultId;
    long keywordId;
    int keywordRank;
}
