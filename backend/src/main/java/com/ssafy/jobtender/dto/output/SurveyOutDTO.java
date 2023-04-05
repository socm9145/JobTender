package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SurveyOutDTO {
    long surveyId;
    String question;
    long keywordId;
}
