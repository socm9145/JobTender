package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.entity.QCompany;
import com.ssafy.jobtender.entity.QCompanyRating;
import com.ssafy.jobtender.repo.CompanyRepo;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

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