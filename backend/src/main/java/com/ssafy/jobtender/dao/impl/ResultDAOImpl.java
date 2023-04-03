package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.dto.input.ReadResultSummaryInitOutDTO;
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
    private final QKeyword keyword = QKeyword.keyword;
    private final QInput input = QInput.input;
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
    public List<ReadResultSummaryOutDTO> readResultSummaryByUserId(long userId) {
        /*
        select R.result_id, K.keyword_name, C.name
        from results R
        join inputs I
        on R.result_id = I.result_id
        join keywords K
        on I.keyword_id = K.keyword_id
        join company_scores CS
        on CS.result_id = R.result_id
        join companies C
        on CS.company_id = C.company_id
        where R.user_id = 1;
         */
        List<ReadResultSummaryOutDTO> readResultSummaryOutDTOs = new ArrayList<>();
        Map<Long, ReadResultSummaryMapOutDTO> map = new HashMap<>();

        List<ReadResultSummaryInitOutDTO> readResultSummaryOutInitDTOs = new JPAQuery<>(em)
                .select(Projections.constructor(ReadResultSummaryInitOutDTO.class,
                        result.resultId, result.accessInfo.createDate, keyword.keywordName, company.name))
                .from(result)
                .join(input)
                .on(result.resultId.eq(input.result.resultId))
                .join(keyword)
                .on(input.keyword.keywordId.eq(keyword.keywordId))
                .join(companyScore)
                .on(companyScore.result.resultId.eq(result.resultId))
                .join(company)
                .on(companyScore.company.companyId.eq(company.companyId))
                .where(result.user.userId.eq(userId))
                .fetch();

        for (ReadResultSummaryInitOutDTO readResultSummaryInitOutDTO : readResultSummaryOutInitDTOs){
            if (!map.containsKey(readResultSummaryInitOutDTO.getResultId())) {

                ReadResultSummaryMapOutDTO readResultSummaryMapOutDTO = new ReadResultSummaryMapOutDTO();

                readResultSummaryMapOutDTO.setResultId(readResultSummaryInitOutDTO.getResultId());
                readResultSummaryMapOutDTO.setDate(readResultSummaryInitOutDTO.getDate());

                readResultSummaryMapOutDTO.setKeyword(new HashSet<>());
                readResultSummaryMapOutDTO.setCompany(new HashSet<>());

                map.put(readResultSummaryInitOutDTO.getResultId(), readResultSummaryMapOutDTO);
            }

            map.get(readResultSummaryInitOutDTO.getResultId()).getKeyword().add(readResultSummaryInitOutDTO.getKeyword());
            map.get(readResultSummaryInitOutDTO.getResultId()).getCompany().add(readResultSummaryInitOutDTO.getCompany());
            System.out.println("555");
        }

        for (Long key : map.keySet()){
            ReadResultSummaryOutDTO readResultSummaryOutDTO = new ReadResultSummaryOutDTO();

            readResultSummaryOutDTO.setResultId(key);
            readResultSummaryOutDTO.setDate(map.get(key).getDate());
            readResultSummaryOutDTO.setKeywords(List.copyOf(map.get(key).getKeyword()));
            readResultSummaryOutDTO.setCompanies(List.copyOf(map.get(key).getCompany()));

            readResultSummaryOutDTOs.add(readResultSummaryOutDTO);
        }

        return readResultSummaryOutDTOs;
    }
}