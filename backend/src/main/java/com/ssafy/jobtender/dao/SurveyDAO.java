package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.SurveyOutDTO;

import java.util.List;

public interface SurveyDAO {
    List<SurveyOutDTO> readSurveys();
}
