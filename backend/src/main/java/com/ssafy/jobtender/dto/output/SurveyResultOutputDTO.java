package com.ssafy.jobtender.dto.output;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SurveyResultOutputDTO {
    long resultId;
    long surveyId;
    String score;
}
