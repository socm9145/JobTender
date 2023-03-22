package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.service.CompanyService;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyDAO companyDAO;

    public CompanyServiceImpl(CompanyDAO companyDAO){
        this.companyDAO = companyDAO;
    }
    @Override
    public CompanyRatingOutDTO readCompanies(long companyId) {
        return this.companyDAO.readCompanies(companyId);
    }
}