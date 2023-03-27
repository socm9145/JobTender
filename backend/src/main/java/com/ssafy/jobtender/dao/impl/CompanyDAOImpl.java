package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.repo.CompanyRepo;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Component
public class CompanyDAOImpl implements CompanyDAO {
    private final CompanyRepo companyRepo;
    @PersistenceContext
    private EntityManager em;

    public CompanyDAOImpl(CompanyRepo companyRepo){
        this.companyRepo = companyRepo;
    }
    @Override
    public CompanyRatingOutDTO readCompanies(long companyId) {
        QCompany company = QCompany.company;
        QCompanyRating companyRating = QCompanyRating.companyRating;

        List<CompanyRatingOutDTO> companyRatingOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(CompanyRatingOutDTO.class,
                        company.name, company.type, company.scale, company.salary, company.employeesNumber,
                        company.address, company.yearFounded, company.companyId,
                        companyRating.companyRatingId, companyRating.averageRating, companyRating.growthRating,
                        companyRating.balanceRating, companyRating.salaryWelfareRating,
                        companyRating.cultureRating, companyRating.managementRating))
                .from(company)
                .join(company.companyRating, companyRating)
                .on(company.companyId.eq(companyRating.company.companyId))
                .fetch();

        for (CompanyRatingOutDTO companyRatingOutDTO :companyRatingOutDTOs)
            if (companyRatingOutDTO.getCompanyId() == companyId)
                return companyRatingOutDTO;

        return null;
    }

    @Override
    public List<KeywordRandomCompanyOutDto> readKeywordCompaniesByResultId(long resultId) {
        QResult result = QResult.result;
        QInput input = QInput.input;
        QKeywordMeasure keywordMeasure = QKeywordMeasure.keywordMeasure;
        QCompanyMeasure companyMeasure = QCompanyMeasure.companyMeasure;
        QCompany company = QCompany.company;
        QKeyword keyword = QKeyword.keyword1;

        List<KeywordRandomCompanyOutDto> keywordRandomCompanyOutDtoList = new JPAQuery<>(em)
                .select(Projections.constructor(KeywordRandomCompanyOutDto.class,
                        result.resultId, company.companyId, keyword.keywordId, company.name, keyword.keyword)).distinct()
                .from(result)
                .join(input)
                .on(result.resultId.eq(input.result.resultId))
                .join(keyword)
                .on(input.keyword.keywordId.eq(keyword.keywordId))
                .join(keywordMeasure)
                .on(keyword.keywordId.eq(keywordMeasure.keyword.keywordId))
                .join(companyMeasure)
                .on(keywordMeasure.extractedKeyword.extractKeywordId.eq(companyMeasure.extractedKeyword.extractKeywordId))
                .join(company)
                .on(companyMeasure.company.companyId.eq(company.companyId))
                .where(result.resultId.eq(resultId))
                .orderBy(keyword.keywordId.asc())
                .fetch();

        return keywordRandomCompanyOutDtoList;
    }
}

/*
List<CompanyRatingOutDTO> companyRatingOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(CompanyRatingOutDTO.class,
                        company.name, company.type, company.scale, company.salary, company.employeesNumber,
                        company.address, company.yearFounded, company.companyId,
                        companyRating.companyRatingId, companyRating.averageRating, companyRating.growthRating,
                        companyRating.balanceRating, companyRating.salaryWelfareRating,
                        companyRating.cultureRating, companyRating.managementRating))
                .from(company)
                .join(company.companyRating, companyRating)
                .on(company.companyId.eq(companyRating.company.companyId))
                .fetch();
 */