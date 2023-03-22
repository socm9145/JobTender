package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.repo.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class ResultDAOImpl implements ResultDAO {
    @PersistenceContext
    private EntityManager em;
    private final ResultRepo resultRepo;
    @Autowired
    public ResultDAOImpl(ResultRepo resultRepo) {
        this.resultRepo = resultRepo;
    }

    @Override
    public void createResult() {
        Result result = new Result();
        this.resultRepo.save(result);

    }

    @Override
    public List<ReadResultOutDTO> readResultsByUserId() {

        QResult result = QResult.result;
        QCompanyScore companyScore = QCompanyScore.companyScore;
        QCompany company = QCompany.company;
        QInput input = QInput.input;
        QCompanyRating companyRating = QCompanyRating.companyRating;

        List<ReadResultOutDTO> readResultOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(ReadResultOutDTO.class,
                        result.resultId, result.user.userId,
                        input.keyword,
                        companyScore.score,
                        company.name, company.type, company.scale, company.salary, company.employeesNumber, company.address, company.yearFounded,
                        companyRating.averageRating, companyRating.growthRating, companyRating.balanceRating, companyRating.salaryWelfareRating, companyRating.cultureRating, companyRating.managementRating))
                .from(result)
                .join(result.inputs, input)
                .on(result.resultId.eq(input.result.resultId))
                .join(result.companyScores, companyScore)
                .on(result.resultId.eq(companyScore.result.resultId))
                .join(companyScore.company, company)
                .on(companyScore.company.companyId.eq(company.companyId))
                .join(company.companyRating, companyRating)
                .on(companyRating.company.companyId.eq(company.companyId))
                .fetch();

        return readResultOutDTOs;
    }

    @Override
    public List<ResultCompanyOutDTO> readResultsCompanies() {
        return null;
    }
}