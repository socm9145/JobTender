package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.SurveyDAO;
import com.ssafy.jobtender.dto.output.SurveyOutDTO;
import com.ssafy.jobtender.entity.Survey;
import com.ssafy.jobtender.repo.SurveyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class SurveyDAOImpl implements SurveyDAO {
    private final SurveyRepo surveyRepo;

    @Autowired
    SurveyDAOImpl(SurveyRepo surveyRepo){
        this.surveyRepo = surveyRepo;
    }


    @Override
    public List<SurveyOutDTO> readSurveys() {
        List<SurveyOutDTO> surveyOutDTOs = new ArrayList<>();
        List<Survey> surveys = this.surveyRepo.findAll();

        for (Survey survey : surveys){
            surveyOutDTOs.add(
                    new SurveyOutDTO(survey.getSurveyId(),
                            survey.getQuestion(),
                            survey.getKeyword().getKeywordId())
            );
        }

        return surveyOutDTOs;
    }
}
