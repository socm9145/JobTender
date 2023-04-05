package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dao.SurveyResultDAO;
import com.ssafy.jobtender.dto.input.SurveyResultInputDTO;
import com.ssafy.jobtender.dto.output.SurveyAvgInitOutDTO;
import com.ssafy.jobtender.dto.output.SurveyAvgOutDTO;
import com.ssafy.jobtender.dto.output.SurveyResultOutputDTO;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.repo.ResultRepo;
import com.ssafy.jobtender.repo.SurveyRepo;
import com.ssafy.jobtender.repo.SurveyResultRepo;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Component
public class SurveyResultDAOImpl implements SurveyResultDAO {
    private final ResultRepo resultRepo;
    private final SurveyRepo surveyRepo;
    private final SurveyResultRepo surveyResultRepo;
    @PersistenceContext
    private EntityManager em;
    private QSurveyResult surveyResult = QSurveyResult.surveyResult;
    private QResult result = QResult.result;
    private QSurvey survey = QSurvey.survey;
    private QKeyword keyword = QKeyword.keyword;

    SurveyResultDAOImpl(ResultRepo resultRepo, SurveyRepo surveyRepo, SurveyResultRepo surveyResultRepo){
        this.resultRepo = resultRepo;
        this.surveyRepo = surveyRepo;
        this.surveyResultRepo = surveyResultRepo;
    }

    @Override
    public List<SurveyResultOutputDTO> insertSurveyByResultId(List<SurveyResultInputDTO> surveyResultInputDTOs) {
        //List<SurveyResult> surveyResults = new ArrayList<>();
        List<SurveyResultOutputDTO> surveyResultOutputDTOs = new ArrayList<>();

        for (SurveyResultInputDTO surveyResultInputDTO: surveyResultInputDTOs){
            SurveyResult surveyResult = new SurveyResult();
            SurveyResultOutputDTO surveyResultOutputDTO = new SurveyResultOutputDTO();

            surveyResult.setScore(surveyResultInputDTO.getScore());
            surveyResult.setResult(resultRepo.findById(surveyResultInputDTO.getResultId()).get());
            surveyResult.setSurvey(surveyRepo.findById(surveyResultInputDTO.getSurveyId()).get());

            surveyResultRepo.save(surveyResult);
            //

            surveyResultOutputDTO.setResultId(surveyResultInputDTO.getResultId());
            surveyResultOutputDTO.setSurveyId(surveyResultInputDTO.getSurveyId());
            surveyResultOutputDTO.setScore(surveyResultInputDTO.getScore());

            surveyResultOutputDTOs.add(surveyResultOutputDTO);
        }

        return surveyResultOutputDTOs;
    }

    @Override
    public List<SurveyResultOutputDTO> readSurveyByResultId(long resultId) {
        /*
        List<Long> keywords = new JPAQuery<>(em)
                .select(Projections.constructor(Long.class, input.keyword.keywordId))
                .from(user)
                .join(result)
                .on(user.userId.eq(result.user.userId))
                .join(input)
                .on(input.result.resultId.eq(result.resultId))
                .where(user.age.eq(age))
                .fetch();
         */
        // surveyresult에서 resultId로 찾기
        List<SurveyResultOutputDTO> surveyResultOutputDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(SurveyResultOutputDTO.class,
                        result.resultId, surveyResult.survey.surveyId, surveyResult.score))
                .from(surveyResult)
                .join(result)
                .on(surveyResult.result.resultId.eq(result.resultId))
                .join(survey)
                .on(surveyResult.survey.surveyId.eq(survey.surveyId))
                .where(surveyResult.result.resultId.eq(resultId))
                .fetch();

        return surveyResultOutputDTOs;
    }

    @Override
    public SurveyAvgOutDTO readAverageInSurvey(long resultId, long keywordId) {
        /*
        select *
        from survey_results SR
        join results R
        on SR.result_id = R.result_id
        join surveys S
        on SR.survey_id = S.survey_id
        join keywords K
        on S.keyword_id = K.keyword_id
        where R.result_id = 35
        and K.keyword_id = 2;
         */
        List<SurveyAvgInitOutDTO> surveyAvgOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(SurveyAvgInitOutDTO.class, result.resultId, keyword.keywordId, surveyResult.score))
                .from(surveyResult)
                .join(result)
                .on(result.resultId.eq(surveyResult.result.resultId))
                .join(survey)
                .on(surveyResult.survey.surveyId.eq(survey.surveyId))
                .join(keyword)
                .on(survey.keyword.keywordId.eq(keyword.keywordId))
                .where(result.resultId.eq(resultId))
                .where(keyword.keywordId.eq(keywordId))
                .fetch();

        System.out.println(surveyAvgOutDTOs.size());
        float avg = 0;

        for (SurveyAvgInitOutDTO surveyAvgInitOutDTO : surveyAvgOutDTOs)
            avg += Float.parseFloat(surveyAvgInitOutDTO.getScore());

        SurveyAvgOutDTO surveyAvgOutDTO = new SurveyAvgOutDTO(surveyAvgOutDTOs.get(0).getResultId(),
                surveyAvgOutDTOs.get(0).getKeywordId(), Float.toString(avg / (float)(surveyAvgOutDTOs.size())));

        return surveyAvgOutDTO;
    }
}
