package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.repo.CompanyRepo;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Component
public class CompanyDAOImpl implements CompanyDAO {
    private final CompanyRepo companyRepo;
    @PersistenceContext
    private EntityManager em;
    private final QResult result = QResult.result;
    private final QInput input = QInput.input;
    private final QKeywordMeasure keywordMeasure = QKeywordMeasure.keywordMeasure;
    private final QCompanyMeasure companyMeasure = QCompanyMeasure.companyMeasure;
    private final QCompany company = QCompany.company;
    private final QKeyword keyword = QKeyword.keyword;
    private final QCompanyRating companyRating = QCompanyRating.companyRating;
    private final QExtractedKeyword extractedKeyword = QExtractedKeyword.extractedKeyword;

    public CompanyDAOImpl(CompanyRepo companyRepo) {
        this.companyRepo = companyRepo;
    }

    @Override
    public CompanyRatingOutDTO readCompanies(long companyId) {
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

        for (CompanyRatingOutDTO companyRatingOutDTO : companyRatingOutDTOs)
            if (companyRatingOutDTO.getCompanyId() == companyId)
                return companyRatingOutDTO;

        return null;
    }

    @Override
    public List<KeywordRandomCompanyOutDto> readKeywordCompaniesByResultId(long resultId) {
        List<KeywordRandomCompanyOutDto> keywordRandomCompanyOutDtoList = new JPAQuery<>(em)
                .select(Projections.constructor(KeywordRandomCompanyOutDto.class,
                        result.resultId, company.companyId, keyword.keywordId, company.name, keyword.keywordName)).distinct()
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

    @Override
    public Chart2OutDTO readC2ByCompanyId(long companyId) {
        /*
        select C.company_id, C.name, EK.name, CM.score
        from companies C
        join company_measures CM
        on C.company_id = CM.company_id
        join extracted_keywords EK
        on CM.extracted_keyword_id = EK.extract_keyword_id
        where C.company_id = 1 and CM.score > 0;
         */
        Chart2OutDTO chart2OutDTO = new Chart2OutDTO();
        chart2OutDTO.setChart2ChildOutDTOs(new ArrayList<>());

        List<Chart2InitOutDTO> chart2InitOutDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(Chart2InitOutDTO.class,
                        company.companyId, company.name, extractedKeyword.name, companyMeasure.score))
                .from(company)
                .join(companyMeasure)
                .on(company.companyId.eq(companyMeasure.company.companyId))
                .join(extractedKeyword)
                .on(companyMeasure.extractedKeyword.extractKeywordId.eq(extractedKeyword.extractKeywordId))
                .where(company.companyId.eq(companyId))
                .where(companyMeasure.score.castToNum(Float.class).gt(0))
                .orderBy(companyMeasure.score.castToNum(Float.class).desc())
                .fetch();

        if (chart2InitOutDTOs.size() == 0)
            return null;

        chart2OutDTO.setCompanyId(chart2InitOutDTOs.get(0).getCompanyId());
        chart2OutDTO.setCompanyName(chart2InitOutDTOs.get(0).getCompanyName());

        float sum = 0;

        for (Chart2InitOutDTO chart2InitOutDTO : chart2InitOutDTOs){
            chart2OutDTO.getChart2ChildOutDTOs().add(new Chart2ChildOutDTO(chart2InitOutDTO.getName(),
                    chart2InitOutDTO.getValue()));

            sum += Float.parseFloat(chart2InitOutDTO.getValue());
        }

        System.out.println("SUM + " + sum);

        for (Chart2ChildOutDTO chart2ChildOutDTO : chart2OutDTO.getChart2ChildOutDTOs())
            chart2ChildOutDTO.setValue(Float.toString(Float.parseFloat(chart2ChildOutDTO.getValue()) / sum));

        return chart2OutDTO;
    }
}
