package com.ssafy.jobtender.dto.input;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class SurveyResultInputDTO {
    long resultId;
    long surveyId;
    String score;
}
