package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.service.CompanyService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyDAO companyDAO;
    private final InputDAO inputDAO;

    public CompanyServiceImpl(CompanyDAO companyDAO, InputDAO inputDAO){
        this.companyDAO = companyDAO;
        this.inputDAO = inputDAO;
    }
    @Override
    public CompanyRatingOutDTO readCompanies(long companyId) {
        return this.companyDAO.readCompanies(companyId);
    }

    @Override
    public Map<String, List<KeywordRandomCompanyOutDto>> readCompaniesByKeyword(long resultId) {
        Input input = inputDAO.readInputsByResultId(resultId);

        return null;
    }
}