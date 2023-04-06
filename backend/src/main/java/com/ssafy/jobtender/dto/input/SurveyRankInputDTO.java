package com.ssafy.jobtender.dto.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyRankInputDTO {
    long resultId;
    long surveyId;
    String score;
}
