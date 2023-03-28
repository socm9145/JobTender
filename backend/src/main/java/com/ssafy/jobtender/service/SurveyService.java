package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.SurveyOutDTO;

import java.util.List;

public interface SurveyService {
    List<SurveyOutDTO> readSurveys();
}
