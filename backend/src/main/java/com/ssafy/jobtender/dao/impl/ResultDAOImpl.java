package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.repo.ResultRepo;
import com.ssafy.jobtender.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class ResultDAOImpl implements ResultDAO {
    @PersistenceContext
    private EntityManager em;
    private final ResultRepo resultRepo;
    private final UserRepo userRepo;
    //
    private final QResult result = QResult.result;
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
}