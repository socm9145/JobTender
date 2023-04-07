package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dao.CompanyScoreDAO;
import com.ssafy.jobtender.dto.output.TfIdfInitOutDTO;
import com.ssafy.jobtender.dto.output.TfIdfOutDTO;
import com.ssafy.jobtender.entity.QCompany;
import com.ssafy.jobtender.entity.QCompanyMeasure;
import com.ssafy.jobtender.entity.QCompanyScore;
import com.ssafy.jobtender.entity.QExtractedKeyword;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CompanyScoreDAOImpl implements CompanyScoreDAO {
    QCompany company = QCompany.company;
    QCompanyScore companyScore = QCompanyScore.companyScore;
    QCompanyMeasure companyMeasure = QCompanyMeasure.companyMeasure;
    QExtractedKeyword extractedKeyword = QExtractedKeyword.extractedKeyword;

    @PersistenceContext
    EntityManager em;
    @Override
    public List<TfIdfOutDTO> readTfIdfValueByResultId(long resultId) {
        // 조인 데이터 생성
        List<TfIdfInitOutDTO> tfIdfInitOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(TfIdfInitOutDTO.class, company.companyId, company.name, extractedKeyword.name, companyMeasure.score))
                .from(companyScore)
                .join(company)
                .on(companyScore.company.companyId.eq(company.companyId))
                .join(companyMeasure)
                .on(company.companyId.eq(companyMeasure.company.companyId))
                .join(extractedKeyword)
                .on(companyMeasure.extractedKeyword.extractKeywordId.eq(extractedKeyword.extractKeywordId))
                .where(companyScore.result.resultId.eq(resultId))
                .where(companyMeasure.score.castToNum(Float.class).gt(0))
                .fetch();

        // 자료형 변경
        Map<Long, TfIdfInitOutDTO> map = new HashMap<>();

        for (TfIdfInitOutDTO tfidfInitOutDTO : tfIdfInitOutDTOs){
            if (map.containsKey(tfidfInitOutDTO.getCompanyId())){
                if (Float.parseFloat(map.get(tfidfInitOutDTO.getCompanyId()).getScore())
                        < Float.parseFloat(tfidfInitOutDTO.getScore())){
                    map.put(tfidfInitOutDTO.getCompanyId(), tfidfInitOutDTO);
                }
            }

            else
                map.put(tfidfInitOutDTO.getCompanyId(), tfidfInitOutDTO);
        }

        List<TfIdfOutDTO> tfIdfOutDTOs = new ArrayList<>();

        for (Long key : map.keySet()){
            TfIdfInitOutDTO tfIdfInitOutDTO = map.get(key);
            TfIdfOutDTO tfIdfOutDTO = new TfIdfOutDTO(
                    tfIdfInitOutDTO.getCompanyName(),
                    tfIdfInitOutDTO.getKeywordName(),
                    tfIdfInitOutDTO.getScore());

            tfIdfOutDTOs.add(tfIdfOutDTO);
        }

        return tfIdfOutDTOs;
    }
}