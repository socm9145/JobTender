package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dao.KeywordResearchDAO;
import com.ssafy.jobtender.dto.output.StaticOutDTO;
import com.ssafy.jobtender.entity.QKeyword;
import com.ssafy.jobtender.entity.QKeywordResearch;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class KeywordResearchDAOImpl implements KeywordResearchDAO {
    @PersistenceContext
    EntityManager em;
    QKeywordResearch keywordResearch = QKeywordResearch.keywordResearch;
    QKeyword keyword = QKeyword.keyword;

    @Override
    public StaticOutDTO readSurveyByKeywordIdAndGender(long keywordId, String gender) {
        StaticOutDTO staticOutDTO = new StaticOutDTO();

        List<StaticOutDTO> staticOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(StaticOutDTO.class,
                        keywordResearch.average, keywordResearch.std))
                .from(keywordResearch)
                .join(keyword)
                .on(keyword.keywordId.eq(keywordResearch.keyword.keywordId))
                .fetch();


        staticOutDTO.setMean(staticOutDTOs.get(0).getMean());
        staticOutDTO.setStd(staticOutDTOs.get(0).getStd());

        return staticOutDTO;
    }

    @Override
    public StaticOutDTO readSurveyByKeywordId(long keywordId) {
        return null;
    }
}
