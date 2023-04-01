package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TfIdfInitOutDTO {
    long companyId;
    String companyName;
    String keywordName;
    String score;
}
