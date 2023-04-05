package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.input.SurveyResultInputDTO;
import com.ssafy.jobtender.dto.output.SurveyAvgOutDTO;
import com.ssafy.jobtender.dto.output.SurveyResultOutputDTO;

import java.util.List;

public interface SurveyResultDAO {
    List<SurveyResultOutputDTO> insertSurveyByResultId(List<SurveyResultInputDTO> surveyResultInputDTOs);

    List<SurveyResultOutputDTO> readSurveyByResultId(long resultId);

    SurveyAvgOutDTO readAverageInSurvey(long resultId, long keywordId);
}
