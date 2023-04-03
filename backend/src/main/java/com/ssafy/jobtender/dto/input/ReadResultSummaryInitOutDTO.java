package com.ssafy.jobtender.dto.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReadResultSummaryInitOutDTO {
    long resultId;
    Date date;
    String keyword;
    String company;
}
