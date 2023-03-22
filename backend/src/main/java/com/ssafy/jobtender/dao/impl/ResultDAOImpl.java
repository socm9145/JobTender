package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.repo.ResultRepo;
import com.ssafy.jobtender.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;

@Component
public class ResultDAOImpl implements ResultDAO {
    @PersistenceContext
    private EntityManager em;
    private final ResultRepo resultRepo;
    private final UserRepo userRepo;
    @Autowired
    public ResultDAOImpl(ResultRepo resultRepo, UserRepo userRepo) {
        this.resultRepo = resultRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void createResult(Long userId) {
        User resultUser = userRepo.findByUserId(userId).get();

        Result result = new Result();

        AccessInfo accessInfo = new AccessInfo();
        accessInfo.setCreateDate(new Date());
        accessInfo.setUpdateDate(new Date());
        accessInfo.setCreateId(String.valueOf(userId));
        accessInfo.setUpdateId(String.valueOf(userId));

        result.setAccessInfo(accessInfo);
        result.setUser(resultUser);
        resultRepo.save(result);
    }

    @Override
    public List<ReadResultOutDTO> readResultsByUserId() {

        QResult result = QResult.result;
        QCompanyScore companyScore = QCompanyScore.companyScore;
        QCompany company = QCompany.company;
        QInput input = QInput.input;
        QCompanyRating companyRating = QCompanyRating.companyRating;

        /*
        select R.result_id, R.user_id,
        I.keyword,
        CS.score,
        C.name, C.type, C.scale, C.salary, C.employees_number, C.address, C.year_founded,
        CR.average_rating, CR.growth_rating, CR.balance_rating, CR.salary_welfare_rating, CR.culture_rating, CR.management_rating
        from results R
        join inputs I
        on R.result_id = I.result_id

        join company_scores CS
        on R.result_id = CS.result_id

        join companies C
        on CS.company_id = C.company_id

        join company_ratings CR
        on C.company_id = CR.company_id

        where R.result_id = 1;
        */

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
}