package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.CompanyMeasureDAO;
import com.ssafy.jobtender.entity.CompanyMeasure;
import com.ssafy.jobtender.repo.CompanyMeasureRepo;

import java.util.List;
import java.util.Optional;

public class CompanyMeasureDAOImpl implements CompanyMeasureDAO {

    private final CompanyMeasureRepo companyMeasureRepo;
    public CompanyMeasureDAOImpl(CompanyMeasureRepo companyMeasureRepo){
        this.companyMeasureRepo = companyMeasureRepo;
    }
    @Override
    public List<CompanyMeasure> readCompanyMeasuresByExtractedKeywordId(long extractKeywordId) {
        Optional<List<CompanyMeasure>> isCompanyMeasure = companyMeasureRepo.findAllByExtractedKeyword(extractKeywordId);
        if(isCompanyMeasure.isEmpty()) {
            return null;
        }else{
            List<CompanyMeasure> companyMeasures = isCompanyMeasure.get();
            return companyMeasures;
        }
    }
}
