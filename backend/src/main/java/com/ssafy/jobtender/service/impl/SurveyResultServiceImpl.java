package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.SurveyResultDAO;
import com.ssafy.jobtender.dto.input.SurveyResultInputDTO;
import com.ssafy.jobtender.dto.output.SurveyResultOutputDTO;
import com.ssafy.jobtender.service.SurveyResultService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurveyResultServiceImpl implements SurveyResultService {
    private final SurveyResultDAO surveyResultDAO;

    SurveyResultServiceImpl(SurveyResultDAO surveyResultDAO){
        this.surveyResultDAO = surveyResultDAO;
    }
    @Override
    public List<SurveyResultOutputDTO> insertSurveyByResultId(List<SurveyResultInputDTO> surveyResultInputDTOs) {
        return this.surveyResultDAO.insertSurveyByResultId(surveyResultInputDTOs);
    }

    @Override
    public List<SurveyResultOutputDTO> readSurveyByResultId(long resultId) {
        return this.surveyResultDAO.readSurveyByResultId(resultId);
    }
}
