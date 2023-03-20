package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.SimilarCompanyDAO;
import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import com.ssafy.jobtender.entity.Company;
import com.ssafy.jobtender.entity.SimilarCompany;
import com.ssafy.jobtender.repo.CompanyRepo;
import com.ssafy.jobtender.repo.SimilarCompanyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Component
public class SimilarCompanyDAOImpl implements SimilarCompanyDAO{
    private final SimilarCompanyRepo similarCompanyRepo;
    private final CompanyRepo companyRepo;

    @Autowired
    public SimilarCompanyDAOImpl(SimilarCompanyRepo similarCompanyRepo, CompanyRepo companyRepo){
        this.similarCompanyRepo = similarCompanyRepo;
        this.companyRepo = companyRepo;
    }

    /**
     * 유사한 기업 이름 반환 : 선택된 기업과 유사한 기업의 이름을 반환한다.
     * @param selected_company_id : 선택된 기업 아이디;
     * @return List<ComparableCompanyNameOutputDTO> : 기업 이름 리스트
     * */
    @Override
    public List<ComparableCompanyNameOutputDTO> readComparableCompanies(long selected_company_id) {
        Optional<List<SimilarCompany>> isSimilarCompany = this.similarCompanyRepo.findAllByCompanyId(selected_company_id);
        if(isSimilarCompany.isEmpty()) {
            return null;
        }
        
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = new LinkedList<>();
        List<SimilarCompany> similarCompanies = isSimilarCompany.get();
        for(SimilarCompany similarCompany: similarCompanies){
            String comparableScore = similarCompany.getComparableScore();

            Optional<Company> isCompany = this.companyRepo.findByCompanyId(similarCompany.getSimilarCompanyId());
            if(isCompany.isEmpty()){
                return null;
            }

            Company company = isCompany.get();
            String companyName = company.getName();

            ComparableCompanyNameOutputDTO comparableCompanyNameOutputDTO = ComparableCompanyNameOutputDTO.createBuilder()
                    .name(companyName)
                    .comparableScore(comparableScore)
                    .build();

            comparableCompanyNameOutputDTOList.add(comparableCompanyNameOutputDTO);
        }

        return comparableCompanyNameOutputDTOList;
    }
}
