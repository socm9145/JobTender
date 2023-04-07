package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.SurveyDAO;
import com.ssafy.jobtender.dto.output.SurveyOutDTO;
import com.ssafy.jobtender.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurveyServiceImpl implements SurveyService {
    private final SurveyDAO surveyDAO;

    @Autowired
    SurveyServiceImpl(SurveyDAO surveyDAO){
        this.surveyDAO = surveyDAO;
    }
    @Override
    public List<SurveyOutDTO> readSurveys() {
        return this.surveyDAO.readSurveys();
    }
}
