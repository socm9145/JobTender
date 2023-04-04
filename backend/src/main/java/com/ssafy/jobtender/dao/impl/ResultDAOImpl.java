package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.repo.ResultRepo;
import com.ssafy.jobtender.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;
import java.util.*;

@Component
public class ResultDAOImpl implements ResultDAO {
    @PersistenceContext
    private EntityManager em;
    private final ResultRepo resultRepo;
    private final UserRepo userRepo;
    //
    private final QResult result = QResult.result;
    private final QInput input = QInput.input;
    private final QKeyword keyword = QKeyword.keyword;
    private final QCompanyScore companyScore = QCompanyScore.companyScore;
    private final QSurveyScore surveyScore = QSurveyScore.surveyScore;
    private final QCompany company = QCompany.company;
    private final QCompanyRating companyRating = QCompanyRating.companyRating;
    @Autowired
    public ResultDAOImpl(ResultRepo resultRepo, UserRepo userRepo) {
        this.resultRepo = resultRepo;
        this.userRepo = userRepo;
    }

    @Override
    public long createResult(Long userId) {
        User resultUser = userRepo.findByUserId(userId).get();

        Result result = new Result();

        AccessInfo accessInfo = new AccessInfo();
        accessInfo.setCreateDate(new Date());
        accessInfo.setUpdateDate(new Date());
        accessInfo.setCreateId(userId);
        accessInfo.setUpdateId(userId);

        result.setAccessInfo(accessInfo);
        result.setUser(resultUser);
        resultRepo.save(result);

        return result.getResultId();
    }

    @Override
    public List<ReadResultOutDTO> readResultsByUserId(Long userId) {
        List<ReadResultOutDTO> readResultOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(ReadResultOutDTO.class,
                        result.resultId, result.user.userId,
                        companyScore.score,
                        company.name, company.type, company.scale, company.salary, company.employeesNumber, company.address, company.yearFounded,
                        companyRating.averageRating, companyRating.growthRating, companyRating.balanceRating, companyRating.salaryWelfareRating, companyRating.cultureRating, companyRating.managementRating))
                .from(result)
                .join(result.companyScores, companyScore)
                .on(result.resultId.eq(companyScore.result.resultId))
                .join(companyScore.company, company)
                .on(companyScore.company.companyId.eq(company.companyId))
                .join(company.companyRating, companyRating)
                .on(companyRating.company.companyId.eq(company.companyId))
                .where(result.user.userId.eq(userId))
                .where(companyScore.CompanyScoreRank.eq("H"))
                .fetch();

        return readResultOutDTOs;
    }

    @Override
    public List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId) {
        List<ReadResultOutDTO> readResultOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(ReadResultOutDTO.class,
                        result.resultId, result.user.userId,
                        surveyScore.score,
                        company.name, company.type, company.scale, company.salary, company.employeesNumber, company.address, company.yearFounded,
                        companyRating.averageRating, companyRating.growthRating, companyRating.balanceRating, companyRating.salaryWelfareRating, companyRating.cultureRating, companyRating.managementRating))
                .from(result)
                .join(result.surveyScores, surveyScore)
                .on(result.resultId.eq(surveyScore.result.resultId))
                .join(surveyScore.company, company)
                .on(surveyScore.company.companyId.eq(company.companyId))
                .join(company.companyRating, companyRating)
                .on(companyRating.company.companyId.eq(company.companyId))
                .where(result.user.userId.eq(userId))
                .where(surveyScore.surveyScoreRank.eq("H"))
                .fetch();

        return readResultOutDTOs;
    }

    @Override
    public List<ResultCompanyOutDTO> readResultsCompanies() {
        return null;
    }

    @Override
    public List<Result> keywordRanking() {
        List<Result> results = this.resultRepo.findAll();

        return results;
    }

    @Override
    public ResultOutputDTO insertResult(long userId) {
        Result eResult = new Result();
        AccessInfo accessInfo = new AccessInfo();

        accessInfo.setCreateDate(new Date());
        accessInfo.setUpdateDate(new Date());
        accessInfo.setCreateId(userId);
        accessInfo.setUpdateId(userId);

        eResult.setAccessInfo(accessInfo);
        eResult.setUser(this.userRepo.findById(userId).get());

        this.resultRepo.save(eResult);

        ResultOutputDTO resultOutputDTO = new ResultOutputDTO();

        resultOutputDTO.setResultId(eResult.getResultId());
        resultOutputDTO.setAccessInfo(accessInfo);

        return resultOutputDTO;
    }

    @Override
    public Map<Long, HistoryOutDTO> readHistoriesByUserId(Long userId) {
        SortedMap<Long, HistoryOutDTO> historyOutDTOMap = new TreeMap<>(((resultId1, resultId2) -> {
            return -Long.compare(resultId1, resultId2);
        }));

        List<Result> results = new JPAQuery<>(em)
                .select(result)
                .from(result)
                .where(result.user.userId.eq(userId))
                .fetch();

        for(Result result : results){
            historyOutDTOMap.put(result.getResultId(), new HistoryOutDTO());
            historyOutDTOMap.get(result.getResultId()).setCreateDate(result.getAccessInfo().getCreateDate());
            historyOutDTOMap.get(result.getResultId()).setKeywords(new ArrayList<>());
            historyOutDTOMap.get(result.getResultId()).setCompanies(new ArrayList<>());
        }

        List<ResultKeywordOutDTO> keywords = new JPAQuery<>(em)
                .select(Projections.constructor(ResultKeywordOutDTO.class,
                    result.resultId, keyword.keywordId, keyword.keywordName))
                .from(result)
                .join(input)
                .on(result.resultId.eq(input.result.resultId))
                .join(keyword)
                .on(input.keyword.keywordId.eq(keyword.keywordId))
                .where(result.user.userId.eq(userId))
                .fetch();

        List<ResultCompanyOutDTO> companies = new JPAQuery<>(em)
                .select(Projections.constructor(ResultCompanyOutDTO.class,
                        result.resultId, company.companyId, company.name))
                .from(result)
                .join(companyScore)
                .on(result.resultId.eq(companyScore.result.resultId))
                .join(company)
                .on(companyScore.company.companyId.eq(company.companyId))
                .where(result.user.userId.eq(userId))
                .where(companyScore.CompanyScoreRank.eq("H"))
                .fetch();


        for(ResultKeywordOutDTO resultKeywordOutDTO : keywords){
            if(historyOutDTOMap.containsKey(resultKeywordOutDTO.getResultId())){
                historyOutDTOMap.get(resultKeywordOutDTO.getResultId()).getKeywords().add(resultKeywordOutDTO);
            }
        }

        for(ResultCompanyOutDTO resultCompanyOutDTO : companies){
            if(historyOutDTOMap.containsKey(resultCompanyOutDTO.getResultId())){
                historyOutDTOMap.get(resultCompanyOutDTO.getResultId()).getCompanies().add(resultCompanyOutDTO);
            }
        }

        return historyOutDTOMap;
    }
}